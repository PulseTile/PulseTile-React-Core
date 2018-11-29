import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import ControlGroup from '../../../../sections/fragments/components/ControlGroup';

Enzyme.configure({ adapter: new Adapter() });

describe('Component <ControlGroup />', () => {
  it('should renders ControlGroup with props correctly', () => {
    const component = shallow(<ControlGroup />);
    expect(component).toMatchSnapshot();
  });
});
