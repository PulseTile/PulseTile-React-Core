import { combineEpics } from 'redux-observable';

import { fetchPatientContactsDetailEpic } from './ducks/fetch-patient-contacts-detail.duck';
import { fetchPatientContactsDetailEditEpic } from './ducks/fetch-patient-contacts-detail-edit.duck';
import { fetchPatientContactsEpic } from './ducks/fetch-patient-contacts.duck';
import { fetchPatientContactsCreateEpic } from './ducks/fetch-patient-contacts-create.duck';

import patientsContacts from './ducks/fetch-patient-contacts.duck'
import patientContactsCreate from './ducks/fetch-patient-contacts-create.duck'
import contactsDetail from './ducks/fetch-patient-contacts-detail.duck'
import contactsDetailEdit from './ducks/fetch-patient-contacts-detail-edit.duck'

const contactsEpic = combineEpics(fetchPatientContactsDetailEpic, fetchPatientContactsDetailEditEpic, fetchPatientContactsEpic, fetchPatientContactsCreateEpic);

const contactsReducer = {
  patientsContacts,
  patientContactsCreate,
  contactsDetail,
  contactsDetailEdit,
};

export { contactsEpic, contactsReducer }
