import React from 'react';
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-15';

import EventsListHeader from '../events-page-component/EventsListHeader';

configure({ adapter: new Adapter() });

const testProps = {
  onExpand: () => {},
  onFilterChange: () => {},
  toggleTimelinesVisibility: () => {},
  toggleViewVisibility: () => {},
  name: 'eventsMain',
  panelTitle: 'Test Panel Title',
  activeView: 'table',
  currentPanel: 'eventsMain',
  isBtnExpandVisible: true,
  isBtnTableVisible: true,
  isTimelinesOpen: false,
};

describe('Component <EventsListHeader />', () => {
  it('should renders with all props correctly', () => {
    const component = shallow(
      <EventsListHeader
        onExpand={testProps.onExpand}
        onFilterChange={testProps.onFilterChange}
        toggleTimelinesVisibility={testProps.toggleTimelinesVisibility}
        toggleViewVisibility={testProps.toggleViewVisibility}
        name={testProps.name}
        currentPanel={testProps.currentPanel}
        panelTitle={testProps.panelTitle}
        isBtnExpandVisible
        isBtnTableVisible
        isTimelinesOpen={testProps.isTimelinesOpen}
        activeView={testProps.activeView}
      />);

    component.find('.dropdown-menu-item').at(0).simulate('click');
    expect(component.find('.control-group').children()).toHaveLength(3);
    expect(component.find('PTButton')).toHaveLength(3);
    expect(component.find('.panel-filter')).toHaveLength(1);
    expect(component.find('input')).toHaveLength(1);
    expect(component.find('.panel-title')).toHaveLength(1);
    expect(component.find('.panel-title').text()).toEqual(testProps.panelTitle);

    expect(component).toMatchSnapshot();

    expect(component.state('isFilterInputVisible')).toEqual(true);
    expect(component.instance().props.onExpand).toEqual(testProps.onExpand);
    expect(component.instance().props.onFilterChange).toEqual(testProps.onFilterChange);
    expect(component.instance().props.name).toEqual(testProps.name);
    expect(component.instance().props.currentPanel).toEqual(testProps.currentPanel);
    expect(component.instance().props.panelTitle).toEqual(testProps.panelTitle);
    expect(component.instance().props.isBtnExpandVisible).toEqual(true);
    expect(component.instance().props.isBtnTableVisible).toEqual(true);

    component.find('.btn-expand-panel').at(0).simulate('click');
  });

  it('should renders without some buttons correctly', () => {
    const component = shallow(
      <EventsListHeader
        onExpand={testProps.onExpand}
        onFilterChange={testProps.onFilterChange}
        name={testProps.name}
        currentPanel={testProps.currentPanel}
        panelTitle={testProps.panelTitle}
        isBtnExpandVisible={false}
        isBtnTableVisible={false}
      />);

    expect(component.find('.control-group').children()).toHaveLength(2);
    expect(component.find('PTButton')).toHaveLength(2);

    expect(component).toMatchSnapshot();

    expect(component.instance().props.isBtnExpandVisible).toEqual(false);
    expect(component.instance().props.isBtnTableVisible).toEqual(false);
  });

  it('should renders correctly and testing component methods', () => {
    const component = shallow(
      <EventsListHeader
        onExpand={testProps.onExpand}
        onFilterChange={testProps.onFilterChange}
        toggleTimelinesVisibility={testProps.toggleTimelinesVisibility}
        toggleViewVisibility={testProps.toggleViewVisibility}
        name={testProps.name}
        currentPanel={testProps.currentPanel}
        panelTitle={testProps.panelTitle}
        isBtnExpandVisible
        isBtnTableVisible
        isTimelinesOpen={testProps.isTimelinesOpen}
        activeView={testProps.activeView}
      />);

    // Testing toggleFilterInputVisibility methods
    expect(component.state().isFilterOpen).toEqual(false);
    expect(component.state().isFilterInputVisible).toEqual(false);
    expect(component.contains('.active')).toEqual(false);
    component.instance().toggleFilterInputVisibility();
    expect(component.state().isFilterOpen).toEqual(true);
    expect(component.state().isFilterInputVisible).toEqual(true);

    // Testing dropdown-menu-item click
    component.find('.dropdown-menu-item').at(1).simulate('click');
    component.find('.dropdown-menu-item').at(2).simulate('click');
    component.find('.dropdown-menu-item').at(3).simulate('click');

    // Testing btn-dropdown-toggle click
    component.find('.btn-dropdown-toggle').at(0).simulate('click');
    component.find('.btn-dropdown-toggle').at(1).simulate('click');

    // Testing handleClickFilterFocus methods
    component.setState({ openedPanel: 'test' });
    component.instance().handleClickFilterFocus();
    expect(component.state().openedPanel).toEqual('');
    component.setState({ openedPanel: 'test' });
    component.find('.form-control').at(0).simulate('click');
    expect(component.state().openedPanel).toEqual('');

    // Testing handleMouseDown methods
    expect(component.state().openedPanel).toEqual('');
    component.instance().handleMouseDown('filterContent');
    expect(component.state().openedPanel).toEqual('filterContent');
    component.instance().handleMouseDown('viewContent');
    expect(component.state().openedPanel).toEqual('viewContent');
    component.instance().handleMouseDown('viewContent');
    expect(component.state().openedPanel).toEqual('');

    component.setProps({ activeView: 'timeline'});

    expect(component).toMatchSnapshot();

    // Testing componentWillUnmount method
    component.unmount();
    expect(component).toMatchSnapshot();
  });
});
