import React from 'react';
import {configure, shallow, mount} from 'enzyme'
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-15';
configure({ adapter: new Adapter() });

import PluginCreate from '../../src/components/plugin-page-component/PluginCreate';

const testProps = {
  onExpand: () => {},
  onShow: () => {},
  onSaveSettings: () => {},
  onCancel: () => {},
  onGoBack: () => {},
  title: 'Test Title Panel',
  name: 'TEST_PANEL',
  currentPanel: 'TEST_PANEL',
  formValues: {
    prop_1: 'value_1',
    prop_2: 'value_2',
    prop_3: 'value_3',
  }
};

describe('Component <PluginCreate />', () => {
  it('should renders with all props correctly', () => {
    let tree;
    const component = mount(
        <PluginCreate
          onExpand={testProps.onExpand}
          onShow={testProps.onShow}
          onSaveSettings={testProps.onSaveSettings}
          onCancel={testProps.onCancel}
          expandedPanel={'another panel'}
          title={testProps.title}
          name={testProps.name}
          openedPanel={testProps.name}
          currentPanel={testProps.currentPanel}
          formValues={testProps.formValues}
        />);

    tree = toJson(component);
    expect(tree).toMatchSnapshot();

    component.setProps({
      expandedPanel: testProps.name,
      componentForm: 'children'
    });
    expect(component.find('PluginDetailPanel')).toHaveLength(1);


    expect(component.instance().props['onExpand']).toEqual(testProps.onExpand);
    expect(component.instance().props['onShow']).toEqual(testProps.onShow);
    expect(component.instance().props['onSaveSettings']).toEqual(testProps.onSaveSettings);
    expect(component.instance().props['onCancel']).toEqual(testProps.onCancel);
    expect(component.instance().props['expandedPanel']).toEqual(testProps.name);
    expect(component.instance().props['title']).toEqual(testProps.title);
    expect(component.instance().props['name']).toEqual(testProps.name);
    expect(component.instance().props['currentPanel']).toEqual(testProps.currentPanel);
    expect(component.instance().props['formValues']).toEqual(testProps.formValues);
    expect(component.instance().props['isImport']).toEqual(false);
    expect(component.instance().props['onGoBack']).toEqual(undefined);

    tree = toJson(component);
    expect(tree).toMatchSnapshot();

    component.find('.panel-control .btn-danger').at(0).simulate('click');
    component.find('.panel-control .btn-success').at(0).simulate('click');
  });

  it('should renders correctly when creation occurs after import', () => {
    let tree;
    const component = shallow(
      <PluginCreate
        onExpand={testProps.onExpand}
        onShow={testProps.onShow}
        onSaveSettings={testProps.onSaveSettings}
        onCancel={testProps.onCancel}
        expandedPanel={'another panel'}
        title={testProps.title}
        name={testProps.name}
        openedPanel={testProps.name}
        currentPanel={testProps.currentPanel}
        formValues={testProps.formValues}
        onGoBack={testProps.onGoBack}
        isImport
      />);

    tree = toJson(component);
    expect(tree).toMatchSnapshot();

    component.setProps({
      expandedPanel: testProps.name,
      componentForm: 'children'
    });
    expect(component.find('PluginDetailPanel')).toHaveLength(1);
    expect(component.find('PTButton')).toHaveLength(3);

    expect(component.instance().props['isImport']).toEqual(true);
    expect(component.instance().props['onGoBack']).toEqual(testProps.onGoBack);
    // component.instance().goBack();

    tree = toJson(component);
    expect(tree).toMatchSnapshot();

    component.find('PTButton').at(2).simulate('click');
  });
});
