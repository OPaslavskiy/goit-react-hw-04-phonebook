import React from 'react';
import PropTypes from 'prop-types';
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

ContactsList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  deleteContact: PropTypes.func.isRequired,
};
