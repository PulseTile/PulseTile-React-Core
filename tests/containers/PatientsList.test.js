import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
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
const context = {
  router: {
    history: {
      push: () => {},
      replace: () => {},
      location: {
        pathname: '/patients',
        state: {
          data: [
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
          ],
          searchResult: '(Search Type: allergies, Search Query: contains \\"1\\")',
        },
      },
    },
  },
};
const emptyContext = {
  router: {
    history: {
      location: {
      },
    },
  },
};
const handleHeaderCellClick = () => console.log('worked handleHeaderCellClick function');

describe('Component <PatientsList />', () => {
  it('should renders with props correctly', () => {
    const component = mount(
      <PatientsList
        allPatientsWithCounts={allPatientsWithCounts}
        handleHeaderCellClick={handleHeaderCellClick}
        allPatients={allPatients}
        patientsPerPageAmount={1}
        panelTitle="test"
        patientsCounts={patientsCounts}
      />, { context: emptyContext, childContextTypes: { emptyContext: React.PropTypes.object } });
    component.find('.btn-dropdown-toggle').at(0).simulate('click');
    component.find('.btn-filter').at(0).simulate('click');

    component.find('.form-control').at(0).simulate('change', { target: { value: 'ezra' } });
    expect(component.state().nameShouldInclude).toEqual('ezra');
    component.find('th[name="address"]').simulate('click');
    expect(component).toMatchSnapshot();

    expect(component.state().isDisclaimerModalVisible).toEqual(false);
    component.setState({ isDisclaimerModalVisible: true });
    expect(component.state().isDisclaimerModalVisible).toEqual(true);
    component.find('[name="address"]').at(0).simulate('click');
    component.find('.pagination-link').at(2).simulate('click');
    component.find('.btn-dropdown-toggle').at(3).simulate('click');
    component.setProps({ patientsPerPageAmount: 2 });
    expect(component.props().patientsPerPageAmount).toEqual(2);

    component.mount();
    component.unmount();
  });

  it('should renders with props correctly shallow testing', () => {
    const component = shallow(
      <PatientsList
        allPatientsWithCounts={allPatientsWithCounts}
      />, { context });

    expect(component.find('PatientsListHeader').props().panelTitle).toEqual('Patient Info (Search Type: allergies, Search Query: contains \\"1\\")');

    expect(component).toMatchSnapshot();
  });
});
