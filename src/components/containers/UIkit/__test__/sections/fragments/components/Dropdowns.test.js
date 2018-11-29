import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import Dropdowns from '../../../../sections/fragments/components/Dropdowns';

Enzyme.configure({ adapter: new Adapter() });

describe('Component <Dropdowns />', () => {
  it('should renders Dropdowns with props correctly', () => {
    const component = shallow(<Dropdowns />);
    expect(component).toMatchSnapshot();
    component.find('#topLeftDropdown').simulate('click');
    expect(component).toMatchSnapshot();
    component.find('#topRightDropdown').simulate('click');
    expect(component).toMatchSnapshot();
    component.find('#bottomLeftDropdown').simulate('click');
    expect(component).toMatchSnapshot();
    component.find('#bottomRightDropdown').simulate('click');
    expect(component).toMatchSnapshot();
    component.find('#notHiddenDropdown').simulate('click');
    expect(component).toMatchSnapshot();
  });
});
