const validateAllergiesCreateForm = (values) => {
  const errors = {};
  errors.cause = !values.cause ? 'You must enter a value.' : null;
  errors.reaction = !values.reaction ? 'You must enter a value.' : null;
  errors.causeTerminology = !values.causeTerminology ? 'You must enter a value.' : null;
  return errors
};

const validateAllergiesMeta = (values) => {
  const errors = {};
  errors.causeTerminology = !values.causeTerminology ? 'You must enter a value.' : null;
  return errors
};

const validateAllergiesPanel = (values) => {
  const errors = {};
  errors.cause = !values.cause ? 'You must enter a value.' : null;
  errors.reaction = !values.reaction ? 'You must enter a value.' : null;
  return errors
};

export { validateAllergiesCreateForm, validateAllergiesMeta, validateAllergiesPanel }
