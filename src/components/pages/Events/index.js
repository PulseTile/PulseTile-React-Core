import { combineEpics } from 'redux-observable';

import { fetchPatientEventsEpic } from './ducks/fetch-patient-events.duck';
import { fetchPatientEventsUpdateEpic } from './ducks/fetch-patient-events.duck';

import patientsEvents from './ducks/fetch-patient-events.duck'

const eventsEpic = combineEpics(fetchPatientEventsEpic, fetchPatientEventsUpdateEpic);

const eventsReducer = {
  patientsEvents,
};

export { eventsEpic, eventsReducer }
