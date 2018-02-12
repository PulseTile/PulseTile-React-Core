import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import configureStore from 'redux-mock-store';

import UserAccountPanel from '../UserAccountPanel';

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
    const userAccountPanel = shallow(
      <UserAccountPanel
        store={storeProfilePage}
        onClick={onClick}
      />, { context }).dive().dive();
    expect(userAccountPanel).toMatchSnapshot();
    userAccountPanel.setContext(context);
    userAccountPanel.find('.user-profile-image').simulate('click');
    userAccountPanel.find('.name').simulate('click');
  });
});
