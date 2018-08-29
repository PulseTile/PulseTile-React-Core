// *** In this config You should choose the one of this sets settings

/**
 * Configs for Main (green) theme - default theme
 */
const mainThemeConfigs = {
  isLeedsPHRTheme: false,
  isLeedsPHRHeaderList: false,

  headerHasSearch: true,

  footerHasShowSupportedByText: true,
  footerCopyright: 'Transforming Usability',

  isShowPluginsBigBanner: false,

  patientsSummaryPageName: 'Patient Summary',
  patientsSummaryHasPreviewSettings: false,

  dashboardBeing: {},

  patientsSummaryTitles: {
    'diagnoses': 'Problems / Diagnosis',
    'medications': 'Medications',
    'allergies': 'Allergies',
    'contacts': 'Contacts',
    'vaccinations': 'Vaccinations',
    'topThreeThings': 'Top Three Things',
  },
};


/**
 * Configs for HelmPHR theme
 */
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
  dashboardBeing: {},

  isShowUserProfileSettings: true,

  patientsSummaryTitles: {
    'diagnoses': 'Problems / Issues',
    'medications': 'Medications',
    'allergies': 'Allergies',
    'contacts': 'Contacts',
    'vaccinations': 'Vaccinations',
    'topThreeThings': 'Top Three Things',
  },
};

export const themeConfigs = mainThemeConfigs;
