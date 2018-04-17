import React from 'react';
import '../../css/Contacts.css';
import { Button } from 'reactstrap';
import AddContactForm from './AddContactForm';
import ContactListItem from './ContactListItem';
import firebase from 'firebase';

const database = firebase.database();

const styles = {
  listWrapper: {
    marginTop: '25px',
    boxShadow: '0 1px 10px rgba(0,0,0,0.24)',
    borderRadius: '10px',
    overflow: 'hidden',
  },
};

/*
 * props: list: list of contact objects
*/
class ContactList extends React.Component {
  constructor(props) {
    super(props);

    this.showForm = this.showForm.bind(this);
    this.addContact = this.addContact.bind(this);
    this.deleteContact = this.deleteContact.bind(this);
    this.toggleDelete = this.toggleDelete.bind(this);
    this.sortBy = this.sortBy.bind(this);

    this.state = {
      list: this.props.list,
      addNewContact: false,
      deleteItems: false,
    };
  }

  sortBy(key) {
    console.log(key);
  }

  showForm() {
    this.setState({ addNewContact: true });
  }

  addContact(contact) {
    if (contact) {
      const id = Date.now();
      const contactList = this.state.list;
      contactList[id] = contact;

      // update localStorage
      const user = JSON.parse(localStorage.getItem('firebaseUser'));
      user.contacts = contactList;
      localStorage.setItem('firebaseUser', JSON.stringify(user));

      // update Firebase
      database.ref(`users/${user.user.uid}/contacts/${id}`).set(contact);

      // update state
      this.setState({ list: contactList });
    }

    this.setState({ addNewContact: false });
  }

  deleteContact(id) {
    if (window.confirm('Are you sure you want to permanently delete this contact?')) {
      const contactList = this.state.list;
      delete contactList[id];

      // update localStorage
      const user = JSON.parse(localStorage.getItem('firebaseUser'));
      user.contacts = contactList;
      localStorage.setItem('firebaseUser', JSON.stringify(user));

      // update Firebase
      database.ref(`users/${user.user.uid}/contacts/${id}`).remove();

      // update state
      this.setState({ list: contactList, deleteItems: false });
    }
  }

  toggleDelete() {
    if (this.state.deleteItems) {
      this.setState({ deleteItems: false });
    } else {
      this.setState({ deleteItems: true });
    }
  }

  render() {
    const tableHead = (
      <thead>
        <tr>
          <th scope="col" onClick={() => this.sortBy('name')}>Name</th>
          <th scope="col" onClick={() => this.sortBy('email')}>Email</th>
          <th scope="col" onClick={() => this.sortBy('company')}>Company</th>
          <th scope="col" onClick={() => this.sortBy('city')}>City</th>
          <th scope="col">Note</th>
          <th scope="col" onClick={this.toggleDelete}>
            <i className="fas fa-trash-alt" />
          </th>
        </tr>
      </thead>
    );

    const tableFoot = (
      <tfoot>
        <tr>
          <td>
            <Button outline color="primary" onClick={this.showForm}>
              Add New Contact
            </Button>
          </td><td/><td/><td/><td/><td/>
        </tr>
      </tfoot>
    );

    // returns Add Contact Form
    if (this.state.addNewContact) {
      return <AddContactForm submit={contact => this.addContact(contact)} />;
    }

    // returns Contact List
    return (
      <div style={styles.listWrapper}>
        <table className="table table-hover">
          {tableHead}
          {tableFoot}
          <tbody>
            {Object.keys(this.state.list).map(function (id) {
              return (
                <ContactListItem
                  key={id}
                  contact={this.state.list[id]}
                  contactId={id}
                  delIcon={this.state.deleteItems}
                  delete={(conId) => this.deleteContact(conId)}
                />
              );
            }, this)}
          </tbody>
        </table>
      </div>
    );
  }
}

export default ContactList;
