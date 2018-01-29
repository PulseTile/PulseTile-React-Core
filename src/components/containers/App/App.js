import React, { Component } from 'react';
import classNames from 'classnames';
import LoadingBar from 'react-redux-loading-bar'
import { connect } from 'react-redux';
import _ from 'lodash/fp';
import { withRouter } from 'react-router-dom';

import { requestErrorSelector, initialiseSelector } from './selectors';
import TopHeader from '../TopHeader/TopHeader';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../../presentational/Footer/Footer';
import MainSpinner from '../MainSpinner/MainSpinner';
import HandleErrors from '../HandleErrors/HandleErrors';

import '../../../styles/main.scss';

@withRouter
@connect(requestErrorSelector)
@connect(initialiseSelector)
export default class App extends Component {
  render() {
    const { requestError, initialiseData } = this.props;
    const isTouchDevice = (this.props.isTouchDevice) ? 'touch-device' : ('ontouchstart' in window) ? 'touch-device' : 'is-not-touch-device';
    return (
      <div className="page">
        <LoadingBar className="loading-bar" />
        {(!requestError.initialiseError && !_.isEmpty(initialiseData)) ? <MainSpinner /> : null }
        {!_.isEmpty(requestError) ? <HandleErrors /> : null }
        { !_.isEmpty(initialiseData) ? <div className={classNames('wrapper', isTouchDevice)}>
          <header className="header">
            <TopHeader />
            <Header />
          </header>
          <Main />
        </div> : null }
        <Footer />
      </div>
    )
  }
}
