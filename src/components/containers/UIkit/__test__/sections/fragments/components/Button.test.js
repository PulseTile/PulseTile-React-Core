import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import Buttons from '../../../../sections/fragments/components/Buttons';

Enzyme.configure({ adapter: new Adapter() });

describe('Component <Buttons />', () => {
  it('should renders Buttons with props correctly', () => {
    const component = shallow(<Buttons />);
    expect(component).toMatchSnapshot();
    component.find('.btn.btn-success.btn-inverse.btn-dropdown-toggle').simulate('click');
    expect(component).toMatchSnapshot();
    component.find('.btn.btn-success.btn-inverse.btn-dropdown-toggle').simulate('click');
    expect(component).toMatchSnapshot();
  });
});
