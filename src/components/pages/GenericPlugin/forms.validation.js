const validateForm = (values) => {
  const errors = {};
  errors.clinicalNotesType = !values.clinicalNotesType ? 'You must enter a value.' : null;
  errors.note = !values.note ? 'You must enter a value.' : null;
  return errors
};

export { validateForm }
