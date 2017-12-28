import { valuesNames } from './forms.config';

const validateForm = (values) => {
  const errors = {};
  errors[valuesNames.FROM] = !values[valuesNames.FROM] ? 'You must enter a value.' : null;
  errors[valuesNames.TO] = !values[valuesNames.TO] ? 'You must enter a value.' : null;
  errors[valuesNames.DATE] = !values[valuesNames.DATE] ? 'You must enter a value.' : null;
  errors[valuesNames.REASON] = !values[valuesNames.REASON] ? 'You must enter a value.' : null;
  errors[valuesNames.SUMMARY] = !values[valuesNames.SUMMARY] ? 'You must enter a value.' : null;
  errors[valuesNames.AUTHOR] = !values[valuesNames.AUTHOR] ? 'You must enter a value.' : null;

  return errors
};

export { validateForm }
