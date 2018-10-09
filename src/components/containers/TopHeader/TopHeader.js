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
    const homepageLink = `${clientUrls.PATIENTS}/${userId}/${clientUrls.PATIENTS_SUMMARY}`;
    return (
      <div className="navbar">
        {isShowPreviousBtn ? <HomeButton pageUrl={pageUrl} homepageLink={homepageLink} /> : null}
        {isShowPreviousBtn ? <BackButton routeGoBack={this.routeGoBack} /> : null}
        <MainLogo
          patientsInfo={patientsInfo}
          userAccount={userAccount}
        />
        <UserPanel pageUrl={pageUrl} homepageLink={homepageLink} />
        { children ? <div className="navbar-space-right">
          { children }
        </div> : null }
        {isHasSearch ? <NavSearch userAccount={userAccount} /> : null}
      </div>
    )
  }
}

const BackButton = ({ routeGoBack }) => {
  if (get(themeConfigs, 'topHeader.showBackButton', false)) {
    return (
      <PTButton id="icon-home" className="btn-header btn-header-prev" onClick={routeGoBack}>
        <i className="fa fa-arrow-left" />
      </PTButton>
    );
  }
  return null;
};
BackButton.propTypes = {
  routeGoBack: PropTypes.func,
};
BackButton.defaultProps = {
  routeGoBack: function () {},
};

const HomeButton = ({ pageUrl, homepageLink }) => {
  if (get(themeConfigs, 'topHeader.showHomeButton', false) && pageUrl === clientUrls.PATIENTS_SUMMARY) {
    return (
      <Link to={homepageLink}>
        <PTButton id="icon-home" className="btn-header btn-header-prev">
          <i className="fa fa-home" />
        </PTButton>
      </Link>
    );
  }
  return null;
};
HomeButton.propTypes = {
  pageUrl: PropTypes.string,
  homepageLink: PropTypes.string,
};
HomeButton.defaultProps = {
  pageUrl: '',
  homepageLink: '',
};

export default TopHeader;
