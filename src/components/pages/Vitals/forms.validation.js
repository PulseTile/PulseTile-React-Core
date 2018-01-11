import { valuesNames } from './forms.config';

const validateHelpers = (values, fieldName, errorMessage) => {
  if (!values[fieldName] || isNaN(Number(values[fieldName]))) {
    return errorMessage
  }
  return null;
};

const validateForm = (values) => {
  const errors = {};
  errors[valuesNames.RESPIRATION_RATE] = validateHelpers(values, valuesNames.RESPIRATION_RATE, 'You must enter a correct value.');
  errors[valuesNames.OXYGEN_SATURATION] = validateHelpers(values, valuesNames.OXYGEN_SATURATION, 'You must enter a correct value from 0 to 100.');
  errors[valuesNames.HEART_RATE] = validateHelpers(values, valuesNames.HEART_RATE, 'You must enter a correct value.');
  errors[valuesNames.SYSTOLIC_BP] = validateHelpers(values, valuesNames.SYSTOLIC_BP, 'You must enter a correct value.');
  errors[valuesNames.DIASTOLIC_BP] = validateHelpers(values, valuesNames.DIASTOLIC_BP, 'You must enter a correct value.');
  errors[valuesNames.TEMPERATURE] = validateHelpers(values, valuesNames.TEMPERATURE, 'You must enter a correct value.');
  errors[valuesNames.AUTHOR] = !values[valuesNames.AUTHOR] ? 'You must enter a correct value.' : null;

  return errors;
};

export { validateForm }
