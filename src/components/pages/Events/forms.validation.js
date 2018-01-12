import { valuesNames } from './forms.config';

const validateEventsForm = (values, props) => {
  const errors = {};
  errors[valuesNames.NAME] = !values[valuesNames.NAME] ? 'You must enter a value.' : null;
  errors[valuesNames.DESCRIPTION] = !values[valuesNames.DESCRIPTION] ? 'You must enter a value.' : null;
  errors[valuesNames.DATE_TIME] = !values[valuesNames.DATE_TIME] ? 'You must enter a valid date.' : null;
  if (props.eventsType === 'Discharge') {
    errors[valuesNames.CONNECTION] = (!values[valuesNames.CONNECTION] || values[valuesNames.CONNECTION] === '-- Select --') ? 'You must enter a value.' : null;
    errors[valuesNames.DETAILS] = (!values[valuesNames.DETAILS] || values[valuesNames.DETAILS] === '-- Select --') ? 'You must enter a value.' : null;
  }
  return errors
};

export { validateEventsForm }
