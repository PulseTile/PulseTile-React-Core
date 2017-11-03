export const clientUrls = {
  ROOT: '/',
  CHARTS: '/charts',
  PATIENTS: '/patients',
  PATIENTS_FULL_DETAILS: '/patients-full-details',
  USER_PROFILE: '/profile',
  PATIENTS_SUMMARY: 'patients-summary',
  ORDERS: 'orders',
  RESULTS: 'results',
  VITALS: 'vitals',
  DIAGNOSES: 'diagnoses',
	ALLERGIES: 'allergies',
	CONTACTS: 'contacts',
	CLINICAL_NOTES: 'clinicalNotes',
  VACCINATIONS: 'vaccinations',
	GENERIC_PLUGIN: 'genericPlugin',
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
};

const addPluginsPagesToLists = (list, breadcrumbsBefore) => {
  for (let nameOfPage in pluginsPages) {
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
  },
  'patients-summary': {
    breadcrumbs: [{
      title: 'Patient Listings',
      state: '/patients',
    }, {
      title: 'Patient Summary',
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
  title: 'Patient Summary',
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
      title: 'Patient Summary',
      state: '/patients-summary',
    }],
  },
};
addPluginsPagesToLists(mainPagesTitlesForPatients, [{
  title: 'Patient Summary',
  state: '/patients-summary',
}]);
