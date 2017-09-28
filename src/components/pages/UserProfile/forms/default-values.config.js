import { valuesSettingsForm, valuesPersonalForm, valuesContactForm } from './values-names.config';

const defaultPersonalFormValues = {
  [valuesPersonalForm.FIRST_NAME]: 'Bob',
  [valuesPersonalForm.LAST_NAME]: 'Smith',
  [valuesPersonalForm.SELECT_GENDER]: 'female',
  [valuesPersonalForm.DOCTOR]: 'Dr Emma Huston',
};

const defaultContactFormValues = {
  [valuesContactForm.ADDRESS]: '6801 Tellus Street',
  [valuesContactForm.CITY]: 'Westmorland',
  [valuesContactForm.STATE]: 'Westmorland',
  [valuesContactForm.POSTAL_CODE]: 'Box 306',
  [valuesContactForm.PHONE]: '07624 647524',
  [valuesContactForm.EMAIL]: 'bob.smith@gmail.com',
};

export { defaultPersonalFormValues, defaultContactFormValues }
