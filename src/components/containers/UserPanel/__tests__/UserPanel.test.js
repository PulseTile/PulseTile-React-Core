import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import { Provider } from 'react-redux'
import { StaticRouter } from 'react-router'
import configureStore from 'redux-mock-store';

import UserPanel from '../UserPanel';

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
    const component = mount(
      <Provider store={store}>
        <StaticRouter location="someLocation" context={context}>
          <UserPanel
            openedPanel="userAccountPanel"
          />
        </StaticRouter>
      </Provider>)
    expect(component).toMatchSnapshot();
  });

  it('should renders with props correctly shallow testing', () => {
    const component = shallow(
      <UserPanel
        store={store}
        addUserPanels={['test']}
      />);
    expect(component).toMatchSnapshot();
    expect(component.state().openedPanel).toEqual('');

    component.find('.btn-notification').simulate('click');
    expect(component.state().openedPanel).toEqual('notificationContent');

    component.setState({ openedPanel: 'userAccountPanel' });
    expect(component.state().openedPanel).toEqual('userAccountPanel');

    component.find('.btn-notification').simulate('click');
    component.find('.btn-user').simulate('click');
    expect(component.state().openedPanel).toEqual('userAccountPanel');

    expect(component).toMatchSnapshot();

    component.setProps({ isQuestions: false, isNotifications: false, isUserPanel: false });
    expect(component).toMatchSnapshot();

    component.setProps({ addUserPanels: [] });

    component.instance().closePanel();
    expect(component.state().openedPanel).toEqual('');
    component.setProps({ isSearch: false });
  });
});
