import { combineEpics } from 'redux-observable';

import asyncComponent from '../../../../components/containers/AsyncComponent/AsyncComponent';
import { clientUrls } from '../../../../config/client-urls.constants';

import { fetchPatientVaccinationsEpic, fetchPatientVaccinationsSynopsisEpic } from './ducks/fetch-patient-vaccinations.duck';
import { fetchPatientVaccinationsUpdateEpic } from './ducks/fetch-patient-vaccinations.duck';
import { fetchPatientVaccinationsDetailEpic } from './ducks/fetch-patient-vaccinations-detail.duck';
import { fetchPatientVaccinationsDetailEditEpic } from './ducks/fetch-patient-vaccinations-detail-edit.duck';
import { fetchPatientVaccinationsCreateEpic } from './ducks/fetch-patient-vaccinations-create.duck';

import patientsVaccinations from './ducks/fetch-patient-vaccinations.duck';
import vaccinationsDetail from './ducks/fetch-patient-vaccinations-detail.duck';
import vaccinationsDetailEdit from './ducks/fetch-patient-vaccinations-detail-edit.duck';
import patientVaccinationsCreate from './ducks/fetch-patient-vaccinations-create.duck';

const epics = combineEpics(fetchPatientVaccinationsEpic, fetchPatientVaccinationsSynopsisEpic, fetchPatientVaccinationsDetailEpic, fetchPatientVaccinationsDetailEditEpic, fetchPatientVaccinationsCreateEpic, fetchPatientVaccinationsUpdateEpic);
const Vaccinations = asyncComponent(() => import(/* webpackChunkName: "vaccinations" */ './Vaccinations').then(module => module.default));

const reducers = {
  patientsVaccinations,
  vaccinationsDetail,
  vaccinationsDetailEdit,
  patientVaccinationsCreate,
};

const sidebarConfig = { key: 'vaccinations', pathToTransition: '/vaccinations', name: 'Vaccinations', isVisible: true };

let routers = [];
if (clientUrls) {
    routers = [
        { key: 'vaccinations', component: Vaccinations, path: `${clientUrls.PATIENTS}/:userId/${clientUrls.VACCINATIONS}` },
        { key: 'vaccinationsCreate', component: Vaccinations, path: `${clientUrls.PATIENTS}/:userId/${clientUrls.VACCINATIONS}/create` },
        { key: 'vaccinationsDetail', component: Vaccinations, path: `${clientUrls.PATIENTS}/:userId/${clientUrls.VACCINATIONS}/:sourceId` },
    ];
}


export default {
  component: Vaccinations,
  epics, reducers, sidebarConfig, routers,
}

