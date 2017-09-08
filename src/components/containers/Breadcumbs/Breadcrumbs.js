import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom'
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

      return breadcrumbs;
    };
    return (
      <div className="wrap-breadcrumbs">
        <div className="container-fluid">
          { routerBreadcrumbs(routerHash).map(breadcrumb =>
            <div className="breadcrumbs" key={_.uniqueId('__BreadcrumbsBlock__')}>
              { breadcrumb.length > 1 ? <Link to={breadcrumb[0].state} className="breadcrumb-link">{breadcrumb[0].title}</Link> : null }
              { breadcrumb.length === 1 ? <span className="breadcrumb-link">{breadcrumb[0].title}</span> : null }
              { breadcrumb.length > 1 ? <span className="breadcrumb-separate"></span> : null }
              { breadcrumb.length > 1 ? <span className="breadcrumb-link active">{breadcrumb[1].title}</span> : null }
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default Breadcrumbs;
