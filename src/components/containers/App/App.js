import React from 'react';
import classNames from 'classnames';
import LoadingBar from 'react-redux-loading-bar'

import TopHeader from '../TopHeader/TopHeader';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../../presentational/Footer/Footer';
import MainSpinner from '../MainSpinner/MainSpinner';
// import HeaderList from '../HeaderList/HeaderList';
// import headerImg1 from '../../../assets/images/leeds.png'
// import headerImg2 from '../../../assets/images/nhs.png'

import '../../../styles/main.scss';

const App = (props) => {
  const isTouchDevice = (props.isTouchDevice) ? 'touch-device' : ('ontouchstart' in window) ? 'touch-device' : 'is-not-touch-device';

  return (<div className="page">
    <LoadingBar className="loading-bar" />
    <MainSpinner />
    <div className={classNames('wrapper', isTouchDevice)}>
      <header className="header">
        <TopHeader
          isHasSearch
        ></TopHeader>
        <Header />
      </header>
      <Main />
    </div>
    <Footer copyright={'Transforming Usability'} />
    {/*<Footer*/}
      {/*copyright={'Copyright 2017 Ripple Foundation CIC Ltd. All rights reserved'}*/}
      {/*isShowSupportedBy={false}*/}
    {/*/>*/}
  </div>)
};

export default App;
