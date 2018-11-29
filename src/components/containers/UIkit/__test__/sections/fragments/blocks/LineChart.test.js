import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import LineChart from '../../../../sections/fragments/blocks/LineChart';

Enzyme.configure({ adapter: new Adapter() });

describe('Component <LineChart />', () => {
  it('should renders LineChart with props correctly', () => {
    const component = shallow(<LineChart />);
    expect(component).toMatchSnapshot();
  });
});
