import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import Datepicker from '../../../../sections/fragments/components/Datepicker';

Enzyme.configure({ adapter: new Adapter() });

describe('Component <Datepicker />', () => {
  it('should renders Datepicker with props correctly', () => {
    const component = shallow(<Datepicker />);
    expect(component).toMatchSnapshot();
  });
});
