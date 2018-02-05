import React from 'react';
import { configure, shallow, mount } from 'enzyme'
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-15';

configure({ adapter: new Adapter() });

import PluginMainPanel from '../../src/components/plugin-page-component/PluginMainPanel';

const testProps = {
  onHeaderCellClick: () => {},
  onCellClick: () => {},
  onCreate: () => {},
  setOffset: () => {},
  headers: [{
    key: 'clinicalNotesType',
    title: 'Type',
    width: '23%',
  }],
  resourceData: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  filteredData: [1, 3, 5, 7, 9],
  columnNameSortBy: 'nameColumn',
  sortingOrder: 'asc',
  totalEntriesAmount: 5,
  offset: 10,
  id: 25,
  listPerPageAmount: 5,
  emptyDataMessage: 'My list is empty',
  emptyDataMessageDefault: 'No list',
};


describe('Component <PluginMainPanel />', () => {
  it('should renders with all props correctly', () => {
    let tree;
    const component = shallow(
      <PluginMainPanel
        onHeaderCellClick={testProps.onHeaderCellClick}
        onCellClick={testProps.onCellClick}
        onCreate={testProps.onCreate}
        headers={testProps.headers}
        resourceData={testProps.resourceData}
        columnNameSortBy={testProps.columnNameSortBy}
        sortingOrder={testProps.sortingOrder}
        filteredData={testProps.filteredData}
        totalEntriesAmount={testProps.totalEntriesAmount}
        offset={testProps.offset}
        setOffset={testProps.setOffset}
        id={testProps.id}
        isBtnCreateVisible={false}
        isLoading={false}
      />);

    expect(component.find('SortableTable')).toHaveLength(1);
    expect(component.find('Spinner')).toHaveLength(0);
    expect(component.find('.panel-control')).toHaveLength(0);
    expect(component.find('PaginationBlock')).toHaveLength(0);
    expect(component.find('PTButton')).toHaveLength(0);

    tree = toJson(component);
    expect(tree).toMatchSnapshot();

    expect(component.instance().props.onHeaderCellClick).toEqual(testProps.onHeaderCellClick);
    expect(component.instance().props.onCellClick).toEqual(testProps.onCellClick);
    expect(component.instance().props.onCreate).toEqual(testProps.onCreate);
    expect(component.instance().props.headers).toEqual(testProps.headers);
    expect(component.instance().props.resourceData).toEqual(testProps.resourceData);
    expect(component.instance().props.columnNameSortBy).toEqual(testProps.columnNameSortBy);
    expect(component.instance().props.sortingOrder).toEqual(testProps.sortingOrder);
    expect(component.instance().props.filteredData).toEqual(testProps.filteredData);
    expect(component.instance().props.totalEntriesAmount).toEqual(testProps.totalEntriesAmount);
    expect(component.instance().props.offset).toEqual(testProps.offset);
    expect(component.instance().props.setOffset).toEqual(testProps.setOffset);
    expect(component.instance().props.id).toEqual(testProps.id);
    expect(component.instance().props.isBtnCreateVisible).toEqual(false);
    expect(component.instance().props.isLoading).toEqual(false);

    expect(component.instance().props.listPerPageAmount).toEqual(10);
    expect(component.instance().props.emptyDataMessage).toEqual(testProps.emptyDataMessageDefault);

    component.setProps({
      listPerPageAmount: testProps.listPerPageAmount,
      emptyDataMessage: testProps.emptyDataMessage,
    });

    expect(component.instance().props.listPerPageAmount).toEqual(testProps.listPerPageAmount);
    expect(component.instance().props.emptyDataMessage).toEqual(testProps.emptyDataMessage);
  });

  it('should renders with pagination component correctly', () => {
    let tree;
    const component = shallow(
      <PluginMainPanel
        onHeaderCellClick={testProps.onHeaderCellClick}
        onCellClick={testProps.onCellClick}
        onCreate={testProps.onCreate}
        headers={testProps.headers}
        resourceData={testProps.resourceData}
        columnNameSortBy={testProps.columnNameSortBy}
        sortingOrder={testProps.sortingOrder}
        filteredData={testProps.filteredData}
        totalEntriesAmount={testProps.totalEntriesAmount}
        setOffset={testProps.setOffset}
        offset={1}
        listPerPageAmount={1}
        id={testProps.id}
        isBtnCreateVisible={false}
        isLoading={false}
      />);

    tree = toJson(component);
    expect(tree).toMatchSnapshot();

    expect(component.find('.panel-control')).toHaveLength(1);
    expect(component.find('PaginationBlock')).toHaveLength(1);
  });

  it('should renders with spinner and create button components correctly', () => {
    let tree;
    const component = shallow(
      <PluginMainPanel
        onHeaderCellClick={testProps.onHeaderCellClick}
        onCellClick={testProps.onCellClick}
        onCreate={testProps.onCreate}
        headers={testProps.headers}
        resourceData={testProps.resourceData}
        columnNameSortBy={testProps.columnNameSortBy}
        sortingOrder={testProps.sortingOrder}
        filteredData={testProps.filteredData}
        totalEntriesAmount={testProps.totalEntriesAmount}
        setOffset={testProps.setOffset}
        offset={1}
        listPerPageAmount={1}
        id={testProps.id}
        isBtnCreateVisible
        isLoading
      />);

    tree = toJson(component);
    expect(tree).toMatchSnapshot();

    expect(component.find('.panel-control')).toHaveLength(1);
    expect(component.find('Spinner')).toHaveLength(1);
    expect(component.find('PTButton')).toHaveLength(1);

    component.find('PTButton').at(0).simulate('click');
  });
});
