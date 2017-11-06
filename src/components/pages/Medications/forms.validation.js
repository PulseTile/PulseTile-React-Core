const validateMedicationsForm = (values) => {
  const errors = {};
  errors.name = !values.name ? 'You must enter a value.' : null;
  errors.doseTiming = !values.doseTiming ? 'You must enter a value.' : null;
  errors.doseDirections = !values.doseDirections ? 'You must enter a value.' : null;

  return errors
};

export { validateMedicationsForm }
