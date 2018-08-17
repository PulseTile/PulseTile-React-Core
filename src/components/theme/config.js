import vaccinations from './plugins/Vaccinations/index';

/**
 * The list of none-core plugins which are included to the current theme
 *
 * @return array
 */
export const themePlugins = [

    vaccinations,

];

/**
 * The list of clients URLs for none-core plugins
 *
 * @return array
 */
export const themeClientUrls = {

    VACCINATIONS: 'vaccinations',

};

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
