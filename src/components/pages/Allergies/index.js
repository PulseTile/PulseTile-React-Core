import { combineEpics } from 'redux-observable';

import { fetchPatientAllergiesDetailEpic } from './ducks/fetch-patient-allergies-detail.duck';
import { fetchPatientAllergiesDetailEditEpic } from './ducks/fetch-patient-allergies-detail-edit.duck';
import { fetchPatientAllergiesEpic } from './ducks/fetch-patient-allergies.duck';
import { fetchPatientAllergiesUpdateEpic } from './ducks/fetch-patient-allergies.duck';
import { fetchPatientAllergiesCreateEpic } from './ducks/fetch-patient-allergies-create.duck';

import patientsAllergies from './ducks/fetch-patient-allergies.duck'
import patientAllergiesCreate from './ducks/fetch-patient-allergies-create.duck'
import allergiesDetail from './ducks/fetch-patient-allergies-detail.duck'
import allergiesDetailEdit from './ducks/fetch-patient-allergies-detail-edit.duck'

const allergiesEpic = combineEpics(fetchPatientAllergiesDetailEpic, fetchPatientAllergiesDetailEditEpic, fetchPatientAllergiesEpic, fetchPatientAllergiesCreateEpic, fetchPatientAllergiesUpdateEpic);

const allergiesReducer = {
  patientsAllergies,
  patientAllergiesCreate,
  allergiesDetail,
  allergiesDetailEdit,
};

export { allergiesEpic, allergiesReducer }
