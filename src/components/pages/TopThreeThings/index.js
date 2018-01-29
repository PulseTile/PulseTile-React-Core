import { combineEpics } from 'redux-observable';

import { fetchPatientTopThreeThingsEpic } from './ducks/fetch-patient-top-three-things.duck';
import { fetchPatientTopThreeThingsUpdateEpic } from './ducks/fetch-patient-top-three-things.duck';
import { fetchPatientTopThreeThingsDetailEpic } from './ducks/fetch-patient-top-three-things-detail.duck';
import { fetchPatientTopThreeThingsDetailEditEpic } from './ducks/fetch-patient-top-three-things-detail-edit.duck';

import patientsTopThreeThings from './ducks/fetch-patient-top-three-things.duck'
import topThreeThingsDetail from './ducks/fetch-patient-top-three-things-detail.duck'
import topThreeThingsDetailEdit from './ducks/fetch-patient-top-three-things-detail-edit.duck'

const topThreeThingsEpic = combineEpics(fetchPatientTopThreeThingsEpic, fetchPatientTopThreeThingsDetailEpic, fetchPatientTopThreeThingsDetailEditEpic, fetchPatientTopThreeThingsUpdateEpic);

const topThreeThingsReducer = {
  patientsTopThreeThings,
  topThreeThingsDetail,
  topThreeThingsDetailEdit,
};

export { topThreeThingsEpic, topThreeThingsReducer }
