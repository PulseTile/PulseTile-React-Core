import React, { PureComponent } from 'react';
import classNames from 'classnames';
import LoadingBar from 'react-redux-loading-bar'
import { connect } from 'react-redux';
import _ from 'lodash/fp';

import TopHeader from '../TopHeader/TopHeader';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../../presentational/Footer/Footer';
import MainSpinner from '../MainSpinner/MainSpinner';
import initialiseSelector from './selectors';

import '../../../styles/main.scss';

@connect(initialiseSelector)
export default class App extends PureComponent {
  render() {
    const { initialiseData } = this.props;
    const isTouchDevice = ('ontouchstart' in window) ? 'touch-device' : 'is-not-touch-device';

    return (
      <div className="page">
        <LoadingBar className="loading-bar" />
        <MainSpinner />
        <div className={classNames('wrapper', isTouchDevice)}>
          <header className="header">
            <TopHeader />
            <Header />
          </header>
          {!_.isEmpty(initialiseData) ? <Main /> : null }
        </div>
        <Footer />
      </div>
    )
  }
}
