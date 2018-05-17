import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { compose, lifecycle } from 'recompose';
import _ from 'lodash/fp';

import Sidebar from '../../../presentational/Sidebar/Sidebar';
import { toolbarSelector, routerSelector } from './selectors';


import { setSidebarVisibility } from '../../../../ducks/set-sidebar-visibility';
import { closeSidebarOnUnmount, openSidebarOnMount } from '../../../../utils/HOCs/sidebar-handle';

import { fetchPatientDemographicsOnMount } from '../../../../utils/HOCs/fetch-patients.utils';

import { mainPagesTitles } from '../../../../config/client-urls.constants'
import { formatNHSNumber } from '../../../../utils/table-helpers/table.utils'
import { fetchHeaderToolbarOnMount } from '../../../../utils/HOCs/fetch-patients.utils';

import { fetchPatientDemographicsRequest } from '../../../../ducks/fetch-patient-demographics.duck';

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    setSidebarVisibility,
    fetchPatientDemographicsRequest
  }, dispatch)
});

@compose(connect(toolbarSelector, mapDispatchToProps), connect(routerSelector))
@compose(lifecycle(closeSidebarOnUnmount), lifecycle(openSidebarOnMount), lifecycle(fetchHeaderToolbarOnMount), lifecycle(fetchPatientDemographicsOnMount))
class HeaderToolbar extends PureComponent {
  static propTypes = {
    isSidebarVisible: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    gpName: PropTypes.string.isRequired,
    gpAddress: PropTypes.string.isRequired,
    dateOfBirth: PropTypes.string.isRequired,
    gender: PropTypes.string.isRequired,
    telephone: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
  };

  getState = hash => _.getOr(null, [hash])(mainPagesTitles);

  toggleSidebarVisibility = /* istanbul ignore next */ () => this.props.actions.setSidebarVisibility(!this.props.isSidebarVisible);

  render() {
    const { isSidebarVisible, name, gpName, gpAddress, dateOfBirth, gender, telephone, userId, router } = this.props;

    let breadcrumbs = null;
    const routingComponents = (router.location.hash.split('?')[0]).split('/');
    let routerHash;
    do {
      routerHash = routingComponents.pop();
      breadcrumbs = this.getState(routerHash);
      /* istanbul ignore next */
      if (breadcrumbs) break
    } while (routingComponents.length);

    return (
      <div>
        <div className="wrap-header-toolbar">
          <div className="container-fluid">
            <div className="header-toolbar">
              <button className={classNames('btn-toggle-sidebar wrap-icon', { 'btn-toggle-sidebar-open': isSidebarVisible })} data-toggle="collapse" data-target="#sidebar-nav" aria-expanded="false" onClick={this.toggleSidebarVisibility}>
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
                      <div className="patient-info-item"><span className="key">NHS No.</span> <span>{formatNHSNumber(userId)}</span></div>
                    </div>
                  </div>
                  <div className="patient-info-group-1">
                    <div className="patient-info-item significant hidden-xs">{name}</div>
                    <div className="patient-info-item"><span className="key">Doctor:</span> {gpName}</div>
                  </div>
                  <div className="patient-info-item"><span className="key">Address:</span> {gpAddress}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {isSidebarVisible && <Sidebar
          userId={userId}
          activeLink={routerHash}
        />}
      </div>
    )
  }
}

export default HeaderToolbar;
