import { getFormValues, isValid } from 'redux-form'
import { createSelector } from 'reselect';

const formValuesSelector = state => getFormValues('advancedPatientSearchForm')(state);
const formIsValidSelector = state => isValid('advancedPatientSearchForm')(state);

const formStateSelector = createSelector(
  formValuesSelector,
  formIsValidSelector,
  (formValues, formIsValid) => ({ formValues, formIsValid })
)

export default formStateSelector;
