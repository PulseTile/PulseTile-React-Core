const validateMedicationsForm = (values) => {
  const errors = {};
  errors.name = !values.name ? 'You must enter a value.' : null;
  errors.doseTiming = !values.doseTiming ? 'You must enter a value.' : null;
  errors.doseDirections = !values.doseDirections ? 'You must enter a value.' : null;

  return errors
};

const validateMedicationsPrescriptionForm = (values) => {
  const errors = {};
  if(!values.route || values.route === '-- Route --') {
    errors.route = 'You must enter a value.'
  } else {
    errors.route = null;
  }

  return errors
};

const validateMedicationsCreateForm = (values) => {
  const errors = {};
  errors.name = !values.name ? 'You must enter a value.' : null;
  errors.doseTiming = !values.doseTiming ? 'You must enter a value.' : null;
  errors.doseAmount = !values.doseAmount ? 'You must enter a value.' : null;
  errors.doseDirections = !values.doseDirections ? 'You must enter a value.' : null;
  if(!values.route || values.route === '-- Route --') {
    errors.route = 'You must enter a value.'
  } else {
    errors.route = null;
  }

  return errors
};

export { validateMedicationsForm, validateMedicationsPrescriptionForm, validateMedicationsCreateForm }
