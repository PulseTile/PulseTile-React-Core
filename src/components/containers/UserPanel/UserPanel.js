import React, { PureComponent } from 'react';
import classNames from 'classnames';

import PTButton from '../../ui-elements/PTButton/PTButton';
import UserPanelItem from './UserPanelItem';
import NotificationContent from '../../presentational/temprorary/NotificationContent'
import UserAccountPanel from './UserAccountPanel'

const USER_ACCOUNT_PANEL = 'userAccountPanel';
const NOTIFICATION_CONTENT = 'notificationContent';

export default class UserPanel extends PureComponent {
  state = {
    openedPanel: '',
  };

  static defaultProps = {
    isSearch: true,
    isQuestions: true,
    isNotifications: true,
    isUserPanel: true,
    addUserPanels: []
  };

  /* istanbul ignore next */
  componentWillMount() {
    document.addEventListener('click', this.handleClick, false);
  }

  /* istanbul ignore next */
  componentWillUnmount() {
    document.removeEventListener('click', this.handleClick, false);
  }

  handleClick = /* istanbul ignore next */ (e) => {
    if (!this.node.contains(e.target)) {
      this.setState({ openedPanel: '' });
    }
  };

  handleMouseDown = (name) => {
    /* istanbul ignore next */
    this.setState((prevState) => {
      if (prevState.openedPanel !== name) {
        return ({ openedPanel: name })
      }
      return ({ openedPanel: '' })
    })
  };

  getUserPanelsItems = (addUserPanels) => {
    if (addUserPanels.length) {
      return addUserPanels.map((el) => {
        return (
          <UserPanelItem className="user-panel-item">
            { el }
          </UserPanelItem>
        );
      });
    }

    return null;
  };

  render() {
    const { openedPanel } = this.state;
    const { isSearch, isQuestions, isNotifications, isUserPanel, addUserPanels } = this.props;
    const additionalUserPanels = this.getUserPanelsItems(addUserPanels);
    return (
      <ul className="user-panel" role="tablist" ref={node => this.node = node}>
        {isSearch ? <UserPanelItem className="user-panel-item visible-xs">
          <PTButton className="btn-header">
            <i className="fa fa-search" />
          </PTButton>
        </UserPanelItem> : null}
        { additionalUserPanels }
        {isQuestions ? <UserPanelItem className="user-panel-item">
          <PTButton className="btn-header">
            <i className="fa fa-question-circle" />
          </PTButton>
        </UserPanelItem> : null}
        {isNotifications ? <UserPanelItem className={classNames('user-panel-item dropdown', { 'open': openedPanel === NOTIFICATION_CONTENT })}>
          <NotificationContent />
          <PTButton className="btn-header btn-notification" onClick={() => this.handleMouseDown(NOTIFICATION_CONTENT)}>
            <div>
              <i className="fa fa-bell-o" />
              <span className="count">2</span>
            </div>
          </PTButton>
        </UserPanelItem> : null}
        {isUserPanel ? <UserPanelItem className={classNames('user-panel-item dropdown', { 'open': openedPanel === USER_ACCOUNT_PANEL })}>
          <UserAccountPanel onClick={this.handleMouseDown} />
          <PTButton className="btn-header btn-user" onClick={() => this.handleMouseDown(USER_ACCOUNT_PANEL)}>
            <i className="fa fa-user" />
          </PTButton>
        </UserPanelItem> : null}
      </ul>
    )
  }
}
