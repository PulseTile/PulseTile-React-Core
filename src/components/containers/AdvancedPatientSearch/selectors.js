import _ from 'lodash/fp';
import { createSelector } from 'reselect';

const advancedPatientSearchFormSelector = _.getOr({}, 'form.advancedPatientSearchForm')

const formStateSelector = createSelector(advancedPatientSearchFormSelector,
  formState => ({ formState }));

export default formStateSelector;
