import { combineEpics } from 'redux-observable';

import { fetchPatientMDTsEpic } from './ducks/fetch-patient-mdts.duck';
import { fetchPatientMDTsUpdateEpic } from './ducks/fetch-patient-mdts.duck';
import { fetchPatientMDTsDetailEpic } from './ducks/fetch-patient-mdts-detail.duck';
import { fetchPatientMDTsDetailEditEpic } from './ducks/fetch-patient-mdts-detail-edit.duck';
import { fetchPatientMDTsCreateEpic } from './ducks/fetch-patient-mdts-create.duck';

import patientsMDTs from './ducks/fetch-patient-mdts.duck'
import mdtsDetail from './ducks/fetch-patient-mdts-detail.duck'
import mdtsDetailEdit from './ducks/fetch-patient-mdts-detail-edit.duck'
import mdtsCreate from './ducks/fetch-patient-mdts-create.duck'

const mdtsEpic = combineEpics(fetchPatientMDTsEpic, fetchPatientMDTsDetailEpic, fetchPatientMDTsDetailEditEpic, fetchPatientMDTsCreateEpic, fetchPatientMDTsUpdateEpic);

const mdtsReducer = {
  patientsMDTs,
  mdtsDetail,
  mdtsDetailEdit,
  mdtsCreate,
};

export { mdtsEpic, mdtsReducer }
