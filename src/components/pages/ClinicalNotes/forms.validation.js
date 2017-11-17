import { valuesNames } from './forms.config';

const validateForm = (values) => {
  const errors = {};
  errors[valuesNames.TYPE] = !values[valuesNames.TYPE] ? 'You must enter a value.' : null;
  errors[valuesNames.NOTE] = !values[valuesNames.NOTE] ? 'You must enter a value.' : null;
  return errors
};

export { validateForm }
