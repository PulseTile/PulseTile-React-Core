import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

import PatientsInfoPanel from '../header/PatientsInfoPanel';

Enzyme.configure({ adapter: new Adapter() });
const selectedColumns = {
  name: true,
  gender: true,
  dateOfBirth: true,
  address: true,
  id: true,
  ordersDate: true,
  resultsDate: true,
  vitalsDate: false,
  diagnosesDate: false,
  ordersCount: true,
  resultsCount: true,
  vitalsCount: false,
  diagnosesCount: false,
  viewPatientNavigation: true,
};
const onColumnsSelected = () => console.log('onColumnsSelected worked');

describe('Component <PatientsInfoPanel />', () => {
  it('should renders correctly shallow', () => {
    const patientsInfoPanel = shallow(
      <PatientsInfoPanel
        selectedColumns={selectedColumns}
        onColumnsSelected={onColumnsSelected}
      />
    ).dive();
    expect(patientsInfoPanel.state().isFilterInputVisible).toEqual(false);
    expect(patientsInfoPanel.state().isPatientInfoPanelVisible).toEqual(false);
    patientsInfoPanel.find('[name="address"]').simulate('click');
    patientsInfoPanel.find('.btn-success').at(1).simulate('click');
    expect(patientsInfoPanel).toMatchSnapshot();
  });
});

