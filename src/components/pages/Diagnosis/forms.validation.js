import { valuesNames } from './forms.config';

const validateForm = (values) => {
  const errors = {};
  errors[valuesNames.PROBLEM] = !values[valuesNames.PROBLEM] ? 'You must enter a value.' : null;
  errors[valuesNames.DESCRIPTION] = !values[valuesNames.DESCRIPTION] ? 'You must enter a value.' : null;
  errors[valuesNames.DATE_OF_ONSET] = !values[valuesNames.DATE_OF_ONSET] ? 'You must enter a valid date.' : null;
  return errors
};

export { validateForm }
