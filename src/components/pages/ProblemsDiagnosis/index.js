import { combineEpics } from 'redux-observable';

import { fetchPatientDiagnosesEpic } from './ducks/fetch-patient-diagnoses.duck';
import { fetchPatientDiagnosesUpdateEpic } from './ducks/fetch-patient-diagnoses.duck';
import { fetchPatientDiagnosesDetailEpic } from './ducks/fetch-patient-diagnoses-detail.duck';
import { fetchPatientDiagnosesDetailEditEpic } from './ducks/fetch-patient-diagnoses-detail-edit.duck';
import { fetchPatientDiagnosesCreateEpic } from './ducks/fetch-patient-diagnoses-create.duck';

import patientsDiagnoses from './ducks/fetch-patient-diagnoses.duck'
import diagnosesDetail from './ducks/fetch-patient-diagnoses-detail.duck'
import diagnosesDetailEdit from './ducks/fetch-patient-diagnoses-detail-edit.duck'
import patientDiagnosesCreate from './ducks/fetch-patient-diagnoses-create.duck'

const diagnosesEpic = combineEpics(fetchPatientDiagnosesEpic, fetchPatientDiagnosesDetailEpic, fetchPatientDiagnosesDetailEditEpic, fetchPatientDiagnosesCreateEpic, fetchPatientDiagnosesUpdateEpic);

const diagnosesReducer = {
  patientsDiagnoses,
  diagnosesDetail,
  diagnosesDetailEdit,
  patientDiagnosesCreate,
};

export { diagnosesEpic, diagnosesReducer }
