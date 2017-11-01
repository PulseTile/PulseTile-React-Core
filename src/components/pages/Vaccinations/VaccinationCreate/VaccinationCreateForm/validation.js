const validateVaccinationPanelForm = (values) => {
  const errors = {};
  errors.vaccinationName = !values.vaccinationName ? 'You must enter a value.' : null;
  errors.vaccinationDateTime = !values.vaccinationDateTime ? 'You must enter a value.' : null;
  errors.series = !values.series ? 'You must enter a value.' : null;
  errors.comment = !values.comment ? 'You must enter a valid date.' : null;
  return errors
};

export { validateVaccinationPanelForm }
