import { valuesNames } from './forms.config';

const validateForm = (values) => {
  const errors = {};
  errors[valuesNames.TYPE] = !values[valuesNames.TYPE] ? 'You must enter a value.' : null;
  errors[valuesNames.NOTE] = (!values[valuesNames.NOTE] || !values[valuesNames.NOTE][`${valuesNames.NOTE_TEXT}Validate`]) ? 'You must enter a value.' : null;

  return errors
};

export { validateForm }
