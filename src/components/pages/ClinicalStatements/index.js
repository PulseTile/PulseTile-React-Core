import { combineEpics } from 'redux-observable';

import ClinicalStatements from './ClinicalStatements';
import { clientUrls } from '../../../config/client-urls.constants';

import { fetchPatientClinicalStatementsDetailEpic } from './ducks/fetch-patient-clinical-statements-detail.duck';
import { fetchPatientClinicalStatementsEpic } from './ducks/fetch-patient-clinical-statements.duck';
import { fetchPatientClinicalStatementsUpdateEpic } from './ducks/fetch-patient-clinical-statements.duck';
import { fetchPatientClinicalStatementsCreateEpic } from './ducks/fetch-patient-clinical-statements-create.duck';

import patientsClinicalStatements from './ducks/fetch-patient-clinical-statements.duck';
import patientClinicalStatementsCreate from './ducks/fetch-patient-clinical-statements-create.duck';
import clinicalStatementsDetail from './ducks/fetch-patient-clinical-statements-detail.duck';

const epics = combineEpics(fetchPatientClinicalStatementsDetailEpic, fetchPatientClinicalStatementsEpic, fetchPatientClinicalStatementsCreateEpic, fetchPatientClinicalStatementsUpdateEpic);

const reducers = {
  patientsClinicalStatements,
  patientClinicalStatementsCreate,
  clinicalStatementsDetail
};

const sidebarConfig = { key: 'clinicalStatements', pathToTransition: '/clinicalStatements', name: 'Clinical Statements', isVisible: true };

const routers = [
  { key: 'clinicalStatements', component: ClinicalStatements, path: `${clientUrls.PATIENTS}/:userId/${clientUrls.CLINICAL_STATEMENTS}` },
  { key: 'clinicalStatementsCreate', component: ClinicalStatements, path: `${clientUrls.PATIENTS}/:userId/${clientUrls.CLINICAL_STATEMENTS}/create` },
  { key: 'clinicalStatementsDetail', component: ClinicalStatements, path: `${clientUrls.PATIENTS}/:userId/${clientUrls.CLINICAL_STATEMENTS}/:sourceId` },
];

export default {
  component: ClinicalStatements,
  epics, reducers, sidebarConfig, routers,
}

