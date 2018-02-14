import { combineEpics } from 'redux-observable';

import ClinicalStatements from './ClinicalStatements';
import { clientUrls } from '../../../config/client-urls.constants';

import { fetchPatientClinicalStatementsDetailEpic } from './ducks/fetch-patient-clinical-statements-detail.duck';
import { fetchPatientClinicalStatementsEpic } from './ducks/fetch-patient-clinical-statements.duck';
import { fetchPatientClinicalStatementsTagsEpic } from './ducks/fetch-patient-clinical-statements-tags.duck';
import { fetchPatientClinicalStatementsQueryEpic } from './ducks/fetch-patient-clinical-statements-query.duck';
import { fetchPatientClinicalStatementsCreateEpic } from './ducks/fetch-patient-clinical-statements-create.duck';

import patientsClinicalStatements from './ducks/fetch-patient-clinical-statements.duck';
import patientsClinicalStatementsTags from './ducks/fetch-patient-clinical-statements-tags.duck';
import patientsClinicalStatementsQuery from './ducks/fetch-patient-clinical-statements-query.duck';
import patientClinicalStatementsCreate from './ducks/fetch-patient-clinical-statements-create.duck';
import clinicalStatementsDetail from './ducks/fetch-patient-clinical-statements-detail.duck';

const epics = combineEpics(
  fetchPatientClinicalStatementsDetailEpic,
  fetchPatientClinicalStatementsEpic,
  fetchPatientClinicalStatementsTagsEpic,
	fetchPatientClinicalStatementsQueryEpic,
  fetchPatientClinicalStatementsCreateEpic
);

const reducers = {
  patientsClinicalStatements,
  patientClinicalStatementsCreate,
  clinicalStatementsDetail,
	patientsClinicalStatementsTags,
	patientsClinicalStatementsQuery,
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

