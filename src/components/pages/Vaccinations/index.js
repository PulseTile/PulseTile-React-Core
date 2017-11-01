import { combineEpics } from 'redux-observable';

import { fetchPatientVaccinationsEpic } from './ducks/fetch-patient-vaccinations.duck';
import { fetchPatientVaccinationsDetailEpic } from './ducks/fetch-patient-vaccinations-detail.duck';
import { fetchPatientVaccinationsDetailEditEpic } from './ducks/fetch-patient-vaccinations-detail-edit.duck';
import { fetchPatientVaccinationsCreateEpic } from './ducks/fetch-patient-vaccinations-create.duck';

import patientsVaccinations from './ducks/fetch-patient-vaccinations.duck'
import vaccinationsDetail from './ducks/fetch-patient-vaccinations-detail.duck'
import vaccinationsDetailEdit from './ducks/fetch-patient-vaccinations-detail-edit.duck'
import patientVaccinationsCreate from './ducks/fetch-patient-vaccinations-create.duck'

const vaccinationsEpic = combineEpics(fetchPatientVaccinationsEpic, fetchPatientVaccinationsDetailEpic, fetchPatientVaccinationsDetailEditEpic, fetchPatientVaccinationsCreateEpic);

const vaccinationsReducer = {
  patientsVaccinations,
  vaccinationsDetail,
  vaccinationsDetailEdit,
  patientVaccinationsCreate,
};

export { vaccinationsEpic, vaccinationsReducer }
