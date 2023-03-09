import React from 'react';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import { object, string } from 'yup';
import { nanoid } from 'nanoid';
import {
  FormSection,
  Input,
  Btn,
  TitleForForm,
  ErrorM,
} from './AddContact.styled';

const userSchema = object({
  name: string().required(),
  number: string().required().min(5).max(20),
});

export const AddContactForm = ({ addContact }) => {
  return (
    <Formik
      initialValues={{ name: '', number: '' }}
      onSubmit={(values, { resetForm }) => {
        addContact({
          ...values,
          id: nanoid(),
        });
        resetForm();
      }}
      validationSchema={userSchema}
    >
      <FormSection>
        <TitleForForm>Name</TitleForForm>
        <Input
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
        <ErrorM name="name" component="div" />
        <TitleForForm>Number</TitleForForm>
        <Input
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
        <ErrorM name="number" component="div" />
        <Btn type="submit">Add contact</Btn>
      </FormSection>
    </Formik>
  );
};

AddContactForm.propTypes = {
  addContact: PropTypes.func.isRequired,
};
