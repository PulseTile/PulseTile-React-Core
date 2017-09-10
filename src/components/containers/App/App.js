import React from 'react';

import TopHeader from '../../presentational/TopHeader/TopHeader';
import HeaderToolbar from '../../presentational/HeaderToolbar/HeaderToolbar';
import Breadcrumbs from '../Breadcumbs/Breadcrumbs';
import Main from '../Main/Main';
import Footer from '../../presentational/Footer/Footer';

import '../../../styles/main.scss';

const App = props => <div>
  <header className="header">
    <TopHeader />
    <HeaderToolbar />
    <Breadcrumbs />
  </header>
  <Main />
  <Footer />
</div>;

export default App;
