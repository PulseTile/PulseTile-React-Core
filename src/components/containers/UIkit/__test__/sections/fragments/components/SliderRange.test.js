import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import SliderRange from '../../../../sections/fragments/components/SliderRange';

Enzyme.configure({ adapter: new Adapter() });

describe('Component <SliderRange />', () => {
  it('should renders SliderRange with props correctly', () => {
    const component = shallow(<SliderRange />);
    expect(component).toMatchSnapshot();
  });
});
