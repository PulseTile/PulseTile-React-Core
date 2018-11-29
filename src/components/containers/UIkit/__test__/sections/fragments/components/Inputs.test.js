import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import Inputs from '../../../../sections/fragments/components/Inputs';

Enzyme.configure({ adapter: new Adapter() });

describe('Component <Inputs />', () => {
  it('should renders Inputs with props correctly', () => {
    const component = shallow(<Inputs />);
    expect(component).toMatchSnapshot();
  });
});
