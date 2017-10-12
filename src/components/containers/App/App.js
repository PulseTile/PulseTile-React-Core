import React from 'react';
import classNames from 'classnames';

import TopHeader from '../TopHeader/TopHeader';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../../presentational/Footer/Footer';
import MainSpinner from '../MainSpinner/MainSpinner';

import '../../../styles/main.scss';

const App = (props) => {
  const isTouchDevice = ('ontouchstart' in window) ? 'touch-device' : 'is-not-touch-device';

  return (<div className="page">
    <MainSpinner />
    <div className={classNames('wrapper', isTouchDevice)}>
      <header className="header">
        <TopHeader />
        <Header />
      </header>
      <Main />
    </div>
    <Footer />
  </div>)
};

export default App;
