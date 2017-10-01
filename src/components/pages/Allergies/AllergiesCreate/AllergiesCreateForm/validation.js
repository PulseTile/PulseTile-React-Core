const validateAllergiesCreateForm = (values) => {
  const errors = {};
  errors.cause = !values.cause ? 'You must enter a value.' : null;
  errors.reaction = !values.reaction ? 'You must enter a value.' : null;
  errors.causeTerminology = !values.causeTerminology ? 'You must enter a value.' : null;
  return errors
};

export { validateAllergiesCreateForm }
