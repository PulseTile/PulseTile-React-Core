import { combineEpics } from 'redux-observable';

import { fetchPatientEventsDetailEpic } from './ducks/fetch-patient-events-detail.duck';
import { fetchPatientEventsDetailEditEpic } from './ducks/fetch-patient-events-detail-edit.duck';
import { fetchPatientEventsEpic } from './ducks/fetch-patient-events.duck';
import { fetchPatientEventsUpdateEpic } from './ducks/fetch-patient-events.duck';
import { fetchPatientEventsCreateEpic } from './ducks/fetch-patient-events-create.duck';

import patientsEvents from './ducks/fetch-patient-events.duck'
import patientEventsCreate from './ducks/fetch-patient-events-create.duck'
import eventsDetail from './ducks/fetch-patient-events-detail.duck'
import eventsDetailEdit from './ducks/fetch-patient-events-detail-edit.duck'

const eventsEpic = combineEpics(fetchPatientEventsDetailEpic, fetchPatientEventsDetailEditEpic, fetchPatientEventsEpic, fetchPatientEventsCreateEpic, fetchPatientEventsUpdateEpic);

const eventsReducer = {
  patientsEvents,
  patientEventsCreate,
  eventsDetail,
  eventsDetailEdit,
};

export { eventsEpic, eventsReducer }
