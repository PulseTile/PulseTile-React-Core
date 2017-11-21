import { valuesNames } from './forms.config';

const validateEventsForm = (values) => {
  const errors = {};
  errors[valuesNames.NAME] = !values[valuesNames.NAME] ? 'You must enter a value.' : null;
  errors[valuesNames.DESCRIPTION] = !values[valuesNames.DESCRIPTION] ? 'You must enter a value.' : null;
  errors[valuesNames.DATE_TIME] = !values[valuesNames.DATE_TIME] ? 'You must enter a valid date.' : null;

  return errors
};

export { validateEventsForm }
