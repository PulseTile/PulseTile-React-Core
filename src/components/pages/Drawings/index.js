import { combineEpics } from 'redux-observable';

import { fetchPatientDrawingsDetailEpic } from './ducks/fetch-patient-drawings-detail.duck';
import { fetchPatientDrawingsDetailEditEpic } from './ducks/fetch-patient-drawings-detail-edit.duck';
import { fetchPatientDrawingsEpic } from './ducks/fetch-patient-drawings.duck';
import { fetchPatientDrawingsUpdateEpic } from './ducks/fetch-patient-drawings.duck';
import { fetchPatientDrawingsCreateEpic } from './ducks/fetch-patient-drawings-create.duck';

import patientsDrawings from './ducks/fetch-patient-drawings.duck'
import patientDrawingsCreate from './ducks/fetch-patient-drawings-create.duck'
import drawingsDetail from './ducks/fetch-patient-drawings-detail.duck'
import drawingsDetailEdit from './ducks/fetch-patient-drawings-detail-edit.duck'

const drawingsEpic = combineEpics(fetchPatientDrawingsDetailEpic, fetchPatientDrawingsDetailEditEpic, fetchPatientDrawingsEpic, fetchPatientDrawingsCreateEpic, fetchPatientDrawingsUpdateEpic);

const drawingsReducer = {
  patientsDrawings,
  patientDrawingsCreate,
  drawingsDetail,
  drawingsDetailEdit,
};

export { drawingsEpic, drawingsReducer }
