import React from 'react'
import { Route, IndexRoute } from 'react-router'

import AppContainer from './components/containers/App/App';

const routes = <Route path="/" component={AppContainer}>
    <IndexRoute component={PreferredItemsPanel} onEnter={authUtils.isAuthorised}/>
    <Route path="preferred-items" component={PreferredItemsPanel} onEnter={authUtils.isAuthorised}/>
    <Route path="purchasing-log" component={PurchasingLogPage} onEnter={authUtils.isAuthorised}/>
    <Route path="account" component={AccountEditForm} onEnter={authUtils.isAuthorised}/>
    <Route path="login-page" component={LoginForm}/>
</Route>;

export default routes