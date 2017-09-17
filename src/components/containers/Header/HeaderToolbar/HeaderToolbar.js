import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash/fp';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux'

import routersSelector from './selectors';

const mapDispatchToProps = dispatch => ({ actions: bindActionCreators({ push }, dispatch) });

@connect(routersSelector, mapDispatchToProps)
class HeaderToolbar extends PureComponent {
  static propTypes = {
    name: PropTypes.string.isRequired,
    gpName: PropTypes.string.isRequired,
    gpAddress: PropTypes.string.isRequired,
    dateOfBirth: PropTypes.string.isRequired,
    gender: PropTypes.string.isRequired,
    telephone: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
  };

  render() {
    const { name, gpName, gpAddress, dateOfBirth, gender, telephone, userId } = this.props;

    return (
      <div className="wrap-header-toolbar">
        <div className="container-fluid">
          <div className="header-toolbar">
            <button className="btn-toggle-sidebar wrap-icon" data-toggle="collapse" data-target="#sidebar-nav" aria-expanded="false">
              <i className="btn-icon fa fa-bars" />
              <span className="btn-text">Menu</span>
            </button>
            <div className="wrap-patient-info">
              <div className="patient-info-caption">
                <div className="patient-info-caption-btn btn-dropdown-toggle" />
                <div className="patient-info-caption-text text-truncate">{name}</div>
              </div>
              <div className="patient-info">
                <div className="patient-info-group-2">
                  <div className="column-1">
                    <div className="patient-info-item"><span className="key">D.O.B.</span> {dateOfBirth}</div>
                    <div className="patient-info-item"><span className="key">Phone:</span> {telephone}</div>
                  </div>
                  <div className="column-2">
                    <div className="patient-info-item"><span className="key">Gender:</span> {gender}</div>
                    <div className="patient-info-item"><span className="key">NHS No.</span> <span>{userId}</span></div>
                  </div>
                </div>
                <div className="patient-info-group-1">
                  <div className="patient-info-item significant hidden-xs">Aaron Christian</div>
                  <div className="patient-info-item"><span className="key">Doctor:</span> {gpName}</div>
                </div>
                <div className="patient-info-item"><span className="key">Address:</span> {gpAddress}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default HeaderToolbar;
