import React from 'react';
import '../../css/Discover.css';

function Results(props) {

  // Error object returned
  if (!props.emailLists) {
    return <ErrorMsg title="Whoops!" msg="Something went wrong.  Please try again"/>
  }

  // 403 Error
  if (props.emailLists.err) {
    return <ErrorMsg title="Whoops!" msg="You tried to find an email too many times.  Wait a minute or two, and then try again."/>
  }

  // All lists are empty
  if (props.emailLists.valid.length === 0 && props.emailLists.tryAgain.length === 0 && props.emailLists.verFail.length === 0) {
    return <ErrorMsg title="Oh No!" msg="No email addresses were found for that combination.  Try another name or email!"/>
  }

  // Verification failed for all guess attempts
  if (props.emailLists.valid.length === 0 && props.emailLists.tryAgain.length === 0 && props.emailLists.verFail.length === 8) {
    return <ErrorMsg title="Well, Shucks..." msg="It looks like that particular email server won't process our requests.  Try a different company or domain!"/>
  }

  const validList = props.emailLists.valid.length > 0 ? (
    <ListWrapper title="Valid Email Addresses" list={props.emailLists.valid} type="success" callback={email => props.createContact(email)}/>
  ) : <div/>;

  const verFailList = props.emailLists.verFail.length > 0 ? (
    <ListWrapper title="Possible (Verification Failed)" list={props.emailLists.verFail} type="warning" callback={email => props.createContact(email)}/>
  ) : <div/>;

  const tryAgainList = props.emailLists.tryAgain.length > 0 ? (
    <ListWrapper title="Probable addresses" list={props.emailLists.tryAgain} type="info" callback={email => props.createContact(email)}/>
  ) : <div/>;

  return (
    <div>
      {validList}
      {verFailList}
      {tryAgainList}
    </div>
  );
}

const ErrorMsg = ({ title, msg }) => {
  return (
    <div className="result-list">
      <div className="no-results" style={{paddingTop: '0px !important'}}>
        <h5 className="no-results-header"><strong>{title}</strong></h5>
        <p className="no-results-text">{msg}</p>
      </div>
    </div>
  );
}

const ListWrapper = ({title, list, type, callback}) => {
  return (
    <div>
      <h5>{title}</h5>
      <ResultList list={list} type={type} createContact={email => callback(email)}/>
    </div>
  );
}

const ResultList = ({list, type, createContact}) => {
  return (
    <div className="list-group">
      {list.map(function(email) {
        const str = `list-group-item list-group-item-${type} result-list-item`
        return (
          <a role="button" tabIndex="0" className={str} key={email} onClick={() => createContact(email)}>
            {email}
          </a>
        );
      })}
    </div>
  );
}

export default Results;
