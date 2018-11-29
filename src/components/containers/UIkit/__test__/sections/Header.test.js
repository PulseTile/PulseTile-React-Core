import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import Header from '../../sections/Header';

Enzyme.configure({ adapter: new Adapter() });

describe('Component <Header />', () => {
  it('should renders Header with props correctly', () => {
    const component = shallow(<Header toggleSidebarVisibility={function() {}} />);
    component.find('.ui-btn-toggle-sidebar').simulate('click');
    expect(component).toMatchSnapshot();
  });
});
