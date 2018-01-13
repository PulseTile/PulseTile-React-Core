import _ from 'lodash/fp';
import { createSelector } from 'reselect';

import { patientAgeRangesForClinicalSearch } from '../../../config/patients.constants';

export const patientsByAgesSelector = ({ clinicalQuerySearch }) => patientAgeRangesForClinicalSearch.map(ageRange => _.filter(ageRange.predicate)(clinicalQuerySearch));
const clinicalQuerySearchDataSelector = ({ clinicalQuerySearch }) => clinicalQuerySearch;

const patientsSelector = createSelector(
  patientsByAgesSelector,
  patientsByAge => ({ patientsByAge })
);

const clinicalQuerySearchSelector = createSelector(
  clinicalQuerySearchDataSelector,
  clinicalQuerySearch => ({ clinicalQuerySearch })
);

export { patientsSelector, clinicalQuerySearchSelector };
