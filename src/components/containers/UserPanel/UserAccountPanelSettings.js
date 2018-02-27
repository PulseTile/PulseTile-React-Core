import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { userProfileTabSelector } from '../../../selectors/user-profile-tab';
import { changeUserProfileTab } from '../../../ducks/user-profile-tab.duck';

const APPLICATION_PREFERENCES = 'applicationPreferences';
const PERSONAL_INFORMATION = 'personalInformation';
const CONTACT_INFORMATION = 'contactInformation';
const CHANGE_HISTORY = 'changeHistory';
const FEEDS = 'feeds';

const mapDispatchToProps = dispatch => ({ actions: bindActionCreators({ changeUserProfileTab }, dispatch) });

@connect(userProfileTabSelector, mapDispatchToProps)
export default class UserAccountPanelSettings extends PureComponent {
  static contextTypes = {
    router: PropTypes.shape({
      history: PropTypes.object,
    }),
    history: PropTypes.object,
  };

  state = {
    openedUserMenu: false,
  };

  /* istanbul ignore next */
  componentWillMount() {
    document.addEventListener('click', this.closeOpenedUserMenu);
  }

  /* istanbul ignore next */
  componentWillUnmount() {
    document.removeEventListener('click', this.closeOpenedUserMenu);
  }

  closeOpenedUserMenu = /* istanbul ignore next */ (e) => {
    if (!this.node.contains(e.target)) {
      this.setState({ openedUserMenu: false });
    }
  };

  toggleOpenedUserMenu = (e) => {
    this.setState({ openedUserMenu: !this.state.openedUserMenu })
  };

  handleClickMenuItem = nameAccordionTab => () => {
    this.props.actions.changeUserProfileTab({ openedPanel: nameAccordionTab, expandedPanel: 'all' });
    this.context.router.history.push({ pathname: '/profile' });
  };

  render() {
    const { userProfileTabs } = this.props;
    const { openedUserMenu } = this.state;
    return (
      <div
        className={classNames('user-profile-settings dropdown', { 'open': openedUserMenu === true })}
        ref={node => this.node = node}
      >
        <div
          className="user-profile-settings__btn"
          onClick={this.toggleOpenedUserMenu}
        ><i className="fa fa-gear" /></div>
        <div className="user-profile-settings__menu dropdown-menu dropdown-menu-small-size">
          <div className="dropdown-menu-wrap-list">
            <div className="dropdown-menu-list">
              <div
                className={classNames('dropdown-menu-item', { 'active': userProfileTabs.openedPanel === APPLICATION_PREFERENCES })}
                onClick={this.handleClickMenuItem(APPLICATION_PREFERENCES)}
              ><span className="dropdown-menu-item-text">Application Preferences</span></div>
              <div
                className={classNames('dropdown-menu-item', { 'active': userProfileTabs.openedPanel === PERSONAL_INFORMATION })}
                onClick={this.handleClickMenuItem(PERSONAL_INFORMATION)}
              ><span className="dropdown-menu-item-text">Personal Information</span></div>
              <div
                className={classNames('dropdown-menu-item', { 'active': userProfileTabs.openedPanel === CONTACT_INFORMATION })}
                onClick={this.handleClickMenuItem(CONTACT_INFORMATION)}
              ><span className="dropdown-menu-item-text">Contact Information</span></div>
              <div
                className={classNames('dropdown-menu-item', { 'active': userProfileTabs.openedPanel === CHANGE_HISTORY })}
                onClick={this.handleClickMenuItem(CHANGE_HISTORY)}
              ><span className="dropdown-menu-item-text">Change History</span></div>
              <div
                className={classNames('dropdown-menu-item', { 'active': userProfileTabs.openedPanel === FEEDS })}
                onClick={this.handleClickMenuItem(FEEDS)}
              ><span className="dropdown-menu-item-text">Feeds</span></div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
