# PulseTile-React
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
  * runs Webpack, which will transpile, concatenate, and compress (collectively, "bundle") all assets and modules into `dist/bundle.js`. It also prepares `index.html` to be used as application entry point, links assets and created dist version of our application.
* `$ npm start`
  * starts a dev server via `webpack-dev-server`, serving the client folder with watching source file change.
* `$ npm run lint`
  * lint codebase using [Eslint](http://eslint.org/)
