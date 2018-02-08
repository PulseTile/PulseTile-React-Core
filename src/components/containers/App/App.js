import React, { Component } from 'react';
import classNames from 'classnames';
import LoadingBar from 'react-redux-loading-bar';
import { connect } from 'react-redux';
import _ from 'lodash/fp';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { themeConfigs } from '../../../themes.config';
import { requestErrorSelector, patientInfoSelector } from './selectors';
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
    const { requestError, patientsInfo } = this.props;
    const isTouchDevice = (this.props.isTouchDevice) ? 'touch-device' : ('ontouchstart' in window) ? 'touch-device' : 'is-not-touch-device';
    return (
      <div className="page">
        <LoadingBar className="loading-bar" />
        {!_.isEmpty(requestError) ? <HandleErrors /> : <MainSpinner /> }
        {!_.isEmpty(patientsInfo) ? <div>
          <div className={classNames('wrapper', isTouchDevice)}>
            <header className="header">
              <TopHeader
                isHasSearch={themeConfigs.headerHasSearch}
              >
                {themeConfigs.isLeedsPHRHeaderList ?
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
          </div>
          <Footer
            copyright={themeConfigs.footerCopyright}
            isShowSupportedBy={themeConfigs.footerHasShowSupportedByText}
          />
        </div> : null}
      </div>
    )
  }
}

export default withRouter(compose(connect(requestErrorSelector), connect(patientInfoSelector))(App))
