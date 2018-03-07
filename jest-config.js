module.exports = {
  roots: ['<rootDir>/src/components'],
  verbose: false,
  // testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^image![a-zA-Z0-9$_-]+$': 'GlobalImageStub',
    '\\.(css|scss)$': 'identity-obj-proxy',
  },
  transform: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/fileTransformer.js',
    '^.+\\.js$': 'babel-jest',
  },
  setupFiles: ['./test-configs/setup-jest.js'],
  collectCoverageFrom: [
    // Coverage files
    '**/src/components/presentational/**.{js,jsx}',
    '**/src/components/form-fields/**.{js,jsx}',
    '**/src/components/ui-elements/**.{js,jsx}',
    '**/src/components/containers/**.{js,jsx}',
    '**/src/components/plugin-page-component/**.{js,jsx}',
    '**/src/components/pages/**.{js,jsx}',

    // Temporarily ignore coverage files
    // '!**/src/components/pages/_name_/**.{js}',

    // Ignore coverage files
    '!**/src/components/pages/Drawings/drawings-page-component/**.{js}',
    '!**/src/components/containers/AsyncComponent/**{AsyncComponent.js}',
    '!**/src/components/**{clinical-statements-helper.js}',
    '!**/src/components/**{viltals-helpers.utils.js}',
    '!**/src/components/**{proms-helpers.utils.js}',
    '!**/src/components/**{events-helpers.utils.js}',
    '!**/src/components/**{selectors.js}',
    '!**/src/components/**{forms.config.js}',
    '!**/src/components/**{forms.validation.js}',
    '!**/src/components/**{table-columns.config.js}',
    '!**/src/components/**{default-values.config.js}',
    '!**/src/components/**{validation.js}',
    '!**/src/components/**{values-names.config.js}',
    '!**/src/components/**{options-for-select.config.js}',
    '!**/src/components/**{theme-config.js}',
    '!**/src/components/**{index.js}',
    '!**/src/components/**{ducks/**}',
    '!**/node_modules/**',
    '!**/dist/**',
    '!**/videochat/**',
  ],
  collectCoverage: true,
  bail: true,
  snapshotSerializers: ['enzyme-to-json/serializer'],
  'notify': true,
  testEnvironmentOptions: {
    'url': 'http://localhost:3000/',
  },
};
