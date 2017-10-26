import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash/fp';
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux'

import routersSelector from './selectors';
import { mainPagesTitles, mainPagesTitlesForPatients } from '../../../config/client-urls.constants'
import { isIDCRRole } from '../../../utils/auth/auth-check-permissions';
import { sidebarConfig } from '../../../plugins.config'

const mapDispatchToProps = dispatch => ({ actions: bindActionCreators({ push }, dispatch) });

@connect(routersSelector, mapDispatchToProps)
class Breadcrumbs extends PureComponent {
  static propTypes = {
    router: PropTypes.shape().isRequired,
  };

  getRouterBreadcrumbs = (hash) => {
    const { userAccount } = this.props;
    if (isIDCRRole(userAccount)) {
      return _.getOr(null, [hash, 'breadcrumbs'])(mainPagesTitles);
    }
    return _.getOr(null, [hash, 'breadcrumbs'])(mainPagesTitlesForPatients);
  };

  render() {
    const { router, userAccount, patientSummeries } = this.props;
    let userId;
    if (patientSummeries !== undefined) {
      userId = patientSummeries.id
    }
    let breadcrumbs = null;
    const routingComponents = (router.location.hash.split('?')[0]).split('/');
    const statePatientsSummary = `/patients/${userId}/patients-summary`;

    const pluginsKeys = sidebarConfig.map((el) => {
      return el.key;
    });
    do {
      const routerHash = routingComponents.pop();
      const isPluginPage = (pluginsKeys.indexOf(routerHash) > (-1));
      breadcrumbs = this.getRouterBreadcrumbs(routerHash);

      if (isPluginPage && userAccount.role === 'IDCR') {
        breadcrumbs[1].state = statePatientsSummary;
      }
      if (isPluginPage && userAccount.role !== 'IDCR') {
        breadcrumbs[0].state = statePatientsSummary;
      }
      if (breadcrumbs) break
    } while (routingComponents.length);

    if (!breadcrumbs) {
      breadcrumbs = this.getRouterBreadcrumbs('/');
    }
    const lastItemBreadcrumbsIndex = breadcrumbs.length - 1;

    const breadcrumbItems = breadcrumbs.map((breadcrumb, index) =>
      <span key={_.uniqueId('__BreadcrumbsBlock__')}>
        { index !== lastItemBreadcrumbsIndex && <Link to={breadcrumb.state} className="breadcrumb-link">{breadcrumb.title}</Link> }
        { (index !== lastItemBreadcrumbsIndex && breadcrumbs.lenght === 1) && <span className="breadcrumb-link">{breadcrumb.title}</span> }
        { index !== lastItemBreadcrumbsIndex && <span className="breadcrumb-separate" /> }
        { index === lastItemBreadcrumbsIndex && <span className="breadcrumb-link active">{breadcrumb.title}</span> }
      </span>
    );

    return (
      !_.isEmpty(breadcrumbs) && <div className="wrap-breadcrumbs">
        <div className="container-fluid">
          <div className="breadcrumbs" key={_.uniqueId('__BreadcrumbsBlock__')}>
            {breadcrumbItems}
          </div>
        </div>
      </div>
    )
  }
}

export default Breadcrumbs;
