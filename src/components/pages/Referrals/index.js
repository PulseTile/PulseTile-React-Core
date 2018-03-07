import { combineEpics } from 'redux-observable';

import asyncComponent from '../../../components/containers/AsyncComponent/AsyncComponent';
import { clientUrls } from '../../../config/client-urls.constants';

import { fetchPatientReferralsDetailEpic } from './ducks/fetch-patient-referrals-detail.duck';
import { fetchPatientReferralsDetailEditEpic } from './ducks/fetch-patient-referrals-detail-edit.duck';
import { fetchPatientReferralsEpic } from './ducks/fetch-patient-referrals.duck';
import { fetchPatientReferralsUpdateEpic } from './ducks/fetch-patient-referrals.duck';
import { fetchPatientReferralsCreateEpic } from './ducks/fetch-patient-referrals-create.duck';

import patientsReferrals from './ducks/fetch-patient-referrals.duck';
import patientReferralsCreate from './ducks/fetch-patient-referrals-create.duck';
import referralsDetail from './ducks/fetch-patient-referrals-detail.duck';
import referralsDetailEdit from './ducks/fetch-patient-referrals-detail-edit.duck';

const epics = combineEpics(fetchPatientReferralsDetailEpic, fetchPatientReferralsDetailEditEpic, fetchPatientReferralsEpic, fetchPatientReferralsCreateEpic, fetchPatientReferralsUpdateEpic);
const Referrals = asyncComponent(() => import(/* webpackChunkName: "referrals" */ './Referrals').then(module => module.default));

const reducers = {
  patientsReferrals,
  patientReferralsCreate,
  referralsDetail,
  referralsDetailEdit,
};

const sidebarConfig = { key: 'referrals', pathToTransition: '/referrals', name: 'Referrals', isVisible: true };

const routers = [
  { key: 'referrals', component: Referrals, path: `${clientUrls.PATIENTS}/:userId/${clientUrls.REFERRALS}` },
  { key: 'referralsCreate', component: Referrals, path: `${clientUrls.PATIENTS}/:userId/${clientUrls.REFERRALS}/create` },
  { key: 'referralsDetail', component: Referrals, path: `${clientUrls.PATIENTS}/:userId/${clientUrls.REFERRALS}/:sourceId` },
];

export default {
  component: Referrals,
  epics, reducers, sidebarConfig, routers,
}

