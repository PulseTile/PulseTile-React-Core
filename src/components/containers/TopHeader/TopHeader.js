import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import MainLogo from '../../presentational/MainLogo/MainLogo';
import NavSearch from '../NavSearch/NavSearch';
import UserPanel from '../UserPanel/UserPanel';
import UserTour from '../UserTour';
import PTButton from '../../ui-elements/PTButton/PTButton';
import { userAccountSelector, patientInfoSelector } from './selectors';
import { clientUrls } from '../../../config/client-urls.constants';

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

  state = {
    isTourRun: false,
  };

  routeGoBack = () => {
    this.context.router.history.goBack()
  };

  runTour = () => {
    this.setState({
        isTourRun: !this.state.isTourRun,
    });
  };

  render() {
    const { userAccount, router, patientsInfo, isHasSearch, children } = this.props;
    const { isTourRun } = this.state;
    const routerHash = (router.location.hash.split('?')[0]).split('#')[1];
    const isShowPreviousBtn = (!(routerHash === clientUrls.ROOT || routerHash === clientUrls.CHARTS));
    return (
      <div className="navbar">
        { isShowPreviousBtn ? <PTButton id="icon-home" className="btn-header btn-header-prev" onClick={this.routeGoBack}>
          <i className="fa fa-arrow-left" />
        </PTButton> : null }
        <MainLogo
          patientsInfo={patientsInfo}
          userAccount={userAccount}
        />
        <UserPanel runTour={this.runTour} />
        <UserTour run={isTourRun} />
        { children ? <div className="navbar-space-right">
          { children }
        </div> : null }
        {isHasSearch ? <NavSearch userAccount={userAccount} /> : null}
      </div>
    )
  }
}

export default TopHeader;
