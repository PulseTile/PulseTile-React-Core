import React from 'react';
import {configure, shallow, mount} from 'enzyme'
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-15';
configure({ adapter: new Adapter() });

import PluginListHeader from '../../src/components/plugin-page-component/PluginListHeader';

const testProps = {
  onExpand: () => {},
  onFilterChange: () => {},
  name: 'TEST_PANEL',
  currentPanel: 'TEST_PANEL',
  panelTitle: 'Test Panel Title',
};

describe('Component <PluginListHeader />', () => {
  it('should renders with all props correctly', () => {
    let tree;
    const component = shallow(
        <PluginListHeader
          onExpand={testProps.onExpand}
          onFilterChange={testProps.onFilterChange}
          name={testProps.name}
          currentPanel={testProps.currentPanel}
          panelTitle={testProps.panelTitle}
          isBtnExpandVisible={true}
          isBtnTableVisible={true}
        />);

    expect(component.find('.control-group').children()).toHaveLength(3);
    expect(component.find('PTButton')).toHaveLength(3);
    expect(component.find('.panel-filter')).toHaveLength(0);
    expect(component.find('input')).toHaveLength(0);
    expect(component.find('.panel-title')).toHaveLength(1);
    expect(component.find('.panel-title').text()).toEqual(testProps.panelTitle);

    tree = toJson(component);
    expect(tree).toMatchSnapshot();

    expect(component.state('isFilterInputVisible')).toEqual(false);
    expect(component.instance().props['onExpand']).toEqual(testProps.onExpand);
    expect(component.instance().props['onFilterChange']).toEqual(testProps.onFilterChange);
    expect(component.instance().props['name']).toEqual(testProps.name);
    expect(component.instance().props['currentPanel']).toEqual(testProps.currentPanel);
    expect(component.instance().props['panelTitle']).toEqual(testProps.panelTitle);
    expect(component.instance().props['isBtnExpandVisible']).toEqual(true);
    expect(component.instance().props['isBtnTableVisible']).toEqual(true);

    component.find('.btn-expand-panel').at(0).simulate('click');
  });

  it('should renders without some buttons correctly', () => {
    let tree;
    const component = shallow(
      <PluginListHeader
        onExpand={testProps.onExpand}
        onFilterChange={testProps.onFilterChange}
        name={testProps.name}
        currentPanel={testProps.currentPanel}
        panelTitle={testProps.panelTitle}
        isBtnExpandVisible={false}
        isBtnTableVisible={false}
      />);

    expect(component.find('.control-group').children()).toHaveLength(1);
    expect(component.find('PTButton')).toHaveLength(1);

    tree = toJson(component);
    expect(tree).toMatchSnapshot();

    expect(component.instance().props['isBtnExpandVisible']).toEqual(false);
    expect(component.instance().props['isBtnTableVisible']).toEqual(false);
  });

  it('should renders correctly when filter button was pressed', () => {
    let tree;
    const component = shallow(
      <PluginListHeader
        onExpand={testProps.onExpand}
        onFilterChange={testProps.onFilterChange}
        name={testProps.name}
        currentPanel={testProps.currentPanel}
        panelTitle={testProps.panelTitle}
        isBtnExpandVisible={false}
        isBtnTableVisible={false}
      />);

    expect(component.state('isFilterInputVisible')).toEqual(false);
    component.find('.btn-filter').at(0).simulate('click');
    expect(component.state('isFilterInputVisible')).toEqual(true);

    tree = toJson(component);
    expect(tree).toMatchSnapshot();
    expect(component.find('.panel-filter')).toHaveLength(1);
    expect(component.find('input')).toHaveLength(1);
    component.find('input').at(0).simulate('change');

    component.find('.btn-filter').at(0).simulate('click');
    expect(component.state('isFilterInputVisible')).toEqual(false);
    tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });
});
