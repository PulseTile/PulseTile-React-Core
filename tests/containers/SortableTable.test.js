import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

import SortableTable from '../../src/components/containers/SortableTable/SortableTable';

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

describe('Component <SortableTable />', () => {
  it('should renders with props correctly', () => {
    const sortableTable = mount(
      <SortableTable
        headers={headers}
        data={data}
        resourceData={resourceData}
        columnNameSortBy="cause"
        emptyDataMessage="No allergies"
        sortingOrder="asc"
        table=""
      />)
    expect(sortableTable).toMatchSnapshot();
  });
  it('should renders with props correctly when the resourceData is undefined', () => {
    const sortableTable = shallow(
      <SortableTable
        headers={headers}
        data={data}
        columnNameSortBy="cause"
        emptyDataMessage="No allergies"
        sortingOrder="asc"
        table=""
      />)
    expect(sortableTable).toMatchSnapshot();
  });
  it('should renders with props correctly when the resourceData is empty array', () => {
    const sortableTable = shallow(
      <SortableTable
        headers={headers}
        data={data}
        resourceData={[]}
        columnNameSortBy="cause"
        emptyDataMessage="No allergies"
        sortingOrder="asc"
        table=""
      />)
    expect(sortableTable).toMatchSnapshot();
  });
});
