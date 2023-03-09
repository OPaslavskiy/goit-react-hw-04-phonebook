import React, { Component } from 'react';
import { Layout } from '../Layout';
import { GlobalStyle } from 'GlobalStyle';
import { AddContactForm } from './AddContactForm/AddContactForm';
import { ContactsList } from './ContactsLists/ContactsList';
import { FindContactForm } from './FindContactImput/FindContactImput';

import Notiflix from 'notiflix';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const sevedContacts = localStorage.getItem('yourContacts');

    if (sevedContacts !== null) {
      const parsedContacts = JSON.parse(sevedContacts);
      this.setState({ contacts: parsedContacts });
      return;
    }
  }

  componentDidUpdate(_, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('yourContacts', JSON.stringify(this.state.contacts));
    }
  }

  addContact = newContact => {
    let isName = this.state.contacts.some(
      contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
    );

    if (isName) {
      Notiflix.Notify.info(`${newContact.name} is already in contacts`);
      return;
    } else
      this.setState(prevState => {
        return { contacts: [...prevState.contacts, newContact] };
      });
  };

  changeFilter = e => {
    const findName = e.target.value.trim();
    this.setState({ filter: findName.toLocaleLowerCase() });
  };

  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    const contactsFilter = this.state.contacts.filter(contact =>
      contact.name.toLocaleLowerCase().includes(this.state.filter)
    );

    return (
      <Layout>
        <GlobalStyle />
        <h1>Phonebook</h1>
        <AddContactForm addContact={this.addContact} />
        {this.state.contacts.length > 0 && (
          <div>
            <h2>Contacts:</h2>
            <FindContactForm filter={this.changeFilter} />
            <ContactsList
              contacts={contactsFilter}
              deleteContact={this.deleteContact}
            />
          </div>
        )}
      </Layout>
    );
  }
}
