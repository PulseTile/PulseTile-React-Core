import { valuesNames } from './forms.config';

const validateForm = (values) => {
  const errors = {};
  errors[valuesNames.NAME1] = !values[valuesNames.NAME1] ? 'You must enter a value.' : null;
  errors[valuesNames.NAME2] = !values[valuesNames.NAME2] ? 'You must enter a value.' : null;
  errors[valuesNames.NAME3] = !values[valuesNames.NAME3] ? 'You must enter a value.' : null;
  errors[valuesNames.DESCRIPTION1] = !values[valuesNames.DESCRIPTION1] ? 'You must enter a value.' : null;
  errors[valuesNames.DESCRIPTION2] = !values[valuesNames.DESCRIPTION2] ? 'You must enter a value.' : null;
  errors[valuesNames.DESCRIPTION3] = !values[valuesNames.DESCRIPTION3] ? 'You must enter a value.' : null;
  return errors
};

export { validateForm }
