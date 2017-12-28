import { valuesNames } from './forms.config';

const validateForm = (values) => {
  const errors = {};
  errors[valuesNames.NAME] = !values[valuesNames.NAME] ? 'You must enter a value.' : null;
  errors[valuesNames.DATE_OF_PROCEDURE] = !values[valuesNames.DATE_OF_PROCEDURE] ? 'You must enter a value.' : null;
  errors[valuesNames.PERFORMER] = !values[valuesNames.PERFORMER] ? 'You must enter a value.' : null;
  errors[valuesNames.NOTES] = !values[valuesNames.NOTES] ? 'You must enter a value.' : null;
  errors[valuesNames.TERMINOLOGY] = !values[valuesNames.TERMINOLOGY] ? 'You must enter a value.' : null;
  errors[valuesNames.CODE] = !values[valuesNames.CODE] ? 'You must enter a value.' : null;

  return errors
};

export { validateForm }
