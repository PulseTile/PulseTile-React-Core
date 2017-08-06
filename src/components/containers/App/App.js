import React from 'react';

import TopHeader from '../TopHeader/TopHeader';
import HeaderToolbar from '../HeaderToolbar/HeaderToolbar';
import Breadcumbs from '../Breadcumbs/Breadcumbs';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';

import '../../../styles/main.scss';

const App = props => <div>
  <header>
    <TopHeader />
    <HeaderToolbar />
    <Breadcumbs />
  </header>
  <Main />
  <Footer />
</div>;

export default App;
