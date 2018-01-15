import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

import SortableTablePatients from '../../src/components/containers/SortableTable/SortableTablePatients';

Enzyme.configure({ adapter: new Adapter() })

const headers = [
  {
    key: 'cause',
    title: 'Cause',
    width: '25%',
  },
  {
    key: 'reaction',
    title: 'Reaction',
    width: '65%',
  },
  {
    display: 'none',
    key: 'sourceId',
    title: 'Source ID',
    width: '0',
  },
];
const data = [
  {
    cause: 3123123123,
    reaction: 123123,
    source: 'ethercis',
    sourceId: 'c2c286c1-2d65-4e8a-857b-1dcf3f0fa4d4',
  },
  {
    cause: 123,
    reaction: 123,
    source: 'test',
    sourceId: 'test',
  },
]
const resourceData = [
  {
    cause: 3123123123,
    reaction: 123123,
    source: 'ethercis',
    sourceId: 'c2c286c1-2d65-4e8a-857b-1dcf3f0fa4d4',
  },
  {
    cause: 123,
    reaction: 123,
    source: 'test',
    sourceId: 'test',
  },
]
const resizeEvent = new Event('resize');
const emptyData = [];

describe('Component <SortableTablePatients />', () => {
  it('should renders mount with props correctly', () => {
    const sortableTablePatients = mount(
      <SortableTablePatients
        headers={headers}
        data={data}
        resourceData={resourceData}
        columnNameSortBy="cause"
        emptyDataMessage="No allergies"
        sortingOrder="asc"
        table="patientsList"
      />)
    window.dispatchEvent(resizeEvent);
    sortableTablePatients.find('tr').at(1).simulate('mouseEnter');
    expect(sortableTablePatients).toMatchSnapshot();
    sortableTablePatients.find('tr').at(1).simulate('mouseLeave');
    expect(sortableTablePatients).toMatchSnapshot();
  });

  it('should renders shallow with props correctly when the resourceData is undefined', () => {
    const sortableTablePatients = shallow(
      <SortableTablePatients
        headers={headers}
        data={data}
        columnNameSortBy="cause"
        emptyDataMessage="No allergies"
        sortingOrder="asc"
        table="patientsList"
      />)
    expect(sortableTablePatients).toMatchSnapshot();
  });

  it('should renders shallow with props correctly when the resourceData is empty array', () => {
    const sortableTablePatients = shallow(
      <SortableTablePatients
        headers={headers}
        data={[]}
        resourceData={[]}
        columnNameSortBy="cause"
        emptyDataMessage="No allergies"
        sortingOrder="asc"
        table="patientsList"
      />)
    expect(sortableTablePatients).toMatchSnapshot();
  });

  it('should renders shallow with props correctly when the data is empty array and table not patientsList', () => {
    const sortableTablePatients = shallow(
      <SortableTablePatients
        headers={headers}
        data={emptyData}
        resourceData={[]}
        columnNameSortBy="cause"
        emptyDataMessage="No allergies"
        sortingOrder="asc"
        table="patientsList"
      />);
    expect(sortableTablePatients.find('SortableTableEmptyDataRow')).toHaveLength(1);
    expect(sortableTablePatients.find('SortableTableHeaderRow')).toHaveLength(1);
    expect(sortableTablePatients.find('SortableTableHoveredRow')).toHaveLength(0);
    expect(sortableTablePatients.find('SortableTableHeaderCell')).toHaveLength(0);
    expect(sortableTablePatients).toMatchSnapshot();
  });
});
