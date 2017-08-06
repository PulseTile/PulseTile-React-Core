import React from 'react'
import { Switch, Route } from 'react-router-dom'

import { PatientsLists, SystemDashboard } from '../../pages'

const Main = props => <main>
  <Switch>
    <Route exact path="/" component={SystemDashboard} />
    <Route exact path="/charts" component={SystemDashboard} />
    <Route exact path="/patients" component={PatientsLists} />
    <Route path="/patients/:id" component={PatientsLists} />
  </Switch>
</main>;

export default Main;
