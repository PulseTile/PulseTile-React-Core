import React from 'react';
import PTButtonIcon from '../PTButtonIcon/PTButtonIcon';

const UserAccountPanel = props => <ul className="user-panel" role="tablist">
  <li className="user-panel-item visible-xs">
    <PTButtonIcon className="btn-header"
      children={(
        <i className="fa fa-search"/>
      )}
    />
  </li>
  <li className="user-panel-item">
    <PTButtonIcon className="btn-header btn-notification"
      children={(
        <div>
          <i className="fa fa-bell-o"/>
          <span className="count">2</span>
        </div>
      )}
    />
  </li>
  <li className="user-panel-item">
    <PTButtonIcon className="btn-header btn-user"
      children={(
        <i className="fa fa-user"/>
      )}
    />
  </li>
</ul>;

export default UserAccountPanel;