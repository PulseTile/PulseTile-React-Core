import { valuesNames } from './forms.config';

const validateForm = (values) => {
  const errors = {};
  errors[valuesNames.NAME] = !values[valuesNames.NAME] ? 'You must enter a value.' : null;
  errors[valuesNames.DATE_TIME] = !values[valuesNames.DATE_TIME] ? 'You must enter a valid date.' : null;
  errors[valuesNames.SERIES_NUMBER] = !values[valuesNames.SERIES_NUMBER] ? 'You must enter a value.' : null;
  errors[valuesNames.COMMENT] = !values[valuesNames.COMMENT] ? 'You must enter a value.' : null;
  if (!values[valuesNames.SERIES_NUMBER]) {
    errors[valuesNames.SERIES_NUMBER] = 'You must enter a value.'
  } else if (isNaN(Number(values[valuesNames.SERIES_NUMBER]))) {
    errors[valuesNames.SERIES_NUMBER] = 'This entry can only contain numbers.'
  } else if (!isNaN(Number(values[valuesNames.SERIES_NUMBER])) && values[valuesNames.SERIES_NUMBER].length > 10) {
    errors[valuesNames.SERIES_NUMBER] = 'This entry should contain a value of 1 to 10 digits'
  } else {
    errors[valuesNames.SERIES_NUMBER] = null;
  }
  return errors
};

export { validateForm }
