import React from 'react';
import Enzyme, { mount, shallow, render } from 'enzyme';
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
    dateOfBirthConvert: '24-Jun-1958',
    diagnosesDateConvert: '12-Dec-2017',
    ordersDateConvert: '12-Dec-2017',
    resultsDateConvert: '12-Dec-2017',
    vitalsDateConvert: '12-Dec-2017',
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
    dateOfBirthConvert: '24-Jun-1958',
    diagnosesDateConvert: '12-Dec-2017',
    ordersDateConvert: '12-Dec-2017',
    resultsDateConvert: '12-Dec-2017',
    vitalsDateConvert: '12-Dec-2017',
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
        patientsPerPageAmount={10}
        panelTitle="test"
        patientsCounts={patientsCounts}
      />)
    expect(patientsList).toMatchSnapshot();
  });
});
