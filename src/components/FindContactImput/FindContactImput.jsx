import React from 'react';

import { Input, TitleForLabel, Lab } from './FindContactImput.styled';
export const FindContactImput = ({ filter }) => {
  return (
    <Lab>
      <TitleForLabel>Find contacts by Name</TitleForLabel>
      <Input type="text" onChange={filter} />
    </Lab>
  );
};
