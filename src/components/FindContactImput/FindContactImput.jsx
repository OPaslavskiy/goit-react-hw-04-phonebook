import React from 'react';
import PropTypes from 'prop-types';
import { Input, TitleForLabel, Lab } from './FindContactImput.styled';
export const FindContactForm = ({ filter }) => {
  return (
    <Lab>
      <TitleForLabel>Find contacts by Name</TitleForLabel>
      <Input type="text" onChange={filter} />
    </Lab>
  );
};

FindContactForm.propTypes = {
  filter: PropTypes.func.isRequired,
};
