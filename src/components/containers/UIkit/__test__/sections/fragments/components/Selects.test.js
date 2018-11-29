import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import Selects from '../../../../sections/fragments/components/Selects';

Enzyme.configure({ adapter: new Adapter() });

describe('Component <Selects />', () => {
  it('should renders Selects with props correctly', () => {
    const component = shallow(<Selects />);
    expect(component).toMatchSnapshot();

    component.find('.ui-select-container.ui-select-bootstrap.dropdown').at(0).simulate('click');
    expect(component).toMatchSnapshot();
    component.find('.ui-select-container.ui-select-bootstrap.dropdown').at(0).simulate('click');

    component.setState({ isDropdownOpen: true });
    component.find('li .ui-select-match').at(0).simulate('click');
    expect(component).toMatchSnapshot();
  });
});
