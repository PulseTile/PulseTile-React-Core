module.exports = {
  verbose: true,
  modulePaths: [
    '__stubs__',
  ],
  moduleNameMapper: {
    '^image![a-zA-Z0-9$_-]+$': 'GlobalImageStub',
    '^[./a-zA-Z0-9$_-]+\\.png$': '<rootDir>/RelativeImageStub.js',
    'module_name_(.*)': '<rootDir>/substituted_module_$1.js',
  },
  transform: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/fileTransformer.js',
    '^.+\\.js$': 'babel-jest',
  },
  collectCoverageFrom: [
    '**/src/components/**.{js,jsx}',
    '!**/node_modules/**',
    '!**/dist/**',
  ],
  collectCoverage: true,
};
