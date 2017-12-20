import React from 'react';
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-15';

import EventsDetailPanel from '../../../src/components/pages/Events/EventsDetail/EventsDetailPanel';

configure({ adapter: new Adapter() });

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
  editedPanel: { 'TEST_PANEL': true },
  formValues: {
    prop_1: 'value_1',
    prop_2: 'value_2',
    prop_3: 'value_3',
  },
};

describe('Component <EventsDetailPanel />', () => {
  it('should renders with all props correctly', () => {
    const component = shallow(
      <EventsDetailPanel
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
        isOpen
        isCreatePanelVisible
        isBtnShowPanel
      />);

    expect(component.find('PluginDetailHeader')).toHaveLength(1);
    expect(component.find('PTButton')).toHaveLength(0);
    expect(component.find('.panel-body').children()).toHaveLength(1);
    expect(component.find('.panel-body').find('SimpleComponent')).toHaveLength(1);

    expect(component.instance().props.onExpand).toEqual(testProps.onExpand);
    expect(component.instance().props.onShow).toEqual(testProps.onShow);
    expect(component.instance().props.onEdit).toEqual(testProps.onEdit);
    expect(component.instance().props.onCancel).toEqual(testProps.onCancel);
    expect(component.instance().props.onSaveSettings).toEqual(testProps.onSaveSettings);
    expect(component.instance().props.title).toEqual(testProps.title);
    expect(component.instance().props.name).toEqual(testProps.name);
    expect(component.instance().props.currentPanel).toEqual(testProps.currentPanel);
    expect(component.instance().props.children).toEqual(testProps.children);
    expect(component.instance().props.editedPanel).toEqual(testProps.editedPanel);
    expect(component.instance().props.formValues).toEqual(testProps.formValues);
    expect(component.instance().props.isOpen).toEqual(true);
    expect(component.instance().props.isCreatePanelVisible).toEqual(true);
    expect(component.instance().props.isBtnShowPanel).toEqual(true);
    expect(component.instance().props.isShowControlPanel).toEqual(true);

    expect(component).toMatchSnapshot();

    // Test panel when panel not edited but buttons is displayed
    component.setProps({ isShowControlPanel: true, isCreatePanelVisible: false, name: 'AnotherPanel' });

    expect(component.instance().props.isCreatePanelVisible).toEqual(false);
    expect(component.find('PluginDetailHeader')).toHaveLength(1);
    expect(component.find('PTButton')).toHaveLength(2);
    expect(component.find('.btn-text').at(0).text()).toEqual('Start Appointment');
    expect(component.find('.btn-text').at(1).text()).toEqual(' Edit');

    component.find('.btn-edit').simulate('click');
    expect(component).toMatchSnapshot();

    // Test panel when panel edited
    component.setProps({ name: 'TEST_PANEL' });

    expect(component.instance().props.isCreatePanelVisible).toEqual(false);
    expect(component.find('PluginDetailHeader')).toHaveLength(1);
    expect(component.find('PTButton')).toHaveLength(2);
    expect(component.find('.btn-text').at(0).text()).toEqual(' Cancel');
    expect(component.find('.btn-text').at(1).text()).toEqual(' Complete');

    component.find('.btn-danger').simulate('click');
    component.find('.btn-success').simulate('click');
    expect(component).toMatchSnapshot();
  });
});
