import React, { PureComponent } from 'react';
import classNames from 'classnames';
import { get } from 'lodash';
import { Link } from 'react-router-dom';

import PTButton from '../../ui-elements/PTButton/PTButton';
import UserPanelItem from './UserPanelItem';
import NotificationContent from '../../presentational/temprorary/NotificationContent'
import UserAccountPanel from './UserAccountPanel'
import { themeConfigs } from '../../../themes.config';
import { clientUrls } from '../../../config/client-urls.constants';
import UserTourLink from '../UserTour/UserTourLink';

const USER_ACCOUNT_PANEL = 'userAccountPanel';
const NOTIFICATION_CONTENT = 'notificationContent';

export default class UserPanel extends PureComponent {

  static defaultProps = {
    addUserPanels: [],
    runTour: function () {},
    pageUrl: '',
    userId: '',
  };

  state = {
    openedPanel: '',
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

  closePanel = () => {
    this.setState({ openedPanel: '' });
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

  cleanUserTourInfo = () => {
    document.cookie = 'userTour=';
  };

  render() {
    const { openedPanel } = this.state;
    const { addUserPanels, runTour, pageUrl, userId } = this.props;

    const isSearch = get(themeConfigs, 'topHeader.showSearch', true);
    const isQuestions = get(themeConfigs, 'topHeader.showQuestions', true);
    const isNotifications = get(themeConfigs, 'topHeader.showNotifications', true);
    const isUserPanel = get(themeConfigs, 'topHeader.showUserPanel', true);

    const homepageLink = `${clientUrls.PATIENTS}/${userId}/${clientUrls.PATIENTS_SUMMARY}`;

    const additionalUserPanels = this.getUserPanelsItems(addUserPanels);
    return (
      <ul className="user-panel" role="tablist" ref={node => this.node = node}>
        {isSearch ? <UserPanelItem className="user-panel-item visible-xs">
          <PTButton className="btn-header" onClick={() => this.handleMouseDown(NOTIFICATION_CONTENT)}>
            <i className="fa fa-search" />
          </PTButton>
        </UserPanelItem> : null}
        { additionalUserPanels }
          {isQuestions ?
            <UserPanelItem className="user-panel-item">
              {(clientUrls.PATIENTS_SUMMARY === pageUrl)
                ?
                  <PTButton title="User Tour" id="icon-tour" className="btn-header" onClick={() => runTour()}>
                    <i className="fa fa-question-circle" />
                  </PTButton>
                :
                  <Link to={homepageLink} onClick={this.cleanUserTourInfo}>
                    <PTButton title="Home" className="btn-header">
                      <i className="fa fa-question-circle" />
                    </PTButton>
                  </Link>
              }
            </UserPanelItem>
            : null}
        {(clientUrls.PATIENTS_SUMMARY === pageUrl) ?
          <UserTourLink />
          : null }
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
          <UserAccountPanel onClick={this.handleMouseDown} onClose={this.closePanel} />
          <PTButton id="icon-profile" className="btn-header btn-user" onClick={() => this.handleMouseDown(USER_ACCOUNT_PANEL)}>
            <i className="fa fa-user" />
          </PTButton>
        </UserPanelItem> : null}
      </ul>
    )
  }
}
