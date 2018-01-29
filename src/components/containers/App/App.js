import React from 'react';
import classNames from 'classnames';
import LoadingBar from 'react-redux-loading-bar';
import { headerHasSearch, isLeedsPHRHeaderList, footerCopyright, footerHasShowSupportedByText } from '../../../themes.config';

import TopHeader from '../TopHeader/TopHeader';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../../presentational/Footer/Footer';
import MainSpinner from '../MainSpinner/MainSpinner';
import HeaderList from '../HeaderList/HeaderList';
import headerImg1 from '../../../assets/images/leeds.png'
import headerImg2 from '../../../assets/images/nhs.png'

import '../../../styles/main.scss';

const App = (props) => {
  const isTouchDevice = (props.isTouchDevice) ? 'touch-device' : ('ontouchstart' in window) ? 'touch-device' : 'is-not-touch-device';

  return (<div className="page">
    <LoadingBar className="loading-bar" />
    <MainSpinner />
    <div className={classNames('wrapper', isTouchDevice)}>
      <header className="header">
        <TopHeader
          isHasSearch={headerHasSearch}
        >
          {isLeedsPHRHeaderList ?
            <HeaderList items={[
              <img src={headerImg1} alt="header img 1"/>,
              <img src={headerImg2} alt="header img 2"/>
            ]}/>
            : <div />
          }
        </TopHeader>
        <Header />
      </header>
      <Main />
    </div>
    <Footer
      copyright={footerCopyright}
      isShowSupportedBy={footerHasShowSupportedByText}
    />
  </div>)
};

export default App;
