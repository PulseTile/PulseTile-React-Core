import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

import ProceduresDetail from '../../../src/components/pages/Procedures/ProceduresDetail/ProceduresDetail';
import { valuesNames, valuesLabels } from '../../../src/components/pages/Procedures/forms.config';
import { getDDMMMYYYY } from '../../../src/utils/time-helpers.utils';

Enzyme.configure({ adapter: new Adapter() });

const propsForProcedurePanel = {
  detail: {
    [valuesNames.NAME]: '123b',
    [valuesNames.PROCEDURE_NAME]: '123b',
    [valuesNames.CODE]: 'at0039',
    [valuesNames.DATE_OF_PROCEDURE]: 1510579904000,
    [valuesNames.TIME]: 48704000,
    [valuesNames.TERMINOLOGY]: 'SNOMED-CT',
    [valuesNames.NOTES]: '123b',
    [valuesNames.PERFORMER]: 'Performer',
    [valuesNames.STATUS]: 'completed',
    [valuesNames.AUTHOR]: 'bob.smith@gmail.com',
    [valuesNames.DATE]: 1510659104000,
    [valuesNames.SOURCE]: 'ethercis',
    [valuesNames.SOURCE_ID]: '08102813-e8d0-4f45-aa95-ac0d633e69fd',
    [valuesNames.ORIGINAL_COMPOSITION]: '',
    [valuesNames.ORIGINAL_SOURCE]: '',
  },
};

const PROCEDURE_PANEL = 'procedurePanel';
const META_PANEL = 'metaPanel';
const CONVERT_DATE = getDDMMMYYYY(propsForProcedurePanel.detail[valuesNames.DATE]);
const CONVERT_DATE_OF_PROCEDURE = getDDMMMYYYY(propsForProcedurePanel.detail[valuesNames.DATE_OF_PROCEDURE]);

describe('Component <ProceduresDetail />', () => {
	it('should renders with props correctly', () => {
		const component = shallow(<ProceduresDetail />);

		// Testing component when detail filled object, expandedPanel is all, and panel not edited
		component.setProps({ detail: propsForProcedurePanel.detail, expandedPanel: 'all', editedPanel: { [PROCEDURE_PANEL]: false } });
		expect(component.props().className).toEqual('section-detail');
		expect(component.find('PluginDetailPanel')).toHaveLength(2);

		// Testing procedurePanel
		expect(component.find('PluginDetailPanel').at(0).props().name).toEqual(PROCEDURE_PANEL);
		expect(component.find('PluginDetailPanel').at(0).props().title).toEqual('Procedure');
		expect(component.find('PluginDetailPanel').at(0).props().isOpen).toEqual(false);
		expect(component.find('PluginDetailPanel').at(0).props().isBtnShowPanel).toEqual(true);
		expect(component.find('PluginDetailPanel').at(0).props().isShowControlPanel).toEqual(true);

		expect(component.find('.control-label').at(0).text()).toEqual(valuesLabels.PROCEDURE_NAME);
		expect(component.find('.control-label').at(1).text()).toEqual(valuesLabels.DATE_OF_PROCEDURE);
		expect(component.find('.control-label').at(2).text()).toEqual(valuesLabels.PERFORMER);
		expect(component.find('.control-label').at(3).text()).toEqual(valuesLabels.NOTES);
		expect(component.find('.control-label').at(4).text()).toEqual(valuesLabels.AUTHOR);
		expect(component.find('.control-label').at(5).text()).toEqual(valuesLabels.DATE);
		expect(component.find('.control-label').at(6).text()).toEqual(valuesLabels.SOURCE);

		expect(component.find('.form-control-static').at(0).text()).toEqual(propsForProcedurePanel.detail[valuesNames.PROCEDURE_NAME]);
		expect(component.find('.form-control-static').at(1).text()).toEqual(CONVERT_DATE_OF_PROCEDURE);
		expect(component.find('.form-control-static').at(2).text()).toEqual(propsForProcedurePanel.detail[valuesNames.PERFORMER]);
		expect(component.find('.form-control-static').at(3).text()).toEqual(propsForProcedurePanel.detail[valuesNames.NOTES]);
		expect(component.find('.form-control-static').at(4).text()).toEqual(propsForProcedurePanel.detail[valuesNames.AUTHOR]);
		expect(component.find('.form-control-static').at(5).text()).toEqual(CONVERT_DATE);
		expect(component.find('.form-control-static').at(6).text()).toEqual(propsForProcedurePanel.detail[valuesNames.SOURCE]);

		// Testing metaPanel
		expect(component.find('PluginDetailPanel').at(1).props().name).toEqual(META_PANEL);
		expect(component.find('PluginDetailPanel').at(1).props().title).toEqual('Metadata');
		expect(component.find('PluginDetailPanel').at(1).props().isOpen).toEqual(false);
		expect(component.find('PluginDetailPanel').at(1).props().isBtnShowPanel).toEqual(true);
		expect(component.find('PluginDetailPanel').at(1).props().isShowControlPanel).toEqual(false);

		expect(component.find('.control-label').at(7).text()).toEqual(valuesLabels.TERMINOLOGY);
		expect(component.find('.control-label').at(8).text()).toEqual(valuesLabels.CODE);

		expect(component.find('.form-control-static').at(7).text()).toEqual(propsForProcedurePanel.detail[valuesNames.TERMINOLOGY]);
		expect(component.find('.form-control-static').at(8).text()).toEqual(propsForProcedurePanel.detail[valuesNames.CODE]);
		expect(component).toMatchSnapshot();
	});

	it('should renders correctly with different state of props', () => {
		const component = shallow(
      <ProceduresDetail />);
    // Testing component when detail empty object, expandedPanel is procedurePanel
    component.setProps({ detail: { [valuesNames.DATE]: 1507020019000, [valuesNames.DATE_OF_PROCEDURE]: 1511568000000 }, expandedPanel: PROCEDURE_PANEL, editedPanel: { [PROCEDURE_PANEL]: false } });
    expect(component.find('PluginDetailPanel')).toHaveLength(1);
    expect(component.find('PluginDetailPanel').props().name).toEqual(PROCEDURE_PANEL);
    expect(component).toMatchSnapshot();

    // Testing component when detail empty object, expandedPanel is metaPanel
    component.setProps({ detail: {}, expandedPanel: META_PANEL });
    expect(component.find('PluginDetailPanel')).toHaveLength(1);
    expect(component.find('PluginDetailPanel').props().name).toEqual(META_PANEL);
    expect(component).toMatchSnapshot();

    // Testing component when detail filled object, expandedPanel is all, and panel is edited
    component.setProps({ detail: propsForProcedurePanel.detail, expandedPanel: PROCEDURE_PANEL, editedPanel: { [PROCEDURE_PANEL]: true } });
    expect(component.find('ReduxForm')).toHaveLength(1);
    expect(component.find('PluginDetailPanel').props().name).toEqual(PROCEDURE_PANEL);
    expect(component).toMatchSnapshot();
  });
});

