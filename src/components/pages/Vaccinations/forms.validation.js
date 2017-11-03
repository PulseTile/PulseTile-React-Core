const validateForm = (values) => {
  const errors = {};
  errors.vaccinationName = !values.vaccinationName ? 'You must enter a value.' : null;
  errors.vaccinationDateTime = !values.vaccinationDateTime ? 'You must enter a valid date.' : null;
  errors.series = !values.series ? 'You must enter a value.' : null;
  errors.comment = !values.comment ? 'You must enter a value.' : null;
  if (!values.series) {
    errors.series = 'You must enter a value.'
  } else if (isNaN(Number(values.series))) {
    errors.series = 'This entry can only contain numbers.'
  } else if (!isNaN(Number(values.series)) && values.series.length > 10) {
    errors.series = 'This entry should contain a value of 1 to 10 digits'
  } else {
    errors.series = null;
  }
  return errors
};

export { validateForm }
