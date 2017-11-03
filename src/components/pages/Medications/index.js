import { combineEpics } from 'redux-observable';

import { fetchPatientMedicationsDetailEpic } from './ducks/fetch-patient-medications-detail.duck';
import { fetchPatientMedicationsDetailEditEpic } from './ducks/fetch-patient-medications-detail-edit.duck';
import { fetchPatientMedicationsEpic } from './ducks/fetch-patient-medications.duck';
import { fetchPatientMedicationsCreateEpic } from './ducks/fetch-patient-medications-create.duck';

import patientsMedications from './ducks/fetch-patient-medications.duck'
import patientMedicationsCreate from './ducks/fetch-patient-medications-create.duck'
import medicationsDetail from './ducks/fetch-patient-medications-detail.duck'
import medicationsDetailEdit from './ducks/fetch-patient-medications-detail-edit.duck'

const medicationsEpic = combineEpics(fetchPatientMedicationsDetailEpic, fetchPatientMedicationsDetailEditEpic, fetchPatientMedicationsEpic, fetchPatientMedicationsCreateEpic);

const medicationsReducer = {
  patientsMedications,
  patientMedicationsCreate,
  medicationsDetail,
  medicationsDetailEdit,
};

export { medicationsEpic, medicationsReducer }
