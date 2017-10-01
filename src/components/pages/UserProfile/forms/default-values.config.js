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

const defaultAppSettingsFormValues = {
  [valuesSettingsForm.APP_TITLE]: 'should be fetched from server',
  [valuesSettingsForm.LOGO_PATH]: 'should be fetched from server',
  [valuesSettingsForm.SELECT_THEME]: 'themeDefault',
  [valuesSettingsForm.BROWSER_TITLE]: 'should be fetched from server',
};

export { defaultPersonalFormValues, defaultContactFormValues, defaultAppSettingsFormValues }
