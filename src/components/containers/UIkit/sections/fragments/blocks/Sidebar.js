import React from 'react';

/**
 * This component returns content of Sidebar block of UIkit page
 *
 * @return {XML}
 * @constructor
 */
const Sidebar = () => {
  return (
    <div id="sidebar" className="showSidebar ui-section">
      <strong className="ui-title">Sidebar</strong>
      <div className="ui-sub-section">
        <div className="ui-sidebar-content">
          <div className="content">
            <div className="sidebar">
              <div className="sidebar-nav">
                <ul className="sidebar-nav-list">
                  <li className="sidebar-nav-item">
                    <a className="sidebar-nav-link">Item</a>
                  </li>
                  <li className="sidebar-nav-item">
                    <a className="sidebar-nav-link active">Item</a>
                  </li>
                  <li className="sidebar-nav-item">
                    <a className="sidebar-nav-link">Item</a>
                  </li>
                  <li className="sidebar-nav-item">
                    <a className="sidebar-nav-link">Item</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="main">
              <div className="ui-main-content">
                Main Content
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
