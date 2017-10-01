import React from 'react';
import { Switch, Route } from 'react-router-dom'

import HeaderToolbar from './HeaderToolbar/HeaderToolbar';
import HeaderTitle from './HeaderTitle/HeaderTitle';
import { clientUrls } from '../../../config/client-urls.constants'

import '../../../styles/main.scss';

const Header = props =>
  <div>
    <Switch>
      <Route exact path={`${clientUrls.PATIENTS}/:userId/${clientUrls.PATIENTS_SUMMARY}`} component={HeaderToolbar} />
      <Route exact path={`${clientUrls.PATIENTS}/:userId/${clientUrls.ALLERGIES}`} component={HeaderToolbar} />
      <Route path={clientUrls.ROOT} component={HeaderTitle} />
    </Switch>
  </div>

export default Header;
