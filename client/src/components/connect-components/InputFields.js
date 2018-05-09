import React from 'react';
import '../../css/Connect.css';

/*
 * props:
 *    {...state}
 *    toggle - callback for contacts modal
 *    handleTextUpdate - callback for updating input fields state
 */
function InputFields(props) {
  return (
    <div className="col-md-4 form-input email-input">
      <div className="form-group email-input">
        <label htmlFor="inTop" id="topLabel">
          <strong>Contact Info</strong>
          <a role="button" tabIndex="0" onClick={() => props.toggle('modal')}>Import Contact</a>
        </label>
        <input id="inTop" type="text" name="name" placeholder="$FIRSTNAME $LASTNAME" value={props.name} onChange={e => props.handleTextUpdate('name', e)} />
        <input type="text" name="company" placeholder="$COMPANY" value={props.company} onChange={e => props.handleTextUpdate('company', e)} />
        <input type="text" name="city" placeholder="$CITY" value={props.city} onChange={e => props.handleTextUpdate('city', e)} />
        <input type="text" name="position" placeholder="$POSITION" value={props.position} onChange={e => props.handleTextUpdate('position', e)} />
      </div>
      <div className="form-group email-input">
        <label id="label2" htmlFor="inMid"><strong>Email Details</strong></label>
        <input id="inMid" type="email" name="email" placeholder="Contact Email" value={props.email} onChange={e => props.handleTextUpdate('email', e)} />
        <input type="text" name="subject" placeholder="Subject Line of Email" value={props.subject} onChange={e => props.handleTextUpdate('subject', e)} />
        <input type="password" name="password" placeholder="Your Account Password" value={props.password} onChange={e => props.handleTextUpdate('password', e)} />
      </div>
      <p>Email Not sending?<br />
        Click <a href="https://myaccount.google.com/lesssecureapps" target="_blank" rel="noopener noreferrer"> here
        </a> and <a href="https://accounts.google.com/DisplayUnlockCaptcha" target="_blank" rel="noopener noreferrer"> here</a>
      </p>
    </div>
  );
}

export default InputFields;
