import React from 'react';
import Dropdown from 'simple-react-dropdown'

import PTButton from '../PTButton/PTButton';
import UserPanelItem from '../UserPanelItem/UserPanelItem';
import NotificationContent from '../../representation/temprorary/NotificationContent'

class UserAccountPanel extends React.Component {
  render () {
    return(
      <ul className="user-panel" role="tablist">
        <UserPanelItem className="user-panel-item visible-xs"
           children={(
             <PTButton className="btn-header"
               children={(
                 <i className="fa fa-search"/>
               )}
             />
           )}
        />
        <UserPanelItem className="user-panel-item dropdown"
           children={(
             <Dropdown content={<NotificationContent />}>
               <PTButton className="btn-header btn-notification"
                 children={(
                   <div>
                     <i className="fa fa-bell-o"/>
                     <span className="count">2</span>
                   </div>
                 )}
               />
             </Dropdown>
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
      </ul>
    )
  }
}

export default UserAccountPanel;