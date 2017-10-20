import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withRouter, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import ProtectedRoute from './ProtectedRoute';
import Breadcrumbs from '../Breadcumbs/Breadcrumbs';
import sidebarAndUserSelector from './selectors';
import { PatientsLists, SystemDashboard, PatientsFullDetailsSearch, UserProfile, PatientsSummary } from '../../pages';
import { clientUrls } from '../../../config/client-urls.constants';
import { routersPluginConfig } from '../../../plugins.config';

@withRouter
@connect(sidebarAndUserSelector)
export default class Main extends PureComponent {
    static propTypes = {
      isSidebarVisible: PropTypes.bool.isRequired,
    };

    render() {
      const { isSidebarVisible, userAccount } = this.props;

      return (
        <main className={classNames('main', { showSidebar: isSidebarVisible })}>
          <Breadcrumbs userAccount={userAccount} />
          <Switch>
            <Route exact path={clientUrls.USER_PROFILE} component={UserProfile} />
            <Route exact path={`${clientUrls.PATIENTS}/:userId/${clientUrls.PATIENTS_SUMMARY}`} component={PatientsSummary} />
            <ProtectedRoute exact path={clientUrls.PATIENTS} component={PatientsLists} userAccount={userAccount} />
            <ProtectedRoute exact path={clientUrls.PATIENTS_FULL_DETAILS} component={PatientsFullDetailsSearch} userAccount={userAccount} />
            <ProtectedRoute exact path={clientUrls.CHARTS} component={SystemDashboard} userAccount={userAccount} />
            <ProtectedRoute exact path={clientUrls.ROOT} component={SystemDashboard} userAccount={userAccount} />
            {routersPluginConfig.map(item => <Route exact path={item.path} component={item.component} />)}
          </Switch>
        </main>
      )
    }
}
