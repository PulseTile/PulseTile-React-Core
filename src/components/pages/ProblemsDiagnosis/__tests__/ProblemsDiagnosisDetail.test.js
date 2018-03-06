import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

import ProblemsDiagnosisDetail from '../ProblemsDiagnosisDetail/ProblemsDiagnosisDetail';
import { valuesNames, valuesLabels } from '../forms.config';
import { getDDMMMYYYY } from '../../../../utils/time-helpers.utils';

Enzyme.configure({ adapter: new Adapter() });

const propsForDiagnosisPanel = {
  detail: {
    [valuesNames.PROBLEM]: '1.0',
    [valuesNames.DATE_OF_ONSET]: 1511568000000,
    [valuesNames.DESCRIPTION]: 'sdadasdasd',
    [valuesNames.TERMINOLOGY]: 'yyyy',
    [valuesNames.CODE]: '1.239389E7',
    [valuesNames.AUTHOR]: 'Dr Tony Shannon',
    [valuesNames.DATE_CREATED]: 1512580152000,
    [valuesNames.SOURCE]: 'ethercis',
    [valuesNames.SOURCE_ID]: '9e06d22b-3f60-4bc6-bb6e-1b42bff75ed2',
  },
};

const DIAGNOSES_PANEL = 'diagnosesPanel';
const CONVERT_DATE_CREATED = getDDMMMYYYY(propsForDiagnosisPanel.detail[valuesNames.DATE_CREATED]);
const CONVERT_DATE_OF_ONSET = getDDMMMYYYY(propsForDiagnosisPanel.detail[valuesNames.DATE_OF_ONSET]);

describe('Component <ProblemsDiagnosisDetail />', () => {
  it('should renders with props correctly', () => {
    const component = shallow(<ProblemsDiagnosisDetail />);

    // Testing component when detail filled object, expandedPanel is all, and panel not edited
    component.setProps({ detail: propsForDiagnosisPanel.detail, expandedPanel: 'all', editedPanel: { [DIAGNOSES_PANEL]: false } });
    expect(component.props().className).toEqual('section-detail');
    expect(component.find('PluginDetailPanel')).toHaveLength(1);

    // Testing diagnosesPanel
    expect(component.find('PluginDetailPanel').at(0).props().name).toEqual(DIAGNOSES_PANEL);
    expect(component.find('PluginDetailPanel').at(0).props().title).toEqual('Problem / Diagnosis');
    expect(component.find('PluginDetailPanel').at(0).props().isOpen).toEqual(false);
    expect(component.find('PluginDetailPanel').at(0).props().editedPanel).toEqual({diagnosesPanel: false});
    expect(component.find('PluginDetailPanel').at(0).props().isBtnShowPanel).toEqual(false);
    expect(component.find('PluginDetailPanel').at(0).props().isShowControlPanel).toEqual(true);

    expect(component.find('.control-label').at(0).text()).toEqual(valuesLabels.PROBLEM);
    expect(component.find('.control-label').at(1).text()).toEqual(valuesLabels.DATE_OF_ONSET);
    expect(component.find('.control-label').at(2).text()).toEqual(valuesLabels.DESCRIPTION);
    expect(component.find('.control-label').at(3).text()).toEqual(valuesLabels.TERMINOLOGY);
    expect(component.find('.control-label').at(4).text()).toEqual(valuesLabels.CODE);
    expect(component.find('.control-label').at(5).text()).toEqual(valuesLabels.AUTHOR);
    expect(component.find('.control-label').at(6).text()).toEqual(valuesLabels.DATE);
    expect(component.find('.control-label').at(7).text()).toEqual(valuesLabels.SOURCE);

    expect(component.find('.form-control-static').at(0).text()).toEqual(propsForDiagnosisPanel.detail[valuesNames.PROBLEM]);
    expect(component.find('.form-control-static').at(1).text()).toEqual(CONVERT_DATE_OF_ONSET);
    expect(component.find('.form-control-static').at(2).text()).toEqual(propsForDiagnosisPanel.detail[valuesNames.DESCRIPTION]);
    expect(component.find('.form-control-static').at(3).text()).toEqual(propsForDiagnosisPanel.detail[valuesNames.TERMINOLOGY]);
    expect(component.find('.form-control-static').at(4).text()).toEqual(propsForDiagnosisPanel.detail[valuesNames.CODE]);
    expect(component.find('.form-control-static').at(5).text()).toEqual(propsForDiagnosisPanel.detail[valuesNames.AUTHOR]);
    expect(component.find('.form-control-static').at(6).text()).toEqual(CONVERT_DATE_CREATED);
    expect(component.find('.form-control-static').at(7).text()).toEqual(propsForDiagnosisPanel.detail[valuesNames.SOURCE]);

    expect(component).toMatchSnapshot();

    component.setProps({ detail: { [valuesNames.IS_IMPORT]: true } });
    expect(component.find('.form-control-static').at(5).text()).toEqual('');
    expect(component.find('.control-label').at(5).text()).toEqual(valuesLabels.ORIGINAL_SOURCE);
    expect(component.find('.control-label').at(6).text()).toEqual(valuesLabels.IS_IMPORT);
    expect(component.find('Switch')).toHaveLength(1);
  });

  it('should renders correctly with different state of props', () => {
    const component = shallow(
      <ProblemsDiagnosisDetail />);
    // Testing component when detail empty object, expandedPanel is diagnosesPanel
    component.setProps({ detail: { [valuesNames.DATE_CREATED]: 1507020019000, [valuesNames.DATE_OF_ONSET]: 1511568000000 }, expandedPanel: DIAGNOSES_PANEL, editedPanel: { [DIAGNOSES_PANEL]: false } });
    expect(component.find('PluginDetailPanel')).toHaveLength(1);
    expect(component.find('PluginDetailPanel').props().name).toEqual(DIAGNOSES_PANEL);
    expect(component).toMatchSnapshot();

    // Testing component when detail filled object, expandedPanel is all, and panel is edited
    component.setProps({ detail: propsForDiagnosisPanel.detail, expandedPanel: DIAGNOSES_PANEL, editedPanel: { [DIAGNOSES_PANEL]: true } });
    expect(component.find('ReduxForm')).toHaveLength(1);
    expect(component.find('PluginDetailPanel').props().name).toEqual(DIAGNOSES_PANEL);
    expect(component).toMatchSnapshot();
  });
});

