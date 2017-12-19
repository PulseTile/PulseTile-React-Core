import { clientUrls } from './config/client-urls.constants';

import { allergiesEpic, allergiesReducer } from './components/pages/Allergies/index'
import { diagnosesEpic, diagnosesReducer } from './components/pages/ProblemsDiagnosis/index'
import { clinicalNotesEpic, clinicalNotesReducer } from './components/pages/ClinicalNotes/index'
import { personalNotesEpic, personalNotesReducer } from './components/pages/PersonalNotes/index'
import { contactsEpic, contactsReducer } from './components/pages/Contacts/index'
import { vaccinationsEpic, vaccinationsReducer } from './components/pages/Vaccinations/index'
import { medicationsEpic, medicationsReducer } from './components/pages/Medications/index'
import { genericPluginEpic, genericPluginReducer } from './components/pages/GenericPlugin/index'
import { proceduresEpic, proceduresReducer } from './components/pages/Procedures/index'
import { eventsEpic, eventsReducer } from './components/pages/Events/index'
import { testResultsEpic, testResultsReducer } from './components/pages/TestResults/index'
import { referralsEpic, referralsReducer } from './components/pages/Referrals/index'
import { ordersEpic, ordersReducer } from './components/pages/Orders/index'
import { mdtsEpic, mdtsReducer } from './components/pages/MDTs/index'

import Allergies from './components/pages/Allergies/Allergies';
import ProblemsDiagnosis from './components/pages/ProblemsDiagnosis/ProblemsDiagnosis';
import ClinicalNotes from './components/pages/ClinicalNotes/ClinicalNotes';
import PersonalNotes from './components/pages/PersonalNotes/PersonalNotes';
import Contacts from './components/pages/Contacts/Contacts';
import Vaccinations from './components/pages/Vaccinations/Vaccinations';
import Medications from './components/pages/Medications/Medications';
import GenericPlugin from './components/pages/GenericPlugin/GenericPlugin';
import Procedures from './components/pages/Procedures/Procedures';
import Events from './components/pages/Events/Events';
import TestResults from './components/pages/TestResults/TestResults';
import Referrals from './components/pages/Referrals/Referrals';
import Orders from './components/pages/Orders/Orders';
import MDTs from './components/pages/MDTs/MDTs';

export const sidebarConfig = [
  // { key: 'patients-summary', pathToTransition: '/patients-summary', name: 'Patient Summary', isVisible: true },
  { key: 'patients-summary', pathToTransition: '/patients-summary', name: 'Home', isVisible: true },
  { key: 'diagnoses', pathToTransition: '/diagnoses', name: 'Problems / Diagnosis', isVisible: true },
  { key: 'medications', pathToTransition: '/medications', name: 'Medications', isVisible: true },
  { key: 'allergies', pathToTransition: '/allergies', name: 'Allergies', isVisible: true },
  { key: 'contacts', pathToTransition: '/contacts', name: 'Contacts', isVisible: true },
  { key: 'clinicalNotes', pathToTransition: '/clinicalNotes', name: 'Clinical Notes', isVisible: false },
  { key: 'vaccinations', pathToTransition: '/vaccinations', name: 'Vaccinations', isVisible: true },
  { key: 'genericPlugin', pathToTransition: '/genericPlugin', name: 'Generic Plugin', isVisible: false },
  { key: 'personalNotes', pathToTransition: '/personalNotes', name: 'Personal Notes', isVisible: false },
  { key: 'results', pathToTransition: '/results', name: 'Test Results', isVisible: false },
  { key: 'procedures', pathToTransition: '/procedures', name: 'Procedures', isVisible: false },
  { key: 'events', pathToTransition: '/events', name: 'Events', isVisible: false },
  { key: 'referrals', pathToTransition: '/referrals', name: 'Referrals', isVisible: false },
  { key: 'mdt', pathToTransition: '/mdt', name: 'MDT', isVisible: false },
  { key: 'orders', pathToTransition: '/orders', name: 'Orders', isVisible: false },
];

export const dashboardVisible = {
  problems: true,
  contacts: true,
  allergies: true,
  medications: true,
  vaccinations: true,
};

export const pluginsEpicConfig = [
  allergiesEpic,
  diagnosesEpic,
  clinicalNotesEpic,
  personalNotesEpic,
  contactsEpic,
  vaccinationsEpic,
  genericPluginEpic,
  medicationsEpic,
  proceduresEpic,
  eventsEpic,
  testResultsEpic,
  referralsEpic,
  ordersEpic,
  mdtsEpic,
];

export const pluginsReducerConfig = [
  allergiesReducer,
  diagnosesReducer,
  clinicalNotesReducer,
  personalNotesReducer,
  contactsReducer,
  vaccinationsReducer,
  genericPluginReducer,
  medicationsReducer,
  proceduresReducer,
  eventsReducer,
  testResultsReducer,
  referralsReducer,
  ordersReducer,
  mdtsReducer,
];

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

  { key: 'personalNotes', component: PersonalNotes, path: `${clientUrls.PATIENTS}/:userId/${clientUrls.PERSONAL_NOTES}` },
  { key: 'personalNotesCreate', component: PersonalNotes, path: `${clientUrls.PATIENTS}/:userId/${clientUrls.PERSONAL_NOTES}/create` },
  { key: 'personalNotesDetail', component: PersonalNotes, path: `${clientUrls.PATIENTS}/:userId/${clientUrls.PERSONAL_NOTES}/:sourceId` },

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

  { key: 'procedures', component: Procedures, path: `${clientUrls.PATIENTS}/:userId/${clientUrls.PROCEDURES}` },
  { key: 'proceduresCreate', component: Procedures, path: `${clientUrls.PATIENTS}/:userId/${clientUrls.PROCEDURES}/create` },
  { key: 'proceduresDetail', component: Procedures, path: `${clientUrls.PATIENTS}/:userId/${clientUrls.PROCEDURES}/:sourceId` },

  { key: 'events', component: Events, path: `${clientUrls.PATIENTS}/:userId/${clientUrls.EVENTS}` },
  { key: 'eventsCreate', component: Events, path: `${clientUrls.PATIENTS}/:userId/${clientUrls.EVENTS}/create` },
  { key: 'eventsDetail', component: Events, path: `${clientUrls.PATIENTS}/:userId/${clientUrls.EVENTS}/:sourceId` },

  { key: 'testResults', component: TestResults, path: `${clientUrls.PATIENTS}/:userId/${clientUrls.TEST_RESULTS}` },
  { key: 'testResultsDetail', component: TestResults, path: `${clientUrls.PATIENTS}/:userId/${clientUrls.TEST_RESULTS}/:sourceId` },

  { key: 'referrals', component: Referrals, path: `${clientUrls.PATIENTS}/:userId/${clientUrls.REFERRALS}` },
  { key: 'referralsCreate', component: Referrals, path: `${clientUrls.PATIENTS}/:userId/${clientUrls.REFERRALS}/create` },
  { key: 'referralsDetail', component: Referrals, path: `${clientUrls.PATIENTS}/:userId/${clientUrls.REFERRALS}/:sourceId` },

  { key: 'orders', component: Orders, path: `${clientUrls.PATIENTS}/:userId/${clientUrls.ORDERS}` },
  { key: 'ordersCreate', component: Orders, path: `${clientUrls.PATIENTS}/:userId/${clientUrls.ORDERS}/create` },
  { key: 'ordersDetail', component: Orders, path: `${clientUrls.PATIENTS}/:userId/${clientUrls.ORDERS}/:sourceId` },

  { key: 'mdts', component: MDTs, path: `${clientUrls.PATIENTS}/:userId/${clientUrls.MDTS}` },
  { key: 'mdtsCreate', component: MDTs, path: `${clientUrls.PATIENTS}/:userId/${clientUrls.MDTS}/create` },
  { key: 'mdtsDetail', component: MDTs, path: `${clientUrls.PATIENTS}/:userId/${clientUrls.MDTS}/:sourceId` },

];
