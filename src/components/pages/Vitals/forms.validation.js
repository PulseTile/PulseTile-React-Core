import { valuesNames } from './forms.config';

const validateForm = (values) => {
  const errors = {};
  errors[valuesNames.AUTHOR] = !values[valuesNames.AUTHOR] ? 'You must enter a value.' : null;

  return errors
};

export { validateForm }
