import React from 'react';
import '../../css/Contacts.css';
import { Button } from 'reactstrap';
import MediumHeader from '../headers/MediumHeader';

const styles = {
  formWrapper: {
    marginTop: '25px',
    boxShadow: '0 1px 10px rgba(0,0,0,0.24)',
    borderRadius: '10px',
    overflow: 'hidden',
  },
};

/*
 * props: submit - submit callback function, passes up new contact obj.
 *                 if object is null, cancels the operation
*/
class AddContactForm extends React.Component {
  constructor(props) {
    super(props);

    this.cancel = this.cancel.bind(this);
    this.submit = this.submit.bind(this);

    this.state = {
      f_name: '',
      l_name: '',
      company: '',
      city: '',
      note: '',
      disabled: '',
    };
  }

  submit(disabled) {
    const contact = this.state;
    if (!disabled) {
      this.props.submit(contact);
    } else {
      alert('Please fill out all fields.');
    }
  }

  cancel() {
    this.props.submit();
  }

  render() {
    const disabled = (this.state.f_name && this.state.l_name && this.state.company &&
                      this.state.city && this.state.email && this.state.note) ? '' : ' disabled';
    const buttons = (
      <div className="form-row">
        <div className="col">
          <span className="add-contact-btns">
            <button
              type="button"
              className={`btn btn-success${disabled}`}
              onClick={() => this.submit(disabled)}
            >
              Add Contact
            </button>
            <button type="button" className="btn btn-danger" onClick={this.cancel}>Cancel</button>
          </span>
        </div>
      </div>
    );

    const nameInput = (
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

    const location = (
      <div className="form-row">
        <div className="form-group col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Company"
            onChange={e => this.setState({ company: e.target.value })}
          />
        </div>
        <div className="form-group col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="City"
            onChange={e => this.setState({ city: e.target.value })}
          />
        </div>
      </div>
    );

    const email = (
      <div className="form-row">
        <div className="form-group col-md-12">
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            onChange={e => this.setState({ email: e.target.value })}
          />
        </div>
      </div>
    );

    const note = (
      <div className="form-row">
        <div className="form-group col-md-12">
          <textarea
            className="form-control"
            rows="4"
            placeholder="Note"
            onChange={e => this.setState({ note: e.target.value })}
          />
        </div>
      </div>
    );

    return (
      <div className="add-contact" style={styles.formWrapper}>
        <form>
          <MediumHeader title="Add Contact" />
          <hr style={{ margin: '5px 0 25px 0' }} />
          {nameInput}
          {email}
          {location}
          {note}
          {buttons}
        </form>
      </div>
    );
  }
}

export default AddContactForm;
