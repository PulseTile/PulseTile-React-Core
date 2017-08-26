import React from 'react'
import { Switch, Route } from 'react-router-dom'

import { PatientsLists, SystemDashboard } from '../../pages'
import { clientUrls } from '../../../config/client-urls.constants'

const Main = props => <main>
  <Switch>
    <Route exact path={clientUrls.ROOT} component={SystemDashboard} />
    <Route exact path={clientUrls.CHARTS} component={SystemDashboard} />
    <Route path={clientUrls.PATIENTS} component={PatientsLists} />
    {/*<Route path="/patients/:id" component={PatientsLists} />*/}
  </Switch>
</main>;

export default Main;
