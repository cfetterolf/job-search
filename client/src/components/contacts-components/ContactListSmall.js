import React from 'react';
import '../../css/Contacts.css';

function ContactListSmall(props) {
  return (
    <div>
      {Object.keys(props.contacts).map(id => (
        <ContactItem key={id} contact={props.contacts[id]} clicked={() => props.clicked(props.contacts[id])}/>
      ), props)}
    </div>
  );
}

const ContactItem = (props) => (
  <div onClick={() => props.clicked()} className="small-item">
    <strong>
    {`${props.contact.f_name} ${props.contact.l_name}`}
    </strong>
    {` - ${props.contact.company} - ${props.contact.city}`}
  </div>
);

export default ContactListSmall;
