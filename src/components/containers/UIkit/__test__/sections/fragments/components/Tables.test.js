import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import Tables from '../../../../sections/fragments/components/Tables';

Enzyme.configure({ adapter: new Adapter() });

describe('Component <Tables />', () => {
  it('should renders Tables with props correctly', () => {
    const component = shallow(<Tables />);
    expect(component).toMatchSnapshot();
  });
});
