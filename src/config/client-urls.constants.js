import { get } from 'lodash';
import { themeConfigs } from '../themes.config';
import { themePluginsPages } from '../components/theme/config/plugins';
import { getFilterPlugins } from '../utils/themeSettings-helper';

export const clientUrls = {
  ROOT: '/',
  CHARTS: '/charts',
  PATIENTS: '/patients',
  PATIENTS_FULL_DETAILS: '/patients-full-details',
  SEARCH_REPORT: '/search-report',
  USER_PROFILE: '/profile',
  PATIENTS_SUMMARY: 'patients-summary',
  DIAGNOSES: 'diagnoses',
  ALLERGIES: 'allergies',
  CONTACTS: 'contacts',
  MEDICATIONS: 'medications',
};

const problemsTitle = get(themeConfigs.patientsSummaryTitles, 'diagnoses', 'Problems / Diagnosis');
const contactsTitle = get(themeConfigs.patientsSummaryTitles, 'contacts', 'Contacts');
const allergiesTitle = get(themeConfigs.patientsSummaryTitles, 'allergies', 'Allergies');
const medicationsTitle = get(themeConfigs.patientsSummaryTitles, 'medications', 'Medications');

const corePluginsPages = {
  'allergies': {
    breadcrumbs: [{
      title: allergiesTitle,
      state: '/allergies',
    }],
  },
  'diagnoses': {
    breadcrumbs: [{
      title: problemsTitle,
      state: '/diagnoses',
    }],
  },
  'contacts': {
    breadcrumbs: [{
      title: contactsTitle,
      state: '/contacts',
    }],
  },
  'medications': {
    breadcrumbs: [{
      title: medicationsTitle,
      state: '/medications',
    }],
  },
};
const filterHiddenPlugins = getFilterPlugins(corePluginsPages);
export const pluginsPages = Object.assign(filterHiddenPlugins, themePluginsPages);

const addPluginsPagesToLists = (list, breadcrumbsBefore) => {
  for (const nameOfPage in pluginsPages) {
    const breadcrumbs = breadcrumbsBefore.concat(pluginsPages[nameOfPage].breadcrumbs);
    list[nameOfPage] = { breadcrumbs };
  }
};

export const mainPagesTitles = {
  '/': {
    breadcrumbs: [{
      title: 'System Dashboard',
      state: '/',
    }],
    headerTitle: 'System Dashboard',
  },
  'charts': {
    breadcrumbs: [{
      title: 'System Dashboard',
      state: '/charts',
    }],
    headerTitle: 'System Dashboard',
  },
  'patients': {
    breadcrumbs: [{
      title: 'Home',
      state: '/',
    }, {
      title: 'Patient Listings',
      state: '/patients',
    }],
    headerTitle: 'Patients Lists',
  },
  'profile': {
    breadcrumbs: [{
      title: 'Patient Information',
      state: '/profile',
    }],
    headerTitle: 'Personal Information',
  },
  'search-report': {
    breadcrumbs: [{
      title: 'Home',
      state: '/',
    }, {
      title: 'Search Report',
      state: '/search-report',
    }],
    headerTitle: 'System Dashboard',
  },
  'patients-summary': {
    breadcrumbs: [{
      title: 'Patient Listings',
      state: '/patients',
    }, {
      title: themeConfigs.patientsSummaryPageName,
      state: '/patients-summary',
    }],
  },
  'patients-full-details': {
    breadcrumbs: [],
    headerTitle: 'Search results',
  },
};
addPluginsPagesToLists(mainPagesTitles, [{
  title: 'Patient Listings',
  state: '/patients',
}, {
  title: themeConfigs.patientsSummaryPageName,
  state: '/patients-summary',
}]);

export const mainPagesTitlesForPatients = {
  '/': {
    breadcrumbs: [{
      title: 'Patient Summary',
      state: '/patients-summary',
    }],
    headerTitle: 'Patient Summary',
  },

  'profile': {
    breadcrumbs: [{
      title: 'Patient Information',
      state: '/profile',
    }],
    headerTitle: 'Personal Information',
  },
  'patients-summary': {
    breadcrumbs: [{
      title: themeConfigs.patientsSummaryPageName,
      state: '/patients-summary',
    }],
  },
};
addPluginsPagesToLists(mainPagesTitlesForPatients, [{
  title: themeConfigs.patientsSummaryPageName,
  state: '/patients-summary',
}]);
