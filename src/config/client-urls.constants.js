export const clientUrls = {
  ROOT: '/',
  CHARTS: '/charts',
  PATIENTS: '/patients',
};

export const mainPagesTitles = {
  '/': {
    breadcrumbs: [{
      title: 'System Dashboard',
      state: '/',
    }]
  },
  '/charts': {
    breadcrumbs: [{
      title: 'System Dashboard',
      state: '/charts',
    }]
  },
  '/patients': {
    breadcrumbs: [{
      title: 'Home',
      state: '/',
    }, {
      title: 'Patient Listings',
      state: '/patients',
    }]
  },
  '/profile': {
    breadcrumbs: [{
      title: 'Patient Information',
      state: '/profile',
    }]
  },
  '/search-report': {
    breadcrumbs: [{
      title: 'Home',
      state: '/',
    }, {
      title: 'Search Report',
      state: '/search-report',
    }]
  },
  '/patients-summary': {
    breadcrumbs: [{
      title: 'Patient Listings',
      state: '/patients'
    }, {
      title: 'Patient Summary',
      state: '/patients-summary'
    }]
  }
};
