import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import moment from 'moment';

import VitalsDetail from '../../../src/components/pages/Vitals/VitalsDetail/VitalsDetail';
import { valuesNames, valuesLabels, valuesAddons } from '../../../src/components/pages/Vitals/forms.config';
import { getDDMMMYYYY } from '../../../src/utils/time-helpers.utils';

Enzyme.configure({ adapter: new Adapter() });

const propsForVitalsPanel = {
  detail: {
    [valuesNames.AUTHOR]: 'Dr Tony Shannon',
    [valuesNames.DATE_CREATED]: 1515667784000,
    [valuesNames.DIASTOLIC_BP]: 94,
    [valuesNames.HEART_RATE]: 86,
    [valuesNames.LEVEL_OF_CONSCIOUSNESS]: 'Alert',
    [valuesNames.NEWS_SCORE]: 2,
    [valuesNames.OXYGEN_SATURATION]: 92,
    [valuesNames.RESPIRATION_RATE]: 20,
    [valuesNames.SOURCE]: 'ethercis',
    [valuesNames.SOURCE_ID]: '8191062a-3b0d-4633-9557-60ef63e7cf01',
    [valuesNames.SYSTOLIC_BP]: 120,
    [valuesNames.TEMPERATURE]: 37.6,
  },
  getHighlighterClass: () => {},
  popoverLabels: {
    [valuesNames.HEART_RATE]: [
      {
        place: 1,
        text: '≤ 40',
      },
      {
        place: 3,
        text: '41-50',
      },
    ],
    [valuesNames.LEVEL_OF_CONSCIOUSNESS]: [
      {
        place: 4,
        text: 'A',
      },
      {
        place: 7,
        text: 'V,P or U',
      },
    ],
    [valuesNames.NEWS_SCORE]: [
      {
        place: 4,
        text: '0',
      },
      {
        place: 5,
        text: '1-4',
      },
    ],
    [valuesNames.OXYGEN_SATURATION]: [
      {
        place: 1,
        text: '≤ 40',
      },
      {
        place: 3,
        text: '41-50',
      },
    ],
    [valuesNames.OXYGEN_SUPPLEMENTAL]: [
      {
        place: 2,
        text: 'Yes',
      },
      {
        place: 4,
        text: 'No',
      },
    ],
    [valuesNames.RESPIRATION_RATE]: [
      {
        place: 1,
        text: '≤ 40',
      },
      {
        place: 3,
        text: '41-50',
      },
    ],
    [valuesNames.SYSTOLIC_BP]: [
      {
        place: 1,
        text: '≤ 40',
      },
      {
        place: 3,
        text: '41-50',
      },
    ],
    [valuesNames.TEMPERATURE]: [
      {
        place: 1,
        text: '≤ 40',
      },
      {
        place: 3,
        text: '41-50',
      },
    ],
  },
  vitalStatuses: {
    [valuesNames.HEART_RATE]: {
      point: 1,
      type: 'success',
    },
    [valuesNames.LEVEL_OF_CONSCIOUSNESS]: {
      point: 0,
    },
    [valuesNames.NEWS_SCORE]: {
      point: undefined,
      type: 'success',
    },
    [valuesNames.OXYGEN_SATURATION]: {
      point: 0,
    },
    [valuesNames.OXYGEN_SUPPLEMENTAL]: {
      point: 2,
      type: 'warning',
    },
    [valuesNames.RESPIRATION_RATE]: {
      point: 0,
    },
    [valuesNames.SYSTOLIC_BP]: {
      point: 0,
    },
    [valuesNames.TEMPERATURE]: {
      point: 0,
    },
  },
};

const onShow = () => {};

const VITAL_PANEL = 'vitalPanel';

const CONVERT_DATE_CREATED = getDDMMMYYYY(propsForVitalsPanel.detail[valuesNames.DATE_CREATED]);

describe('Component <VitalsDetail />', () => {
  it('should renders with props correctly', () => {
    const component = shallow(<VitalsDetail
      onShow={onShow}
      getHighlighterClass={propsForVitalsPanel.getHighlighterClass}
      popoverLabels={propsForVitalsPanel.popoverLabels}
      vitalStatuses={propsForVitalsPanel.vitalStatuses}
    />);

    // Testing component when detail filled object, expandedPanel is all, and panel not edited
    component.setProps({ detail: propsForVitalsPanel.detail, expandedPanel: 'all', editedPanel: { [VITAL_PANEL]: false } });
    expect(component.props().className).toEqual('section-detail');
    expect(component.find('PluginDetailPanel')).toHaveLength(1);

    // Testing vitalPanel
    expect(component.find('PluginDetailPanel').at(0).props().name).toEqual(VITAL_PANEL);
    expect(component.find('PluginDetailPanel').at(0).props().title).toEqual('Vitals');
    expect(component.find('PluginDetailPanel').at(0).props().isOpen).toEqual(false);

    expect(component.find('PluginDetailPanel').at(0).find('.vitals-label').at(0)
      .text()).toEqual(valuesLabels.RESPIRATION_RATE);
    expect(component.find('PluginDetailPanel').at(0).find('.vitals-label').at(1)
      .text()).toEqual(valuesLabels.OXYGEN_SATURATION);
    expect(component.find('PluginDetailPanel').at(0).find('.vitals-label').at(2)
      .text()).toEqual(valuesLabels.OXYGEN_SUPPLEMENTAL);
    expect(component.find('PluginDetailPanel').at(0).find('.vitals-label').at(3)
      .text()).toEqual(valuesLabels.HEART_RATE);
    expect(component.find('PluginDetailPanel').at(0).find('.vitals-label').at(4)
      .text()).toEqual(valuesLabels.SYSTOLIC_BP);
    expect(component.find('PluginDetailPanel').at(0).find('.vitals-label').at(5)
      .text()).toEqual(valuesLabels.DIASTOLIC_BP);
    expect(component.find('PluginDetailPanel').at(0).find('.vitals-label').at(6)
      .text()).toEqual(valuesLabels.LEVEL_OF_CONSCIOUSNESS);
    expect(component.find('PluginDetailPanel').at(0).find('.vitals-label').at(7)
      .text()).toEqual(valuesLabels.TEMPERATURE);
    expect(component.find('PluginDetailPanel').at(0).find('.vitals-label').at(8)
      .text()).toEqual(valuesLabels.NEWS_SCORE);
    expect(component.find('PluginDetailPanel').at(0).find('.control-label').at(0)
      .text()).toEqual(valuesLabels.AUTHOR);
    expect(component.find('PluginDetailPanel').at(0).find('.control-label').at(1)
      .text()).toEqual(valuesLabels.DATE_CREATED);

    expect(component.find('VitalsPopover').at(0).props().title).toEqual(valuesLabels.RESPIRATION_RATE);
    expect(component.find('VitalsPopover').at(0).props().vitalStatusesType).toEqual(propsForVitalsPanel.vitalStatuses[valuesNames.RESPIRATION_RATE].type);
    expect(component.find('VitalsPopover').at(0).props().detailValue).toEqual(propsForVitalsPanel.detail[valuesNames.RESPIRATION_RATE]);
    expect(component.find('VitalsPopover').at(0).props().id).toEqual(valuesNames.RESPIRATION_RATE);

    expect(component.find('VitalsPopover').at(1).props().title).toEqual(valuesLabels.OXYGEN_SATURATION);
    expect(component.find('VitalsPopover').at(1).props().vitalStatusesType).toEqual(propsForVitalsPanel.vitalStatuses[valuesNames.OXYGEN_SATURATION].type);
    expect(component.find('VitalsPopover').at(1).props().detailValue).toEqual(propsForVitalsPanel.detail[valuesNames.OXYGEN_SATURATION]);
    expect(component.find('VitalsPopover').at(1).props().id).toEqual(valuesNames.OXYGEN_SATURATION);

    expect(component.find('VitalsPopover').at(2).props().title).toEqual(valuesLabels.HEART_RATE);
    expect(component.find('VitalsPopover').at(2).props().vitalStatusesType).toEqual(propsForVitalsPanel.vitalStatuses[valuesNames.HEART_RATE].type);
    expect(component.find('VitalsPopover').at(2).props().detailValue).toEqual(propsForVitalsPanel.detail[valuesNames.HEART_RATE]);
    expect(component.find('VitalsPopover').at(2).props().id).toEqual(valuesNames.HEART_RATE);

    expect(component.find('VitalsPopover').at(3).props().title).toEqual(valuesLabels.SYSTOLIC_BP);
    expect(component.find('VitalsPopover').at(3).props().vitalStatusesType).toEqual(propsForVitalsPanel.vitalStatuses[valuesNames.SYSTOLIC_BP].type);
    expect(component.find('VitalsPopover').at(3).props().detailValue).toEqual(propsForVitalsPanel.detail[valuesNames.SYSTOLIC_BP]);
    expect(component.find('VitalsPopover').at(3).props().id).toEqual(valuesNames.SYSTOLIC_BP);

    expect(component.find('VitalsPopover').at(4).props().title).toEqual(valuesLabels.TEMPERATURE);
    expect(component.find('VitalsPopover').at(4).props().vitalStatusesType).toEqual(propsForVitalsPanel.vitalStatuses[valuesNames.TEMPERATURE].type);
    expect(component.find('VitalsPopover').at(4).props().detailValue).toEqual(propsForVitalsPanel.detail[valuesNames.TEMPERATURE]);
    expect(component.find('VitalsPopover').at(4).props().id).toEqual(valuesNames.TEMPERATURE);

    expect(component.find('Switch').at(0).props().type).toEqual('checkbox');
    expect(component.find('Switch').at(0).props().name).toEqual(valuesNames.OXYGEN_SUPPLEMENTAL);
    expect(component.find('Switch').at(0).props().value).toEqual(propsForVitalsPanel.detail[valuesNames.OXYGEN_SUPPLEMENTAL]);

    expect(component.find('Switch').at(1).props().type).toEqual('radio');
    expect(component.find('Switch').at(1).props().name).toEqual(valuesNames.LEVEL_OF_CONSCIOUSNESS);
    expect(component.find('Switch').at(1).props().value).toEqual('Alert');
    expect(component.find('Switch').at(1).props().transitionValue).toEqual(propsForVitalsPanel.detail[valuesNames.LEVEL_OF_CONSCIOUSNESS]);
    expect(component.find('Switch').at(1).props().text).toEqual('A');
    expect(component.find('Switch').at(1).props().id).toEqual('levelOfConsciousnessA');

    expect(component.find('Switch').at(2).props().type).toEqual('radio');
    expect(component.find('Switch').at(2).props().name).toEqual(valuesNames.LEVEL_OF_CONSCIOUSNESS);
    expect(component.find('Switch').at(2).props().value).toEqual('Voice');
    expect(component.find('Switch').at(2).props().transitionValue).toEqual(propsForVitalsPanel.detail[valuesNames.LEVEL_OF_CONSCIOUSNESS]);
    expect(component.find('Switch').at(2).props().text).toEqual('V');
    expect(component.find('Switch').at(2).props().id).toEqual('levelOfConsciousnessV');

    expect(component.find('Switch').at(3).props().type).toEqual('radio');
    expect(component.find('Switch').at(3).props().name).toEqual(valuesNames.LEVEL_OF_CONSCIOUSNESS);
    expect(component.find('Switch').at(3).props().value).toEqual('Pain');
    expect(component.find('Switch').at(3).props().transitionValue).toEqual(propsForVitalsPanel.detail[valuesNames.LEVEL_OF_CONSCIOUSNESS]);
    expect(component.find('Switch').at(3).props().text).toEqual('P');
    expect(component.find('Switch').at(3).props().id).toEqual('levelOfConsciousnessP');

    expect(component.find('Switch').at(4).props().type).toEqual('radio');
    expect(component.find('Switch').at(4).props().name).toEqual(valuesNames.LEVEL_OF_CONSCIOUSNESS);
    expect(component.find('Switch').at(4).props().value).toEqual('Unresponsive');
    expect(component.find('Switch').at(4).props().transitionValue).toEqual(propsForVitalsPanel.detail[valuesNames.LEVEL_OF_CONSCIOUSNESS]);
    expect(component.find('Switch').at(4).props().text).toEqual('U');
    expect(component.find('Switch').at(4).props().id).toEqual('levelOfConsciousnessU');

    expect(component.find('.form-control').at(0).text()).toEqual(`${propsForVitalsPanel.detail[valuesNames.DIASTOLIC_BP]}`);
    expect(component.find('.form-control').at(1).text()).toEqual(`${propsForVitalsPanel.detail[valuesNames.NEWS_SCORE]}`);

    expect(component.find('.form-control-static').at(0).text()).toEqual(`${propsForVitalsPanel.detail[valuesNames.AUTHOR]}`);
    expect(component.find('.form-control-static').at(1).text()).toEqual(CONVERT_DATE_CREATED);

    expect(component.find('.vitals-addon').at(0).text()).toEqual(valuesAddons.DIASTOLIC_BP);

    expect(component).toMatchSnapshot();
  });

  it('should renders correctly with different state of props', () => {
    const component = shallow(
      <VitalsDetail
        getHighlighterClass={propsForVitalsPanel.getHighlighterClass}
        popoverLabels={propsForVitalsPanel.popoverLabels}
        vitalStatuses={propsForVitalsPanel.vitalStatuses}
      />);
    // Testing component when detail empty object, expandedPanel is vitalPanel
    component.setProps({ detail: { [valuesNames.DATE_CREATED]: 1510588832000 }, expandedPanel: VITAL_PANEL, editedPanel: { [VITAL_PANEL]: false } });
    expect(component.find('PluginDetailPanel')).toHaveLength(1);
    expect(component.find('VitalsDetailForm')).toHaveLength(0);
    expect(component.find('PluginDetailPanel').props().name).toEqual(VITAL_PANEL);
    expect(component).toMatchSnapshot();

    // Testing component when detail filled object, expandedPanel is all, and VITAL_PANEL is edited
    component.setProps({ detail: propsForVitalsPanel.detail, expandedPanel: VITAL_PANEL, editedPanel: { [VITAL_PANEL]: true } });
    expect(component.find('ReduxForm')).toHaveLength(1);
    expect(component.find('PluginDetailPanel').props().name).toEqual(VITAL_PANEL);

    expect(component).toMatchSnapshot();
  });
});

