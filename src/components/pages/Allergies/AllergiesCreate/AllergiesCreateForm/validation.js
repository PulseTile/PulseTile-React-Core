const validateAllergiesCreateForm = (values) => {
  const errors = {};
  errors.cause = !values.cause ? 'You must enter a value.' : null;
  return errors
};

export { validateAllergiesCreateForm }
