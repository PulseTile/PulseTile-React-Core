import { combineEpics } from 'redux-observable';

import Events from "./Events";
import {clientUrls} from "../../../config/client-urls.constants";

import { fetchPatientEventsDetailEpic } from './ducks/fetch-patient-events-detail.duck';
import { fetchPatientEventsDetailEditEpic } from './ducks/fetch-patient-events-detail-edit.duck';
import { fetchPatientEventsEpic } from './ducks/fetch-patient-events.duck';
import { fetchPatientEventsUpdateEpic } from './ducks/fetch-patient-events.duck';
import { fetchPatientEventsCreateEpic } from './ducks/fetch-patient-events-create.duck';

import patientsEvents from './ducks/fetch-patient-events.duck'
import patientEventsCreate from './ducks/fetch-patient-events-create.duck'
import eventsDetail from './ducks/fetch-patient-events-detail.duck'
import eventsDetailEdit from './ducks/fetch-patient-events-detail-edit.duck'

const epics = combineEpics(fetchPatientEventsDetailEpic, fetchPatientEventsDetailEditEpic, fetchPatientEventsEpic, fetchPatientEventsCreateEpic, fetchPatientEventsUpdateEpic);

const reducers = {
  patientsEvents,
  patientEventsCreate,
  eventsDetail,
  eventsDetailEdit,
};

const sidebarConfig = { key: 'events', pathToTransition: '/events', name: 'Events', isVisible: false };

const routers = [
  { key: 'events', component: Events, path: `${clientUrls.PATIENTS}/:userId/${clientUrls.EVENTS}` },
  { key: 'eventsCreate', component: Events, path: `${clientUrls.PATIENTS}/:userId/${clientUrls.EVENTS}/create` },
  { key: 'eventsDetail', component: Events, path: `${clientUrls.PATIENTS}/:userId/${clientUrls.EVENTS}/:sourceId` },
];

export default {
  component: Events,
  epics, reducers, sidebarConfig, routers,
}
