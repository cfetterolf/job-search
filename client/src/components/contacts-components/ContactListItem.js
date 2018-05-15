import React from 'react';
import PopoverItem from './PopoverItem';
import delIconSrc from '../../img/minus-circle.png';
import emailIconSrc from '../../img/checkmark.png';
import '../../css/Contacts.css';

/*
 * props:
 *    contact - the contact object
 *    contactId - this contact object's id
 *    delIcon - boolean to show delete icon or not
 *    delete - callback function to delete contact, takes ID parameter
 */
function ContactListItem(props) {
  /* eslint-disable */
  const delIcon = props.delIcon ? (
    <img
      className="del-icon"
      src={delIconSrc}
      onClick={() => props.delete(props.contactId)}
    />
  ) : <img />;

  const emailIcon = props.contact.emailed ? (
    <img
      className="email-icon"
      src={emailIconSrc}
    />
  ) : <img />;
  /* eslint-enable */

  return (
    <tr key={props.contactId}>
      <td>{`${props.contact.f_name} ${props.contact.l_name}`}</td>
      <td>{props.contact.email}</td>
      <td>{props.contact.company}</td>
      <td>{props.contact.city}</td>
      <PopoverItem id={props.contactId} text={props.contact.note} />
      <td>{emailIcon}</td>
      <td>{delIcon}</td>
    </tr>
  );
}

export default ContactListItem;
