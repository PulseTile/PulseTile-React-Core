import topThreeThings from '../plugins/TopThreeThings/index';
import vaccinations from '../plugins/Vaccinations/index';

/**
 * The list of none-core plugins which are included to the current theme
 *
 * @return array
 */
export const themePlugins = [
  topThreeThings,
  vaccinations,
];

/**
 * This information is necessary for menu and URL
 *
 * @return array
 */
export const themePluginsPages = {
  'topThreeThings': {
    breadcrumbs: [{
      title: 'Top 3 Things',
      state: '/topThreeThings',
    }],
  },
  'vaccinations': {
    breadcrumbs: [{
      title: 'Vaccinations',
      state: '/vaccinations',
    }],
  },
};

/**
 * This information is necessary for Patient Summary
 *
 * @return array
 */
export const themePatientSummaryConfig = [{
    key: 'topThreeThings',
    title: 'Top 3 Things',
    titleCheckboxes: 'Top 3 Things',
    state: 'topThreeThings',
    nameCheckboxes: 'topThreeThings',
    imgPreview: '/images/patients-summary/top3.jpg',
    isDefaultSelected: true,
  }, {
    key: 'vaccinations',
    title: 'Vaccinations',
    titleCheckboxes: 'Vaccinations',
    state: 'vaccinations',
    nameCheckboxes: 'vaccinations',
    imgPreview: '/images/patients-summary/vaccinations.jpg',
    isDefaultSelected: true,
  },
];

/**
 * This information is necessary for Unit-tests
 */
export const testStoreContent = {
    patientsVaccinations: {},
    patientsTopThreeThings: {},

    // feeds: [{
    //   name: 'Leeds Live - Whats on',
    //   landingPageUrl: 'https://www.leeds-live.co.uk/best-in-leeds/whats-on-news/',
    //   rssFeedUrl: 'https://www.leeds-live.co.uk/best-in-leeds/whats-on-news/?service=rss',
    //   sourceId: 'testSourceID4',
    // }, {
    //   name: 'Leeds CC Local News',
    //   landingPageUrl: 'https://news.leeds.gov.uk',
    //   rssFeedUrl: 'https://news.leeds.gov.uk/tagfeed/en/tags/Leeds-news',
    //   sourceId: 'testSourceID5',
    // }],
};
