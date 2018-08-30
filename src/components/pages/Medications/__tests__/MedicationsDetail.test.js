import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import { get } from 'lodash';

import MedicationsDetail from '../MedicationsDetail/MedicationsDetail';
import { valuesNames, valuesLabels } from '../forms.config';
import { getDDMMMYYYY } from '../../../../utils/time-helpers.utils';
import { themeConfigs } from '../../../../themes.config';

Enzyme.configure({ adapter: new Adapter() });

/**
 * This function checks that current element should be show at details panel
 *
 * @param {string} el
 * @param {array}  hideElements
 * @return {boolean}
 */
function isShowElement(el, hideElements) {
  return (-1 === hideElements.indexOf(el));
}

const propsForMedicationsPanel = {
  detail: {
    [valuesNames.NAME]: 'test',
    [valuesNames.DOSE_AMOUNT]: '50',
    [valuesNames.DOSE_DIRECTIONS]: 'test',
    [valuesNames.DOSE_TIMING]: '50',
    [valuesNames.ROUTE]: 'test',
    [valuesNames.START_DATE]: 1510653645000,
    [valuesNames.START_TIME]: 36045000,
    [valuesNames.MEDICATION_CODE]: 123456789,
    [valuesNames.MEDICATION_TERMINOLOGY]: 'external',
    [valuesNames.AUTHOR]: 'bob.smith@gmail.com',
    [valuesNames.DATE_CREATED]: 1510588832000,
    [valuesNames.SOURCE]: 'marand',
    [valuesNames.SOURCE_ID]: 'a7007401-837f-471c-8f73-cbb53c0eb1a1',
  },
};

const onShow = () => {};
const toggleHourlySchedule = () => {};

const MEDICATION_PANEL = 'medicationPanel';
const PRESCRIPTION_PANEL = 'prescriptionPanel';
const WARNINGS_PANEL = 'warningsPanel';
const CHANGE_HISTORY_PANEL = 'changeHistoryPanel';

const CONVERT_DATE_CREATED = getDDMMMYYYY(propsForMedicationsPanel.detail[valuesNames.DATE_CREATED]);

const hideElements = get(themeConfigs, 'detailsToHide.medications', []);

describe('Component <MedicationsDetail />', () => {
  it('should renders with props correctly', () => {
    const component = shallow(<MedicationsDetail
      onShow={onShow}
      toggleHourlySchedule={toggleHourlySchedule}
    />);
    //
    // Testing component when detail filled object, expandedPanel is all, and panel not edited
    component.setProps({ detail: propsForMedicationsPanel.detail, expandedPanel: 'all', editedPanel: { [MEDICATION_PANEL]: false } });
    expect(component.props().className).toEqual('section-detail');
    expect(component.find('PluginDetailPanel')).toHaveLength(3);
    expect(component.find('MedicationsDetailPanel')).toHaveLength(1);

    // Testing medicationPanel
    expect(component.find('MedicationsDetailPanel').props().name).toEqual(MEDICATION_PANEL);
    expect(component.find('MedicationsDetailPanel').props().title).toEqual('Medication');
    expect(component.find('MedicationsDetailPanel').props().isOpen).toEqual(false);
    expect(component.find('MedicationsDetailPanel').props().isBtnShowPanel).toEqual(true);
    expect(component.find('MedicationsDetailPanel').props().isShowControlPanel).toEqual(true);

    let count = 0;

    if (isShowElement(valuesNames.NAME, hideElements)) {
      expect(component.find('MedicationsDetailPanel').find('.control-label').at(count).text()).toEqual(valuesLabels.NAME);
      expect(component.find('MedicationsDetailPanel').find('.form-control-static').at(count).text()).toEqual(propsForMedicationsPanel.detail[valuesNames.NAME]);
      count++;
    }

    if (isShowElement(valuesNames.DOSE_AMOUNT, hideElements)) {
      expect(component.find('MedicationsDetailPanel').find('.control-label').at(count).text()).toEqual(valuesLabels.DOSE_AMOUNT);
      expect(component.find('MedicationsDetailPanel').find('.form-control-static').at(count).text()).toEqual(propsForMedicationsPanel.detail[valuesNames.DOSE_AMOUNT]);
      count++;
    }

    if (isShowElement(valuesNames.DOSE_TIMING, hideElements)) {
      expect(component.find('MedicationsDetailPanel').find('.control-label').at(count).text()).toEqual(valuesLabels.DOSE_TIMING);
      expect(component.find('MedicationsDetailPanel').find('.form-control-static').at(count).text()).toEqual(propsForMedicationsPanel.detail[valuesNames.DOSE_TIMING]);
      component.find('.btn-primary').simulate('click');
      count++;
    }

    if (isShowElement(valuesNames.DOSE_DIRECTIONS, hideElements)) {
      expect(component.find('MedicationsDetailPanel').find('.control-label').at(count).text()).toEqual(valuesLabels.DOSE_DIRECTIONS);
      expect(component.find('MedicationsDetailPanel').find('.form-control-static').at(count).text()).toEqual(propsForMedicationsPanel.detail[valuesNames.DOSE_DIRECTIONS]);
      count++;
    }

    if (isShowElement(valuesNames.AUTHOR, hideElements)) {
      expect(component.find('MedicationsDetailPanel').find('.control-label').at(count).text()).toEqual(valuesLabels.AUTHOR);
      expect(component.find('MedicationsDetailPanel').find('.form-control-static').at(count).text()).toEqual(propsForMedicationsPanel.detail[valuesNames.AUTHOR]);
      count++;
    }

    if (isShowElement(valuesNames.DATE_CREATED, hideElements)) {
      expect(component.find('MedicationsDetailPanel').find('.control-label').at(count).text()).toEqual(valuesLabels.DATE_CREATED);
      expect(component.find('MedicationsDetailPanel').find('.form-control-static').at(count).text()).toEqual(CONVERT_DATE_CREATED);
      count++;
    }

    // Testing prescriptionPanel
    expect(component.find('PluginDetailPanel').at(0).props().name).toEqual(PRESCRIPTION_PANEL);
    expect(component.find('PluginDetailPanel').at(0).props().title).toEqual('Prescription (1)');
    expect(component.find('PluginDetailPanel').at(0).props().isOpen).toEqual(false);
    expect(component.find('PluginDetailPanel').at(0).props().isBtnShowPanel).toEqual(true);
    expect(component.find('PluginDetailPanel').at(0).props().isShowControlPanel).toEqual(true);

    expect(component.find('PluginDetailPanel').at(0).find('.control-label').at(0)
      .text()).toEqual(valuesLabels.NAME);
    expect(component.find('PluginDetailPanel').at(0).find('.control-label').at(1)
      .text()).toEqual(valuesLabels.DOSE_AMOUNT);
    expect(component.find('PluginDetailPanel').at(0).find('.control-label').at(2)
      .text()).toEqual(valuesLabels.DOSE_TIMING);

    expect(component.find('PluginDetailPanel').at(0).find('.form-control-static').at(0)
      .text()).toEqual(propsForMedicationsPanel.detail[valuesNames.NAME]);
    expect(component.find('PluginDetailPanel').at(0).find('.form-control-static').at(1)
      .text()).toEqual(propsForMedicationsPanel.detail[valuesNames.DOSE_AMOUNT]);
    expect(component.find('PluginDetailPanel').at(0).find('.form-control-static').at(2)
      .text()).toEqual('2X each morning');

    component.setProps({ isOpenHourlySchedule: true });
    expect(component.find('.panel-title').text()).toEqual('27-Nov-2016');

    // Testing warningsPanel
    expect(component.find('PluginDetailPanel').at(1).props().name).toEqual(WARNINGS_PANEL);
    expect(component.find('PluginDetailPanel').at(1).props().title).toEqual('Warnings (2)');
    expect(component.find('PluginDetailPanel').at(1).props().isOpen).toEqual(false);
    expect(component.find('PluginDetailPanel').at(1).props().isBtnShowPanel).toEqual(true);
    expect(component.find('PluginDetailPanel').at(1).props().isShowControlPanel).toEqual(false);

    expect(component.find('PluginDetailPanel').at(1).find('.control-label').at(0)
      .text()).toEqual('Warning #1');
    expect(component.find('PluginDetailPanel').at(1).find('.control-label').at(1)
      .text()).toEqual('Effects');
    expect(component.find('PluginDetailPanel').at(1).find('.control-label').at(2)
      .text()).toEqual('Warning #2');
    expect(component.find('PluginDetailPanel').at(1).find('.control-label').at(3)
      .text()).toEqual('Effects');

    expect(component.find('PluginDetailPanel').at(1).find('.form-control-static').at(0)
      .text()).toEqual('Interaction found between Furosemide and Latanoprost');
    expect(component.find('PluginDetailPanel').at(1).find('.form-control-static').at(1)
      .text()).toEqual('Anticonvulsant effect antagonised');
    expect(component.find('PluginDetailPanel').at(1).find('.form-control-static').at(2)
      .text()).toEqual('Interaction found between Furosemide and Digoxin');
    expect(component.find('PluginDetailPanel').at(1).find('.form-control-static').at(3)
      .text()).toEqual('May increase anticoagulant effect');

    // Testing CHANGE_HISTORY_PANEL
    expect(component.find('PluginDetailPanel').at(2).props().name).toEqual(CHANGE_HISTORY_PANEL);
    expect(component.find('PluginDetailPanel').at(2).props().title).toEqual('Change History (1)');
    expect(component.find('PluginDetailPanel').at(2).props().isOpen).toEqual(false);
    expect(component.find('PluginDetailPanel').at(2).props().isBtnShowPanel).toEqual(true);
    expect(component.find('PluginDetailPanel').at(2).props().isShowControlPanel).toEqual(false);

    expect(component.find('PluginDetailPanel').at(2).find('.control-label').at(0)
      .text()).toEqual('Change #1 Date');
    expect(component.find('PluginDetailPanel').at(2).find('.control-label').at(1)
      .text()).toEqual('Changes');

    expect(component.find('PluginDetailPanel').at(2).find('.form-control-static').at(0)
      .text()).toEqual('11-Oct-2016 11:45');

    component.find('.btn-schedule').simulate('click');
    expect(component).toMatchSnapshot();


    component.setProps({ detail: { [valuesNames.ISIMPORT]: true } });
    // expect(component.find('.form-control-static').at(4).text()).toEqual('');
    // expect(component.find('.control-label').at(4).text()).toEqual(valuesLabels.ORIGINAL_SOURCE);
    // expect(component.find('.control-label').at(5).text()).toEqual(valuesLabels.ISIMPORT);
    expect(component.find('Switch')).toHaveLength(1);
  });

  it('should renders correctly with different state of props', () => {
    const component = shallow(
      <MedicationsDetail />);
    // Testing component when detail empty object, expandedPanel is medicationPanel
    component.setProps({ detail: { [valuesNames.DATE_CREATED]: 1510588832000 }, expandedPanel: MEDICATION_PANEL, editedPanel: { [MEDICATION_PANEL]: false } });
    expect(component.find('PluginDetailPanel')).toHaveLength(0);
    expect(component.find('MedicationsDetailPanel')).toHaveLength(1);
    expect(component.find('MedicationsDetailPanel').props().name).toEqual(MEDICATION_PANEL);
    expect(component).toMatchSnapshot();

    // Testing component when detail empty object, expandedPanel is prescriptionPanel
    component.setProps({ detail: { [valuesNames.DATE_CREATED]: 1510588832000 }, expandedPanel: PRESCRIPTION_PANEL });
    expect(component.find('PluginDetailPanel')).toHaveLength(1);
    expect(component.find('MedicationsDetailPanel')).toHaveLength(0);
    expect(component.find('PluginDetailPanel').props().name).toEqual(PRESCRIPTION_PANEL);
    expect(component).toMatchSnapshot();

    // Testing component when detail empty object, expandedPanel is warningsPanel
    component.setProps({ detail: { [valuesNames.DATE_CREATED]: 1510588832000 }, expandedPanel: WARNINGS_PANEL });
    expect(component.find('PluginDetailPanel')).toHaveLength(1);
    expect(component.find('MedicationsDetailPanel')).toHaveLength(0);
    expect(component.find('PluginDetailPanel').props().name).toEqual(WARNINGS_PANEL);
    expect(component).toMatchSnapshot();

    // Testing component when detail empty object, expandedPanel is changeHistoryPanel
    component.setProps({ detail: { [valuesNames.DATE_CREATED]: 1510588832000 }, expandedPanel: CHANGE_HISTORY_PANEL });
    expect(component.find('PluginDetailPanel')).toHaveLength(1);
    expect(component.find('MedicationsDetailPanel')).toHaveLength(0);
    expect(component.find('PluginDetailPanel').props().name).toEqual(CHANGE_HISTORY_PANEL);
    expect(component).toMatchSnapshot();

    // Testing component when detail filled object, expandedPanel is all, and MEDICATION_PANEL is edited
    component.setProps({ detail: propsForMedicationsPanel.detail, expandedPanel: MEDICATION_PANEL, editedPanel: { [MEDICATION_PANEL]: true } });
    expect(component.find('ReduxForm')).toHaveLength(1);
    expect(component.find('PluginDetailPanel').props().name).toEqual(MEDICATION_PANEL);
    expect(component).toMatchSnapshot();

    // Testing component when detail filled object, expandedPanel is all, and PRESCRIPTION_PANEL is edited
    component.setProps({ detail: propsForMedicationsPanel.detail, expandedPanel: PRESCRIPTION_PANEL, editedPanel: { [PRESCRIPTION_PANEL]: true } });
    expect(component.find('ReduxForm')).toHaveLength(1);
    expect(component.find('PluginDetailPanel').props().name).toEqual(PRESCRIPTION_PANEL);
    expect(component).toMatchSnapshot();
  });
});

