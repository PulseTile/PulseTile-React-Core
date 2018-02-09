import { themeConfigs } from './themes.config';

import diagnoses from './components/pages/ProblemsDiagnosis/index';
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

export const sidebarConfig = [
  { key: 'patients-summary', pathToTransition: '/patients-summary', name: themeConfigs.patientsSummaryPageName, isVisible: true },
];

if (themeConfigs.sidebarConfigIsVisible) {
  sidebarConfig.forEach(item => {
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

export const pluginsEpicConfig = [
  // allergiesEpic,
  // diagnosesEpic,
  // clinicalNotesEpic,
  // personalNotesEpic,
  // contactsEpic,
  // vaccinationsEpic,
  // genericPluginEpic,
  // medicationsEpic,
  // proceduresEpic,
  // eventsEpic,
  // testResultsEpic,
  // referralsEpic,
  // ordersEpic,
  // mdtsEpic,
  // drawingsEpic,
  // vitalsEpic,
  // documentsEpic,
  // imagesEpic,
  // transfersOfCareEpic,
  // topThreeThingsEpic,
  // clinicalStatementsEpic,
];

export const pluginsReducerConfig = [
  // allergiesReducer,
  // diagnosesReducer,
  // clinicalNotesReducer,
  // personalNotesReducer,
  // contactsReducer,
  // vaccinationsReducer,
  // genericPluginReducer,
  // medicationsReducer,
  // proceduresReducer,
  // eventsReducer,
  // testResultsReducer,
  // referralsReducer,
  // ordersReducer,
  // mdtsReducer,
  // drawingsReducer,
  // vitalsReducer,
  // documentsReducer,
  // imagesReducer,
  // transfersOfCareReducer,
  // topThreeThingsReducer,
  // clinicalStatementsReducer,
];

export const routersPluginConfig = [];
