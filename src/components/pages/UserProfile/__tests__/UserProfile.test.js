import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import configureStore from 'redux-mock-store';

import UserProfile from '../UserProfile';
import themes from '../theme-config';
import { themeConfigs } from '../../../../themes.config';

Enzyme.configure({ adapter: new Adapter() });

const patientsInfo = {
  title: 'ripple',
  logoB64: 'data:image/gif;base64,R0lGODlhDwAPAKECAAAAzMzM/////wAAACwAAAAADwAPAAACIISPeQHsrZ5ModrLlN48CXF8m2iQ3YmmKqVlRtW4MLwWACH+H09wdGltaXplZCBieSBVbGVhZCBTbWFydFNhdmVyIQAAOw==',
  themeColor: 'green',
  browserTitle: 'PulseTile',
};
const patientsInfoForPurpleTheme = {
  title: 'ripple',
  logoB64: '',
  themeColor: 'purple',
  browserTitle: 'PulseTile',
};
const userAccount = {
  sub: '28AD8576-1948-4C84-8B5E-55FB7EE027CE',
  given_name: 'Bob',
  family_name: 'Smith',
  email: 'bob.smith@gmail.com',
  tenant: null,
  role: 'IDCR',
  roles: [
    'IDCR',
  ],
};

const mockStore = configureStore();
const store = mockStore({ patientsInfo, userAccount });
const storeForPurpleTheme = mockStore({ patientsInfo: patientsInfoForPurpleTheme, userAccount });

const DATE_TO_USE = new Date('2017');
const DATE_TO_USE_TIME = DATE_TO_USE.getTime();
global.Date = jest.fn(() => DATE_TO_USE);
Date.now = jest.fn(() => DATE_TO_USE_TIME);

const match = {
  params: {},
  path: '/profile',
  url: '/profile',
};

const context = {
  router: {
    history: {
      push: () => {},
      replace: () => {},
      location: {
        pathname: '/profile',
      },
    },
    match,
    patientsInfo,
  },
};

describe('Component <UserProfile />', () => {
  it('should renders with all props correctly', () => {
    const component = shallow(
      <UserProfile
        store={store}
        match={match}
      />, { context }).dive().dive().dive();

    expect(component).toMatchSnapshot();

    const colorName = themes[patientsInfo.themeColor] ? themes[patientsInfo.themeColor].name : themes.default.name;
    expect(component.find('ApplicationPreferencesPanel')).toHaveLength(1);
    expect(component.find('PersonalInformationPanel')).toHaveLength(1);
    expect(component.find('ContactInformationPanel')).toHaveLength(1);
    expect(component.find('ChangeHistoryPanel')).toHaveLength(1);
    expect(component.find('FeedsPanel')).toHaveLength(0);

    expect(component.find('ApplicationPreferencesPanel').props().openedPanel).toEqual('applicationPreferences');
    expect(component.find('ApplicationPreferencesPanel').props().expandedPanel).toEqual('all');
    expect(component.find('ApplicationPreferencesPanel').props().theme).toEqual({ baseColor: '#0D672F', name: colorName });
    expect(component.find('ApplicationPreferencesPanel').props().isShowControlPanel).toEqual(true);
    expect(component.find('ApplicationPreferencesPanel').props().isSaveButton).toEqual(true);

    expect(component.find('PersonalInformationPanel').props().isShowControlPanel).toEqual(true);
    expect(component.find('PersonalInformationPanel').props().isSaveButton).toEqual(false);

    expect(component.find('ContactInformationPanel').props().isShowControlPanel).toEqual(true);
    expect(component.find('ContactInformationPanel').props().isSaveButton).toEqual(false);

    expect(component.find('ChangeHistoryPanel').props().isShowControlPanel).toEqual(false);
    expect(component.find('ChangeHistoryPanel').props().isSaveButton).toEqual(false);

    themeConfigs.isLeedsPHRTheme = true;
  });

  it('should work all methods of component', () => {
    const component = shallow(
      <UserProfile
        store={store}
        match={match}
      />, { context }).dive().dive().dive();

    component.instance().handleShow('applicationPreferences');
    expect(component.state().openedPanel).toEqual('applicationPreferences');
    component.instance().handleShow('personalInformation');
    expect(component.state().openedPanel).toEqual('personalInformation');

    expect(component.state().expandedPanel).toEqual('all');
    component.instance().handleExpand('applicationPreferences');
    expect(component.state().expandedPanel).toEqual('applicationPreferences');
    component.instance().handleExpand('applicationPreferences');
    expect(component.state().expandedPanel).toEqual('all');

    expect(!!component.state().editedPanel.applicationPreferences).toEqual(false);
    component.instance().handleEdit('applicationPreferences');
    expect(component.state().editedPanel.applicationPreferences).toEqual(true);
    component.instance().handleCancel('applicationPreferences');
    expect(component.state().editedPanel.applicationPreferences).toEqual(false);

    component.setProps({ formState: { syncErrors: { title: 'title' } } });
    component.instance().handleSaveSettingsForm(patientsInfo, 'applicationPreferences');
    component.setProps({ formState: { syncErrors: { browserTitle: 'title' } } });
    component.instance().handleSaveSettingsForm(patientsInfo, 'applicationPreferences');
    component.setProps({ formState: { syncErrors: {} } });
    component.instance().handleSaveSettingsForm(patientsInfo, 'applicationPreferences');
  });

  it('should renders correctly when theme is Purple', () => {
    const component = shallow(
      <UserProfile
        store={storeForPurpleTheme}
        match={match}
      />, { context }).dive().dive().dive();

    expect(component.find('ApplicationPreferencesPanel').props().theme).toEqual({ baseColor: '#461a5a', name: 'Purple Theme' });
    expect(component).toMatchSnapshot();
  });
});
