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
  CLINICAL_NOTES: 'clinicalNotes',
  VACCINATIONS: 'vaccinations',
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
  'allergies': {
    breadcrumbs: [{
      title: 'Patient Listings',
      state: '/patients',
    }, {
      title: 'Patient Summary',
      state: '/patients-summary',
    }, {
      title: 'Allergies',
      state: '/allergies',
    }],
  },
  'diagnoses': {
    breadcrumbs: [{
      title: 'Patient Listings',
      state: '/patients',
    }, {
      title: 'Patient Summary',
      state: '/patients-summary',
    }, {
      title: 'Problems / Diagnoses',
      state: '/diagnoses',
    }],
  },
  'clinicalNotes': {
    breadcrumbs: [{
      title: 'Patient Listings',
      state: '/patients',
    }, {
      title: 'Patient Summary',
      state: '/patients-summary',
    }, {
      title: 'Clinical Notes',
      state: '/clinicalNotes',
    }],
  },
  'vaccinations': {
    breadcrumbs: [{
      title: 'Patient Listings',
      state: '/patients',
    }, {
      title: 'Patient Summary',
      state: '/patients-summary',
    }, {
      title: 'Vaccinations',
      state: '/vaccinations',
    }],
  },
};

export const mainPagesTitlesForPatients = {
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
      title: 'Patient Summary',
      state: '/patients-summary',
    }],
  },
  'patients-full-details': {
    breadcrumbs: [],
    headerTitle: 'Search results',
  },
  'allergies': {
    breadcrumbs: [{
      title: 'Patient Summary',
      state: '/patients-summary',
    }, {
      title: 'Allergies',
      state: '/allergies',
    }],
  },
  'diagnoses': {
    breadcrumbs: [{
      title: 'Patient Summary',
      state: '/patients-summary',
    }, {
      title: 'Problems / Diagnoses',
      state: '/diagnoses',
    }],
  },
  'clinicalNotes': {
    breadcrumbs: [{
      title: 'Patient Listings',
      state: '/patients',
    }, {
      title: 'Patient Summary',
      state: '/patients-summary',
    }, {
      title: 'Clinical Notes',
      state: '/clinicalNotes',
    }],
  },
  'vaccinations': {
    breadcrumbs: [{
      title: 'Patient Summary',
      state: '/patients-summary',
    }, {
      title: 'Vaccinations',
      state: '/vaccinations',
    }],
  },
};
