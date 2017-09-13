import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux'

import routersSelector from './selectors';
import { mainPagesTitles } from '../../../config/client-urls.constants'

const mapDispatchToProps = dispatch => ({ actions: bindActionCreators({ push }, dispatch) });

@connect(routersSelector, mapDispatchToProps)
class HeaderToolbar extends PureComponent {
  static propTypes = {
    router: PropTypes.shape().isRequired,
  };

  render() {
    const { router } = this.props;
    const routerHash = (router.location.hash.split('?')[0]).split('#')[1];

    const routerHeaderToolbar = (state) => {
      const headerToolbar = mainPagesTitles[state].headerTitle;

      return headerToolbar;
    };

    return (
      <div className="wrap-header-title">
        <div className="container-fluid">
          <div className="header-title">{routerHeaderToolbar(routerHash)}</div>
        </div>
      </div>
    )
  }
}

export default HeaderToolbar;
