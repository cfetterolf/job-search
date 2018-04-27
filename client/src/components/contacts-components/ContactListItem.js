import React from 'react';
import PopoverItem from './PopoverItem';
import iconSrc from '../../img/minus-circle.svg';
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
  const icon = props.delIcon ? <img className="del-icon" src={iconSrc} className="del-icon" onClick={() => props.delete(props.contactId)}/> : <img />;
  /* eslint-enable */
  return (
    <tr key={props.contactId}>
      <td>{`${props.contact.f_name} ${props.contact.l_name}`}</td>
      <td>{props.contact.email}</td>
      <td>{props.contact.company}</td>
      <td>{props.contact.city}</td>
      <PopoverItem id={props.contactId} text={props.contact.note} />
      <td>{icon}</td>
    </tr>
  );
}

export default ContactListItem;
