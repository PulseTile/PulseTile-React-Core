import React, { PureComponent } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

export default class Sidebar extends PureComponent {
  static propTypes = {
    goToState: PropTypes.func.isRequired,
    activeLink: PropTypes.string,
  };

  render() {
    const { goToState, activeLink } = this.props;
    return (
      <div className="sidebar showSidebar" role="navigation" style={{ top: '138px', bottom: '56px' }} >
        <div className="sidebar-nav">
          <div>
            <ul className="sidebar-nav-list">
              <li className="sidebar-nav-item">
                <a className={classNames('sidebar-nav-link', { active: activeLink === 'patients-summary' })} onClick={() => goToState('patients-summary')}>Patient Summary</a>
              </li><li className="sidebar-nav-item">
                <a className={classNames('sidebar-nav-link', { active: activeLink === 'problems' })}>Problems / Diagnosis</a>
              </li><li className="sidebar-nav-item">
                <a className={classNames('sidebar-nav-link', { active: activeLink === 'medications' })}>Medications</a>
              </li><li className="sidebar-nav-item">
                <a className={classNames('sidebar-nav-link', { active: activeLink === 'allergies' })} onClick={() => goToState('allergies')}>Allergies</a>
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
