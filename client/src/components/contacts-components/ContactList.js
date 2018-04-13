import React from 'react';
import '../../css/Contacts.css';
import PopoverItem from './PopoverItem';
import { Button } from 'reactstrap';
import AddContactForm from './AddContactForm';
import firebase from 'firebase';

const database = firebase.database();

const styles = {
  listWrapper: {
    marginTop: '25px',
    boxShadow: '0 1px 10px rgba(0,0,0,0.24)',
    borderRadius: '10px',
    overflow: 'hidden',
  }
}

const tableHead = (
  <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Email</th>
      <th scope="col">Company</th>
      <th scope="col">City</th>
      <th scope="col">Note</th>
    </tr>
  </thead>
);

/*
 * props: list: list of contact objects
*/
class ContactList extends React.Component  {
  constructor(props) {
    super(props);

    this.showForm = this.showForm.bind(this);
    this.addContact = this.addContact.bind(this);

    this.state = {
      list: this.props.list,
      addNewContact: false,
    };
  }

  showForm() {
    this.setState({ addNewContact: true });
  }

  addContact(contact) {
    if (contact) {
      const id = Date.now();

      // update state
      let contactList = this.state.list;
      contactList[id] = contact;

      // update localStorage
      let user = JSON.parse(localStorage.getItem('firebaseUser'));
      user.contacts = contactList;
      localStorage.setItem('firebaseUser', JSON.stringify(user));

      // update Firebase
      database.ref('users/'+user.user.uid+'/contacts/'+id).set(contact);
    }

    this.setState({ addNewContact: false });
  }

  render() {
    const tableFoot = (
      <tfoot>
        <tr>
          <td>
            <Button outline color="primary" onClick={this.showForm}>
              Add New Contact
            </Button>
          </td><td/><td/><td/><td/>
        </tr>
      </tfoot>
    );

    if (this.state.addNewContact) {
      return <AddContactForm submit={(contact) => this.addContact(contact)}/>;
    }

    return (
      <div style={styles.listWrapper}>
        <table className="table table-hover">
          {tableHead}
          {tableFoot}
          <tbody>
          {Object.keys(this.state.list).map(function(id) {
            const contact = this.state.list[id];
              return (
                <tr key={id}>
                  <td>{contact.f_name+" "+contact.l_name}</td>
                  <td>{contact.email}</td>
                  <td>{contact.company}</td>
                  <td>{contact.city}</td>
                  <PopoverItem id={id} text={contact.note} />
                </tr>
              );
            }, this)}
          </tbody>
        </table>
      </div>
    );
  }
}

export default ContactList;
