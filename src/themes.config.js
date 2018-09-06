// *** In this config You should choose the one of this sets settings

/**
 * Configs for Main (green) theme - default theme
 */
const mainThemeConfigs = {
  isLeedsPHRTheme: false,
  topHeader: {
    showNotifications: true,
    showQuestions: true,
    showSearch: true,
    showUserPanel: true,
  },
  isLeedsPHRHeaderList: false,
  headerHasSearch: true,
  footerHasShowSupportedByText: true,
  footerCopyright: 'Transforming Usability',
  isShowPluginsBigBanner: false,
  patientsSummaryPageName: 'Patient Summary',
  patientsSummaryHasPreviewSettings: false,
  dashboardBeing: {},
  isShowUserPhoto: true,
  isShowUserProfileSettings: true,
  isShowUserProfileSpecification: true,
  sidebarConfigIsVisible: {
    default: false,
    'patients-summary': true,
    'diagnoses': true,
    'medications': true,
    'allergies': true,
    'contacts': true,
  },
  patientsSummaryTitles: {
    'diagnoses': 'Problems / Diagnosis',
    'medications': 'Medications',
    'allergies': 'Allergies',
    'contacts': 'Contacts',
    'vaccinations': 'Vaccinations',
    'topThreeThings': 'Top Three Things',
  },
  patientsSummaryDetailsTitles: {
    'diagnoses': 'Problem / Diagnosis',
    'medications': 'Medication',
    'allergies': 'Allergy',
    'contacts': 'Contact',
    'vaccinations': 'Vaccination',
    'topThreeThings': 'Top Three Things',
  },
  detailsToHide: {},
  buttonsToHide: {},
  panelsToHide: {},
  corePluginsToHide: [],
};


/**
 * Configs for HelmPHR theme
 */
const leedsPHRThemeConfigs = {
  isLeedsPHRTheme: true,
  topHeader: {
    showNotifications: false,
    showQuestions: true,
    showSearch: false,
    showUserPanel: true,
  },
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
    'vaccinations': true,
    'allergies': true,
    'topThreeThings': true,
    'contacts': false,
  },
  dashboardBeing: {},
  isShowUserPhoto: false,
  isShowUserProfileSettings: false,
  isShowUserProfileSpecification: false,
  patientsSummaryTitles: {
    'diagnoses': 'Problems / Issues',
    'medications': 'Medications',
    'vaccinations': 'Vaccinations',
    'allergies': 'Allergies',
    'topThreeThings': 'Top Three Things',
    'contacts': 'Contacts',
  },
  patientsSummaryDetailsTitles: {
    'diagnoses': 'Problem / Issue',
    'medications': 'Medication',
    'allergies': 'Allergy',
    'contacts': 'Contact',
    'vaccinations': 'Vaccination',
    'topThreeThings': 'Top Three Things',
  },
  detailsToHide: {
    'allergies': ['causeCode', 'causeTerminology'],
    'diagnoses': ['terminology', 'code'],
    'medications': ['doseTiming', 'doseAmount'],
  },
  buttonsToHide: {
    'diagnoses': ['create', 'edit'],
    'medications': ['create', 'edit', 'cancel', 'suspend', 'order'],
    'allergies': ['create', 'edit'],
    'vaccinations': ['create', 'edit'],
  },
  panelsToHide: {
    'medications': ['history', 'prescription', 'warnings'],
  },
  corePluginsToHide: ['contacts'],
};

export const themeConfigs = mainThemeConfigs;
