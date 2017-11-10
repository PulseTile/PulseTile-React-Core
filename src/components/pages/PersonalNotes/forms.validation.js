const validateForm = (values) => {
  const errors = {};
  errors.noteType = !values.noteType ? 'You must enter a value.' : null;
  errors.notes = !values.notes ? 'You must enter a value.' : null;
  return errors
};

export { validateForm }
