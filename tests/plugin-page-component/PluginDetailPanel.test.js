import React from 'react';
import {configure, shallow, mount} from 'enzyme'
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-15';
configure({ adapter: new Adapter() });

import PluginDetailPanel from '../../src/components/plugin-page-component/PluginDetailPanel';

class SimpleComponent extends React.Component {
  render() {
    return <div>Simple Component</div>;
  }
}

const testProps = {
  onExpand: () => {},
  onShow: () => {},
  onEdit: () => {},
  onCancel: () => {},
  onSaveSettings: () => {},
  title: 'Test Title Panel',
  name: 'TEST_PANEL',
  currentPanel: 'TEST_PANEL',
  children: React.createElement(SimpleComponent),
  editedPanel: {'TEST_PANEL': true},
  formValues: {
    prop_1: 'value_1',
    prop_2: 'value_2',
    prop_3: 'value_3',
  }
};

describe('Component <PluginDetailPanel />', () => {
  it('should renders with all props correctly', () => {
    let tree;
    const component = shallow(
        <PluginDetailPanel
          onExpand={testProps.onExpand}
          onShow={testProps.onShow}
          onEdit={testProps.onEdit}
          onCancel={testProps.onCancel}
          onSaveSettings={testProps.onSaveSettings}
          title={testProps.title}
          name={testProps.name}
          currentPanel={testProps.currentPanel}
          children={testProps.children}
          editedPanel={testProps.editedPanel}
          formValues={testProps.formValues}
          isOpen={true}
          isCreatePanelVisible={true}
          isBtnShowPanel={true}
        />);

    expect(component.find('PluginDetailHeader')).toHaveLength(1);
    expect(component.find('PTButton')).toHaveLength(0);
    expect(component.find('.panel-body').children()).toHaveLength(1);
    expect(component.find('.panel-body').find('SimpleComponent')).toHaveLength(1);
    tree = toJson(component);
    expect(tree).toMatchSnapshot();

    expect(component.instance().props['onExpand']).toEqual(testProps.onExpand);
    expect(component.instance().props['onShow']).toEqual(testProps.onShow);
    expect(component.instance().props['onEdit']).toEqual(testProps.onEdit);
    expect(component.instance().props['onCancel']).toEqual(testProps.onCancel);
    expect(component.instance().props['onSaveSettings']).toEqual(testProps.onSaveSettings);
    expect(component.instance().props['title']).toEqual(testProps.title);
    expect(component.instance().props['name']).toEqual(testProps.name);
    expect(component.instance().props['currentPanel']).toEqual(testProps.currentPanel);
    expect(component.instance().props['children']).toEqual(testProps.children);
    expect(component.instance().props['editedPanel']).toEqual(testProps.editedPanel);
    expect(component.instance().props['formValues']).toEqual(testProps.formValues);
    expect(component.instance().props['isOpen']).toEqual(true);
    expect(component.instance().props['isCreatePanelVisible']).toEqual(true);
    expect(component.instance().props['isBtnShowPanel']).toEqual(true);
    expect(component.instance().props['isShowControlPanel']).toEqual(true);
  });

  it('should renders correctly when panel not edited but "Edit" button is displayed', () => {
    let tree;
    const component = shallow(
      <PluginDetailPanel
        onExpand={testProps.onExpand}
        onShow={testProps.onShow}
        onEdit={testProps.onEdit}
        onCancel={testProps.onCancel}
        onSaveSettings={testProps.onSaveSettings}
        title={testProps.title}
        name={'ANOTHER_PANEL'}
        currentPanel={testProps.currentPanel}
        children={testProps.children}
        editedPanel={{editedPanel: {}}}
        formValues={testProps.formValues}
        isOpen={true}
        isBtnShowPanel={true}
        isCreatePanelVisible={false}
      />);

    expect(component.instance().props['isCreatePanelVisible']).toEqual(false);
    expect(component.find('PluginDetailHeader')).toHaveLength(1);
    expect(component.find('PTButton')).toHaveLength(1);
    expect(component.find('.panel-body').children()).toHaveLength(2);
    expect(component.find('.panel-body').find('SimpleComponent')).toHaveLength(1);
    expect(component.find('.panel-body').children().at(1).hasClass('panel-control')).toEqual(true);

    component.find('PTButton').at(0).simulate('click');

    tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });

  it('should renders correctly when panel edited and confirming buttons are displayed', () => {
    let tree;
    const component = shallow(
      <PluginDetailPanel
        onExpand={testProps.onExpand}
        onShow={testProps.onShow}
        onEdit={testProps.onEdit}
        onCancel={testProps.onCancel}
        onSaveSettings={testProps.onSaveSettings}
        title={testProps.title}
        name={testProps.name}
        currentPanel={testProps.currentPanel}
        children={testProps.children}
        editedPanel={testProps.editedPanel}
        formValues={testProps.formValues}
        isOpen={true}
        isBtnShowPanel={true}
        isCreatePanelVisible={false}
      />);

    expect(component.instance().props['isCreatePanelVisible']).toEqual(false);
    expect(component.find('PluginDetailHeader')).toHaveLength(1);
    expect(component.find('PTButton')).toHaveLength(2);
    expect(component.find('.panel-body').children()).toHaveLength(2);
    expect(component.find('.panel-body').find('SimpleComponent')).toHaveLength(1);
    expect(component.find('.panel-body').children().at(1).hasClass('panel-control')).toEqual(true);

    component.find('PTButton').at(0).simulate('click');
    component.find('PTButton').at(1).simulate('click');

    tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });
});
