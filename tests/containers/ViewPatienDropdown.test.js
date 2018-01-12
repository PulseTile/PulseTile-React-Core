import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

import ViewPatienDropdown from '../../src/components/containers/PatientsList/actions-column/ViewPatienDropdown';

Enzyme.configure({ adapter: new Adapter() });

const patient = {
  id: '9999999024',
};
const onSetOpenedDropdownID = () => console.log('onSetOpenedDropdownID function worked');
const onPatientViewClick = () => console.log('onPatientViewClick function worked');

describe('Component <ViewPatienDropdown />', () => {
  it('should renders with prop openedDropdownID correctly', () => {
    const viewPatienDropdown = shallow(
      <ViewPatienDropdown
        patient={patient}
        openedDropdownID="9999999024"
        onSetOpenedDropdownID={onSetOpenedDropdownID}
        onPatientViewClick={onPatientViewClick}
      />
    );
    viewPatienDropdown.find('.dropdown').simulate('click', {
      stopPropagation: () => {},
    });
    expect(viewPatienDropdown.find('.open')).toHaveLength(1);
    expect(viewPatienDropdown.find('.patients-dropdown-options')).toHaveLength(1);
    viewPatienDropdown.find('.patients-dropdown-options').simulate('click');
    viewPatienDropdown.find('.dropdown-toggle').simulate('click');
    viewPatienDropdown.find('.btn-view-patient').simulate('click');
    expect(viewPatienDropdown).toMatchSnapshot();
  });
  it('should renders with another prop openedDropdownID correctly', () => {
    const viewPatienDropdown = shallow(
      <ViewPatienDropdown
        patient={patient}
        openedDropdownID="9999999025"
        onSetOpenedDropdownID={onSetOpenedDropdownID}
        onPatientViewClick={onPatientViewClick}
      />
    );
    viewPatienDropdown.find('.dropdown').simulate('click', {
      stopPropagation: () => {},
    });
    viewPatienDropdown.find('.dropdown-toggle').simulate('click');
    viewPatienDropdown.find('.btn-view-patient').simulate('click');
    expect(viewPatienDropdown).toMatchSnapshot();
  });
});

