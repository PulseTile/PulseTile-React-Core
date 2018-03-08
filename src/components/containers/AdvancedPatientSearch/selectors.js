import { getFormValues, getFormMeta, isValid } from 'redux-form';
import { createSelector } from 'reselect';

const formValuesSelector = state => getFormValues('advancedPatientSearchForm')(state);
const formMetaSelector = state => getFormMeta('advancedPatientSearchForm')(state);
const formIsValidSelector = state => isValid('advancedPatientSearchForm')(state);

const formStateSelector = createSelector(
  formValuesSelector,
  formMetaSelector,
  formIsValidSelector,
  (formValues, formMeta, formIsValid) => ({ formValues, formMeta, formIsValid })
)

export default formStateSelector;
