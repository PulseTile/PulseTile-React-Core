import { getFormValues, isValid } from 'redux-form'
import { createSelector } from 'reselect';

const formValuesSelector = (state) => {
  const values = getFormValues('advancedPatientSearchForm')(state);
  return values;
}
const formIsValidSelector = state => isValid('advancedPatientSearchForm')(state);

const formStateSelector = createSelector(
  formValuesSelector,
  formIsValidSelector,
  (formValues, formIsValid) => ({ formValues, formIsValid })
)

export default formStateSelector;
