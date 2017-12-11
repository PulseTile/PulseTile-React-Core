import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

import SortableTableHeaderCell from '../../src/components/containers/SortableTable/sortable-table-header-components/SortableTableHeaderCell';

Enzyme.configure({ adapter: new Adapter() });

const onClick = () => console.log('test');

describe('Component <SortableTableHeaderCell />', () => {
  it('should renders correctly', () => {
    const sortableTableHeaderCell = shallow(
      <SortableTableHeaderCell
        name="cause"
        sortingOrder="asc"
        title="Cause"
        onClick={onClick}
      />);
    expect(sortableTableHeaderCell).toMatchSnapshot();
    sortableTableHeaderCell.find('.asc').simulate('click');
  });
});

