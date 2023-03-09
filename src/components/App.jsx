import React, { useState, useEffect } from 'react';
import { Layout } from '../Layout';
import { GlobalStyle } from 'GlobalStyle';
import { AddContactForm } from './AddContactForm/AddContactForm';
import { ContactsList } from './ContactsLists/ContactsList';
import { FindContactImput } from './FindContactImput/FindContactImput';

import Notiflix from 'notiflix';

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    return (
      JSON.parse(localStorage.getItem('yourContacts')) ?? [
        { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
        { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
        { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
        { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
      ]
    );
  });
  const [filter, setFilter] = useState('');

  function checkName(newContact) {
    let isName = contacts.some(
      contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
    );

    if (isName) {
      Notiflix.Notify.info(`${newContact.name} is already in contacts`);
      return;
    } else addToLocalStorege(newContact);
  }

  function addToLocalStorege(newContact) {
    setContacts([...contacts, newContact]);
  }

  function deleteContact(id) {
    let remainsContacts = contacts.filter(contact => contact.id !== id);
    console.log(remainsContacts);
    setContacts(remainsContacts);
  }

  function changeFilter(e) {
    const findName = e.target.value.trim();
    setFilter(findName.toLocaleLowerCase());
  }

  useEffect(() => {
    localStorage.setItem('yourContacts', JSON.stringify(contacts));
  }, [contacts]);

  const contactsFilter = contacts.filter(contact =>
    contact.name.toLocaleLowerCase().includes(filter)
  );

  return (
    <Layout>
      <GlobalStyle />
      <h1>Phonebook</h1>
      <AddContactForm addContact={checkName} />

      {contacts.length > 0 && (
        <div>
          <h2>Contacts:</h2>
          <FindContactImput filter={changeFilter} />
          <ContactsList
            contacts={contactsFilter}
            deleteContact={deleteContact}
          />
        </div>
      )}
    </Layout>
  );
};
