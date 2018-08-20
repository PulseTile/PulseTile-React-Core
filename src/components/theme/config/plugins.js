import vaccinations from '../plugins/Vaccinations/index';

/**
 * The list of none-core plugins which are included to the current theme
 *
 * @return array
 */
export const themePlugins = [
    vaccinations,
];

/**
 * The list of pages for none-core plugins
 *
 * @return array
 */
export const themePluginsPages = {
    'vaccinations': {
      breadcrumbs: [{
        title: 'Vaccinations',
        state: '/vaccinations',
      }],
    },
};

/**
 *
 */
export const themePatientSummaryConfig = [
    {
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
 * Data for mock test store
 */
export const testStoreContent = {
    patientsVaccinations: {},
    // patientsTopThreeThings: {},
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
