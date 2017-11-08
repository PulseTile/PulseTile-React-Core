const validateForm = (values) => {
  const errors = {};
  errors.type = !values.type ? 'You must enter a value.' : null;
  errors.note = !values.note ? 'You must enter a value.' : null;
  return errors
};

export { validateForm }
