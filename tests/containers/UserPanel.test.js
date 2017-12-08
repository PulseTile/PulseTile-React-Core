import React from 'react';
import Enzyme, { mount, render, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import { Provider } from 'react-redux'
import { StaticRouter } from 'react-router'
import configureStore from 'redux-mock-store';

import UserPanel from '../../src/components/containers/UserPanel/UserPanel';

Enzyme.configure({ adapter: new Adapter() })

const mockStore = configureStore();
const store = mockStore({
  runtime: {},
  userAccount: {
    sub: '28AD8576-1948-4C84-8B5E-55FB7EE027CE',
    given_name: 'Bob',
    family_name: 'Smith',
    email: 'bob.smith@gmail.com',
    tenant: null,
    role: 'IDCR',
    roles: [
      'IDCR',
    ],
  },
});
const context = {};

describe('Component <UserPanel />', () => {
  it('should renders with props correctly', () => {
    const patientsChart = mount(
      <Provider store={store}>
        <StaticRouter location="someLocation" context={context}>
          <UserPanel
            openedPanel="userAccountPanel"
          />
        </StaticRouter>
      </Provider>)
    expect(patientsChart).toMatchSnapshot();
  });
  it('should renders with props correctly', () => {
    const patientsChart = shallow(
      <UserPanel
        store={store}
        openedPanel="userAccountPanelTest"
      />);
    expect(patientsChart).toMatchSnapshot();
    patientsChart.find('.btn-notification').simulate('click');
    patientsChart.setProps({ openedPanel: 'userAccountPanel' });
    patientsChart.find('.btn-notification').simulate('click');
    patientsChart.find('.btn-user').simulate('click');
    console.log(patientsChart.state());
  });
});
