import { valuesNames } from './forms.config';

const validateForm = (values) => {
  const errors = {};
  errors[valuesNames.TYPE] = !values[valuesNames.TYPE] ? 'You must enter a value.' : null;
  errors[valuesNames.NOTES] = !values[valuesNames.NOTES] ? 'You must enter a value.' : null;
  return errors
};

export { validateForm }
