import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

import SortableTableEmptyDataRow from '../../src/components/containers/SortableTable/SortableTableEmptyDataRow';

Enzyme.configure({ adapter: new Adapter() });

describe('Component <SortableTableEmptyDataRow />', () => {
  it('should renders correctly', () => {
    const sortableTableEmptyDataRow = shallow(
      <SortableTableEmptyDataRow
        amountCollumns={10}
        isLoading
        emptyDataMessage="no messages"
      />);
    expect(sortableTableEmptyDataRow).toMatchSnapshot();

    sortableTableEmptyDataRow.setProps({ isLoading: false });
    expect(sortableTableEmptyDataRow).toMatchSnapshot();
  });
});

