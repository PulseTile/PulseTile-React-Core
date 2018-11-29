import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import Blocks from '../../../sections/blocks/Blocks';

Enzyme.configure({ adapter: new Adapter() });

describe('Component <Blocks />', () => {
  it('should renders Blocks with props correctly', () => {
    const component = shallow(<Blocks />);
    expect(component).toMatchSnapshot();
  });
});
