import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash/fp';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux'

import routersSelector from './selectors';
import { mainPagesTitles } from '../../../../config/client-urls.constants'

const mapDispatchToProps = dispatch => ({ actions: bindActionCreators({ push }, dispatch) });

@connect(routersSelector, mapDispatchToProps)
export default class HeaderTitle extends PureComponent {
  static propTypes = {
    router: PropTypes.shape().isRequired,
  };

  getPageTitle = hash => _.getOr(mainPagesTitles['/'].headerTitle, [hash, 'headerTitle'])(mainPagesTitles);

  render() {
    const { router } = this.props;
    const routerHash = (router.location.hash.split('?')[0]).split('#/')[1];

    return (
      <div className="wrap-header-title">
        <div className="container-fluid">
          <div className="header-title">{this.getPageTitle(routerHash)}</div>
        </div>
      </div>
    )
  }
}
