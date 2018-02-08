import { clientUrls } from './config/client-urls.constants';
import { themeConfigs } from './themes.config';

import { allergiesEpic, allergiesReducer } from './components/pages/Allergies/index';
import { diagnosesEpic, diagnosesReducer } from './components/pages/ProblemsDiagnosis/index';
import { clinicalNotesEpic, clinicalNotesReducer } from './components/pages/ClinicalNotes/index';
import { personalNotesEpic, personalNotesReducer } from './components/pages/PersonalNotes/index';
import { contactsEpic, contactsReducer } from './components/pages/Contacts/index';
import { vaccinationsEpic, vaccinationsReducer } from './components/pages/Vaccinations/index';
import { medicationsEpic, medicationsReducer } from './components/pages/Medications/index';
import { genericPluginEpic, genericPluginReducer } from './components/pages/GenericPlugin/index';
import { proceduresEpic, proceduresReducer } from './components/pages/Procedures/index';
import { eventsEpic, eventsReducer } from './components/pages/Events/index';
import { testResultsEpic, testResultsReducer } from './components/pages/TestResults/index';
import { referralsEpic, referralsReducer } from './components/pages/Referrals/index';
import { ordersEpic, ordersReducer } from './components/pages/Orders/index';
import { mdtsEpic, mdtsReducer } from './components/pages/MDTs/index';
import { drawingsEpic, drawingsReducer } from './components/pages/Drawings/index';
import { documentsEpic, documentsReducer } from './components/pages/Documents/index';
import { vitalsEpic, vitalsReducer } from './components/pages/Vitals/index';
import { imagesEpic, imagesReducer } from './components/pages/Images/index';
import { transfersOfCareEpic, transfersOfCareReducer } from './components/pages/TransfersOfCare/index';
import { topThreeThingsEpic, topThreeThingsReducer } from './components/pages/TopThreeThings/index';
import { clinicalStatementsEpic, clinicalStatementsReducer } from './components/pages/ClinicalStatements/index';

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
import Drawings from './components/pages/Drawings/Drawings';
import Vitals from './components/pages/Vitals/Vitals';
import Documents from './components/pages/Documents/Documents';
import Images from './components/pages/Images/Images';
import TransfersOfCare from './components/pages/TransfersOfCare/TransfersOfCare';
import TopThreeThings from './components/pages/TopThreeThings/TopThreeThings';
import ClinicalStatements from './components/pages/ClinicalStatements/ClinicalStatements';

export const sidebarConfig = [
  { key: 'patients-summary', pathToTransition: '/patients-summary', name: themeConfigs.patientsSummaryPageName, isVisible: true },
  { key: 'diagnoses', pathToTransition: '/diagnoses', name: 'Problems / Diagnosis', isVisible: true },
  { key: 'medications', pathToTransition: '/medications', name: 'Medications', isVisible: true },
  { key: 'allergies', pathToTransition: '/allergies', name: 'Allergies', isVisible: true },
  { key: 'contacts', pathToTransition: '/contacts', name: 'Contacts', isVisible: true },
  { key: 'events', pathToTransition: '/events', name: 'Events', isVisible: true },
  { key: 'documents', pathToTransition: '/documents', name: 'Documents', isVisible: true },
  { key: 'orders', pathToTransition: '/orders', name: 'Orders', isVisible: true },
  { key: 'results', pathToTransition: '/results', name: 'Test Results', isVisible: true },
  { key: 'procedures', pathToTransition: '/procedures', name: 'Procedures', isVisible: true },
  { key: 'clinicalNotes', pathToTransition: '/clinicalNotes', name: 'Clinical Notes', isVisible: true },
  { key: 'clinicalStatements', pathToTransition: '/clinicalStatements', name: 'Clinical Statements', isVisible: true },
  { key: 'personalNotes', pathToTransition: '/personalNotes', name: 'Personal Notes', isVisible: true },
  { key: 'vaccinations', pathToTransition: '/vaccinations', name: 'Vaccinations', isVisible: true },
  { key: 'vitals', pathToTransition: '/vitals', name: 'Vitals - News', isVisible: true },
  { key: 'images', pathToTransition: '/images', name: 'Images', isVisible: true },
  { key: 'drawings', pathToTransition: '/drawings', name: 'Drawings', isVisible: true },
  { key: 'referrals', pathToTransition: '/referrals', name: 'Referrals', isVisible: true },
  { key: 'mdt', pathToTransition: '/mdt', name: 'MDT', isVisible: true },
  { key: 'transfer-of-care', pathToTransition: '/transfer-of-care', name: 'Transfers of Care', isVisible: true },
  { key: 'topThreeThings', pathToTransition: '/topThreeThings', name: 'Top 3 Things', isVisible: false },

  { key: 'genericPlugin', pathToTransition: '/genericPlugin', name: 'Generic Plugin', isVisible: false },
];

export const dashboardVisible = {
  // you can disable or enable the PatientsSummary boards here
  // for this you must to write key of board and give its false value
  // path: src\components\pages\PatientsSummary\patients-summary.config.js
  // e.g. (problems: false)
  contacts: true,
};
export const dashboardBeing = {
  // you can remove the PatientsSummary boards here
  // for this you must to write key of board and give its false value
  // path: src\components\pages\PatientsSummary\patients-summary.config.js
  // e.g. (problems: false)
  topThreeThings: false,
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
  drawingsEpic,
  vitalsEpic,
  documentsEpic,
  imagesEpic,
  transfersOfCareEpic,
  topThreeThingsEpic,
  clinicalStatementsEpic,
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
  drawingsReducer,
  vitalsReducer,
  documentsReducer,
  imagesReducer,
  transfersOfCareReducer,
  topThreeThingsReducer,
  clinicalStatementsReducer,
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

  { key: 'drawings', component: Drawings, path: `${clientUrls.PATIENTS}/:userId/${clientUrls.DRAWINGS}` },
  { key: 'drawingsCreate', component: Drawings, path: `${clientUrls.PATIENTS}/:userId/${clientUrls.DRAWINGS}/create` },
  { key: 'drawingsDetail', component: Drawings, path: `${clientUrls.PATIENTS}/:userId/${clientUrls.DRAWINGS}/:sourceId` },

  { key: 'vitals', component: Vitals, path: `${clientUrls.PATIENTS}/:userId/${clientUrls.VITALS}` },
  { key: 'vitalsCreate', component: Vitals, path: `${clientUrls.PATIENTS}/:userId/${clientUrls.VITALS}/create` },
  { key: 'vitalsDetail', component: Vitals, path: `${clientUrls.PATIENTS}/:userId/${clientUrls.VITALS}/:sourceId` },

  { key: 'documents', component: Documents, path: `${clientUrls.PATIENTS}/:userId/${clientUrls.DOCUMENTS}` },
  { key: 'documentsDetail', component: Documents, path: `${clientUrls.PATIENTS}/:userId/${clientUrls.DOCUMENTS}/:sourceId` },

  { key: 'images', component: Images, path: `${clientUrls.PATIENTS}/:userId/${clientUrls.IMAGES}` },
  { key: 'imagesDetail', component: Images, path: `${clientUrls.PATIENTS}/:userId/${clientUrls.IMAGES}/:sourceId` },

  { key: 'transfersOfCare', component: TransfersOfCare, path: `${clientUrls.PATIENTS}/:userId/${clientUrls.TRANSFERS_OF_CARE}` },
  { key: 'transfersOfCareCreate', component: TransfersOfCare, path: `${clientUrls.PATIENTS}/:userId/${clientUrls.TRANSFERS_OF_CARE}/create` },
  { key: 'transfersOfCareDetail', component: TransfersOfCare, path: `${clientUrls.PATIENTS}/:userId/${clientUrls.TRANSFERS_OF_CARE}/:sourceId` },

  { key: 'topThreeThings', component: TopThreeThings, path: `${clientUrls.PATIENTS}/:userId/${clientUrls.TOP_THREE_THINGS}` },
  { key: 'topThreeThingsDetail', component: TopThreeThings, path: `${clientUrls.PATIENTS}/:userId/${clientUrls.TOP_THREE_THINGS}/:sourceId` },

  { key: 'clinicalStatements', component: ClinicalStatements, path: `${clientUrls.PATIENTS}/:userId/${clientUrls.CLINICAL_STATEMENTS}` },
  { key: 'clinicalStatementsCreate', component: ClinicalStatements, path: `${clientUrls.PATIENTS}/:userId/${clientUrls.CLINICAL_STATEMENTS}/create` },
  { key: 'clinicalStatementsDetail', component: ClinicalStatements, path: `${clientUrls.PATIENTS}/:userId/${clientUrls.CLINICAL_STATEMENTS}/:sourceId` },
];
