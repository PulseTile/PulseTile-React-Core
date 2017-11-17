import { valuesNames } from './forms.config';

const validateForm = (values) => {
  const errors = {};
  errors[valuesNames.NAME] = !values[valuesNames.NAME] ? 'You must enter a value.' : null;
  errors[valuesNames.REALATIONSHIP] = !values[valuesNames.REALATIONSHIP] ? 'You must enter a value.' : null;
  errors[valuesNames.NEXT_OF_KIN] = null;
  errors[valuesNames.REALATIONSHIP_TYPE] = !values[valuesNames.REALATIONSHIP_TYPE] ? 'You must enter a value.' : null;
  errors[valuesNames.CONTACT_INFORMATION] = !values[valuesNames.CONTACT_INFORMATION] ? 'You must enter a value.' : null;
  errors[valuesNames.NOTES] = !values[valuesNames.NOTES] ? 'You must enter a value.' : null;

  return errors
};

export { validateForm }
