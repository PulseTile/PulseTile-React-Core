const validateContactsForm = (values) => {
  const errors = {};
	errors.name = !values.name ? "You must enter a value." : null;
	errors.relationship = !values.relationship ? "You must enter a value." : null;
	errors.nextOfKin = null;
	errors.relationshipType = !values.relationshipType ? "You must enter a value." : null;
	errors.contactInformation = !values.contactInformation ? "You must enter a value." : null;
	errors.notes = !values.notes ? "You must enter a value." : null;

  return errors
};

export { validateContactsForm }
