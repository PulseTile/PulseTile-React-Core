import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import Timeline from '../../../../sections/fragments/blocks/Timeline';

Enzyme.configure({ adapter: new Adapter() });

describe('Component <Timeline />', () => {
  it('should renders Timeline with props correctly', () => {
    const component = shallow(<Timeline />);
    expect(component).toMatchSnapshot();
  });
});
