import React, { PureComponent } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import _ from 'lodash/fp';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { sidebarConfig } from '../../../plugins.config';
import { sidebarSelector, patientsSummariesSelector } from './selectors';
import { setSidebarVisibility } from '../../../ducks/set-sidebar-visibility';

const mapDispatchToProps = dispatch => ({ actions: bindActionCreators({ setSidebarVisibility }, dispatch) });

@connect(sidebarSelector, mapDispatchToProps)
@connect(patientsSummariesSelector, mapDispatchToProps)
export default class Sidebar extends PureComponent {
  static propTypes = {
    activeLink: PropTypes.string,
    userId: PropTypes.number,
  };

  /* istanbul ignore next */
  componentWillMount() {
    window.addEventListener('resize', () => {
      this.setPositionForSidebar()
    });
    window.addEventListener('scroll', () => {
      this.setPositionForSidebar()
    });
    window.addEventListener('orientationchange', () => {
      this.setPositionForSidebar()
    });
    if (_.isEmpty(this.props.patientsSummaries)) {
      this.hideSidebarOnMobile();
    }
  }

  /* istanbul ignore next */
  componentDidMount() {
    this.setPositionForSidebar();
  }

  /* istanbul ignore next */
  componentWillReceiveProps(nextProps) {
    if (nextProps.patientsSummaries.length !== 0) {
      this.setPositionForSidebar();
    }
  }

  /* istanbul ignore next */
  setPositionForSidebar() {
    const page = document;
    const headerHeight = page.getElementsByClassName('header')[0] ? page.getElementsByClassName('header')[0].offsetHeight : 0;
    const footerHeight = page.getElementsByClassName('footer')[0] ? page.getElementsByClassName('footer')[0].offsetHeight : 0;
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

  toggleSidebarVisibility = /* istanbul ignore next */ () => {
    const { actions, isSidebarVisible } = this.props;
    if (window.innerWidth < 768) {
      actions.setSidebarVisibility(!isSidebarVisible);
    }
  };

  hideSidebarOnMobile = () => {
    const { actions } = this.props;
		/* istanbul ignore next */
    if (window.innerWidth < 768) {
      /* istanbul ignore next */
      actions.setSidebarVisibility(false);
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
                {sidebarConfig.map(item => (item.isVisible ? <li className="sidebar-nav-item">
                  { (!_.isEmpty(item.pathToTransition)) ? <Link className={classNames('sidebar-nav-link', { active: activeLink === item.key })} to={`/patients/${userId}${item.pathToTransition}`} onClick={this.toggleSidebarVisibility}>{item.name}</Link> : null }
                  { (_.isEmpty(item.pathToTransition)) ? <a className={classNames('sidebar-nav-link', { active: activeLink === item.key })}>{item.name}</a> : null }
                </li> : null))
                }
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
