import React from 'react'
import { Switch, Route } from 'react-router-dom'

import { PatientsLists, SystemDashboard, PatientsFullDetailsSearch, UserProfile } from '../../pages'
import { clientUrls } from '../../../config/client-urls.constants'

const Main = props => <main>
  <Switch>
    <Route exact path={clientUrls.ROOT} component={SystemDashboard} />
    <Route exact path={clientUrls.CHARTS} component={SystemDashboard} />
    <Route exact path={clientUrls.USER_PROFILE} component={UserProfile} />
    <Route exact path={clientUrls.PATIENTS} component={PatientsLists} />
    <Route path={clientUrls.PATIENTS_FULL_DETAILS} component={PatientsFullDetailsSearch} />
  </Switch>
</main>;

export default Main;
