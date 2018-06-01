// *** In this config You should choose the one of this sets settings

// ** Configs for Main theme
const mainThemeConfigs = {
  isLeedsPHRTheme: false,
  isLeedsPHRHeaderList: false,

  headerHasSearch: true,

  footerHasShowSupportedByText: true,
  footerCopyright: 'Transforming Usability',

  isShowPluginsBigBanner: false,

  patientsSummaryPageName: 'Patient Summary',
  patientsSummaryHasPreviewSettings: false,

  dashboardBeing: {
    vaccinations: false,
    topThreeThings: false,
  },
};

// - In config - ./plugins.config.js when you will change sidebarConfig
// - You should set 'false' only for:
// - topThreeThings, genericPlugin


// ** Configs for LeedsPHR theme
const leedsPHRThemeConfigs = {
  isLeedsPHRTheme: true,
  isLeedsPHRHeaderList: true,

  headerHasSearch: false,

  footerHasShowSupportedByText: false,
  footerCopyright: 'Copyright 2017 Ripple Foundation CIC Ltd. All rights reserved',

  isShowPluginsBigBanner: true,

  patientsSummaryPageName: 'Home',
  patientsSummaryHasPreviewSettings: true,

  sidebarConfigIsVisible: {
    default: false,
    'patients-summary': true,
    'diagnoses': true,
    'medications': true,
    'allergies': true,
    'contacts': true,
    'vaccinations': true,
    'topThreeThings': true,
  },
  dashboardBeing: { topThreeThings: true },
  isShowUserProfileSettings: true,
};

// - In config - ./plugins.config.js when you will change sidebarConfig
// - You should set 'true' only for:
// - patients-summary, diagnoses, medications, allergies, contacts, vaccinations, topThreeThings

export const themeConfigs = mainThemeConfigs;
