import React, { Component } from 'react';
import classNames from 'classnames';
import LoadingBar from 'react-redux-loading-bar';
import { connect } from 'react-redux';
import _ from 'lodash/fp';
import { withRouter } from 'react-router-dom';
import { compose, lifecycle } from 'recompose';

import { headerHasSearch, isLeedsPHRHeaderList, footerCopyright, footerHasShowSupportedByText } from '../../../themes.config';
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

export class App extends Component {
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
              isHasSearch={headerHasSearch}
            >
              {isLeedsPHRHeaderList ?
                <HeaderList items={[
                  <img src={headerImg1} alt="header img 1" />,
                  <img src={headerImg2} alt="header img 2" />,
                ]}
                />
                : <div />}
            </TopHeader>
            <Header />
          </header>
          <Main />
        </div> : null }
        <Footer
          copyright={footerCopyright}
          isShowSupportedBy={footerHasShowSupportedByText}
        />
      </div>
    )
  }
}

export default withRouter(compose(connect(requestErrorSelector), connect(initialiseSelector))(App))
