import React from 'react';
import Dropdown from 'simple-react-dropdown'

import PTButton from '../../ui-elements/PTButton/PTButton';
import UserPanelItem from './UserPanelItem';
import NotificationContent from '../../representation/temprorary/NotificationContent'
import UserAccountPanel from './UserAccountPanel'

const UserPanel = props =>
  <ul className="user-panel" role="tablist">
    <UserPanelItem className="user-panel-item visible-xs">
      <PTButton className="btn-header">
        <i className="fa fa-search" />
      </PTButton>
    </UserPanelItem>
    <UserPanelItem className="user-panel-item dropdown">
      <Dropdown content={<NotificationContent />}>
        <PTButton className="btn-header btn-notification">
          <div>
            <i className="fa fa-bell-o" />
            <span className="count">2</span>
          </div>
        </PTButton>
      </Dropdown>
    </UserPanelItem>
    <UserPanelItem className="user-panel-item dropdown">
      <Dropdown content={<UserAccountPanel />}>
        <PTButton className="btn-header btn-user">
          <i className="fa fa-user" />
        </PTButton>
      </Dropdown>
    </UserPanelItem>
  </ul>

export default UserPanel
