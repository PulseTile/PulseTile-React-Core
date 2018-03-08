import { combineEpics } from 'redux-observable';

import asyncComponent from '../../../components/containers/AsyncComponent/AsyncComponent';
import { clientUrls } from '../../../config/client-urls.constants';

import { fetchPatientTopThreeThingsEpic } from './ducks/fetch-patient-top-three-things.duck';
import { fetchPatientTopThreeThingsUpdateEpic } from './ducks/fetch-patient-top-three-things.duck';
import { fetchPatientTopThreeThingsDetailEpic } from './ducks/fetch-patient-top-three-things-detail.duck';
import { fetchPatientTopThreeThingsDetailEditEpic } from './ducks/fetch-patient-top-three-things-detail-edit.duck';

import patientsTopThreeThings from './ducks/fetch-patient-top-three-things.duck';
import topThreeThingsDetail from './ducks/fetch-patient-top-three-things-detail.duck';
import topThreeThingsDetailEdit from './ducks/fetch-patient-top-three-things-detail-edit.duck';

const epics = combineEpics(fetchPatientTopThreeThingsEpic, fetchPatientTopThreeThingsDetailEpic, fetchPatientTopThreeThingsDetailEditEpic, fetchPatientTopThreeThingsUpdateEpic);
const TopThreeThings = asyncComponent(() => import(/* webpackChunkName: "topThreeThings" */ './TopThreeThings').then(module => module.default));

const reducers = {
  patientsTopThreeThings,
  topThreeThingsDetail,
  topThreeThingsDetailEdit,
};

const sidebarConfig = { key: 'topThreeThings', pathToTransition: '/topThreeThings', name: 'Top 3 Things', isVisible: false };

const routers = [
  { key: 'topThreeThings', component: TopThreeThings, path: `${clientUrls.PATIENTS}/:userId/${clientUrls.TOP_THREE_THINGS}` },
  { key: 'topThreeThingsDetail', component: TopThreeThings, path: `${clientUrls.PATIENTS}/:userId/${clientUrls.TOP_THREE_THINGS}/:sourceId` },
];

export default {
  component: TopThreeThings,
  epics, reducers, sidebarConfig, routers,
}

