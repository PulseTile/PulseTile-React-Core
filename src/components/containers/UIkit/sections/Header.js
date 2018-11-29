import React from 'react';
import logoImage from '../../../../assets/images/pulsetile-core-logo.png';

/**
 * This component returns header for UIkit page
 *
 * @return {XML}
 * @constructor
 */
const Header = ({ toggleSidebarVisibility }) => {
  return (
    <header className="ui-header" data-scroll-to-exclude="true">
      <div className="ui-header-inner">
        <button type="button" className="ui-btn-toggle-sidebar wrap-icon" onClick={() => toggleSidebarVisibility()}>
          <i className="btn-icon fa fa-bars"></i>
          <span className="btn-text">Menu</span>
        </button>
        <div className="ui-logo">
          <a href="#">
            <img src={logoImage} className="img" alt="logo" />
          </a>
        </div>
        <div className="ui-header-title">
          <span>UI Kit</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
