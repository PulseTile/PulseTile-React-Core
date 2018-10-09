/**
 * Configs for Main (green) theme - default theme
 */
const mainThemeConfigs = {
  isLeedsPHRTheme: false,
  topHeader: {
    showBackButton: true,
    showHomeButton: true,
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
export const themeConfigs = mainThemeConfigs;
