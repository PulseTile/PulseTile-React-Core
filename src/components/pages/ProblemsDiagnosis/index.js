import { combineEpics } from 'redux-observable';

import ProblemsDiagnosis from "./ProblemsDiagnosis";
import {clientUrls} from "../../../config/client-urls.constants";

import { fetchPatientDiagnosesEpic } from './ducks/fetch-patient-diagnoses.duck';
import { fetchPatientDiagnosesUpdateEpic } from './ducks/fetch-patient-diagnoses.duck';
import { fetchPatientDiagnosesDetailEpic } from './ducks/fetch-patient-diagnoses-detail.duck';
import { fetchPatientDiagnosesDetailEditEpic } from './ducks/fetch-patient-diagnoses-detail-edit.duck';
import { fetchPatientDiagnosesCreateEpic } from './ducks/fetch-patient-diagnoses-create.duck';

import patientsDiagnoses from './ducks/fetch-patient-diagnoses.duck'
import diagnosesDetail from './ducks/fetch-patient-diagnoses-detail.duck'
import diagnosesDetailEdit from './ducks/fetch-patient-diagnoses-detail-edit.duck'
import patientDiagnosesCreate from './ducks/fetch-patient-diagnoses-create.duck'

const epics = combineEpics(fetchPatientDiagnosesEpic, fetchPatientDiagnosesDetailEpic, fetchPatientDiagnosesDetailEditEpic, fetchPatientDiagnosesCreateEpic, fetchPatientDiagnosesUpdateEpic);

const reducers = {
  patientsDiagnoses,
  diagnosesDetail,
  diagnosesDetailEdit,
  patientDiagnosesCreate,
};

const sidebarConfig = { key: 'diagnoses', pathToTransition: '/diagnoses', name: 'Problems / Diagnosis', isVisible: true },;

const routers = [
  { key: 'problems', component: ProblemsDiagnosis, path: `${clientUrls.PATIENTS}/:userId/${clientUrls.DIAGNOSES}` },
  { key: 'problemsCreate', component: ProblemsDiagnosis, path: `${clientUrls.PATIENTS}/:userId/${clientUrls.DIAGNOSES}/create` },
  { key: 'problemsDetail', component: ProblemsDiagnosis, path: `${clientUrls.PATIENTS}/:userId/${clientUrls.DIAGNOSES}/:sourceId` },
];

export default {
  component: ProblemsDiagnosis,
  epics, reducers, sidebarConfig, routers,
}