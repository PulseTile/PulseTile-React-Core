import { themeConfigs } from '../themes.config';
export const clientUrls = {
  ROOT: '/',
  CHARTS: '/charts',
  PATIENTS: '/patients',
  PATIENTS_FULL_DETAILS: '/patients-full-details',
  SEARCH_REPORT: '/search-report',
  USER_PROFILE: '/profile',
  PATIENTS_SUMMARY: 'patients-summary',
  RESULTS: 'results',
  DIAGNOSES: 'diagnoses',
  ALLERGIES: 'allergies',
  CONTACTS: 'contacts',
  CLINICAL_NOTES: 'clinicalNotes',
  PERSONAL_NOTES: 'personalNotes',
  VACCINATIONS: 'vaccinations',
  MEDICATIONS: 'medications',
  GENERIC_PLUGIN: 'genericPlugin',
  PROCEDURES: 'procedures',
  EVENTS: 'events',
  TEST_RESULTS: 'results',
  REFERRALS: 'referrals',
  ORDERS: 'orders',
  MDTS: 'mdt',
  DRAWINGS: 'drawings',
  VITALS: 'vitals',
  DOCUMENTS: 'documents',
  IMAGES: 'images',
  TRANSFERS_OF_CARE: 'transfer-of-care',
  TOP_THREE_THINGS: 'topThreeThings',
};

const pluginsPages = {
  'allergies': {
    breadcrumbs: [{
      title: 'Allergies',
      state: '/allergies',
    }],
  },
  'diagnoses': {
    breadcrumbs: [{
      title: 'Problems / Diagnoses',
      state: '/diagnoses',
    }],
  },
  'clinicalNotes': {
    breadcrumbs: [{
      title: 'Clinical Notes',
      state: '/clinicalNotes',
    }],
  },
  'personalNotes': {
    breadcrumbs: [{
      title: 'Personal Notes',
      state: '/personalNotes',
    }],
  },
  'contacts': {
    breadcrumbs: [{
      title: 'Contacts',
      state: '/contacts',
    }],
  },
  'vaccinations': {
    breadcrumbs: [{
      title: 'Vaccinations',
      state: '/vaccinations',
    }],
  },
  'genericPlugin': {
    breadcrumbs: [{
      title: 'Generic Plugin',
      state: '/genericPlugin',
    }],
  },
  'medications': {
    breadcrumbs: [{
      title: 'Medications',
      state: '/medications',
    }],
  },
  'procedures': {
    breadcrumbs: [{
      title: 'Procedures',
      state: '/procedures',
    }],
  },
  'events': {
    breadcrumbs: [{
      title: 'Events',
      state: '/events',
    }],
  },
  'results': {
    breadcrumbs: [{
      title: 'Test Results',
      state: '/results',
    }],
  },
  'referrals': {
    breadcrumbs: [{
      title: 'Referrals',
      state: '/referrals',
    }],
  },
  'orders': {
    breadcrumbs: [{
      title: 'Orders',
      state: '/orders',
    }],
  },
  'mdt': {
    breadcrumbs: [{
      title: 'MDT',
      state: '/mdt',
    }],
  },
  'drawings': {
    breadcrumbs: [{
      title: 'Drawings',
      state: '/drawings',
    }],
  },
  'vitals': {
    breadcrumbs: [{
      title: 'Vitals - NEWS',
      state: '/vitals',
    }],
  },
  'documents': {
    breadcrumbs: [{
      title: 'Documents',
      state: '/documents',
    }],
  },
  'images': {
    breadcrumbs: [{
      title: 'Images',
      state: '/images',
    }],
  },
  'transfer-of-care': {
    breadcrumbs: [{
      title: 'Transfers Of Care',
      state: '/transfers-of-care',
    }],
  },
  'topThreeThings': {
    breadcrumbs: [{
      title: 'Top 3 Things',
      state: '/topThreeThings',
    }],
  },
};


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
