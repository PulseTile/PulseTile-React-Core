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
import ExtraPlugins from '../../theme/components/ExtraPlugins';
import { image } from './HeaderImage';

import '../../../config/styles';

export class App extends Component {
  render() {
    const { requestError, patientsInfo } = this.props;
    const isTouchDevice = (this.props.isTouchDevice) ? 'touch-device' : ('ontouchstart' in window) ? 'touch-device' : 'is-not-touch-device';
    return (
      <div className="page">
        <LoadingBar className="loading-bar" />
        {!_.isEmpty(requestError) ? <HandleErrors /> : <MainSpinner /> }
        {!_.isEmpty(patientsInfo) ? <div style={{height: '100%'}}>
          <div className={classNames('wrapper', isTouchDevice)}>
            <header className="header">
              <TopHeader
                isHasSearch={themeConfigs.headerHasSearch}
              >
                {themeConfigs.isLeedsPHRHeaderList ?
                  <HeaderList items={[
                    <img src={image} alt="header img 2" />,
                  ]}
                  />
                  : <div />}
              </TopHeader>
              <Header />
            </header>
            <Main />
            <ExtraPlugins />
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
