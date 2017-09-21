import React from 'react';

const NotificationContent = () => {
  return (
    <div className="notifications-drop dropdown-menu dropdown-menu-right" id="tab-notifications">
      <div className="notifications-header">Notifications (2)</div>
      <div className="notifications-body">
        <ul className="notifications-list">
          <li className="notifications-list-item">
            <div className="notification-info">Information from Liquid Logic (Social Care) is currently unavailable.</div>
            <div className="notification-time"><em>10 minutes ago</em></div>
          </li>
          <li className="notifications-list-item">
            <div className="notification-info">Information from Liquid Logic (Social Care) is currently unavailable.</div>
            <div className="notification-time"><em>15 minutes ago</em></div>
          </li>
        </ul>
      </div>
    </div>
  )
};

export default NotificationContent;
