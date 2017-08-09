import React from 'react';
import PTButtonIcon from '../PTButtonIcon/PTButtonIcon';

const UserAccountPanel = props => <ul className="user-panel" role="tablist">
  <li className="user-panel-item visible-xs">
    <a className="btn-header" href="#">
      <i className="fa fa-search"/>
    </a>
  </li>
  <li className="user-panel-item">
    <PTButtonIcon classButtonName="btn-notification" icon="fa-bell-o"/>
  </li>
  <li className="user-panel-item">
    <PTButtonIcon classButtonName="btn-user" icon="fa-user"/>
  </li>
</ul>;

export default UserAccountPanel;
