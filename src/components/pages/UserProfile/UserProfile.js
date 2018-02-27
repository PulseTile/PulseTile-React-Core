import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import _ from 'lodash/fp';

import ApplicationPreferencesPanel from './panels/ApplicationPreferencesPanel';
import PersonalInformationPanel from './panels/PersonalInformationPanel';
import ContactInformationPanel from './panels/ContactInformationPanel';
import ChangeHistoryPanel from './panels/ChangeHistoryPanel';
import FeedsPanel from './panels/FeedsPanel';

import { formStateSelector, patientInfoSelector, userAccountSelector } from './selectors';
import { userProfileTabSelector } from '../../../selectors/user-profile-tab';
import { fetchProfileAppPreferencesRequest } from '../../../ducks/fetch-profile-application-preferences.duck';
import { fetchPatientsInfoRequest } from '../../../ducks/fetch-patients-info.duck';
import { setLogo } from '../../../ducks/set-logo.duck';
import { setTitle } from '../../../ducks/set-title.duck';
import { setTheme } from '../../../ducks/set-theme.duck';
import { changeUserProfileTab } from '../../../ducks/user-profile-tab.duck';
import themes from './theme-config';
import { themeConfigs } from '../../../themes.config';

const APPLICATION_PREFERENCES = 'applicationPreferences';

const mapDispatchToProps = dispatch => ({ actions: bindActionCreators({ fetchProfileAppPreferencesRequest, fetchPatientsInfoRequest, setLogo, setTitle, setTheme, changeUserProfileTab }, dispatch) });

@connect(formStateSelector)
@connect(userAccountSelector)
@connect(userProfileTabSelector)
@connect(patientInfoSelector, mapDispatchToProps)
class UserProfile extends PureComponent {
  state = {
    editedPanel: {},
  };

  componentDidMount() {
    if (!this.props.userProfileTabs.openedPanel) {
      this.changeTabsSettings({ expandedPanel: 'all', openedPanel: APPLICATION_PREFERENCES });
    }
  }

  componentWillUnmount() {
    this.changeTabsSettings({ expandedPanel: 'all', openedPanel: '' });
  }

  changeTabsSettings = (tabsSettings) => {
    this.props.dispatch(changeUserProfileTab(tabsSettings));
  };

  handleShow = (name) => {
    this.changeTabsSettings({ expandedPanel: this.props.userProfileTabs.expandedPanel, openedPanel: name });
  };

  handleExpand = (name) => {
    if (this.props.userProfileTabs.expandedPanel === 'all') {
      this.changeTabsSettings({ expandedPanel: name, openedPanel: name });
    } else {
      this.changeTabsSettings({ expandedPanel: 'all', openedPanel: name });
    }
  };

  handleEdit = (name) => {
    this.setState(prevState => ({
      editedPanel: {
        ...prevState.editedPanel,
        [name]: true,
      },
    }))
  };

  handleCancel = (name) => {
    const { patientsInfo, dispatch } = this.props;
    dispatch(setTheme(patientsInfo.themeColor));
    this.setState(prevState => ({
      editedPanel: {
        ...prevState.editedPanel,
        [name]: false,
      },
    }))
  };

  handleSaveSettingsForm = (formValues, name) => {
    const { actions, formState, patientsInfo, dispatch } = this.props;
    Object.keys(patientsInfo).forEach((key) => {
      patientsInfo[key] = formValues[key];
    });
    if (_.isEmpty(formState.syncErrors.title) && _.isEmpty(formState.syncErrors.browserTitle)) {
      dispatch(setLogo(patientsInfo.logoB64));
      dispatch(setTitle(patientsInfo.browserTitle));
      actions.fetchProfileAppPreferencesRequest(formValues);
      this.setState(prevState => ({
        editedPanel: {
          ...prevState.editedPanel,
          [name]: false,
        },
      }))
    }
  };

  render() {
    const { editedPanel } = this.state;
    const { formState, patientsInfo, user, userProfileTabs } = this.props;
    const openedPanel = userProfileTabs.openedPanel;
    const expandedPanel = userProfileTabs.expandedPanel;

    const theme = themes[patientsInfo.themeColor] ? themes[patientsInfo.themeColor] : themes.default;

    return (<section className="page-wrapper">
      <div className="panel-group accordion">

        <ApplicationPreferencesPanel
          formState={formState}
          patientsInfo={patientsInfo}
          openedPanel={openedPanel}
          expandedPanel={expandedPanel}
          editedPanel={editedPanel}
          theme={theme}
          onShow={this.handleShow}
          onExpand={this.handleExpand}
          onEdit={this.handleEdit}
          onCancel={this.handleCancel}
          onSaveSettings={this.handleSaveSettingsForm}
          isShowControlPanel
          isSaveButton
        />

        <PersonalInformationPanel
          user={user}
          openedPanel={openedPanel}
          expandedPanel={expandedPanel}
          editedPanel={editedPanel}
          onShow={this.handleShow}
          onExpand={this.handleExpand}
          onEdit={this.handleEdit}
          onCancel={this.handleCancel}
          isShowControlPanel
          isSaveButton={false}
        />

        <ContactInformationPanel
          user={user}
          openedPanel={openedPanel}
          expandedPanel={expandedPanel}
          editedPanel={editedPanel}
          onShow={this.handleShow}
          onExpand={this.handleExpand}
          onEdit={this.handleEdit}
          onCancel={this.handleCancel}
          isShowControlPanel
          isSaveButton={false}
        />

        <ChangeHistoryPanel
          openedPanel={openedPanel}
          expandedPanel={expandedPanel}
          editedPanel={editedPanel}
          onShow={this.handleShow}
          onExpand={this.handleExpand}
          onEdit={this.handleEdit}
          onCancel={this.handleCancel}
          isShowControlPanel={false}
          isSaveButton={false}
        />

        { themeConfigs.isLeedsPHRTheme ? <FeedsPanel
          openedPanel={openedPanel}
          expandedPanel={expandedPanel}
          editedPanel={editedPanel}
          onShow={this.handleShow}
          onExpand={this.handleExpand}
          onEdit={this.handleEdit}
          onCancel={this.handleCancel}
          isShowControlPanel={false}
          isSaveButton={false}
        /> : null }

      </div>
    </section>)
  }
}

export default UserProfile

