import { combineEpics } from 'redux-observable';

import { fetchPatientReferralsDetailEpic } from './ducks/fetch-patient-referrals-detail.duck';
import { fetchPatientReferralsDetailEditEpic } from './ducks/fetch-patient-referrals-detail-edit.duck';
import { fetchPatientReferralsEpic } from './ducks/fetch-patient-referrals.duck';
import { fetchPatientReferralsUpdateEpic } from './ducks/fetch-patient-referrals.duck';
import { fetchPatientReferralsCreateEpic } from './ducks/fetch-patient-referrals-create.duck';

import patientsReferrals from './ducks/fetch-patient-referrals.duck'
import patientReferralsCreate from './ducks/fetch-patient-referrals-create.duck'
import referralsDetail from './ducks/fetch-patient-referrals-detail.duck'
import referralsDetailEdit from './ducks/fetch-patient-referrals-detail-edit.duck'

const referralsEpic = combineEpics(fetchPatientReferralsDetailEpic, fetchPatientReferralsDetailEditEpic, fetchPatientReferralsEpic, fetchPatientReferralsCreateEpic, fetchPatientReferralsUpdateEpic);

const referralsReducer = {
  patientsReferrals,
  patientReferralsCreate,
  referralsDetail,
  referralsDetailEdit,
};

export { referralsEpic, referralsReducer }
