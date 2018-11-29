import React, { Component } from 'react';
import logoImage from '../../../../../../assets/images/pulsetile-core-logo.png';

/**
 * This component returns Header for Block section
 */
export default class Header extends Component {

  state = {
    isSearchOpen: false,
    isNotificationsOpen: false,
    isUserPanelOpen: false,
  };

  toggleDropdown = block => {
    this.closeAllPanels();
    this.setState({
      [block]: !this.state[block],
    });
  };

  closeAllPanels = () => {
    this.setState({
      isSearchOpen: false,
      isNotificationsOpen: false,
      isUserPanelOpen: false,
    });
  };

  render() {
    const { isSearchOpen, isNotificationsOpen, isUserPanelOpen } = this.state;

    const searchMenuClassNameDefault = 'control-group left control-search-select dropdown';
    const modalNotificationsClassNameDefault = 'user-panel-item dropdown';
    const modalUserPanelClassNameDefault = 'user-panel-item dropdown';

    const modalNotificationsClassName = (isNotificationsOpen) ?  (modalNotificationsClassNameDefault + ' open') : modalNotificationsClassNameDefault;
    const modalUserPanelClassName = (isUserPanelOpen) ?  (modalUserPanelClassNameDefault + ' open') : modalUserPanelClassNameDefault;
    const searchMenuClassName = (isSearchOpen) ?  (searchMenuClassNameDefault + ' open') : searchMenuClassNameDefault;

    return (
      <div id="header" className="ui-section">
        <strong className="ui-title">Header</strong>
        <div className="ui-sub-section">
          <div className="ui-content-backset">
            <header className="header">
              <nav className="navbar">
                <a className="btn-header btn-header-prev">
                  <i className="fa fa-arrow-left"></i>
                </a>
                <div className="wrap-logo">
                  <div className="logo" >
                    <div className="logo-icon">
                      <a>
                        <img src={logoImage} className="img" alt="logo" />
                      </a>
                    </div>
                  </div>
                </div>
                <ul className="user-panel" role="tablist">
                  <li className='user-panel-item visible-xs'>
                    <a className="btn-header">
                      <i className="fa fa-search"></i>
                    </a>
                  </li>
                  <li className={modalNotificationsClassName}>
                    <a className="btn-header btn-notification dropdown-toggle" onClick={() => this.toggleDropdown('isNotificationsOpen')}>
                      <i className="fa fa-bell-o"></i>
                      <span className="count">2</span>
                    </a>
                    <div className="notifications-drop dropdown-menu dropdown-menu-right" id="tab-notifications">
                      <div className="notifications-header">Notifications (2)</div>
                        <div className="notifications-body">
                          <ul className="notifications-list">
                            <li className="notifications-list-item">
                              <div className="notification-info">Information from Liquid Logic (Social Care) is currently unavailable.</div>
                              <div className="notification-time"><em>10 minutes ago</em></div>
                            </li>
                            <li className="notifications-list-item">
                              <div className="notification-info">Information from Liquid Logic (Social Care) is currently unavailable.</div>
                              <div className="notification-time"><em>15 minutes ago</em></div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </li>
                    <li className={modalUserPanelClassName}>
                      <a className="btn-header btn-user dropdown-toggle" onClick={() => this.toggleDropdown('isUserPanelOpen')}>
                        <i className="fa fa-user"></i>
                      </a>
                      <div className="dropdown-user dropdown-menu dropdown-menu-right">
                        <div className="user-profile-image">
                          <div className="img">
                            <img src="../../../assets/images/user.jpg" alt="" />
                          </div>
                        </div>
                      <div className="user-profile-info">
                        <div className="user-profile-info__item name">Bob Smith</div>
                        <div className="user-profile-info__descr">
                          <div className="user-profile-info__item role">IDCR</div>
                          <div className="user-profile-info__item email">bob.smith@gmail.com</div>
                          <div className="user-profile-info__item birthday">10/05/2099</div>
                        </div>
                        <div className="specification">
                          <div className="user-profile-info__title registered">Registered GP</div>
                          <div className="user-profile-info__item version-back">About Showcase Stack; PulseTile version 1.0.0/QEWD_Ripple version 1.0.0</div>
                          <div className="user-profile-info__item version-front">Angular</div>
                        </div>
                        <a className="btn btn-success btn-block btn-signout">
                          <span className="brn-text">Sign Out</span>
                          <i className="btn-icon fa fa-sign-out"></i>
                        </a>
                      </div>
                    </div>
                  </li>
                </ul>
                <div className="wrap-search wrap-header-search ng-cloak">
                  <div className="header-search">
                    <div className={searchMenuClassName}>
                      <button type="button" onClick={() => this.toggleDropdown('isSearchOpen')} className="btn btn-success btn-inverse btn-dropdown-toggle btn-search-toggle">
                        <i className="btn-icon fa fa-bars"></i>
                      </button>
                      <div className="dropdown-menu dropdown-menu-search-select dropdown-menu-panel dropdown-menu-left dropdown-menu-small-size">
                        <div className="heading">Search Options</div>
                        <div className="dropdown-menu-wrap-list">
                          <div className="dropdown-menu-list">
                            <div className="dropdown-menu-item">
                              <span className="dropdown-menu-item-text">Patient Search - Basic</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button className="btn btn-success btn-search">
                      <i className="btn-icon fa fa-search"></i>
                    </button>
                    <div  className="wrap-search-holder">
                      <div className="search-holder">
                        <form>
                          <input className="form-control" placeholder="Search" type="text"/>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </nav>
            </header>
          </div>
        </div>
      </div>
    );
  }
};

