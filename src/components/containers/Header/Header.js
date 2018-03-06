import React from 'react';
import { Switch, Route } from 'react-router-dom'

import HeaderToolbar from './HeaderToolbar/HeaderToolbar';
import HeaderTitle from './HeaderTitle/HeaderTitle';
import { clientUrls } from '../../../config/client-urls.constants'
import { routersPluginConfig } from '../../../plugins.config';

import '../../../styles/main.scss';

const Header = props =>
  <div>
    <Switch>
      <Route exact path={`${clientUrls.PATIENTS}/:userId/${clientUrls.PATIENTS_SUMMARY}`} component={HeaderToolbar} />
      {routersPluginConfig.map(item => !item.withoutHeaderToolbar ? <Route exact path={item.path} component={HeaderToolbar} key={item.key} /> : null)}
      <Route path={clientUrls.ROOT} component={HeaderTitle} />
    </Switch>
  </div>

export default Header;
