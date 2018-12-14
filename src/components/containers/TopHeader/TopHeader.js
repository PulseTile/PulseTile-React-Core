import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { get } from 'lodash';
import { Link } from 'react-router-dom';

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

  render() {
    const { userAccount, router, patientsInfo, isHasSearch, children } = this.props;
    const routerHash = (router.location.hash.split('?')[0]).split('#')[1];
    const isShowPreviousBtn = (!(routerHash === clientUrls.ROOT || routerHash === clientUrls.CHARTS));
    const routerHashArray = routerHash.split('/');
    const userId = get(routerHashArray, '[2]', null);
    const pageUrl = routerHashArray.pop();
    const patientSummaryURL = `${clientUrls.PATIENTS}/${userId}/${clientUrls.PATIENTS_SUMMARY}`;
    const userRole = get(userAccount, 'role', null);
    const homepageLink = ('PHR' === userRole) ? patientSummaryURL : clientUrls.ROOT;
    return (
      <div className="navbar">
        {isShowPreviousBtn ? <HomeButton className="btn-header btn-header-prev btn-home" pageUrl={pageUrl} homepageLink={homepageLink} /> : null}
        {isShowPreviousBtn ? <BackButton className="btn-header btn-header-prev btn-back" routeGoBack={this.routeGoBack} /> : null}
        <MainLogo
          patientsInfo={patientsInfo}
          userAccount={userAccount}
        />
        <UserPanel pageUrl={pageUrl} homepageLink={patientSummaryURL} />
          { children ?
          <div className="navbar-space-right">
            { children }
          </div>
            : null
          }
        {isHasSearch ? <NavSearch userAccount={userAccount} /> : null}
      </div>
    );
  }
}

const BackButton = ({ className, routeGoBack }) => {
  if (get(themeConfigs, 'topHeader.showBackButton', false)) {
    return (
      <PTButton id="icon-home" aria-label="Back" className={className} onClick={routeGoBack}>
        <i className="fa fa-arrow-left" />
      </PTButton>
    );
  }
  return null;
};
BackButton.propTypes = {
  className: PropTypes.string,
  routeGoBack: PropTypes.func,
};
BackButton.defaultProps = {
  className: '',
  routeGoBack: function () {},
};

const HomeButton = ({ className, homepageLink }) => {
  if (get(themeConfigs, 'topHeader.showHomeButton', false)) {
    return (
      <Link to={homepageLink}>
        <PTButton id="icon-home" aria-label="Home" className={className}>
          <i className="fa fa-home" />
        </PTButton>
      </Link>
    );
  }
  return null;
};
HomeButton.propTypes = {
  className: PropTypes.string,
  homepageLink: PropTypes.string,
};
HomeButton.defaultProps = {
  className: '',
  homepageLink: '',
};

export default TopHeader;
