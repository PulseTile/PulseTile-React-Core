import { combineEpics } from 'redux-observable';

import { fetchPatientDiagnosesEpic } from './ducks/fetch-patient-diagnoses.duck';
import { fetchPatientDiagnosesDetailEpic } from './ducks/fetch-patient-diagnoses-detail.duck';
import { fetchPatientDiagnosesDetailEditEpic } from './ducks/fetch-patient-diagnoses-detail-edit.duck';

import patientsDiagnoses from './ducks/fetch-patient-diagnoses.duck'
import diagnosesDetail from './ducks/fetch-patient-diagnoses-detail.duck'
import diagnosesDetailEdit from './ducks/fetch-patient-diagnoses-detail-edit.duck'

const diagnosesEpic = combineEpics(fetchPatientDiagnosesEpic, fetchPatientDiagnosesDetailEpic, fetchPatientDiagnosesDetailEditEpic);

const diagnosesReducer = {
  patientsDiagnoses,
  diagnosesDetail,
  diagnosesDetailEdit
};

export { diagnosesEpic, diagnosesReducer }
