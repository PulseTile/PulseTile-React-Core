import React from 'react';
import {configure, shallow, mount} from 'enzyme'
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-15';
configure({ adapter: new Adapter() });

import PluginDetailHeader from '../../src/components/plugin-page-component/PluginDetailHeader';

const testProps = {
  onExpand: () => {},
  onShow: () => {},
  title: 'Test Title Panel',
  name: 'TEST_PANEL',
  currentPanel: 'TEST_PANEL',
};

describe('Component <PluginDetailHeader />', () => {
  it('should renders with all props correctly', () => {
    let tree;
    const component = shallow(
        <PluginDetailHeader
          onExpand={testProps.onExpand}
          onShow={testProps.onShow}
          title={testProps.title}
          name={testProps.name}
          currentPanel={testProps.currentPanel}
          isBtnShowPanel={false}
        />);
    expect(component.find('PTButton')).toHaveLength(1);
    tree = toJson(component);
    expect(tree).toMatchSnapshot();

    component.setProps({ isBtnShowPanel: true });
    expect(component.find('PTButton')).toHaveLength(2);
    expect(component.find('.panel-title')).toHaveLength(1);
    expect(component.find('.panel-title').text()).toEqual(testProps.title);

    expect(component.instance().props['onExpand']).toEqual(testProps.onExpand);
    expect(component.instance().props['onShow']).toEqual(testProps.onShow);
    expect(component.instance().props['title']).toEqual(testProps.title);
    expect(component.instance().props['name']).toEqual(testProps.name);
    expect(component.instance().props['currentPanel']).toEqual(testProps.currentPanel);
    expect(component.instance().props['isBtnShowPanel']).toEqual(true);

    tree = toJson(component);
    expect(tree).toMatchSnapshot();

    component.find('PTButton').at(0).simulate('click');
    component.find('PTButton').at(1).simulate('click');
  });
});
