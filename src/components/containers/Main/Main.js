import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames'
import { withRouter, Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux';

import Breadcrumbs from '../Breadcumbs/Breadcrumbs';
import sidebarVisibilitySelector from './selectors';
import { PatientsLists, SystemDashboard, PatientsFullDetailsSearch, UserProfile, PatientsSummary, Allergies } from '../../pages';
import { clientUrls } from '../../../config/client-urls.constants';

@withRouter
@connect(sidebarVisibilitySelector)
export default class Main extends PureComponent {
    static propTypes = {
      isSidebarVisible: PropTypes.bool.isRequired,
    };

    render() {
      const { isSidebarVisible } = this.props;

      return (
        <main className={classNames('main', { showSidebar: isSidebarVisible })}>
          <Breadcrumbs />
          <Switch>
            <Route exact path={clientUrls.USER_PROFILE} component={UserProfile} />
            <Route exact path={`${clientUrls.PATIENTS}/:userId/${clientUrls.PATIENTS_SUMMARY}`} component={PatientsSummary} />
            <Route exact path={clientUrls.PATIENTS} component={PatientsLists} />
            <Route exact path={clientUrls.PATIENTS_FULL_DETAILS} component={PatientsFullDetailsSearch} />
            <Route exact path={clientUrls.CHARTS} component={SystemDashboard} />
            <Route exact path={clientUrls.ROOT} component={SystemDashboard} />
            <Route exact path={`${clientUrls.PATIENTS}/:userId/${clientUrls.ALLERGIES}`} component={Allergies} />
          </Switch>
        </main>
      )
    }
}
