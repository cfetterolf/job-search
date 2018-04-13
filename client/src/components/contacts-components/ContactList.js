import React from 'react';
import styled from 'styled-components';
import '../../css/Contacts.css';
import ContactListItem from './ContactListItem';

const Blue = styled.div`background: blue; height: 500px;`

/*
 * props: list: list of contact objects
*/
class ContactList extends React.Component  {
  constructor(props) {
    super(props);

    this.state = {
      list: props.list
    };
  }


  render() {
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

    return (
      <div>
        <table className="table table-hover">
          {tableHead}
          <tbody>
          {Object.keys(this.state.list).map(function(id) {
            const contact = this.state.list[id];
              return (
                <tr key={id}>
                  <td>{contact.f_name+" "+contact.l_name}</td>
                  <td>{contact.email}</td>
                  <td>{contact.company}</td>
                  <td>{contact.city}</td>
                  <td
                    data-toggle="popover"
                    data-content={contact.note}
                    data-trigger="hover"
                  >{contact.note.substring(0,7)+"..."}</td>
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
