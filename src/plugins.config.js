import { clientUrls } from './config/client-urls.constants';
import { allergiesEpic, allergiesReducer } from './components/pages/Allergies/index'
import Allergies from './components/pages/Allergies/Allergies';

export const sidebarConfig = [
  { key: 'patients-summary', pathToTransition: '/patients-summary', name: 'Patient Summary', isVisible: true },
  { key: 'problems', pathToTransition: '', name: 'Problems / Diagnosis', isVisible: true },
  { key: 'medications', pathToTransition: '', name: 'Medications', isVisible: true },
  { key: 'allergies', pathToTransition: '/allergies', name: 'Allergies', isVisible: true },
  { key: 'contacts', pathToTransition: '', name: 'Contacts', isVisible: true },
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
];

export const pluginsEpicConfig = [
  allergiesEpic,
];

export const pluginsReducerConfig = [
  allergiesReducer,
];
