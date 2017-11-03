const validateForm = (values) => {
  const errors = {};
  errors.problem = !values.problem ? 'You must enter a value.' : null;
  errors.description = !values.description ? 'You must enter a value.' : null;
  errors.terminology = !values.terminology ? 'You must enter a value.' : null;
  errors.dateOfOnset = !values.dateOfOnset ? 'You must enter a valid date.' : null;
  return errors
};

export { validateForm }
