import React from 'react';

import TopHeader from '../../presentational/TopHeader/TopHeader';
import HeaderToolbar from '../HeaderToolbar/HeaderToolbar';
import Breadcrumbs from '../Breadcumbs/Breadcrumbs';
import Main from '../Main/Main';
import Footer from '../../presentational/Footer/Footer';

import '../../../styles/main.scss';

const App = (props) => {

  const isTouchDevice = ('ontouchstart' in window) ? 'touch-device' : 'is-not-touch-device';

  return (<div className={isTouchDevice}>
    <header className="header">
      <TopHeader />
      <HeaderToolbar />
      <Breadcrumbs />
    </header>
    <Main />
    <Footer />
  </div>)
};

export default App;
