import React, { PureComponent } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'

export default class Sidebar extends PureComponent {
  static propTypes = {
    activeLink: PropTypes.string,
    userId: PropTypes.number
  };

  render() {
    const { activeLink, userId } = this.props;
    return (
      <div className="sidebar showSidebar" role="navigation" style={{ top: '138px', bottom: '56px' }} >
        <div className="sidebar-nav">
          <div>
            <ul className="sidebar-nav-list">
              <li className="sidebar-nav-item">
                <Link className={classNames('sidebar-nav-link', { active: activeLink === 'patients-summary' })} to={`/patients/${userId}/patients-summary`}>Patient Summary</Link>
              </li><li className="sidebar-nav-item">
                <a className={classNames('sidebar-nav-link', { active: activeLink === 'problems' })}>Problems / Diagnosis</a>
              </li><li className="sidebar-nav-item">
                <a className={classNames('sidebar-nav-link', { active: activeLink === 'medications' })}>Medications</a>
              </li><li className="sidebar-nav-item">
                <Link className={classNames('sidebar-nav-link', { active: activeLink === 'allergies' })} to={`/patients/${userId}/allergies`}>Allergies</Link>
              </li><li className="sidebar-nav-item">
                <a className="sidebar-nav-link">Contacts</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
