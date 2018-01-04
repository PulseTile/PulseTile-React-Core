import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

import ClinicalNotesDetail from '../../../src/components/pages/ClinicalNotes/ClinicalNotesDetail/ClinicalNotesDetail';
import { valuesNames, valuesLabels } from '../../../src/components/pages/ClinicalNotes/forms.config';
import { getDDMMMYYYY } from '../../../src/utils/time-helpers.utils';

Enzyme.configure({ adapter: new Adapter() });

const propsForClinicalNotesPanel = {
  detail: {
    [valuesNames.NOTE]: '11',
    [valuesNames.TYPE]: '11',
    [valuesNames.AUTHOR]: 'bob.smith@gmail.com',
    [valuesNames.DATE_CREATED]: 1510224834000,
    [valuesNames.SOURCE]: 'ethercis',
    [valuesNames.SOURCE_ID]: '7ae34463-0770-4a36-bbde-4869bb6a0f05',
  },
};

const CLINICAL_NOTES_PANEL = 'clinicalNotesPanel';
const CONVERT_DATE = getDDMMMYYYY(propsForClinicalNotesPanel.detail[valuesNames.DATE_CREATED]);

describe('Component <ClinicalNotesDetail />', () => {
  it('should renders with props correctly', () => {
    const component = shallow(<ClinicalNotesDetail />);

    // Testing component when detail filled object, expandedPanel is all, and panel not edited
    component.setProps({ detail: propsForClinicalNotesPanel.detail, expandedPanel: 'all', editedPanel: { [CLINICAL_NOTES_PANEL]: false } });
    expect(component.props().className).toEqual('section-detail');
    expect(component.find('PluginDetailPanel')).toHaveLength(1);

    // Testing clinicalNotesPanel
    expect(component.find('PluginDetailPanel').at(0).props().name).toEqual(CLINICAL_NOTES_PANEL);
    expect(component.find('PluginDetailPanel').at(0).props().title).toEqual('Clinical Note');
    expect(component.find('PluginDetailPanel').at(0).props().isOpen).toEqual(false);
    expect(component.find('PluginDetailPanel').at(0).props().isBtnShowPanel).toEqual(false);
    expect(component.find('PluginDetailPanel').at(0).props().isShowControlPanel).toEqual(true);

    expect(component.find('.control-label').at(0).text()).toEqual(valuesLabels.TYPE);
    expect(component.find('.control-label').at(1).text()).toEqual(valuesLabels.NOTE);
    expect(component.find('.control-label').at(2).text()).toEqual(valuesLabels.AUTHOR);
    expect(component.find('.control-label').at(3).text()).toEqual(valuesLabels.DATE_CREATED);
    expect(component.find('.control-label').at(4).text()).toEqual(valuesLabels.SOURCE);

    expect(component.find('.form-control-static').at(0).text()).toEqual(propsForClinicalNotesPanel.detail[valuesNames.TYPE]);
    expect(component.find('.form-control-static').at(1).text()).toEqual(propsForClinicalNotesPanel.detail[valuesNames.NOTE]);
    expect(component.find('.form-control-static').at(2).text()).toEqual(propsForClinicalNotesPanel.detail[valuesNames.AUTHOR]);
    expect(component.find('.form-control-static').at(3).text()).toEqual(CONVERT_DATE);
    expect(component.find('.form-control-static').at(4).text()).toEqual(propsForClinicalNotesPanel.detail[valuesNames.SOURCE]);

    expect(component).toMatchSnapshot();
  });

  it('should renders correctly with different state of props', () => {
    const component = shallow(
      <ClinicalNotesDetail />);
    // Testing component when detail empty object, expandedPanel is clinicalNotesPanel
    component.setProps({ detail: { [valuesNames.DATE_CREATED]: 1507020019000 }, expandedPanel: CLINICAL_NOTES_PANEL, editedPanel: { [CLINICAL_NOTES_PANEL]: false } });
    expect(component.find('PluginDetailPanel')).toHaveLength(1);
    expect(component.find('PluginDetailPanel').props().name).toEqual(CLINICAL_NOTES_PANEL);
    expect(component).toMatchSnapshot();

    // Testing component when detail filled object, expandedPanel is all, and panel is edited
    component.setProps({ detail: propsForClinicalNotesPanel.detail, expandedPanel: CLINICAL_NOTES_PANEL, editedPanel: { [CLINICAL_NOTES_PANEL]: true } });
    expect(component.find('ReduxForm')).toHaveLength(1);
    expect(component.find('PluginDetailPanel').props().name).toEqual(CLINICAL_NOTES_PANEL);
    expect(component).toMatchSnapshot();
  });
});

