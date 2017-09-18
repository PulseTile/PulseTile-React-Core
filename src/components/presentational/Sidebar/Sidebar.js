import React, { PureComponent } from 'react';

export default class Sidebar extends PureComponent {
  render() {
    return (
      <div className="sidebar showSidebar" role="navigation" style={{ top: '138px', bottom: '56px' }} >
        <div className="sidebar-nav">
          <div>
            <ul className="sidebar-nav-list">
              <li className="sidebar-nav-item ng-scope">
                <a className="sidebar-nav-link ng-binding active">Patient Summary</a>
              </li><li className="sidebar-nav-item ng-scope">
                <a className="sidebar-nav-link ng-binding" >Problems / Diagnosis</a>
              </li><li className="sidebar-nav-item ng-scope">
                <a className="sidebar-nav-link ng-binding" >Medications</a>
              </li><li className="sidebar-nav-item ng-scope" >
                <a className="sidebar-nav-link ng-binding" >Allergies</a>
              </li><li className="sidebar-nav-item ng-scope" >
                <a className="sidebar-nav-link ng-binding">Contacts</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
