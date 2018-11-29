import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import Typography from '../../../sections/blocks/Typography';

Enzyme.configure({ adapter: new Adapter() });

describe('Component <Typography />', () => {
  it('should renders Typography with props correctly', () => {
    const component = shallow(<Typography />);
    expect(component).toMatchSnapshot();
  });
});
