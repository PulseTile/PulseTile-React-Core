import { valuesNames } from './forms.config';

const validateForm = (values) => {
  const errors = {};
  errors[valuesNames.TYPE] = !values[valuesNames.TYPE] ? 'You must enter a value.' : null;

  if (!values[valuesNames.NOTE] || !values[valuesNames.NOTE][valuesNames.NOTE_TEXT]) {
    errors[valuesNames.NOTE] = 'You must enter a value.';
  } else if (values[valuesNames.NOTE][valuesNames.EDITABLE_EMPTY_FIELDS] !== 0) {
    errors[valuesNames.NOTE] = 'You must enter a value to a statement instead of \'?\' symbol or \'Empty\' value.';
  } else {
   errors[valuesNames.NOTE] = null;
  }

  return errors;
};

export { validateForm }
