import React, { PureComponent } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import _ from 'lodash/fp';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { sidebarConfig } from '../../../plugins.config';
import sidebarSelector from './selectors';
import { setSidebarVisibility } from '../../../ducks/set-sidebar-visibility';

const mapDispatchToProps = dispatch => ({ actions: bindActionCreators({ setSidebarVisibility }, dispatch) });

@connect(sidebarSelector, mapDispatchToProps)
export default class Sidebar extends PureComponent {
  static propTypes = {
    activeLink: PropTypes.string,
    userId: PropTypes.number,
  };

  componentWillMount() {
    window.addEventListener('resize', () => {
      this.setPositionForSidebar()
    });
    window.addEventListener('scroll', () => {
      this.setPositionForSidebar()
    });
  }

  componentDidMount() {
    this.setPositionForSidebar();
  }

  setPositionForSidebar() {
    const page = document;
    const headerHeight = page.getElementsByClassName('header')[0].offsetHeight;
    const footerHeight = page.getElementsByClassName('footer')[0].offsetHeight;
    const sidebar = page.getElementsByClassName('sidebar')[0];
    const sidebarUnderlay = page.getElementsByClassName('sidebar-underlay')[0];

    if (sidebar !== undefined) {
      const scrollPageTop = document.documentElement.scrollTop;
      let sidebarTop = headerHeight - scrollPageTop;

      sidebarTop = sidebarTop > 0 ? sidebarTop : 0;

      sidebar.style.top = `${sidebarTop}px`;
      sidebarUnderlay.style.top = `${sidebarTop}px`;

      if (window.innerWidth < 768) {
        sidebar.style.bottom = 0;
        sidebarUnderlay.style.bottom = 0;
      } else {
        sidebar.style.bottom = `${footerHeight}px`;
        sidebarUnderlay.style.bottom = `${footerHeight}px`;
      }
    }
  }

  toggleSidebarVisibility = () => {
    const { actions, isSidebarVisible } = this.props;
    if (window.innerWidth < 768) {
      actions.setSidebarVisibility(!isSidebarVisible);
    }
  };

  render() {
    const { activeLink, userId } = this.props;
    return (
      <div>
        <div className="sidebar-underlay showSidebar"></div>
        <div className="sidebar showSidebar" role="navigation">
          <div className="sidebar-nav">
            <div>
              <ul className="sidebar-nav-list">
                {sidebarConfig.map(item => <li className="sidebar-nav-item">
                  { (item.isVisible && !_.isEmpty(item.pathToTransition)) ? <Link className={classNames('sidebar-nav-link', { active: activeLink === item.key })} to={`/patients/${userId}${item.pathToTransition}`} onClick={this.toggleSidebarVisibility}>{item.name}</Link> : null }
                  { (item.isVisible && _.isEmpty(item.pathToTransition)) ? <a className={classNames('sidebar-nav-link', { active: activeLink === item.key })}>{item.name}</a> : null }
                </li>)}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
