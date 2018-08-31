import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import { get } from 'lodash';

import AllergiesDetail from '../AllergiesDetail/AllergiesDetail';
import { valuesNames, valuesLabels } from '../forms.config';
import { getDDMMMYYYY } from '../../../../utils/time-helpers.utils';
import { isShowElement } from '../../../../utils/themeSettings-helper';
import { themeConfigs } from '../../../../themes.config';

Enzyme.configure({ adapter: new Adapter() });

const hideElements = get(themeConfigs, 'detailsToHide.allergies', []);

const propsForAllergiePanel = {
  detail: {
    [valuesNames.CAUSE]: '1111',
    [valuesNames.CAUSECODE]: '1111',
    [valuesNames.TERMINOLOGY]: '1239085',
    [valuesNames.TERMINOLOGYCODE]: '1111',
    [valuesNames.REACTION]: '1111',
    [valuesNames.AUTHOR]: 'Dr Tony Shannon',
    [valuesNames.DATE_CREATED]: 1507020019000,
    [valuesNames.SOURCE]: 'ethercis',
    [valuesNames.SOURCE_ID]: '7ae34463-0770-4a36-bbde-4869bb6a0f05',
    [valuesNames.ORIGINAL_COMPOSITION]: '',
    [valuesNames.ISIMPORT]: true,
    [valuesNames.ORIGINAL_SOURCE]: '',
  },
};

const ALLERGIE_PANEL = 'allergiePanel';
const META_PANEL = 'metaPanel';
const CONVERT_DATE = getDDMMMYYYY(propsForAllergiePanel.detail[valuesNames.DATE_CREATED]);
const SYSTEM_INFO_PANEL = 'systemInformationPanel';

describe('Component <AllergiesDetail />', () => {
  it('should renders with props correctly', () => {
    const component = shallow(<AllergiesDetail />);

    // Testing component when detail filled object, expandedPanel is all, and panel not edited
    component.setProps({ detail: propsForAllergiePanel.detail, expandedPanel: 'all', editedPanel: { [ALLERGIE_PANEL]: false } });
    expect(component.props().className).toEqual('section-detail');
    expect(component.find('PluginDetailPanel')).toHaveLength(2);

    // Testing allergiePanel
    expect(component.find('PluginDetailPanel').at(0).props().name).toEqual(ALLERGIE_PANEL);
    expect(component.find('PluginDetailPanel').at(0).props().title).toEqual('Allergy');
    expect(component.find('PluginDetailPanel').at(0).props().isOpen).toEqual(false);
    expect(component.find('PluginDetailPanel').at(0).props().isBtnShowPanel).toEqual(true);
    expect(component.find('PluginDetailPanel').at(0).props().isShowControlPanel).toEqual(true);

    let countElement = 0;
    if (isShowElement(valuesNames.CAUSE, hideElements)) {
      expect(component.find('.control-label').at(countElement).text()).toEqual(valuesLabels.CAUSE);
      expect(component.find('.form-control-static').at(countElement).text()).toEqual(propsForAllergiePanel.detail.cause);
      countElement++;
    }
    if (isShowElement(valuesNames.REACTION, hideElements)) {
      expect(component.find('.control-label').at(countElement).text()).toEqual(valuesLabels.REACTION);
      expect(component.find('.form-control-static').at(countElement).text()).toEqual(propsForAllergiePanel.detail.reaction);
      countElement++;
    }
    if (isShowElement(valuesNames.AUTHOR, hideElements)) {
      expect(component.find('.control-label').at(countElement).text()).toEqual(valuesLabels.AUTHOR);
      expect(component.find('.form-control-static').at(countElement).text()).toEqual(propsForAllergiePanel.detail.author);
      countElement++;
    }
    if (isShowElement(valuesNames.CAUSECODE, hideElements)) {
      expect(component.find('.control-label').at(countElement).text()).toEqual(valuesLabels.CAUSECODE);
      expect(component.find('.form-control-static').at(countElement).text()).toEqual(propsForAllergiePanel.detail.causeCode);
      countElement++;
    }
    if (isShowElement(valuesNames.TERMINOLOGY, hideElements)) {
      expect(component.find('.control-label').at(countElement).text()).toEqual(valuesLabels.TERMINOLOGY);
      expect(component.find('.form-control-static').at(countElement).text()).toEqual(propsForAllergiePanel.detail.causeTerminology);
      countElement++;
    }
    if (isShowElement(valuesNames.ORIGINAL_SOURCE, hideElements)) {
      expect(component.find('.control-label').at(countElement).text()).toEqual(valuesLabels.ORIGINAL_SOURCE);
      expect(component.find('.form-control-static').at(countElement).text()).toEqual(propsForAllergiePanel.detail.originalSource);
      countElement++;
    }
    if (isShowElement(valuesNames.ISIMPORT, hideElements)) {
      expect(component.find('.control-label').at(countElement).text()).toEqual(valuesLabels.ISIMPORT);
      countElement++;
    }

    // Testing metaPanel
    expect(component.find('PluginDetailPanel').at(1).props().name).toEqual(SYSTEM_INFO_PANEL);
    expect(component.find('PluginDetailPanel').at(1).props().title).toEqual('System Information');
    expect(component.find('PluginDetailPanel').at(1).props().isOpen).toEqual(false);
    expect(component.find('PluginDetailPanel').at(1).props().isBtnShowPanel).toEqual(true);
    expect(component.find('PluginDetailPanel').at(1).props().isShowControlPanel).toEqual(false);

    if (isShowElement(valuesNames.DATE_CREATED, hideElements)) {
      expect(component.find('.control-label').at(countElement).text()).toEqual(valuesLabels.DATE_CREATED);
      expect(component.find('.form-control-static').at(countElement).text()).toEqual(CONVERT_DATE);
      countElement++;
    }
    if (isShowElement(valuesNames.SOURCE, hideElements)) {
      expect(component.find('.control-label').at(countElement).text()).toEqual(valuesLabels.SOURCE);
      expect(component.find('.form-control-static').at(countElement).text()).toEqual(propsForAllergiePanel.detail.source);
    }

    expect(component).toMatchSnapshot();

    component.setProps({ detail: { [valuesNames.ISIMPORT]: true } });

    expect(component.find('Switch')).toHaveLength(1);
  });

  it('should renders correctly with different state of props', () => {
    const component = shallow(
      <AllergiesDetail />);
    // Testing component when detail empty object, expandedPanel is allergiePanel
    component.setProps({ detail: { [valuesNames.DATE_CREATED]: 1507020019000 }, expandedPanel: ALLERGIE_PANEL, editedPanel: { [ALLERGIE_PANEL]: false } });
    expect(component.find('PluginDetailPanel')).toHaveLength(1);
    expect(component.find('PluginDetailPanel').props().name).toEqual(ALLERGIE_PANEL);
    expect(component).toMatchSnapshot();

    // Testing component when detail empty object, expandedPanel is metaPanel
    component.setProps({ detail: {}, expandedPanel: SYSTEM_INFO_PANEL });
    expect(component.find('PluginDetailPanel')).toHaveLength(1);
    expect(component.find('PluginDetailPanel').props().name).toEqual(SYSTEM_INFO_PANEL);
    expect(component).toMatchSnapshot();

    // Testing component when detail filled object, expandedPanel is all, and panel is edited
    component.setProps({ detail: propsForAllergiePanel.detail, expandedPanel: ALLERGIE_PANEL, editedPanel: { [ALLERGIE_PANEL]: true } });
    expect(component.find('ReduxForm')).toHaveLength(1);
    expect(component.find('PluginDetailPanel').props().name).toEqual(ALLERGIE_PANEL);
    expect(component).toMatchSnapshot();
  });
});

