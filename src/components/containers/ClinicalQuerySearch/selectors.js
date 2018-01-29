import { getFormValues, getFormMeta, isValid } from 'redux-form'
import { createSelector } from 'reselect';

const formValuesSelector = state => getFormValues('clinicalQuerySearchForm')(state);
const formMetaSelector = state => getFormMeta('clinicalQuerySearchForm')(state);
const formIsValidSelector = state => isValid('clinicalQuerySearchForm')(state);

const formStateSelector = createSelector(
  formValuesSelector,
  formMetaSelector,
  formIsValidSelector,
  (formValues, formMeta, formIsValid) => ({ formValues, formMeta, formIsValid })
);

export default formStateSelector;
