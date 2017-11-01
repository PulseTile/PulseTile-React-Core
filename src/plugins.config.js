import { clientUrls } from './config/client-urls.constants';

import { allergiesEpic, allergiesReducer } from './components/pages/Allergies/index'
import { diagnosesEpic, diagnosesReducer } from './components/pages/ProblemsDiagnosis/index'
import { clinicalNotesEpic, clinicalNotesReducer } from './components/pages/ClinicalNotes/index'
import { vaccinationsEpic, vaccinationsReducer } from './components/pages/Vaccinations/index'

import Allergies from './components/pages/Allergies/Allergies';
import ProblemsDiagnosis from './components/pages/ProblemsDiagnosis/ProblemsDiagnosis';
import ClinicalNotes from './components/pages/ClinicalNotes/ClinicalNotes';
import Vaccinations from './components/pages/Vaccinations/Vaccinations';

export const sidebarConfig = [
  { key: 'patients-summary', pathToTransition: '/patients-summary', name: 'Patient Summary', isVisible: true },
  { key: 'diagnoses', pathToTransition: '/diagnoses', name: 'Problems / Diagnosis', isVisible: true },
  { key: 'medications', pathToTransition: '', name: 'Medications', isVisible: true },
  { key: 'allergies', pathToTransition: '/allergies', name: 'Allergies', isVisible: true },
  { key: 'contacts', pathToTransition: '', name: 'Contacts', isVisible: true },
  { key: 'clinicalNotes', pathToTransition: '/clinicalNotes', name: ' Clinical Notes', isVisible: true },
  { key: 'vaccinations', pathToTransition: '/vaccinations', name: ' Vaccinations', isVisible: true },
];

export const dashboardVisible = {
  problems: true,
  contacts: true,
  allergies: true,
  medications: true,
};

export const routersPluginConfig = [
  { key: 'allergies', component: Allergies, path: `${clientUrls.PATIENTS}/:userId/${clientUrls.ALLERGIES}` },
  { key: 'allergiesCreate', component: Allergies, path: `${clientUrls.PATIENTS}/:userId/${clientUrls.ALLERGIES}/create` },
  { key: 'allergiesDetail', component: Allergies, path: `${clientUrls.PATIENTS}/:userId/${clientUrls.ALLERGIES}/:sourceId` },

  { key: 'problems', component: ProblemsDiagnosis, path: `${clientUrls.PATIENTS}/:userId/${clientUrls.DIAGNOSES}` },
  { key: 'problemsCreate', component: ProblemsDiagnosis, path: `${clientUrls.PATIENTS}/:userId/${clientUrls.DIAGNOSES}/create` },
  { key: 'problemsDetail', component: ProblemsDiagnosis, path: `${clientUrls.PATIENTS}/:userId/${clientUrls.DIAGNOSES}/:sourceId` },

  { key: 'clinicalNotes', component: ClinicalNotes, path: `${clientUrls.PATIENTS}/:userId/${clientUrls.CLINICAL_NOTES}` },
  { key: 'clinicalNotesCreate', component: ClinicalNotes, path: `${clientUrls.PATIENTS}/:userId/${clientUrls.CLINICAL_NOTES}/create` },
  { key: 'clinicalNotesDetail', component: ClinicalNotes, path: `${clientUrls.PATIENTS}/:userId/${clientUrls.CLINICAL_NOTES}/:sourceId` },

  { key: 'vaccinations', component: Vaccinations, path: `${clientUrls.PATIENTS}/:userId/${clientUrls.VACCINATIONS}` },
  { key: 'vaccinationsCreate', component: Vaccinations, path: `${clientUrls.PATIENTS}/:userId/${clientUrls.VACCINATIONS}/create` },
  { key: 'vaccinationsDetail', component: Vaccinations, path: `${clientUrls.PATIENTS}/:userId/${clientUrls.VACCINATIONS}/:sourceId` },
];

export const pluginsEpicConfig = [
  allergiesEpic,
  diagnosesEpic,
  clinicalNotesEpic,
  vaccinationsEpic,
];

export const pluginsReducerConfig = [
  allergiesReducer,
  diagnosesReducer,
  clinicalNotesReducer,
  vaccinationsReducer,
];
