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
import HeaderList from '../HeaderList/HeaderList';
import headerImg1 from '../../../assets/images/leeds.png'
import headerImg2 from '../../../assets/images/nhs.png'

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
            <TopHeader
              isHasSearch={false}
            >
              <HeaderList items={[
                <img src={headerImg1} alt="header img 1" />,
                <img src={headerImg2} alt="header img 2" />,
              ]}
              />
            </TopHeader>
            <Header />
          </header>
          <Main />
        </div> : null }
        <Footer
          copyright={'Copyright 2017 Ripple Foundation CIC Ltd. All rights reserved'}
          isShowSupportedBy={false}
        />
      </div>
    )
  }
}
