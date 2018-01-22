import { valuesNames } from './forms.config';

const validateForm = (values) => {
  const errors = {};
  errors[valuesNames.FROM] = !values[valuesNames.FROM] ? 'You must enter a value.' : null;
  errors[valuesNames.TO] = !values[valuesNames.TO] ? 'You must enter a value.' : null;

  return errors
};

export { validateForm }
