import { valuesNames } from './forms.config';

const validateForm = (values) => {
  const errors = {};
  errors[valuesNames.TEAM] = !values[valuesNames.TEAM] ? 'You must enter a value.' : null;
  errors[valuesNames.QUESTION] = !values[valuesNames.QUESTION] ? 'You must enter a value.' : null;
  errors[valuesNames.NOTES] = !values[valuesNames.NOTES] ? 'You must enter a value.' : null;
  errors[valuesNames.DATE_OF_REQUEST] = !values[valuesNames.DATE_OF_REQUEST] ? 'You must enter a value.' : null;
  errors[valuesNames.DATE_OF_MEETING] = !values[valuesNames.DATE_OF_MEETING] ? 'You must enter a value.' : null;
  return errors
};

export { validateForm }
