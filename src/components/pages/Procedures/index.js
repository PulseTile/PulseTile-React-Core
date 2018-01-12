import { combineEpics } from 'redux-observable';

import { fetchPatientProceduresDetailEpic } from './ducks/fetch-patient-procedures-detail.duck';
import { fetchPatientProceduresDetailEditEpic } from './ducks/fetch-patient-procedures-detail-edit.duck';
import { fetchPatientProceduresEpic } from './ducks/fetch-patient-procedures.duck';
import { fetchPatientProceduresUpdateEpic } from './ducks/fetch-patient-procedures.duck';
import { fetchPatientProceduresCreateEpic } from './ducks/fetch-patient-procedures-create.duck';

import patientsProcedures from './ducks/fetch-patient-procedures.duck'
import patientProceduresCreate from './ducks/fetch-patient-procedures-create.duck'
import proceduresDetail from './ducks/fetch-patient-procedures-detail.duck'
import proceduresDetailEdit from './ducks/fetch-patient-procedures-detail-edit.duck'

const proceduresEpic = combineEpics(fetchPatientProceduresDetailEpic, fetchPatientProceduresDetailEditEpic, fetchPatientProceduresEpic, fetchPatientProceduresCreateEpic, fetchPatientProceduresUpdateEpic);

const proceduresReducer = {
  patientsProcedures,
  patientProceduresCreate,
  proceduresDetail,
  proceduresDetailEdit,
};

export { proceduresEpic, proceduresReducer }
