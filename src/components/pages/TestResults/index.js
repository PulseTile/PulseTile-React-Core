import { combineEpics } from 'redux-observable';

import { fetchPatientTestResultsDetailEpic } from './ducks/fetch-patient-test-results-detail.duck';
import { fetchPatientTestResultsEpic } from './ducks/fetch-patient-test-results.duck';

import patientsTestResults from './ducks/fetch-patient-test-results.duck'
import testResultsDetail from './ducks/fetch-patient-test-results-detail.duck'

const testResultsEpic = combineEpics(fetchPatientTestResultsDetailEpic, fetchPatientTestResultsEpic);

const testResultsReducer = {
  patientsTestResults,
  testResultsDetail
};

export { testResultsEpic, testResultsReducer }
