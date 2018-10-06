import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { get } from 'lodash';

import MainLogo from '../../presentational/MainLogo/MainLogo';
import NavSearch from '../NavSearch/NavSearch';
import UserPanel from '../UserPanel/UserPanel';
import PTButton from '../../ui-elements/PTButton/PTButton';
import { userAccountSelector, patientInfoSelector } from './selectors';
import { clientUrls } from '../../../config/client-urls.constants';

import { themeConfigs } from '../../../themes.config';

const mapDispatchToProps = dispatch => ({ actions: bindActionCreators({ push }, dispatch) });

@connect(userAccountSelector, mapDispatchToProps)
@connect(patientInfoSelector, mapDispatchToProps)
class TopHeader extends PureComponent {

  static contextTypes = {
    router: PropTypes.shape({
      history: PropTypes.object,
      location: PropTypes.object,
    }),
  };

  static defaultProps = {
    isHasSearch: true,
  };

  routeGoBack = () => {
    this.context.router.history.goBack()
  };

  routeGoBack = () => {
    // TODO: Need to redirect to patient summary here.
    
  };

  topLeftButton = (isShowPreviousBtn) => {
    if( isShowPreviousBtn ){
      switch( themeConfigs.patientSummaryTopLeftButtonBehaviour ){
        case 'home':
          return <PTButton id="icon-home" className="btn-header btn-header-prev" onClick={this.routeGoHome}><i className="fa fa-home"></i></PTButton>;
          break;
        case 'back':
        default:
          return <PTButton id="icon-home" className="btn-header btn-header-prev" onClick={this.routeGoBack}><i className="fa fa-arrow-left"></i></PTButton>;
          break;
      }
    }
  }

  render() {
    const { userAccount, router, patientsInfo, isHasSearch, children } = this.props;
    const routerHash = (router.location.hash.split('?')[0]).split('#')[1];
    const isShowPreviousBtn = (!(routerHash === clientUrls.ROOT || routerHash === clientUrls.CHARTS));

    return (
      <div className="navbar">
        { this.topLeftButton(isShowPreviousBtn) }
        <MainLogo
          patientsInfo={patientsInfo}
          userAccount={userAccount}
        />
        <UserPanel router={router} />
        { children ? <div className="navbar-space-right">
          { children }
        </div> : null }
        {isHasSearch ? <NavSearch userAccount={userAccount} /> : null}
      </div>
    )
  }
}

export default TopHeader;
