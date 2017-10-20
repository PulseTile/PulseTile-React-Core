import React, { PureComponent } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import _ from 'lodash/fp';

import { sidebarConfig } from '../../../plugins.config';

export default class Sidebar extends PureComponent {
  static propTypes = {
    activeLink: PropTypes.string,
    userId: PropTypes.number,
  };

  render() {
    const { activeLink, userId } = this.props;
    return (
      <div className="sidebar showSidebar" role="navigation" style={{ top: '138px', bottom: '56px' }} >
        <div className="sidebar-nav">
          <div>
            <ul className="sidebar-nav-list">
              {sidebarConfig.map(item => <li className="sidebar-nav-item">
                { (item.isVisible && !_.isEmpty(item.pathToTransition)) ? <Link className={classNames('sidebar-nav-link', { active: activeLink === item.key })} to={`/patients/${userId}${item.pathToTransition}`}>{item.name}</Link> : null }
                { (item.isVisible && _.isEmpty(item.pathToTransition)) ? <a className={classNames('sidebar-nav-link', { active: activeLink === item.key })}>{item.name}</a> : null }
              </li>)}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
