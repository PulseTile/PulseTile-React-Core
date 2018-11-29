import React from 'react';
import configureStore from 'redux-mock-store';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import UIkit from '../UIkit';

Enzyme.configure({ adapter: new Adapter() });

const mockStore = configureStore();
const store = mockStore({
    isSidebarVisible: true,
    isTouchDevice: true,
});

describe('Component <UIkit />', () => {

  it('should renders with props correctly', () => {
    const component = shallow(<UIkit store={store} />).dive();
    expect(component).toMatchSnapshot();

    component.instance().toggleSidebarVisibility();
    expect(component).toMatchSnapshot();
  });

});
