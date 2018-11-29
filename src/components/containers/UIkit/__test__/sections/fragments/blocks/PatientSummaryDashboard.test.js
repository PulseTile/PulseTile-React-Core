import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import PatientSummaryDashboard from '../../../../sections/fragments/blocks/PatientSummaryDashboard';

Enzyme.configure({ adapter: new Adapter() });

describe('Component <PatientSummaryDashboard />', () => {
  it('should renders PatientSummaryDashboard with props correctly', () => {
    const component = shallow(<PatientSummaryDashboard />);
    expect(component).toMatchSnapshot();
  });
});
