import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux'

import MainLogo from '../MainLogo/MainLogo';
import NavSearch from '../../containers/NavSearch/NavSearch';
import UserPanel from '../../containers/UserPanel/UserPanel';
import PTButton from '../../ui-elements/PTButton/PTButton';
import routersSelector from './selectors';
import { clientUrls } from '../../../config/client-urls.constants'

const mapDispatchToProps = dispatch => ({ actions: bindActionCreators({ push }, dispatch) });

@connect(routersSelector, mapDispatchToProps)
class TopHeader extends PureComponent {
  static contextTypes = {
    router: PropTypes.shape({
      history: PropTypes.object,
      location: PropTypes.object,
    }),
  };

  routeGoBack = () => {
    this.context.router.history.goBack()
  };

  render() {
    const { router } = this.props;
    const routerHash = (router.location.hash.split('?')[0]).split('#')[1];
    const isShowPreviousBtn = (!(routerHash === clientUrls.ROOT || routerHash === clientUrls.CHARTS));

    return (
      <div className="navbar">
        { isShowPreviousBtn ? <PTButton className="btn-header btn-header-prev" onClick={this.routeGoBack}>
          <i className="fa fa-arrow-left" />
        </PTButton> : null }
        <MainLogo />
        <UserPanel />
        <NavSearch />
      </div>
    )
  }
}

export default TopHeader;
