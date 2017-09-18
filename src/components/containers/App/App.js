import React from 'react';
import { connect } from 'react-redux';

import TopHeader from '../../presentational/TopHeader/TopHeader';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../../presentational/Footer/Footer';

import '../../../styles/main.scss';

const App = (props) => {
  const isTouchDevice = ('ontouchstart' in window) ? 'touch-device' : 'is-not-touch-device';

  return (<div className={isTouchDevice}>
    <header className="header">
      <TopHeader />
      <Header />
    </header>
    <Main />
    <Footer />
  </div>)
};

export default App;
