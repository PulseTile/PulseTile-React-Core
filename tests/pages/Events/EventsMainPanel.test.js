import React from 'react';
import { configure, shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-15';
import moment from 'moment';

import EventsMainPanel from '../../../src/components/pages/Events/events-page-component/EventsMainPanel';
import { valuesNames } from '../../../src/components/pages/Events/forms.config';

configure({ adapter: new Adapter() });

const testProps = {
  activeView: 'table',
  columnNameSortBy: 'name',
  emptyDataMessage: 'No events',
  eventsTimeline: {
    1452549600000: [
      {
        [valuesNames.DATE_CREATED]: 1454669420000,
        [valuesNames.DATE_TIME]: 1452595820958,
        dateTimeConvert: '12-Jan-2016',
        [valuesNames.DESCRIPTION]: 'Complications following surgery',
        [valuesNames.NAME]: 'Transfer from ward to ICU',
        sideDateInTimeline: 'left',
        [valuesNames.SOURCE]: 'ethercis',
        [valuesNames.SOURCE_ID]: '1aa74f42-ff10-4fa8-8d21-7242e425d9bb',
        [valuesNames.TYPE]: 'Transfer',
      },
    ],
  },
  eventsType: 'initEventsType',
  filteredData: [
    {
      [valuesNames.DATE_CREATED]: 1511286303000,
      [valuesNames.DATE_TIME]: 1511286303450,
      dateTimeConvert: '21-Nov-2017',
      [valuesNames.DESCRIPTION]: 1,
      [valuesNames.NAME]: 1,
      sideDateInTimeline: 'right',
      [valuesNames.SOURCE]: 'ethercis',
      [valuesNames.SOURCE_ID]: '8191062a-3b0d-4633-9557-60ef63e7cf01',
      [valuesNames.TYPE]: '',
    },
    {
      [valuesNames.DATE_CREATED]: 1511356742000,
      [valuesNames.DATE_TIME]: 1512047880000,
      dateTimeConvert: '30-Nov-2017',
      [valuesNames.DESCRIPTION]: 1,
      [valuesNames.NAME]: 1,
      sideDateInTimeline: 'right',
      [valuesNames.SOURCE]: 'ethercis',
      [valuesNames.SOURCE_ID]: '8191062a-3b0d-4633-9557-60ef63e7cf01',
      [valuesNames.TYPE]: '',
    },
  ],
  headers: [
    {
      key: 'name',
      title: 'Event Name',
      width: '50%',
    },
    {
      key: 'type',
      title: 'Event Type',
      width: '25%',
    },
  ],
  id: 'daf9a9fa-a7a0-4809-9456-d0e1adea2a85',
  isBtnCreateVisible: true,
  isLoading: false,
  isTimelinesOpen: false,
  listPerPageAmount: 10,
  offset: 0,
  onCellClick: () => {},
  onCreate: (eventsType) => { console.log(eventsType) },
  onHeaderCellClick: () => {},
  onRangeChange: () => {},
  resourceData: [
    {
      [valuesNames.DATE_CREATED]: 1511286303000,
      [valuesNames.DATE_TIME]: 1511286303450,
      dateTimeConvert: '21-Nov-2017',
      [valuesNames.DESCRIPTION]: 1,
      [valuesNames.NAME]: 1,
      sideDateInTimeline: 'right',
      [valuesNames.SOURCE]: 'ethercis',
      [valuesNames.SOURCE_ID]: '8191062a-3b0d-4633-9557-60ef63e7cf01',
      [valuesNames.TYPE]: '',
    },
    {
      [valuesNames.DATE_CREATED]: 1511356742000,
      [valuesNames.DATE_TIME]: 1512047880000,
      dateTimeConvert: '30-Nov-2017',
      [valuesNames.DESCRIPTION]: 1,
      [valuesNames.NAME]: 1,
      sideDateInTimeline: 'right',
      [valuesNames.SOURCE]: 'ethercis',
      [valuesNames.SOURCE_ID]: '8191062a-3b0d-4633-9557-60ef63e7cf01',
      [valuesNames.TYPE]: '',
    },
  ],
  setOffset: () => {},
  sortingOrder: 'asc',
  table: 'events',
  totalEntriesAmount: 116,
  maxValueRange: 2000000000000,
  minValueRange: 1000000000000,
};

const CREATE_CONTENT = 'createContent';
const CONVER_MAX_VALUE_RANGE = moment(testProps.maxValueRange).format('DD MMM YYYY');
const CONVER_MIN_VALUE_RANGE = moment(testProps.minValueRange).format('DD MMM YYYY');

describe('Component <EventsMainPanel />', () => {
  it('should renders with all props correctly', () => {
    const component = shallow(
      <EventsMainPanel
        activeView={testProps.activeView}
        columnNameSortBy={testProps.columnNameSortBy}
        emptyDataMessage={testProps.emptyDataMessage}
        eventsTimeline={testProps.eventsTimeline}
        eventsType={testProps.eventsType}
        filteredData={testProps.filteredData}
        headers={testProps.headers}
        id={testProps.id}
        isBtnCreateVisible={testProps.isBtnCreateVisible}
        isLoading={testProps.isLoading}
        isTimelinesOpen={testProps.isTimelinesOpen}
        listPerPageAmount={testProps.listPerPageAmount}
        offset={testProps.offset}
        onCellClick={testProps.onCellClick}
        onCreate={testProps.onCreate}
        onHeaderCellClick={testProps.onHeaderCellClick}
        onRangeChange={testProps.onRangeChange}
        resourceData={testProps.resourceData}
        setOffset={testProps.setOffset}
        sortingOrder={testProps.sortingOrder}
        table={testProps.table}
        totalEntriesAmount={testProps.totalEntriesAmount}
        maxValueRange={testProps.maxValueRange}
        minValueRange={testProps.minValueRange}
      />);

    expect(component.find('SortableTable')).toHaveLength(1);
    expect(component.find('Timelines')).toHaveLength(0);
    expect(component.find('Range')).toHaveLength(0);
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

    // Testing PTButton click
    expect(component.state().openedPanel).toEqual('');
    component.find('PTButton').simulate('click');
    expect(component.state().openedPanel).toEqual(CREATE_CONTENT);
    expect(component).toMatchSnapshot();
    component.setState({ openedPanel: '' });

    // Testing dropdown-menu-item click
    expect(component.instance().props.eventsType).toEqual(testProps.eventsType);
    component.find('.dropdown-menu-item').at(0).simulate('click');
    component.find('.dropdown-menu-item').at(1).simulate('click');
    component.find('.dropdown-menu-item').at(2).simulate('click');
    component.find('.dropdown-menu-item').at(3).simulate('click');

    expect(component).toMatchSnapshot();

    // Testing PaginationBlock
    expect(component.find('PaginationBlock')).toHaveLength(0);
    component.setProps({ listPerPageAmount: 1 });
    expect(component.find('PaginationBlock')).toHaveLength(1);

    expect(component).toMatchSnapshot();

    // Testing component when isTimelinesOpen
    expect(component.instance().props.isTimelinesOpen).toEqual(testProps.isTimelinesOpen);
    expect(component.find('.wrap-rzslider')).toHaveLength(0);
    expect(component.find('Range')).toHaveLength(0);
    component.setProps({ isTimelinesOpen: true });
    expect(component.instance().props.isTimelinesOpen).toEqual(true);
    expect(component.find('.wrap-rzslider')).toHaveLength(1);
    expect(component.find('ComponentEnhancer(Range)')).toHaveLength(1);

    expect(component.find('.rzslider-tooltip-inner').at(0).text()).toEqual(`From: ${CONVER_MIN_VALUE_RANGE}`);
    expect(component.find('.rzslider-tooltip-inner').at(1).text()).toEqual(`To: ${CONVER_MAX_VALUE_RANGE}`);

    expect(component).toMatchSnapshot();

    // Testing changeRange method
    expect(component.state().rangeForm).toEqual(null);
    expect(component.state().rangeTo).toEqual(null);
    component.instance().changeRange([1500000000000, 1700000000000]);
    expect(component.state().rangeForm).toEqual(1500000000000);
    expect(component.state().rangeTo).toEqual(1700000000000);

    expect(component).toMatchSnapshot();

    // Testing handleMouseDown methods
    expect(component.state().openedPanel).toEqual('');
    component.instance().handleMouseDown('createContent');
    expect(component.state().openedPanel).toEqual('createContent');
    component.instance().handleMouseDown('createContent');
    expect(component.state().openedPanel).toEqual('');

    expect(component).toMatchSnapshot();

    // Testing componentWillReceiveProps methods
    component.setProps({ eventsType: 'Admission' });
    component.setProps({ eventsType: 'Transfer' });

    expect(component).toMatchSnapshot();

    // Testing componentWillUnmount methods
    component.unmount();

    expect(component).toMatchSnapshot();
  });

  it('should renders with all props correctly mount testing', () => {
    const component = mount(
      <EventsMainPanel
        activeView={testProps.activeView}
        columnNameSortBy={testProps.columnNameSortBy}
        emptyDataMessage={testProps.emptyDataMessage}
        eventsTimeline={testProps.eventsTimeline}
        eventsType={testProps.eventsType}
        filteredData={testProps.filteredData}
        headers={testProps.headers}
        id={testProps.id}
        isBtnCreateVisible={testProps.isBtnCreateVisible}
        isLoading={testProps.isLoading}
        isTimelinesOpen
        listPerPageAmount={testProps.listPerPageAmount}
        offset={testProps.offset}
        onCellClick={testProps.onCellClick}
        onCreate={testProps.onCreate}
        onHeaderCellClick={testProps.onHeaderCellClick}
        onRangeChange={testProps.onRangeChange}
        resourceData={testProps.resourceData}
        setOffset={testProps.setOffset}
        sortingOrder={testProps.sortingOrder}
        table={testProps.table}
        totalEntriesAmount={testProps.totalEntriesAmount}
        maxValueRange={testProps.maxValueRange}
        minValueRange={testProps.minValueRange}
      />);

    component.find('ComponentEnhancer(Range)').instance().props.tipFormatter();

    expect(component).toMatchSnapshot();
  });

  it('should renders with all props correctly when activeView is timeline', () => {
    const component = shallow(
      <EventsMainPanel
        activeView="timeline"
        isTimelinesOpen
        maxValueRange={0}
        minValueRange={0}
      />);

    expect(component).toMatchSnapshot();
  });
});
