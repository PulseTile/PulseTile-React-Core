import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import configureStore from 'redux-mock-store';

import UserAccountPanelSettings from '../UserAccountPanelSettings';

Enzyme.configure({ adapter: new Adapter() })

const mockStore = configureStore();
const storeResource = {
  userProfileTabs: {
    openedPanel: 'applicationPreferences',
    expandedPanel: 'all',
  }
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
const store = mockStore(Object.assign({}, storeResource));

describe('Component <UserAccountPanelSettings />', () => {
  it('should renders with props correctly', () => {
    const component = shallow(
      <UserAccountPanelSettings
        store={store}
        onClose={() => {}}
      />, { context }).dive();
    expect(component).toMatchSnapshot();
    component.setContext(context);

    expect(component.state().openedUserMenu).toEqual(false);
    component.instance().toggleOpenedUserMenu();
    expect(component.state().openedUserMenu).toEqual(true);

    component.instance().handleClickMenuItem('personalInformation')();
  });
});
