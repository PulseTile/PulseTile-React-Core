const validateAppSettingsForm = (values) => {
  const errors = {};
  errors.title = !values.title ? 'You must enter a value.' : null;
  errors.browserTitle = !values.browserTitle ? 'You must enter a value.' : null;
  return errors
};

const validatePersonalForm = (values) => {
  const errors = {};
  errors.firstname = !values.firstname ? 'You must enter a value.' : null;
  errors.lastname = !values.lastname ? 'You must enter a value.' : null;
  errors.nhs = !values.nhs ? 'You must enter a value.' : null;
  errors.birthday = !values.birthday ? 'You must enter a valid date.' : null;
  errors.doctor = !values.doctor ? 'You must enter a value.' : null;
  return errors
};

const validateContactForm = (values) => {
  const errors = {};
  errors.address = !values.address ? 'You must enter a value.' : null;
  errors.city = !values.city ? 'You must enter a value.' : null;
  errors.state = !values.state ? 'You must enter a value.' : null;
  errors.postalCode = !values.postalCode ? 'You must enter a valid date.' : null;
  errors.phone = !values.phone ? 'You must enter a value.' : null;
  errors.email = !values.email ? 'You must enter a value.' : null;
  return errors
};

export { validateAppSettingsForm, validatePersonalForm, validateContactForm }
