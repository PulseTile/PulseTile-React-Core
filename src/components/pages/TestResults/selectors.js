import { createSelector } from 'reselect';
import _ from 'lodash/fp';

import { operationsOnCollection } from '../../../utils/plugin-helpers.utils';
import { valuesNames } from './forms.config';

const patientTestResultsSelector = createSelector(
  ({ patientsTestResults }) => patientsTestResults,
  (state, props) => _.getOr(null, 'match.params.userId', props),
  (patientsTestResults, userId) => {
    let allTestResults = operationsOnCollection.modificateDateForTable(patientsTestResults[userId], valuesNames.TAKEN);
    allTestResults = operationsOnCollection.modificateDateForTable(allTestResults, valuesNames.DATE);
    return ({ allTestResults, userId });
  }
);

const patientTestResultsDetailSelector = createSelector(
  ({ testResultsDetail }) => testResultsDetail,
  (state, props) => _.getOr(null, 'match.params.userId', props),
  (testResultsDetail, userId) => {
    const testResultDetail = testResultsDetail[userId];
    return ({ testResultDetail, userId });
  }
);

export { patientTestResultsSelector, patientTestResultsDetailSelector }
