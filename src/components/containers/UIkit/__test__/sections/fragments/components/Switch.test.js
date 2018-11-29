import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import Switch from '../../../../sections/fragments/components/Switch';

Enzyme.configure({ adapter: new Adapter() });

describe('Component <Switch />', () => {
  it('should renders Switch with props correctly', () => {
    const component = shallow(<Switch />);
    expect(component).toMatchSnapshot();
  });
});
