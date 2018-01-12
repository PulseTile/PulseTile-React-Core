import { createSelector } from 'reselect';
import _ from 'lodash/fp';

const patientTestResultsSelector = createSelector(
  ({ patientsTestResults }) => patientsTestResults,
  (state, props) => _.getOr(null, 'match.params.userId', props),
  (patientsTestResults, userId) => {
    const allTestResults = patientsTestResults[userId];
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
