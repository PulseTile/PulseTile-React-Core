import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

import GenericPluginDetail from '../../../src/components/pages/GenericPlugin/GenericPluginDetail/GenericPluginDetail';
import { valuesNames, valuesLabels } from '../../../src/components/pages/GenericPlugin/forms.config';
import { getDDMMMYYYY } from '../../../src/utils/time-helpers.utils';

Enzyme.configure({ adapter: new Adapter() });

const propsForGenericPluginPanel = {
  detail: {
    [valuesNames.NOTE]: '11',
    [valuesNames.TYPE]: '11',
    [valuesNames.AUTHOR]: 'bob.smith@gmail.com',
    [valuesNames.DATE_CREATED]: 1510224834000,
    [valuesNames.SOURCE]: 'ethercis',
    [valuesNames.SOURCE_ID]: '7ae34463-0770-4a36-bbde-4869bb6a0f05',
  },
};

const GENERIC_PLUGIN_PANEL = 'genericPluginsPanel';
const CONVERT_DATE = getDDMMMYYYY(propsForGenericPluginPanel.detail[valuesNames.DATE_CREATED]);

describe('Component <GenericPluginDetail />', () => {
  it('should renders with props correctly', () => {
    const component = shallow(<GenericPluginDetail />);

    // Testing component when detail filled object, expandedPanel is all, and panel not edited
    component.setProps({ detail: propsForGenericPluginPanel.detail, expandedPanel: 'all', editedPanel: { [GENERIC_PLUGIN_PANEL]: false } });
    expect(component.props().className).toEqual('section-detail');
    expect(component.find('PluginDetailPanel')).toHaveLength(1);

    // Testing genericPluginsPanel
    expect(component.find('PluginDetailPanel').at(0).props().name).toEqual(GENERIC_PLUGIN_PANEL);
    expect(component.find('PluginDetailPanel').at(0).props().title).toEqual('Generic Plugin Item');
    expect(component.find('PluginDetailPanel').at(0).props().isOpen).toEqual(false);
    expect(component.find('PluginDetailPanel').at(0).props().isBtnShowPanel).toEqual(false);
    expect(component.find('PluginDetailPanel').at(0).props().isShowControlPanel).toEqual(true);

    expect(component.find('.control-label').at(0).text()).toEqual(valuesLabels.TYPE);
    expect(component.find('.control-label').at(1).text()).toEqual(valuesLabels.NOTE);
    expect(component.find('.control-label').at(2).text()).toEqual(valuesLabels.AUTHOR);
    expect(component.find('.control-label').at(3).text()).toEqual(valuesLabels.DATEgitg);
    expect(component.find('.control-label').at(4).text()).toEqual(valuesLabels.SOURCE);

    expect(component.find('.form-control-static').at(0).text()).toEqual(propsForGenericPluginPanel.detail[valuesNames.TYPE]);
    expect(component.find('.form-control-static').at(1).text()).toEqual(propsForGenericPluginPanel.detail[valuesNames.NOTE]);
    expect(component.find('.form-control-static').at(2).text()).toEqual(propsForGenericPluginPanel.detail[valuesNames.AUTHOR]);
    expect(component.find('.form-control-static').at(3).text()).toEqual(CONVERT_DATE);
    expect(component.find('.form-control-static').at(4).text()).toEqual(propsForGenericPluginPanel.detail[valuesNames.SOURCE]);

    expect(component).toMatchSnapshot();
  });

  it('should renders correctly with different state of props', () => {
    const component = shallow(
      <GenericPluginDetail />);
    // Testing component when detail empty object, expandedPanel is genericPluginsPanel
    component.setProps({ detail: { [valuesNames.DATE_CREATED]: 1507020019000 }, expandedPanel: GENERIC_PLUGIN_PANEL, editedPanel: { [GENERIC_PLUGIN_PANEL]: false } });
    expect(component.find('PluginDetailPanel')).toHaveLength(1);
    expect(component.find('PluginDetailPanel').props().name).toEqual(GENERIC_PLUGIN_PANEL);
    expect(component).toMatchSnapshot();

    // Testing component when detail filled object, expandedPanel is all, and panel is edited
    component.setProps({ detail: propsForGenericPluginPanel.detail, expandedPanel: GENERIC_PLUGIN_PANEL, editedPanel: { [GENERIC_PLUGIN_PANEL]: true } });
    expect(component.find('ReduxForm')).toHaveLength(1);
    expect(component.find('PluginDetailPanel').props().name).toEqual(GENERIC_PLUGIN_PANEL);
    expect(component).toMatchSnapshot();
  });
});

