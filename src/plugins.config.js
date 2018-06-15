import { themeConfigs } from './themes.config';

import diagnoses from './components/pages/Diagnosis/index';
import medications from './components/pages/Medications/index';
import allergies from './components/pages/Allergies/index';
import contacts from './components/pages/Contacts/index';
import events from './components/pages/Events/index';
import documents from './components/pages/Documents/index';
import orders from './components/pages/Orders/index';
import testResults from './components/pages/TestResults/index';
import procedures from './components/pages/Procedures/index';
import clinicalNotes from './components/pages/ClinicalNotes/index';
import clinicalStatements from './components/pages/ClinicalStatements/index';
import personalNotes from './components/pages/PersonalNotes/index';
import vaccinations from './components/pages/Vaccinations/index';
import vitals from './components/pages/Vitals/index';
import images from './components/pages/Images/index';
import drawings from './components/pages/Drawings/index';
import referrals from './components/pages/Referrals/index';
import mdts from './components/pages/MDTs/index';
import transfersOfCare from './components/pages/TransfersOfCare/index';
import topThreeThings from './components/pages/TopThreeThings/index';
import genericPlugin from './components/pages/GenericPlugin/index';
import diaryEntry from './components/pages/DiaryEntry/index';
import proms from './components/pages/PROMs/index';
import feeds from './components/pages/Feeds/index';

// the order of the elements in this array affects the order of the Headings in the sidebar
export const plugins = [
  diagnoses,
  medications,
  allergies,
  contacts,
  events,
  documents,
  orders,
  testResults,
  procedures,
  clinicalNotes,
  clinicalStatements,
  personalNotes,
  vaccinations,
  vitals,
  images,
  drawings,
  referrals,
  mdts,
  transfersOfCare,
  proms,

  topThreeThings,
  feeds,

  genericPlugin,
  diaryEntry,
];

export const sidebarConfig = [
  { key: 'patients-summary', pathToTransition: '/patients-summary', name: themeConfigs.patientsSummaryPageName, isVisible: true },
];

export const pluginsEpicConfig = [];

export const pluginsReducerConfig = [];

export const routersPluginConfig = [];

plugins.forEach((plugin) => {
  if (plugin.sidebarConfig !== undefined) {
    sidebarConfig.push(plugin.sidebarConfig);
  };
  pluginsEpicConfig.push(plugin.epics);
  pluginsReducerConfig.push(plugin.reducers);

  plugin.routers.forEach((item) => {
    routersPluginConfig.push(item);
  })
});

if (themeConfigs.sidebarConfigIsVisible) {
  sidebarConfig.forEach((item) => {
    if (themeConfigs.sidebarConfigIsVisible[item.key] !== undefined) {
      item.isVisible = themeConfigs.sidebarConfigIsVisible[item.key];
    } else {
      item.isVisible = themeConfigs.sidebarConfigIsVisible.default;
    }
  });
}

export const dashboardVisible = themeConfigs.dashboardVisible || {
  // you can disable or enable the PatientsSummary boards here
  // for this you must to write key of board and give its false value
  // path: src\components\pages\PatientsSummary\patients-summary.config.js
  // e.g. (problems: false)
  contacts: true,
};
export const dashboardBeing = themeConfigs.dashboardBeing || {
  // you can remove the PatientsSummary boards here
  // for this you must to write key of board and give its false value
  // path: src\components\pages\PatientsSummary\patients-summary.config.js
  // e.g. (problems: false)
  topThreeThings: false,
};
