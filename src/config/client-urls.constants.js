import { themeConfigs } from '../themes.config';

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

  // These plugins were extracted and relocated to SILVER
  // CLINICAL_NOTES: 'clinicalNotes',
  // CLINICAL_STATEMENTS: 'clinicalStatements',
  // DOCUMENTS: 'documents',
  // DRAWINGS: 'drawings',
  // EVENTS: 'events',
  // MDTS: 'mdt',
  // ORDERS: 'orders',
  // PERSONAL_NOTES: 'personalNotes',
  // PROCEDURES: 'procedures',
  // RESULTS: 'results',
  // REFERRALS: 'referrals',
  // TOP_THREE_THINGS: 'topThreeThings',
  // TRANSFERS_OF_CARE: 'transfer-of-care',
  // VACCINATIONS: 'vaccinations',
  // VITALS: 'vitals',

  // These plugins were extracted and relocated to BRONZE
  // PROMS: 'proms',
  // GENERIC_PLUGIN: 'genericPlugin',
  // DIARY_ENTRY: 'diaryEntry',
  // FEEDS: 'feeds',

  // These plugins were extracted and relocated to CARBON
  // IMAGES: 'images',
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
  'contacts': {
    breadcrumbs: [{
      title: 'Contacts',
      state: '/contacts',
    }],
  },
  'medications': {
    breadcrumbs: [{
      title: 'Medications',
      state: '/medications',
    }],
  },

  // These plugins were extracted and relocated to CARBON
  // 'images': {
  //     breadcrumbs: [{
  //         title: 'Images',
  //         state: '/images',
  //     }],
  // },

  // These plugins were extracted and relocated to SILVER
  // 'clinicalNotes': {
  //   breadcrumbs: [{
  //     title: 'Clinical Notes',
  //     state: '/clinicalNotes',
  //   }],
  // },
  // 'clinicalStatements': {
  //   breadcrumbs: [{
  //     title: 'Clinical Statements',
  //     state: '/clinicalStatements',
  //   }],
  // },
  // 'documents': {
  //   breadcrumbs: [{
  //     title: 'Documents',
  //     state: '/documents',
  //   }],
  // },
  // 'drawings': {
  //   breadcrumbs: [{
  //     title: 'Drawings',
  //     state: '/drawings',
  //   }],
  // },
  // 'events': {
  //   breadcrumbs: [{
  //     title: 'Events',
  //     state: '/events',
  //   }],
  // },
  // 'mdt': {
  //   breadcrumbs: [{
  //     title: 'Generic MDT',
  //     state: '/mdt',
  //   }],
  // },
  // 'orders': {
  //   breadcrumbs: [{
  //     title: 'Orders',
  //     state: '/orders',
  //   }],
  // },
  // 'personalNotes': {
  //   breadcrumbs: [{
  //     title: 'Personal Notes',
  //     state: '/personalNotes',
  //   }],
  // },
  // 'referrals': {
  //   breadcrumbs: [{
  //     title: 'Referrals',
  //     state: '/referrals',
  //   }],
  // },
  // 'procedures': {
  //   breadcrumbs: [{
  //     title: 'Procedures',
  //     state: '/procedures',
  //   }],
  // },
  // 'results': {
  //   breadcrumbs: [{
  //     title: 'Results',
  //     state: '/results',
  //   }],
  // },
  // 'topThreeThings': {
  //   breadcrumbs: [{
  //     title: 'Top 3 Things',
  //     state: '/topThreeThings',
  //   }],
  // },
  // 'transfer-of-care': {
  //   breadcrumbs: [{
  //     title: 'Transfers Of Care',
  //     state: '/transfers-of-care',
  //   }],
  // },
  // 'vaccinations': {
  //   breadcrumbs: [{
  //     title: 'Vaccinations',
  //     state: '/vaccinations',
  //   }],
  // },
  // 'vitals': {
  //   breadcrumbs: [{
  //     title: 'Vitals - NEWS',
  //     state: '/vitals',
  //   }],
  // },

  // These plugins were extracted and relocated to BRONZE
  // 'proms': {
  //   breadcrumbs: [{
  //     title: 'PROMs',
  //     state: '/proms',
  //   }],
  // },
  // 'genericPlugin': {
  //   breadcrumbs: [{
  //     title: 'Generic Plugin',
  //     state: '/genericPlugin',
  //   }],
  // },
  // 'diaryEntry': {
  //   breadcrumbs: [{
  //     title: 'Diary Entry',
  //     state: '/diaryEntry',
  //   }],
  // },
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
