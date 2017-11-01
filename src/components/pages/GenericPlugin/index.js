import { combineEpics } from 'redux-observable';

import { fetchPatientGenericPluginEpic } from './ducks/fetch-patient-generic-plugin.duck';
import { fetchPatientGenericPluginDetailEpic } from './ducks/fetch-patient-generic-plugin-detail.duck';
import { fetchPatientGenericPluginDetailEditEpic } from './ducks/fetch-patient-generic-plugin-detail-edit.duck';
import { fetchPatientGenericPluginCreateEpic } from './ducks/fetch-patient-generic-plugin-create.duck';

import patientsGenericPlugin from './ducks/fetch-patient-generic-plugin.duck'
import genericPluginDetail from './ducks/fetch-patient-generic-plugin-detail.duck'
import genericPluginDetailEdit from './ducks/fetch-patient-generic-plugin-detail-edit.duck'
import genericPluginCreate from './ducks/fetch-patient-generic-plugin-create.duck'

const genericPluginEpic = combineEpics(fetchPatientGenericPluginEpic, fetchPatientGenericPluginDetailEpic, fetchPatientGenericPluginDetailEditEpic, fetchPatientGenericPluginCreateEpic);

const genericPluginReducer = {
  patientsGenericPlugin,
  genericPluginDetail,
  genericPluginDetailEdit,
  genericPluginCreate,
};

export { genericPluginEpic, genericPluginReducer }
