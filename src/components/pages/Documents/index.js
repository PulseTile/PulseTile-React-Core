import { combineEpics } from 'redux-observable';

import { fetchPatientDocumentsDetailEpic } from './ducks/fetch-patient-documents-detail.duck';
import { fetchPatientDocumentsEpic } from './ducks/fetch-patient-documents.duck';

import patientsDocuments from './ducks/fetch-patient-documents.duck'
import  documentsDetail from './ducks/fetch-patient-documents-detail.duck'

const  documentsEpic = combineEpics(fetchPatientDocumentsDetailEpic, fetchPatientDocumentsEpic);

const  documentsReducer = {
  patientsDocuments,
  documentsDetail
};

export {  documentsEpic,  documentsReducer }
