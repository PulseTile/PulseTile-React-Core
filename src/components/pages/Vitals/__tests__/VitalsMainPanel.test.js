import React from 'react';
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-15';

import VitalsMainPanel from '../vitals-page-component/VitalsMainPanel';
import { valuesNames } from '../forms.config';

configure({ adapter: new Adapter() });

const testProps = {
  activeView: 'tableNews',
  columnNameSortBy: 'id',
  emptyDataMessage: 'No vitals',
  chartLoad: () => {},
  filteredData: [
    {
      [valuesNames.AUTHOR]: 'Dr Tony Shannon',
      [valuesNames.DATE_CREATED]: 1515667784000,
      dateTimeConvert: '11-Jan-2018',
      [valuesNames.DIASTOLIC_BP]: 94,
      [valuesNames.HEART_RATE]: 86,
      highlighters: [
        {
          name: 'newsScore',
          status: 'success',
        },
      ],
      [valuesNames.ID]: 1,
      [valuesNames.LEVEL_OF_CONSCIOUSNESS]: 'Alert',
      [valuesNames.NEWS_SCORE]: 2,
      [valuesNames.OXYGEN_SATURATION]: 92,
      [valuesNames.RESPIRATION_RATE]: 20,
      [valuesNames.SOURCE]: 'marand',
      [valuesNames.SOURCE_ID]: '8191062a-3b0d-4633-9557-60ef63e7cf01',
      [valuesNames.SYSTOLIC_BP]: 120,
      [valuesNames.TEMPERATURE]: 37.6,
    },
    {
      [valuesNames.AUTHOR]: 'Dr Tony Shannon',
      [valuesNames.DATE_CREATED]: 1515667784000,
      dateTimeConvert: '12-Jan-2018',
      [valuesNames.DIASTOLIC_BP]: 94,
      [valuesNames.HEART_RATE]: 86,
      highlighters: [
        {
          name: 'newsScore',
          status: 'success',
        },
      ],
      [valuesNames.ID]: 2,
      [valuesNames.LEVEL_OF_CONSCIOUSNESS]: 'Alert',
      [valuesNames.NEWS_SCORE]: 4,
      [valuesNames.OXYGEN_SATURATION]: 92,
      [valuesNames.RESPIRATION_RATE]: 20,
      [valuesNames.SOURCE]: 'marand',
      [valuesNames.SOURCE_ID]: '8191062a-3b0d-4633-9557-60ef63e7cf01',
      [valuesNames.SYSTOLIC_BP]: 120,
      [valuesNames.TEMPERATURE]: 38.6,
    },
  ],
  headers: [
    {
      key: 'id',
      title: '#',
      width: '21%',
    },
    {
      key: 'newsScore',
      title: 'NEWS Score',
      width: '25%',
    },
  ],
  id: 'daf9a9fa-a7a0-4809-9456-d0e1adea2a85',
  isBtnCreateVisible: true,
  isLoading: false,
  listPerPageAmount: 10,
  offset: 0,
  onCellClick: () => {},
  onCreate: (vitalsType) => { console.log(vitalsType) },
  onHeaderCellClick: () => {},
  resourceData: [
    {
      [valuesNames.AUTHOR]: 'Dr Tony Shannon',
      [valuesNames.DATE_CREATED]: 1515667784000,
      dateTimeConvert: '11-Jan-2018',
      [valuesNames.DIASTOLIC_BP]: 94,
      [valuesNames.HEART_RATE]: 86,
      highlighters: [
        {
          name: 'newsScore',
          status: 'success',
        },
      ],
      [valuesNames.ID]: 1,
      [valuesNames.LEVEL_OF_CONSCIOUSNESS]: 'Alert',
      [valuesNames.NEWS_SCORE]: 2,
      [valuesNames.OXYGEN_SATURATION]: 92,
      [valuesNames.RESPIRATION_RATE]: 20,
      [valuesNames.SOURCE]: 'marand',
      [valuesNames.SOURCE_ID]: '8191062a-3b0d-4633-9557-60ef63e7cf01',
      [valuesNames.SYSTOLIC_BP]: 120,
      [valuesNames.TEMPERATURE]: 37.6,
    },
    {
      [valuesNames.AUTHOR]: 'Dr Tony Shannon',
      [valuesNames.DATE_CREATED]: 1515667784000,
      dateTimeConvert: '11-Jan-2018',
      [valuesNames.DIASTOLIC_BP]: 94,
      [valuesNames.HEART_RATE]: 86,
      highlighters: [
        {
          name: 'newsScore',
          status: 'success',
        },
      ],
      [valuesNames.ID]: 1,
      [valuesNames.LEVEL_OF_CONSCIOUSNESS]: 'Alert',
      [valuesNames.NEWS_SCORE]: 2,
      [valuesNames.OXYGEN_SATURATION]: 92,
      [valuesNames.RESPIRATION_RATE]: 20,
      [valuesNames.SOURCE]: 'marand',
      [valuesNames.SOURCE_ID]: '8191062a-3b0d-4633-9557-60ef63e7cf01',
      [valuesNames.SYSTOLIC_BP]: 120,
      [valuesNames.TEMPERATURE]: 37.6,
    },
  ],
  setOffset: () => {},
  sortingOrder: 'asc',
  table: 'vitals',
  totalEntriesAmount: 116,
};

describe('Component <VitalsMainPanel />', () => {
  it('should renders with all props correctly', () => {
    const component = shallow(
      <VitalsMainPanel
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
    expect(component.find('VitalsChart')).toHaveLength(0);
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
    expect(component.find('VitalsChart')).toHaveLength(0);
    component.setProps({ activeView: 'chartNews' });
    expect(component.find('VitalsChart')).toHaveLength(1);

    expect(component).toMatchSnapshot();

    component.find('.btn-create').simulate('click');
    component.setProps({ isBtnCreateVisible: false });
    expect(component).toMatchSnapshot();

    // Testing componentWillUnmount methods
    component.unmount();

    expect(component).toMatchSnapshot();
  });
});