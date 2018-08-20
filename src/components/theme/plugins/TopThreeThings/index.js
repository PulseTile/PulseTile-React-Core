import { combineEpics } from 'redux-observable';
import asyncComponent from '../../../../components/containers/AsyncComponent/AsyncComponent';
import { themeClientUrls } from '../../config/clientUrls';
import { fetchPatientTopThreeThingsEpic, fetchPatientTopThreeThingsSynopsisEpic } from './ducks/fetch-patient-top-three-things.duck';
import { fetchPatientTopThreeThingsCreateEpic } from './ducks/fetch-patient-top-three-things-create.duck';
import { fetchPatientTopThreeThingsUpdateEpic } from './ducks/fetch-patient-top-three-things.duck';
import { fetchPatientTopThreeThingsDetailEpic } from './ducks/fetch-patient-top-three-things-detail.duck';
import { fetchPatientTopThreeThingsDetailEditEpic } from './ducks/fetch-patient-top-three-things-detail-edit.duck';

import patientsTopThreeThings from './ducks/fetch-patient-top-three-things.duck';
import patientsTopThreeThingsCreate from './ducks/fetch-patient-top-three-things-create.duck';
import topThreeThingsDetail from './ducks/fetch-patient-top-three-things-detail.duck';
import topThreeThingsDetailEdit from './ducks/fetch-patient-top-three-things-detail-edit.duck';

const epics = combineEpics(fetchPatientTopThreeThingsEpic, fetchPatientTopThreeThingsCreateEpic, fetchPatientTopThreeThingsSynopsisEpic, fetchPatientTopThreeThingsDetailEpic, fetchPatientTopThreeThingsDetailEditEpic, fetchPatientTopThreeThingsUpdateEpic);
const TopThreeThings = asyncComponent(() => import(/* webpackChunkName: "topThreeThings" */ './TopThreeThings').then(module => module.default));

const reducers = {
  patientsTopThreeThings,
  patientsTopThreeThingsCreate,
  topThreeThingsDetail,
  topThreeThingsDetailEdit,
};

const sidebarConfig = { key: 'topThreeThings', pathToTransition: '/topThreeThings', name: 'Top 3 Things', isVisible: false };

const routers = [
  { key: 'topThreeThings', component: TopThreeThings, path: `${themeClientUrls.PATIENTS}/:userId/${themeClientUrls.TOP_THREE_THINGS}` },
  { key: 'topThreeThingsDetail', component: TopThreeThings, path: `${themeClientUrls.PATIENTS}/:userId/${themeClientUrls.TOP_THREE_THINGS}/:sourceId` },
];

export default {
  component: TopThreeThings,
  epics, reducers, sidebarConfig, routers,
}
