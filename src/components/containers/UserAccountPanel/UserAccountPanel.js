import React from 'react';
import PTButton from '../PTButton/PTButton';
import UserPanelItem from '../UserPanelItem/UserPanelItem';

const UserAccountPanel = props => <ul className="user-panel" role="tablist">
  <UserPanelItem className="user-panel-item visible-xs"
    children={(
      <PTButton className="btn-header"
        children={(
          <i className="fa fa-search"/>
        )}
      />
    )}
  />
  <UserPanelItem className="user-panel-item"
    children={(
      <PTButton className="btn-header btn-notification"
        children={(
          <div>
            <i className="fa fa-bell-o"/>
            <span className="count">2</span>
          </div>
        )}
      />
    )}
  />
  <UserPanelItem className="user-panel-item"
    children={(
      <PTButton className="btn-header btn-user"
        children={(
          <i className="fa fa-user"/>
        )}
      />
    )}
  />
</ul>;

export default UserAccountPanel;