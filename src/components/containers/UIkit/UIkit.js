import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { bindActionCreators } from 'redux';
import { setSidebarVisibility } from '../../../ducks/set-sidebar-visibility';
import Header from './sections/Header';
import Sidebar from './sections/Sidebar';
import Main from './sections/Main';
import { UIkitSelector } from './selectors';

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    setSidebarVisibility,
  }, dispatch),
});

@compose(connect(UIkitSelector, mapDispatchToProps))

export default class UIkit extends Component {

  toggleSidebarVisibility = () => {
    this.props.actions.setSidebarVisibility(!this.props.isSidebarVisible);
  };

  getMainClassName = (isSidebarVisible, isTouchDevice) => {
    let mainClassName = 'ui-wrapper';
    if (isSidebarVisible) {
      mainClassName += ' ui-showSidebar';
    }
    mainClassName += (isTouchDevice) ? ' touch-device' : ' is-not-touch-device';
    return mainClassName;
  };

  render() {
    const { isSidebarVisible, isTouchDevice } = this.props;
    const mainClassName = this.getMainClassName(isSidebarVisible, isTouchDevice);
    return (
      <div id="ui-wrapper" className={mainClassName}>
        <Header toggleSidebarVisibility={this.toggleSidebarVisibility} />
        <Sidebar />
        <Main />
      </div>
    );
  }
}
