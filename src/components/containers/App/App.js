import React from 'react';
import { Switch, Route } from 'react-router-dom'

import TopHeader from '../../presentational/TopHeader/TopHeader';
import Header from '../Header/Header';
import Breadcrumbs from '../Breadcumbs/Breadcrumbs';
import Main from '../Main/Main';
import Footer from '../../presentational/Footer/Footer';

import '../../../styles/main.scss';

const App = (props) => {
  const isTouchDevice = ('ontouchstart' in window) ? 'touch-device' : 'is-not-touch-device';

  return (<div className={isTouchDevice}>
    <header className="header">
      <TopHeader />
      <Header />
      <Breadcrumbs />
    </header>
    <Main />
    <Footer />
  </div>)
};

export default App;
