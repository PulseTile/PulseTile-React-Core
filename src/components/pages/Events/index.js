import { combineEpics } from 'redux-observable';

import { fetchPatientEventsEpic } from './ducks/fetch-patient-events.duck';
import { fetchPatientEventsUpdateEpic } from './ducks/fetch-patient-events.duck';
import { fetchPatientEventsDetailEpic } from './ducks/fetch-patient-events-detail.duck';
import { fetchPatientEventsDetailEditEpic } from './ducks/fetch-patient-events-detail-edit.duck';

import patientsEvents from './ducks/fetch-patient-events.duck'
import eventsDetail from './ducks/fetch-patient-events-detail.duck'
import eventsDetailEdit from './ducks/fetch-patient-events-detail-edit.duck'

const eventsEpic = combineEpics(fetchPatientEventsEpic, fetchPatientEventsUpdateEpic, fetchPatientEventsDetailEpic, fetchPatientEventsDetailEditEpic);

const eventsReducer = {
  patientsEvents,
  eventsDetail,
  eventsDetailEdit,
};

export { eventsEpic, eventsReducer }
