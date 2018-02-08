import { combineEpics } from 'redux-observable';

import { fetchPatientClinicalStatementsDetailEpic } from './ducks/fetch-patient-clinical-statements-detail.duck';
import { fetchPatientClinicalStatementsEpic } from './ducks/fetch-patient-clinical-statements.duck';
import { fetchPatientClinicalStatementsUpdateEpic } from './ducks/fetch-patient-clinical-statements.duck';
import { fetchPatientClinicalStatementsCreateEpic } from './ducks/fetch-patient-clinical-statements-create.duck';

import patientsClinicalStatements from './ducks/fetch-patient-clinical-statements.duck'
import patientClinicalStatementsCreate from './ducks/fetch-patient-clinical-statements-create.duck'
import clinicalStatementsDetail from './ducks/fetch-patient-clinical-statements-detail.duck'

const clinicalStatementsEpic = combineEpics(fetchPatientClinicalStatementsDetailEpic, fetchPatientClinicalStatementsEpic, fetchPatientClinicalStatementsCreateEpic, fetchPatientClinicalStatementsUpdateEpic);

const clinicalStatementsReducer = {
  patientsClinicalStatements,
  patientClinicalStatementsCreate,
  clinicalStatementsDetail
};

export { clinicalStatementsEpic, clinicalStatementsReducer }
