import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux'

import routersSelector from './selectors';

const mapDispatchToProps = dispatch => ({ actions: bindActionCreators({ push }, dispatch) });

@connect(routersSelector, mapDispatchToProps)
class Breadcrumbs extends PureComponent {
  render() {
    return (
      <div className="wrap-breadcrumbs">
        <div className="container-fluid">
          <div className="breadcrumbs">
            <span className="breadcrumb-link active">System Dashboard</span>
          </div>
        </div>
      </div>
    )
  }
}

export default Breadcrumbs;
