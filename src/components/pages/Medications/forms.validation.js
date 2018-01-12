import { valuesNames } from './forms.config';

const validateMedicationsForm = (values) => {
  const errors = {};
  errors[valuesNames.NAME] = !values[valuesNames.NAME] ? 'You must enter a value.' : null;
  errors[valuesNames.DOSE_AMOUNT] = !values[valuesNames.DOSE_AMOUNT] ? 'You must enter a value.' : null;
  errors[valuesNames.DOSE_DIRECTIONS] = !values[valuesNames.DOSE_DIRECTIONS] ? 'You must enter a value.' : null;

  return errors
};

const validateMedicationsPrescriptionForm = (values) => {
  const errors = {};
  if(!values[valuesNames.ROUTE] || values[valuesNames.ROUTE] === '-- Route --') {
    errors[valuesNames.ROUTE] = 'You must enter a value.'
  } else {
    errors[valuesNames.ROUTE] = null;
  }

  return errors
};

const validateMedicationsCreateForm = (values) => {
  const errors = {};
  errors[valuesNames.NAME] = !values[valuesNames.NAME] ? 'You must enter a value.' : null;
  errors[valuesNames.DOSE_TIMING] = !values[valuesNames.DOSE_TIMING] ? 'You must enter a value.' : null;
  errors[valuesNames.DOSE_AMOUNT] = !values[valuesNames.DOSE_AMOUNT] ? 'You must enter a value.' : null;
  errors[valuesNames.DOSE_DIRECTIONS] = !values[valuesNames.DOSE_DIRECTIONS] ? 'You must enter a value.' : null;
  if(!values[valuesNames.ROUTE] || values[valuesNames.ROUTE] === '-- Route --') {
    errors[valuesNames.ROUTE] = 'You must enter a value.'
  } else {
    errors[valuesNames.ROUTE] = null;
  }

  return errors
};

export { validateMedicationsForm, validateMedicationsPrescriptionForm, validateMedicationsCreateForm }
