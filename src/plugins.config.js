import { themeConfigs } from './themes.config';

import diagnoses from './components/pages/Diagnosis/index';
import medications from './components/pages/Medications/index';
import allergies from './components/pages/Allergies/index';
import contacts from './components/pages/Contacts/index';
import { themePlugins } from './components/theme/config/plugins';

// the order of the elements in this array affects the order of the Headings in the sidebar
const corePlugins = [
  diagnoses,
  medications,
  allergies,
  contacts
];

export const plugins = corePlugins.concat(themePlugins);

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
