import React from 'react';
import firebase from 'firebase';
import '../../css/Discover.css';
import { Alert } from 'reactstrap';
import MediumHeader from '../headers/MediumHeader';
import { ClipLoader } from 'react-spinners';
import AddContactForm from '../contacts-components/AddContactForm';

const database = firebase.database();

/*
 * props: user - current user object
 */
class Guesser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      f_name: '',
      l_name: '',
      company: '',
      custom: '',
      visible: false,
      results: '',
      addContactForm: false,
      selectedEmail: '',
    };

    this.toggle = this.toggle.bind(this);
    //this.createContact = this.createContact.bind(this);
  }

  submit(disabled) {
    if (!disabled) {

      this.setState({ results: 'in-progress' });

      const body = {
        f_name: this.state.f_name,
        l_name: this.state.l_name,
        company: this.state.company,
        custom: this.state.custom,
      }

      fetch('/api/guess', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: new Headers({ 'Content-type': 'application/json' }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(response.status_text);
          }
          return response.json();
        })
        .then((response) => {
          if (response.error) {
            console.log('error:', response.error);
          } else {
            this.setState({ results: response });
          }
        })
        .catch(err => console.log(err)); // eslint-disable-line no-console
    }
  }

  toggle() {
    this.setState({ visible: !this.state.visible });
  }

  setContact(email) {
    this.setState({ addContactForm: true, selectedEmail: email });
  }

  addContact(contact) {
    if (contact) {
      const id = Date.now();

      // update localStorage
      const user = JSON.parse(localStorage.getItem('firebaseUser'));
      user.contacts[id] = contact;
      localStorage.setItem('firebaseUser', JSON.stringify(user));

      // update Firebase
      database.ref(`users/${user.user.uid}/contacts/${id}`).set(contact);

      window.alert("Successfully added new contact!");
    }

    this.setState({ addContactForm: false });
  }

  render() {

    if (this.state.addContactForm) {
      return (
        <div className="add-form">
          <AddContactForm
            submit={contact => this.addContact(contact)}
            f_name={this.state.f_name}
            l_name={this.state.l_name}
            company={this.state.company}
            email={this.state.selectedEmail}
          />
        </div>
      )
    }

    const infoIcon = (
      <a onClick={this.toggle} className="help-icon">
        <i className="fa fa-question-circle" aria-hidden="true"/>
      </a>
    );

    const names = (
      <div className="form-row">
        <div className="form-group col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="First name"
            onChange={e => this.setState({ f_name: e.target.value })}
          />
        </div>
        <div className="form-group col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Last name"
            onChange={e => this.setState({ l_name: e.target.value })}
          />
        </div>
      </div>
    );

    const emails = (
      <div className="form-row">
        <div className="form-group col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Company"
            onChange={e => this.setState({ company: e.target.value })}
            readOnly={this.state.custom}
          />
        </div>
        <div className="form-group col-md-6">
          <label className="sr-only" htmlFor="inlineFormInputGroup">Username</label>
          <div className="input-group mb-2">
            <div className="input-group-prepend">
              <div className="input-group-text">@</div>
            </div>
            <input
              type="text"
              className="form-control"
              placeholder="Custom Domain"
              onChange={e => this.setState({ custom: e.target.value })}
              readOnly={this.state.company}
            />
          </div>
        </div>
      </div>
    );

    const disabled = (this.state.f_name && this.state.l_name && (!this.state.company !== !this.state.custom )) ? '' : ' disabled';
    const buttons = (
      <div className="form-row">
        <div className="col">
          <span className="add-contact-btns">
            <button
              type="button"
              className={`btn btn-success${disabled}`}
              onClick={() => this.submit(disabled)}
            >
              Get Email Address
            </button>
          </span>
        </div>
      </div>
    );

    let results;
    if (!this.state.results) { // no request sent yet
      results = (
        <div className="no-results">
          <p className="no-results-text">Fill in the fields and click <strong>Get Email Address</strong> to view results</p>
        </div>
      );
    } else if (this.state.results === 'in-progress') {
      results = (
        <div className="no-results">
          <div style={{display: 'inline-block', marginBottom: '10px'}}>
          <ClipLoader
            color={'#999999'}
          />
          </div>
          <p className="no-results-text"><strong>Checking Emails...</strong></p>
        </div>
      );
    } else { // we have our results!
      results = <Results emailLists={this.state.results} createContact={(email) => this.setContact(email)}/>;
    }

    const info = this.state.visible ? <InfoHeader open={this.state.visible} toggle={this.toggle}/> : infoIcon;

    return (
      <div className="discover-form">
        {info}
        <div className="row">
          <div className="col-md-8">
            <form>
              <MediumHeader title="Contact Information" />
              <hr style={{ margin: '5px 0 25px 0' }} />
              {names}
              {emails}
              {buttons}
            </form>
          </div>
          <div className="col-md-4" style={{padding: '17px'}}>
            <div>
              <MediumHeader title="Results" style={{marginTop: '0px'}}/>
              <hr style={{ margin: '5px 30px 25px 0' }} />
              <div style={{ marginRight: '25px', padding: '10px' }}>
                {results}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const Results = ({emailLists, createContact}) => {
  if (!emailLists) {
    return (
      <div>
        <h5><strong>Whoops!</strong></h5>
        <p>Something went wrong.  Please try again</p>
      </div>
    );
  }

  if (emailLists.valid.length === 0 && emailLists.tryAgain.length === 0 && emailLists.verFail.length === 0) {
    return (
      <div>
        <h5><strong>Whoops!</strong></h5>
        <p>No email addresses were found for that combination.  Please try again with different info.</p>
      </div>
    );
  }

  const validList = !(emailLists.valid.length === 0) ? (
    <div>
      <h5>Valid Email Addresses</h5>
      <ResultList list={emailLists.valid} type="success" createContact={email => createContact(email)}/>
    </div>
  ) : <div/>;

  const verFailList = !(emailLists.verFail.length === 0) ? (
    <div>
      <h5>Possible (Verification Failed)</h5>
      <ResultList list={emailLists.verFail} type="warning" createContact={email => createContact(email)}/>
    </div>
  ) : <div/>;

  const tryAgainList = !(emailLists.tryAgain.length === 0) ? (
    <div>
      <h5>Try Again in a Bit!</h5>
      <ResultList list={emailLists.tryAgain} type="info" createContact={email => createContact(email)}/>
    </div>
  ) : <div/>;


  return (
    <div>
      <div className="result-list">{validList}</div>
      <div className="result-list">{verFailList}</div>
      <div className="result-list">{tryAgainList}</div>
    </div>
  );
}

const ResultList = ({list, type, createContact}) => {
  return (
    <div className="list-group">
      {list.map(function(email) {
        const str = `list-group-item list-group-item-${type}`
        return (
          <a role="button" tabIndex="0" className={str} key={email} onClick={() => createContact(email)}>
            {email}
          </a>
        );
      })}
    </div>
  );
}

const InfoHeader = ({ open, toggle}) => {
  return (
    <div style={{ margin: '20px 20px 0 20px' }}>
      <Alert color="info" isOpen={open} toggle={toggle}>
        <h4 className="alert-heading">Find Your Next Connection</h4>
        <p>
          You found an alumni on LinkedIn, but don't know their email address.
          How do you connect?  With <strong>Discover</strong>, just
          enter their name and company and we'll handle the rest.
        </p>
        <hr />
        <p className="mb-0">
          Fill out the fields below to get started.
        </p>
      </Alert>
    </div>
  );
}

export default Guesser;
