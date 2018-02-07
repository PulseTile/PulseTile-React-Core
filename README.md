# PulseTile-React

[![travis build](https://img.shields.io/travis/PulseTile/PulseTile-React.svg?style=flat-square)](https://travis-ci.org/PulseTile/PulseTile-React)
[![Codecov](https://img.shields.io/codecov/c/github/PulseTile/PulseTile-React/develop.svg?style=flat-square)](https://codecov.io/gh/PulseTile/PulseTile-React)
[![GitHub release](https://img.shields.io/github/release/PulseTile/PulseTile-React.svg?style=flat-square)](https://github.com/PulseTile/PulseTile-React/releases)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square)](https://github.com/semantic-release/semantic-release)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=flat-square)](http://commitizen.github.io/cz-cli/)

PulseTile framework - developed with ReactJS

---

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

To develop and run the application locally you must have the following installed:

```
 - NodeJS
 - A running version of The Ripple Middleware listening on port 19191
```
### Installing

    #clone
    $ git clone https://github.com/PulseTile/PulseTile-React.git
    $ cd PulseTile-React
    # install dependencies
    $ npm install
    # start
    $ npm start

## Building & Deployment

PulseTile uses Webpack to build and launch the development environment. After you have installed all dependencies, you may run the app. Running `npm start` will bundle the app with `webpack`, launch a development server, and watch all files. The port will be displayed in the terminal.

Just simply run `npm start` - this will also watch changes.

#### NPM Scripts
Here's a list of available scripts:
* `$ npm run build`
  * it runs Webpack, which will transpile, concatenate, and compress (collectively, "bundle") all assets and modules into `dist/bundle.js`. It also prepares `index.html` to be used as application entry point, links assets and created dist version of our application.
* `$ npm start`
  * it starts a dev server via `webpack-dev-server`, serving the client folder with watching source file change.
* `$ npm run lint`
  * it lints codebase using [Eslint](http://eslint.org/)
* `$ npm run test`
  * it runs unit tests
* `$ npm run test-update`
  * it will run unit tests which will update the snapshots. It should be used mostly in development mode.
