import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

import SortableTableRow from '../../src/components/containers/SortableTable/SortableTableRow';

Enzyme.configure({ adapter: new Adapter() });

const headers = [
  {
    key: 'name',
    title: 'Name',
    width: '150',
  },
  {
    key: 'address',
    title: 'Address',
    width: '300',
  },
  {
    key: 'test',
    title: 'Test',
    width: '145',
  },
  {
    key: 'id',
    title: 'NHS No.',
    width: '115',
  },
  {
    key: 'viewPatientNavigation',
    title: '',
    width: '90',
  },
];
const resourceData = [
  {
    address: 'P.O. Box 711, 8725 Purus Rd., Grangemouth, Stirlingshire, B4 8MW',
    dateOfBirth: -363657600000,
    department: 'Primary Care',
    gender: 'Male',
    gpAddress: 'Aulderan Practice, Ap #806-2884 Enim St., Auldearn, Nairnshire, V4F 9GJ',
    gpName: 'Joseph May N.',
    id: '9999999006',
    name: 'Ezra Gordon',
    nhsNumber: '9999999006',
    pasNo: '595941',
    phone: '070 6691 5178',
    highlighters: [{
      name: 'address',
      status: 'warning'
    }],
  },
  {
    address: 'P.O. Box 711, 8725 Purus Rd., Grangemouth, Stirlingshire, B4 8MW',
    dateOfBirth: -363657600000,
    department: 'Primary Care',
    gender: 'Male',
    gpAddress: 'Aulderan Practice, Ap #806-2884 Enim St., Auldearn, Nairnshire, V4F 9GJ',
    gpName: 'Joseph May N.',
    id: '9999999006',
    name: 'test',
    nhsNumber: '9999999006',
    pasNo: '595941',
    phone: '070 6691 5178',
    highlighters: [{
      name: 'address',
      status: 'danger'
    }],
  },
];
const rowDataWarning = [
  {
    name: 'name',
    value: 'Ezra Gordon',
  },
  {
    name: 'address',
    value: '26, High Street, Limerick, LK',
    highlighter: 'warning',
  },
  {
    name: 'dateOfBirth',
    value: '19-Feb-1938',
  },
  {
    name: 'id',
    value: '9999999024',
  },
  {
    name: 'viewPatientNavigation',
    value: 'test',
  },
];
const rowDataDanger = [
  {
    name: 'name',
    value: 'test',
  },
  {
    name: 'address',
    value: '26, High Street, Limerick, LK',
    highlighter: 'danger',
  },
  {
    name: 'dateOfBirth',
    value: '19-Feb-1938',
  },
  {
    name: 'id',
    value: '9999999024',
  },
  {
    name: 'viewPatientNavigation',
    value: 'test',
  },
];

const onCellClick = () => console.log('test')

describe('Component <SortableTableRow />', () => {
  it('should renders mount with prop rowDataWarning correctly', () => {
    const sortableTableRow = mount(
      <SortableTableRow
        columnNameSortBy="name"
        headers={headers}
        hoveredRowIndex={1}
        index={0}
        resourceData={resourceData}
        rowData={rowDataWarning}
        table="patientsList"
        onCellClick={onCellClick}
      />);
    sortableTableRow.find('.highlighter-wrapper').simulate('click');
    expect(sortableTableRow.find('.highlighter-warning')).toHaveLength(1);
    expect(sortableTableRow.find('.highlighter-danger')).toHaveLength(0);
    expect(sortableTableRow).toMatchSnapshot();
  });

  it('should renders shallow with prop rowDataDanger correctly', () => {
    const sortableTableRow = shallow(
      <SortableTableRow
        columnNameSortBy="name"
        headers={headers}
        hoveredRowIndex={1}
        index={0}
        resourceData={resourceData}
        rowData={rowDataDanger}
        table="patientsList"
        onCellClick={onCellClick}
      />);
    sortableTableRow.find('.highlighter-wrapper').simulate('click');
    sortableTableRow.find('[name="address"]').simulate('click');
    expect(sortableTableRow.find('.highlighter-danger')).toHaveLength(1);
    expect(sortableTableRow.find('.highlighter-warning')).toHaveLength(0);
    expect(sortableTableRow).toMatchSnapshot();
  });
});

