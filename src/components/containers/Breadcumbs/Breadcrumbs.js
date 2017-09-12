import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux'
import _ from 'lodash/fp';

import routersSelector from './selectors';
import { mainPagesTitles } from '../../../config/client-urls.constants'

const mapDispatchToProps = dispatch => ({ actions: bindActionCreators({ push }, dispatch) });

@connect(routersSelector, mapDispatchToProps)
class Breadcrumbs extends PureComponent {
  static propTypes = {
    router: PropTypes.shape().isRequired,
  };
  render() {
    const { router } = this.props;
    const routerHash = (router.location.hash.split('?')[0]).split('#')[1];

    const routerBreadcrumbs = (state) => {
      const breadcrumbs = [];
      breadcrumbs.push(mainPagesTitles[state].breadcrumbs);

      return breadcrumbs[0];
    };

    const breadcrumbs = routerBreadcrumbs(routerHash);
    const lastItemBreadcrumbs = breadcrumbs.length - 1;

    const breadcrumbItems = breadcrumbs.map((breadcrumb, index) =>
      <span key={_.uniqueId('__BreadcrumbsBlock__')}>
        { index !== lastItemBreadcrumbs ? <Link to={breadcrumb.state} className="breadcrumb-link">{breadcrumb.title}</Link> : null }
        { index !== lastItemBreadcrumbs && breadcrumbs.lenght === 1 ? <span className="breadcrumb-link">{breadcrumb.title}</span> : null }
        { index !== lastItemBreadcrumbs ? <span className="breadcrumb-separate"></span> : null }
        { index === lastItemBreadcrumbs ? <span className="breadcrumb-link active">{breadcrumb.title}</span> : null }
      </span>
    );

    return (
      breadcrumbs.length !== 0 ? <div className="wrap-breadcrumbs">
        <div className="container-fluid">
          <div className="breadcrumbs" key={_.uniqueId('__BreadcrumbsBlock__')}>
            {breadcrumbItems}
          </div>
        </div>
      </div> : null
    )
  }
}

export default Breadcrumbs;
