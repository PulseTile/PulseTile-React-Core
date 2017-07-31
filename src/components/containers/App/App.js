import React from 'react';
import classNames from 'classnames';

import '../../../../node_modules/bootstrap/dist/css/bootstrap.css';

import NavBar from '../../containers/NavBar/NavBar';
import * as styles from './App.scss';

const App = props => <div>
  <header>
    <NavBar/>
  </header>
  <section className={classNames('container', styles.container)}>
      { /*render children from router here*/ }
      {props.children}
  </section>
</div>;

export default App;
