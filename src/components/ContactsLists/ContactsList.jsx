import React from 'react';
import { List, Item, Btn, Name } from './ContactsList.styled';
export const ContactsList = ({ contacts, deleteContact }) => {
  return (
    <List>
      {contacts.map(({ name, number, id }) => (
        <Item key={id}>
          <Name>{name}</Name>
          <p>{number}</p>
          <Btn type="button" onClick={() => deleteContact(id)}>
            Delete
          </Btn>
        </Item>
      ))}
    </List>
  );
};
