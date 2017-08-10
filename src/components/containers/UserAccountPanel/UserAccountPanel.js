import React from 'react';
import PTButton from '../PTButton/PTButton';

const UserAccountPanel = props => <ul className="user-panel" role="tablist">
  <li className="user-panel-item visible-xs">
    <PTButton className="btn-header"
      children={(
        <i className="fa fa-search"/>
      )}
    />
  </li>
  <li className="user-panel-item">
    <PTButton className="btn-header btn-notification"
      children={(
        <div>
          <i className="fa fa-bell-o"/>
          <span className="count">2</span>
        </div>
      )}
    />
  </li>
  <li className="user-panel-item">
    <PTButton className="btn-header btn-user"
      children={(
        <i className="fa fa-user"/>
      )}
    />
  </li>
</ul>;

export default UserAccountPanel;