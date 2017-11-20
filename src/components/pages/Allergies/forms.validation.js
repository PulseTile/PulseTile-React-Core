import { valuesNames } from './forms.config';

const validateAllergiesCreateForm = (values) => {
  const errors = {};
  errors[valuesNames.CAUSE] = !values[valuesNames.CAUSE] ? 'You must enter a value.' : null;
  errors[valuesNames.REACTION] = !values[valuesNames.REACTION] ? 'You must enter a value.' : null;
  errors[valuesNames.TERMINOLOGY] = !values[valuesNames.TERMINOLOGY] ? 'You must enter a value.' : null;
  return errors
};

const validateAllergiesMeta = (values) => {
  const errors = {};
  errors[valuesNames.TERMINOLOGY] = !values[valuesNames.TERMINOLOGY] ? 'You must enter a value.' : null;
  return errors
};

const validateAllergiesPanel = (values) => {
  const errors = {};
  errors[valuesNames.CAUSE] = !values[valuesNames.CAUSE] ? 'You must enter a value.' : null;
  errors[valuesNames.REACTION] = !values[valuesNames.REACTION] ? 'You must enter a value.' : null;
  return errors
};

export { validateAllergiesCreateForm, validateAllergiesMeta, validateAllergiesPanel }
