import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import Components from '../../../sections/blocks/Components';

Enzyme.configure({ adapter: new Adapter() });

describe('Component <Components />', () => {
  it('should renders Components with props correctly', () => {
    const component = shallow(<Components />);
    expect(component).toMatchSnapshot();
  });
});
