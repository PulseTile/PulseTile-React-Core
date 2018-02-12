import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

import SortableTableHoveredRow from '../SortableTableHoveredRow';

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
  },
];
const rowData = [
  {
    name: 'name',
    value: "Aengus O'Connor",
  },
  {
    name: 'address',
    value: '26, High Street, Limerick, LK',
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
const onCellClick = () => console.log('onCellClick function worked');
const onMouseEnter = () => console.log('onMouseEnter function worked');
const onMouseLeave = () => console.log('onMouseLeave function worked');


describe('Component <SortableTableHoveredRow />', () => {
  it('should renders correctly', () => {
    const sortableTableHoveredRow = mount(
      <SortableTableHoveredRow
        columnNameSortBy="name"
        headers={headers}
        hoveredRowIndex={1}
        index={0}
        resourceData={resourceData}
        rowData={rowData}
        table="patientsList"
      />);
    expect(sortableTableHoveredRow).toMatchSnapshot();
  });
  it('should renders correctly', () => {
    const sortableTableHoveredRow = shallow(
      <SortableTableHoveredRow
        columnNameSortBy="name"
        headers={headers}
        hoveredRowIndex={1}
        index={0}
        resourceData={resourceData}
        rowData={rowData}
        table="patientsList"
        onCellClick={onCellClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      />);
    sortableTableHoveredRow.find('[name="id"]').simulate('click');
    expect(sortableTableHoveredRow).toMatchSnapshot();

    sortableTableHoveredRow.find('[name="viewPatientNavigation"]').simulate('click');
    expect(sortableTableHoveredRow).toMatchSnapshot();

    sortableTableHoveredRow.find('[name="name"]').simulate('click');
    expect(sortableTableHoveredRow).toMatchSnapshot();

    sortableTableHoveredRow.find('tr').simulate('mouseEnter');
    expect(sortableTableHoveredRow).toMatchSnapshot();

    sortableTableHoveredRow.find('tr').simulate('mouseLeave');
    expect(sortableTableHoveredRow).toMatchSnapshot();
  });
});

