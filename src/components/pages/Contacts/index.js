import { combineEpics } from 'redux-observable';

import asyncComponent from '../../../components/containers/AsyncComponent/AsyncComponent';
import { clientUrls } from '../../../config/client-urls.constants';

import { fetchPatientContactsDetailEpic } from './ducks/fetch-patient-contacts-detail.duck';
import { fetchPatientContactsDetailEditEpic } from './ducks/fetch-patient-contacts-detail-edit.duck';
import { fetchPatientContactsEpic } from './ducks/fetch-patient-contacts.duck';
import { fetchPatientContactsUpdateEpic } from './ducks/fetch-patient-contacts.duck';
import { fetchPatientContactsCreateEpic } from './ducks/fetch-patient-contacts-create.duck';

import patientsContacts from './ducks/fetch-patient-contacts.duck';
import patientContactsCreate from './ducks/fetch-patient-contacts-create.duck';
import contactsDetail from './ducks/fetch-patient-contacts-detail.duck';
import contactsDetailEdit from './ducks/fetch-patient-contacts-detail-edit.duck';

const epics = combineEpics(fetchPatientContactsDetailEpic, fetchPatientContactsDetailEditEpic, fetchPatientContactsEpic, fetchPatientContactsCreateEpic, fetchPatientContactsUpdateEpic);
const Contacts = asyncComponent(() => import(/* webpackChunkName: "contacts" */ './Contacts').then(module => module.default));

const reducers = {
  patientsContacts,
  patientContactsCreate,
  contactsDetail,
  contactsDetailEdit,
};

const sidebarConfig = { key: 'contacts', pathToTransition: '/contacts', name: 'Contacts', isVisible: true };

const routers = [
  { key: 'contacts', component: Contacts, path: `${clientUrls.PATIENTS}/:userId/${clientUrls.CONTACTS}` },
  { key: 'contactsCreate', component: Contacts, path: `${clientUrls.PATIENTS}/:userId/${clientUrls.CONTACTS}/create` },
  { key: 'contactsDetail', component: Contacts, path: `${clientUrls.PATIENTS}/:userId/${clientUrls.CONTACTS}/:sourceId` },
];

export default {
  component: Contacts,
  epics, reducers, sidebarConfig, routers,
}
