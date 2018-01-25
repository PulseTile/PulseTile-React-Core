import React from 'react';
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-15';

import VitalsListHeader from '../../../src/components/pages/Vitals/vitals-page-component/VitalsListHeader';

configure({ adapter: new Adapter() });

const testProps = {
  onExpand: () => {},
  onFilterChange: () => {},
  toggleViewVisibility: () => {},
  name: 'vitalsMain',
  panelTitle: 'Test Panel Title',
  activeView: 'tableNews',
  currentPanel: 'vitalsMain',
  isBtnExpandVisible: true,
  isBtnTableVisible: true,
};

describe('Component <VitalsListHeader />', () => {
  it('should renders with all props correctly', () => {
    const component = shallow(
      <VitalsListHeader
        onExpand={testProps.onExpand}
        onFilterChange={testProps.onFilterChange}
        toggleViewVisibility={testProps.toggleViewVisibility}
        name={testProps.name}
        currentPanel={testProps.currentPanel}
        panelTitle={testProps.panelTitle}
        isBtnExpandVisible
        isBtnTableVisible
        activeView={testProps.activeView}
      />);

    expect(component.find('PTButton')).toHaveLength(3);
    expect(component.find('.fa-expand')).toHaveLength(1);
    expect(component.find('.fa-filter')).toHaveLength(1);
    expect(component.find('.fa-compress')).toHaveLength(1);
    expect(component.find('.btn-table')).toHaveLength(1);
    expect(component.find('.fa-area-chart')).toHaveLength(1);

    expect(component.find('.heading').at(0).text()).toEqual('TABLES');
    expect(component.find('.heading').at(1).text()).toEqual('CHARTS');

    expect(component.find('.dropdown-menu-item-text').at(0).text()).toEqual('Vitals - NEWS');
    expect(component.find('.dropdown-menu-item-text').at(1).text()).toEqual('Vitals - NEWS');

    expect(component.find('.panel-title')).toHaveLength(1);
    expect(component.find('.panel-title').text()).toEqual(testProps.panelTitle);

    expect(component.find('input')).toHaveLength(0);
    expect(component).toMatchSnapshot();

    // Testing panel filter
    expect(component.find('.panel-filter')).toHaveLength(0);
    expect(component.state().isFilterInputVisible).toEqual(false);
    expect(component.state().isFilterOpen).toEqual(false);
    component.find('.btn-filter').simulate('click');
    expect(component.state().isFilterInputVisible).toEqual(true);
    expect(component.state().isFilterOpen).toEqual(true);
    expect(component.find('.panel-filter')).toHaveLength(1);
    expect(component).toMatchSnapshot();

  });

  it('should renders without some buttons correctly', () => {
    const component = shallow(
      <VitalsListHeader
        toggleViewVisibility={testProps.toggleViewVisibility}
        activeView={testProps.activeView}
        nameShouldInclude={testProps.nameShouldInclude}
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
      <VitalsListHeader
        onExpand={testProps.onExpand}
        onFilterChange={testProps.onFilterChange}
        toggleViewVisibility={testProps.toggleViewVisibility}
        name={testProps.name}
        currentPanel={testProps.currentPanel}
        panelTitle={testProps.panelTitle}
        isBtnExpandVisible
        isBtnTableVisible
        activeView={testProps.activeView}
        nameShouldInclude={testProps.nameShouldInclude}
      />);

    // Testing toggleFilterInputVisibility methods
    expect(component.state().isFilterOpen).toEqual(false);
    expect(component.state().isFilterInputVisible).toEqual(false);
    expect(component.contains('.active')).toEqual(false);
    component.instance().toggleFilterInputVisibility();
    expect(component.state().isFilterOpen).toEqual(true);
    expect(component.state().isFilterInputVisible).toEqual(true);

    // Testing dropdown-menu-item click
    component.find('.dropdown-menu-item').at(0).simulate('click');
    component.find('.dropdown-menu-item').at(1).simulate('click');

    // Testing btn-dropdown-toggle click
    component.find('.btn-dropdown-toggle').at(0).simulate('click');

    // Testing btn-expand-panel click
    component.find('.btn-expand-panel').at(0).simulate('click');

    // Testing handleClickFilterFocus methods
    component.setState({ openedPanel: 'test' });
    component.instance().handleClickFilterFocus();
    expect(component.state().openedPanel).toEqual('');
    component.setState({ openedPanel: 'test' });
    component.find('.form-control').at(0).simulate('click');
    expect(component.state().openedPanel).toEqual('');

    // Testing handleMouseDown methods
    expect(component.state().openedPanel).toEqual('');
    component.instance().handleMouseDown('viewContent');
    expect(component.state().openedPanel).toEqual('viewContent');
    component.instance().handleMouseDown('viewContent');
    expect(component.state().openedPanel).toEqual('');

    component.setProps({ activeView: 'chartNews'});

    expect(component).toMatchSnapshot();

    // Testing componentWillUnmount method
    component.unmount();
    expect(component).toMatchSnapshot();
  });
});
