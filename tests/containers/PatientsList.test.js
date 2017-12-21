import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

import PatientsList from '../../src/components/containers/PatientsList/PatientsList';

Enzyme.configure({ adapter: new Adapter() })

const allPatientsWithCounts = [
  {
    id: '9999999006',
    address: 'P.O. Box 711, 8725 Purus Rd., Grangemouth, Stirlingshire, B4 8MW',
    dateOfBirth: -363657600000,
    department: 'Primary Care',
    gender: 'Male',
    gpAddress: 'Aulderan Practice, Ap #806-2884 Enim St., Auldearn, Nairnshire, V4F 9GJ',
    gpName: 'Joseph May N.',
    name: 'Ezra Gordon',
    nhsNumber: '9999999006',
    pasNo: '595941',
    phone: '070 6691 5178',
    diagnosesDate: '1970-01-01T00:00:00-05:00',
    ordersDate: '1970-01-01T00:00:00-05:00',
    resultsDate: '1970-01-01T00:00:00-05:00',
    vitalsDate: '1970-01-01T00:00:00-05:00',
  },
  {
    id: '9999999006',
    address: 'P.O. Box 711, 8725 Purus Rd., Grangemouth, Stirlingshire, B4 8MW',
    dateOfBirth: -363657600000,
    department: 'Primary Care',
    gender: 'Male',
    gpAddress: 'Aulderan Practice, Ap #806-2884 Enim St., Auldearn, Nairnshire, V4F 9GJ',
    gpName: 'Joseph May N.',
    name: 'Ezra Gordon',
    nhsNumber: '9999999006',
    pasNo: '595941',
    phone: '070 6691 5178',
    diagnosesDate: '1970-01-01T00:00:00-05:00',
    ordersDate: '1970-01-01T00:00:00-05:00',
    resultsDate: '1970-01-01T00:00:00-05:00',
    vitalsDate: '1970-01-01T00:00:00-05:00',
  },
];
const allPatients = [
  {
    id: '9999999006',
    address: 'P.O. Box 711, 8725 Purus Rd., Grangemouth, Stirlingshire, B4 8MW',
    dateOfBirth: -363657600000,
    department: 'Primary Care',
    gender: 'Male',
    gpAddress: 'Aulderan Practice, Ap #806-2884 Enim St., Auldearn, Nairnshire, V4F 9GJ',
    gpName: 'Joseph May N.',
    name: 'Ezra Gordon',
    nhsNumber: '9999999006',
    pasNo: '595941',
    phone: '070 6691 5178',
  },
  {
    id: '9999999006',
    address: 'P.O. Box 711, 8725 Purus Rd., Grangemouth, Stirlingshire, B4 8MW',
    dateOfBirth: -363657600000,
    department: 'Primary Care',
    gender: 'Male',
    gpAddress: 'Aulderan Practice, Ap #806-2884 Enim St., Auldearn, Nairnshire, V4F 9GJ',
    gpName: 'Joseph May N.',
    name: 'Ezra Gordon',
    nhsNumber: '9999999006',
    pasNo: '595941',
    phone: '070 6691 5178',
  },
];
const patientsCounts = {
  9999999006: {
    0: {
      diagnosesCount: '',
      resultsCount: 1,
      vitalsCount: '',
      source: 'ethercis',
      sourceId: 'ethercis-counts',
    },
  },
}
const handleHeaderCellClick = () => console.log('worked handleHeaderCellClick function');

describe('Component <PatientsList />', () => {
  it('should renders with props correctly', () => {
    const patientsList = mount(
      <PatientsList
        allPatientsWithCounts={allPatientsWithCounts}
        handleHeaderCellClick={handleHeaderCellClick}
        allPatients={allPatients}
        patientsPerPageAmount={1}
        panelTitle="test"
        patientsCounts={patientsCounts}
      />)
    patientsList.find('.btn-dropdown-toggle').at(0).simulate('click');
    patientsList.find('.btn-filter').at(0).simulate('click');

    patientsList.find('.form-control').at(0).simulate('change', { target: { value: 'ezra' } });
    expect(patientsList.state().nameShouldInclude).toEqual('ezra');
    patientsList.find('th[name="address"]').simulate('click');
    expect(patientsList).toMatchSnapshot();

    expect(patientsList.state().isDisclaimerModalVisible).toEqual(false);
    patientsList.setState({ isDisclaimerModalVisible: true });
    expect(patientsList.state().isDisclaimerModalVisible).toEqual(true);
    patientsList.find('[name="address"]').at(0).simulate('click');
    patientsList.find('.pagination-link').at(2).simulate('click');
    patientsList.find('.btn-dropdown-toggle').at(3).simulate('click');
    patientsList.setProps({ patientsPerPageAmount: 2 });
    expect(patientsList.props().patientsPerPageAmount).toEqual(2);

    patientsList.mount();
    patientsList.unmount();
  });
});
