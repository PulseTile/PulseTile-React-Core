import React from 'react';
import configureStore from 'redux-mock-store';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import BarChart from '../../../../sections/fragments/blocks/BarChart/BarChart';

Enzyme.configure({ adapter: new Adapter() });

const mockStore = configureStore();
const store = mockStore({
    isSidebarVisible: true,
    isTouchDevice: true,
});

const patientsByDepartment = [];

describe('Component <BarChart />', () => {
  it('should renders BarChart with props correctly', () => {
    const component = shallow(<BarChart patientsByDepartment={patientsByDepartment} store={store} />).dive();
    expect(component).toMatchSnapshot();
  });
});
