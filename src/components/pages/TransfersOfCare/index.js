import { combineEpics } from 'redux-observable';

import { fetchPatientTransfersOfCareDetailEpic } from './ducks/fetch-patient-transfers-of-care-detail.duck';
import { fetchPatientTransfersOfCareDetailEditEpic } from './ducks/fetch-patient-transfers-of-care-detail-edit.duck';
import { fetchPatientTransfersOfCareEpic } from './ducks/fetch-patient-transfers-of-care.duck';
import { fetchPatientTransfersOfCareUpdateEpic } from './ducks/fetch-patient-transfers-of-care.duck';
import { fetchPatientTransfersOfCareCreateEpic } from './ducks/fetch-patient-transfers-of-care-create.duck';

import patientsTransfersOfCare from './ducks/fetch-patient-transfers-of-care.duck'
import patientTransfersOfCareCreate from './ducks/fetch-patient-transfers-of-care-create.duck'
import transfersOfCareDetail from './ducks/fetch-patient-transfers-of-care-detail.duck'
import transfersOfCareDetailEdit from './ducks/fetch-patient-transfers-of-care-detail-edit.duck'

const transfersOfCareEpic = combineEpics(fetchPatientTransfersOfCareDetailEpic, fetchPatientTransfersOfCareDetailEditEpic, fetchPatientTransfersOfCareEpic, fetchPatientTransfersOfCareCreateEpic, fetchPatientTransfersOfCareUpdateEpic);

const transfersOfCareReducer = {
  patientsTransfersOfCare,
  patientTransfersOfCareCreate,
  transfersOfCareDetail,
  transfersOfCareDetailEdit,
};

export { transfersOfCareEpic, transfersOfCareReducer }
