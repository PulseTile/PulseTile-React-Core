import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash/fp';
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux'

import routersSelector from './selectors';
import { mainPagesTitles } from '../../../config/client-urls.constants'

const mapDispatchToProps = dispatch => ({ actions: bindActionCreators({ push }, dispatch) });

const whiteListEndpoint = ['allergies'];

@connect(routersSelector, mapDispatchToProps)
class Breadcrumbs extends PureComponent {
  static propTypes = {
    router: PropTypes.shape().isRequired,
  };

  getRouterBreadcrumbs = hash => _.getOr(mainPagesTitles['/'].breadcrumbs, [hash, 'breadcrumbs'])(mainPagesTitles);

  correctEndpoint = (routerHash) => {
    const newHash = routerHash.split('/');
    newHash.indexOf('allergies', 0);
    return newHash;
  };

  render() {
    const { router } = this.props;
    const routerHash = _.last((router.location.hash.split('?')[0]).split('/'));

    const statePatientsSummary = `${window.location.hash.split('/allergies')[0].split('#')[1]}/patients-summary`;
    const breadcrumbs = this.getRouterBreadcrumbs(routerHash);
    if (routerHash === 'allergies') {
      breadcrumbs[1].state = statePatientsSummary;
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
