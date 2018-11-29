import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import PatientInfo from '../../../../sections/fragments/blocks/PatientInfo';

Enzyme.configure({ adapter: new Adapter() });

describe('Component <PatientInfo />', () => {
  it('should renders PatientInfo with props correctly', () => {
    const component = shallow(<PatientInfo />);
    expect(component).toMatchSnapshot();
  });
});
