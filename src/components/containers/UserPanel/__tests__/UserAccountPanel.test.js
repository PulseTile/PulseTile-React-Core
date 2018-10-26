import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import configureStore from 'redux-mock-store';

import UserAccountPanel from '../UserAccountPanel';
import { themeConfigs } from '../../../../themes.config';

Enzyme.configure({ adapter: new Adapter() })

const mockStore = configureStore();
const storeResource = {
  userAccount: {
    sub: '28AD8576-1948-4C84-8B5E-55FB7EE027CE',
    given_name: 'Bob',
    family_name: 'Smith',
    email: 'bob.smith@gmail.com',
    tenant: null,
    role: 'IDCR',
    roles: [
      'IDCR'
    ]
  },
  patientsInfo: {
    browserTitle: 'PulseTile',
    logoB64: 'testLogo',
    themeColor: 'green',
    title: 'PulseTile',
  },
  initialiseData: {
    token: 'd4281221-3950-4019-b207-18e49086dab8',
    mode: 'demo',
    version: '2.32.1',
  },
};
const context = {
  router: {
    history: {
      test: 'test',
      goBack: () => {},
      push: () => {},
    },
  },
};
const onClick = () => console.log('test')
const storeProfilePage = mockStore(Object.assign({
  router: {
    location: {
      pathname: '/',
      search: '',
      hash: '#/profile',
    },
  } }, storeResource));
describe('Component <UserAccountPanel />', () => {
  it('should renders with props correctly', () => {
    const component = shallow(
      <UserAccountPanel
        store={storeProfilePage}
        onClick={onClick}
      />, { context }).dive().dive().dive();
    expect(component).toMatchSnapshot();
    component.setContext(context);
    if (themeConfigs.isShowUserPhoto) {
      component.find('.user-profile-image').simulate('click');
      component.find('.name').simulate('click');
    }
  });

  it('should renders with props correctly with isShowUserProfileSettings ', () => {
    themeConfigs.isShowUserProfileSettings = true;
    const component = shallow(
      <UserAccountPanel
        store={storeProfilePage}
        onClick={onClick}
      />, { context }).dive().dive().dive();
    component.setContext(context);
    expect(component.find('Connect(UserAccountPanelSettings)')).toHaveLength(1);
    expect(component).toMatchSnapshot();
  });
});
