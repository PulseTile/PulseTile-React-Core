import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import Header from '../../../../sections/fragments/blocks/Header';

Enzyme.configure({ adapter: new Adapter() });

describe('Component <Header />', () => {
  it('should renders Header with props correctly', () => {
    const component = shallow(<Header />);

    component.find('.btn-notification.dropdown-toggle').simulate('click');
    component.find('.btn-user.dropdown-toggle').simulate('click');
    component.find('.btn-search-toggle').simulate('click');

    expect(component).toMatchSnapshot();
  });
});
