import { combineEpics } from 'redux-observable';

import { fetchPatientEventsEpic } from './ducks/fetch-patient-events.duck';
import { fetchPatientEventsUpdateEpic } from './ducks/fetch-patient-events.duck';
import { fetchPatientEventsDetailEpic } from './ducks/fetch-patient-events-detail.duck';

import patientsEvents from './ducks/fetch-patient-events.duck'
import eventsDetail from './ducks/fetch-patient-events-detail.duck'

const eventsEpic = combineEpics(fetchPatientEventsEpic, fetchPatientEventsUpdateEpic, fetchPatientEventsDetailEpic);

const eventsReducer = {
  patientsEvents,
  eventsDetail,
};

export { eventsEpic, eventsReducer }
