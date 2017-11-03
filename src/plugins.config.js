import { clientUrls } from './config/client-urls.constants';

import { allergiesEpic, allergiesReducer } from './components/pages/Allergies/index'
import { diagnosesEpic, diagnosesReducer } from './components/pages/ProblemsDiagnosis/index'
import { clinicalNotesEpic, clinicalNotesReducer } from './components/pages/ClinicalNotes/index'
import { contactsEpic, contactsReducer } from './components/pages/Contacts/index'
import { vaccinationsEpic, vaccinationsReducer } from './components/pages/Vaccinations/index'
import { medicationsEpic, medicationsReducer } from './components/pages/Medications/index'
import { genericPluginEpic, genericPluginReducer } from './components/pages/GenericPlugin/index'

import Allergies from './components/pages/Allergies/Allergies';
import ProblemsDiagnosis from './components/pages/ProblemsDiagnosis/ProblemsDiagnosis';
import ClinicalNotes from './components/pages/ClinicalNotes/ClinicalNotes';
import Contacts from './components/pages/Contacts/Contacts';
import Vaccinations from './components/pages/Vaccinations/Vaccinations';
import Medications from './components/pages/Medications/Medications';
import GenericPlugin from './components/pages/GenericPlugin/GenericPlugin';

export const sidebarConfig = [
  { key: 'patients-summary', pathToTransition: '/patients-summary', name: 'Patient Summary', isVisible: true },
  { key: 'diagnoses', pathToTransition: '/diagnoses', name: 'Problems / Diagnosis', isVisible: true },
  { key: 'medications', pathToTransition: '/medications', name: 'Medications', isVisible: true },
  { key: 'allergies', pathToTransition: '/allergies', name: 'Allergies', isVisible: true },
  { key: 'contacts', pathToTransition: '/contacts', name: 'Contacts', isVisible: true },
  { key: 'clinicalNotes', pathToTransition: '/clinicalNotes', name: ' Clinical Notes', isVisible: true },
  { key: 'vaccinations', pathToTransition: '/vaccinations', name: ' Vaccinations', isVisible: true },
  { key: 'genericPlugin', pathToTransition: '/genericPlugin', name: ' Generic Plugin', isVisible: true },
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

  { key: 'contacts', component: Contacts, path: `${clientUrls.PATIENTS}/:userId/${clientUrls.CONTACTS}` },
  { key: 'contactsCreate', component: Contacts, path: `${clientUrls.PATIENTS}/:userId/${clientUrls.CONTACTS}/create` },
  { key: 'contactsDetail', component: Contacts, path: `${clientUrls.PATIENTS}/:userId/${clientUrls.CONTACTS}/:sourceId` },

  { key: 'vaccinations', component: Vaccinations, path: `${clientUrls.PATIENTS}/:userId/${clientUrls.VACCINATIONS}` },
  { key: 'vaccinationsCreate', component: Vaccinations, path: `${clientUrls.PATIENTS}/:userId/${clientUrls.VACCINATIONS}/create` },
  { key: 'vaccinationsDetail', component: Vaccinations, path: `${clientUrls.PATIENTS}/:userId/${clientUrls.VACCINATIONS}/:sourceId` },

  { key: 'medications', component: Medications, path: `${clientUrls.PATIENTS}/:userId/${clientUrls.MEDICATIONS}` },
  { key: 'medicationsCreate', component: Medications, path: `${clientUrls.PATIENTS}/:userId/${clientUrls.MEDICATIONS}/create` },
  { key: 'medicationsDetail', component: Medications, path: `${clientUrls.PATIENTS}/:userId/${clientUrls.MEDICATIONS}/:sourceId` },

  { key: 'genericPlugin', component: GenericPlugin, path: `${clientUrls.PATIENTS}/:userId/${clientUrls.GENERIC_PLUGIN}` },
  { key: 'genericPluginCreate', component: GenericPlugin, path: `${clientUrls.PATIENTS}/:userId/${clientUrls.GENERIC_PLUGIN}/create` },
  { key: 'genericPluginDetail', component: GenericPlugin, path: `${clientUrls.PATIENTS}/:userId/${clientUrls.GENERIC_PLUGIN}/:sourceId` },

];

export const pluginsEpicConfig = [
  allergiesEpic,
  diagnosesEpic,
  clinicalNotesEpic,
  contactsEpic,
  vaccinationsEpic,
  medicationsEpic,
  genericPluginEpic,
];

export const pluginsReducerConfig = [
  allergiesReducer,
  diagnosesReducer,
  clinicalNotesReducer,
  contactsReducer,
  vaccinationsReducer,
  medicationsReducer,
  genericPluginReducer,
];
