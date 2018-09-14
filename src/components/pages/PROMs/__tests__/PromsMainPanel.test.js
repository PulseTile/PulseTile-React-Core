import React from 'react';
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-15';

import PromsMainPanel from '../proms-page-component/PromsMainPanel';
import { valuesNames } from '../forms.config';

configure({ adapter: new Adapter() });

const testProps = {
  activeView: 'tableNews',
  columnNameSortBy: 'id',
  emptyDataMessage: 'No proms',
  chartLoad: () => {},
  filteredData: [
    {
      [valuesNames.NAME]: 'test Proms 1',
      [valuesNames.SCORE]: 9,
      [valuesNames.DATE_CREATED]: 1482170593395,
      [valuesNames.SOURCE]: 'openehr',
      [valuesNames.SOURCE_ID]: 'testSourceID1',
      dateCreatedConvert: '19-Dec-2016',
      highlighters: [
        {
          name: 'score',
          status: 'danger',
        },
      ],
    },
    {
      [valuesNames.NAME]: 'test Proms 2',
      [valuesNames.SCORE]: 3,
      [valuesNames.DATE_CREATED]: 1482190593395,
      [valuesNames.SOURCE]: 'openehr',
      [valuesNames.SOURCE_ID]: 'testSourceID2',
      dateCreatedConvert: '20-Dec-2016',
      highlighters: [
        {
          name: 'score',
          status: 'success',
        },
      ],
    },
  ],
  headers: [
    {
      key: 'name',
      title: 'Name of PROM',
      width: '25%',
    },
    {
      key: 'score',
      title: 'Score',
      width: '25%',
    },
  ],
  id: 'testSourceID1',
  isBtnCreateVisible: true,
  isLoading: false,
  listPerPageAmount: 10,
  offset: 0,
  onCellClick: () => {},
  onCreate: (promsType) => { console.log(promsType) },
  onHeaderCellClick: () => {},
  resourceData: [
    {
      [valuesNames.NAME]: 'test Proms 1',
      [valuesNames.SCORE]: 9,
      [valuesNames.DATE_CREATED]: 1482170593395,
      [valuesNames.SOURCE]: 'openehr',
      [valuesNames.SOURCE_ID]: 'testSourceID1',
      dateCreatedConvert: '19-Dec-2016',
      highlighters: [
        {
          name: 'score',
          status: 'danger',
        },
      ],
    },
    {
      [valuesNames.NAME]: 'test Proms 2',
      [valuesNames.SCORE]: 3,
      [valuesNames.DATE_CREATED]: 1482190593395,
      [valuesNames.SOURCE]: 'openehr',
      [valuesNames.SOURCE_ID]: 'testSourceID2',
      dateCreatedConvert: '20-Dec-2016',
      highlighters: [
        {
          name: 'score',
          status: 'success',
        },
      ],
    },
  ],
  setOffset: () => {},
  sortingOrder: 'asc',
  table: 'proms',
  totalEntriesAmount: 116,
};

describe('Component <PromsMainPanel />', () => {
  it('should renders with all props correctly', () => {
    const component = shallow(
      <PromsMainPanel
        activeView={testProps.activeView}
        columnNameSortBy={testProps.columnNameSortBy}
        emptyDataMessage={testProps.emptyDataMessage}
        filteredData={testProps.filteredData}
        headers={testProps.headers}
        id={testProps.id}
        isBtnCreateVisible={testProps.isBtnCreateVisible}
        isLoading={testProps.isLoading}
        listPerPageAmount={testProps.listPerPageAmount}
        offset={testProps.offset}
        onCellClick={testProps.onCellClick}
        onCreate={testProps.onCreate}
        onHeaderCellClick={testProps.onHeaderCellClick}
        chartLoad={testProps.chartLoad}
        resourceData={testProps.resourceData}
        setOffset={testProps.setOffset}
        sortingOrder={testProps.sortingOrder}
        table={testProps.table}
        totalEntriesAmount={testProps.totalEntriesAmount}
      />);

    expect(component.find('SortableTable')).toHaveLength(1);
    expect(component.find('PromsChart')).toHaveLength(0);
    expect(component.find('Spinner')).toHaveLength(0);
    expect(component.find('.panel-control')).toHaveLength(1);
    expect(component.find('PaginationBlock')).toHaveLength(0);
    expect(component.find('PTButton')).toHaveLength(1);

    expect(component).toMatchSnapshot();

    // Testing component when isLoading true
    component.setProps({ isLoading: true });
    expect(component.find('Spinner')).toHaveLength(1);
    expect(component).toMatchSnapshot();
    component.setProps({ isLoading: false });

    // Testing PaginationBlock
    expect(component.find('PaginationBlock')).toHaveLength(0);
    component.setProps({ listPerPageAmount: 1 });
    expect(component.find('PaginationBlock')).toHaveLength(1);

    expect(component).toMatchSnapshot();

    // Testing component when charts is open
    expect(component.instance().props.activeView).toEqual(testProps.activeView);
    expect(component.find('PromsChart')).toHaveLength(0);
    component.setProps({ activeView: 'chartNews' });
    expect(component.find('PromsChart')).toHaveLength(1);

    expect(component).toMatchSnapshot();

    component.find('.btn-create').simulate('click');
    component.setProps({ isBtnCreateVisible: false });
    expect(component).toMatchSnapshot();

    // Testing componentWillUnmount methods
    component.unmount();

    expect(component).toMatchSnapshot();
  });
});