import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

import ClinicalStatementsDetail from '../ClinicalStatementsDetail/ClinicalStatementsDetail';
import { valuesNames, valuesLabels } from '../forms.config';
import { getDDMMMYYYY } from '../../../../utils/time-helpers.utils';

Enzyme.configure({ adapter: new Adapter() });

const testProps = {
  detail: {
    [valuesNames.TAGS]: { chestpain: true, shouder: true },
    [valuesNames.STATEMENT]: '<span class="tag" data-tag-id="1519236197404" data-id="7" data-phrase="The pain was mild at |?| in severity" contenteditable="false">The pain was mild at <span class="editable editable-click editable-unsaved editable-empty editable-open" contenteditable="false" data-arr-subject="The pain was mild at " editable-text="" data-arr-unit="?" data-arr-value=" in severity" data-original-title="" title="" style="background-color: rgba(0, 0, 0, 0);" aria-describedby="popover368681">Empty</span><div class="popover editable-container editable-popup fade top in" role="tooltip" id="popover368681" style="top: -74px; left: 12.6719px; display: block;"><div class="arrow" style="left: 50%;"></div><h3 class="popover-title">Edit Text</h3><div class="popover-content"> <div><div class="editableform-loading" style="display: none;"></div><form class="form-inline editableform" style=""><div class="control-group form-group"><div><div class="editable-input" style="position: relative;"><input type="text" class="form-control input-sm" style="padding-right: 24px;"><span class="editable-clear-x" style=""></span></div><div class="editable-buttons"><button type="submit" class="btn btn-primary btn-sm editable-submit"><i class="glyphicon glyphicon-ok"></i></button><button type="button" class="btn btn-default btn-sm editable-cancel"><i class="glyphicon glyphicon-remove"></i></button></div></div><div class="editable-error-block help-block" style="display: none;"></div></div></form></div></div></div> in severity. <a class="remove" contenteditable="false"><i class="fa fa-close" contenteditable="false"></i></a></span> <span id="temp" contenteditable="false"></span>',
    [valuesNames.TYPE]: 'Test name',
    [valuesNames.AUTHOR]: 'bob.smith@gmail.com',
    [valuesNames.DATE_CREATED]: 1519236225009,
    [valuesNames.SOURCE]: 'qewdDB',
    [valuesNames.SOURCE_ID]: 'd9acb27f-6688-4515-ab0a-5db636f36f05',
  },
};

const CLINICAL_STATEMENT_PANEL = 'clinicalStatementPanel';
const CONVERT_DATE = getDDMMMYYYY(testProps.detail[valuesNames.DATE_CREATED]);

describe('Component <ClinicalStatementsDetail />', () => {
  it('should renders with props correctly', () => {
    const component = shallow(<ClinicalStatementsDetail />);

    // Testing component when detail filled object, expandedPanel is all, and panel not edited
    component.setProps({ detail: testProps.detail, expandedPanel: 'all', editedPanel: { [CLINICAL_STATEMENT_PANEL]: false } });
    expect(component.props().className).toEqual('section-detail');
    expect(component.find('PluginDetailPanel')).toHaveLength(1);

    // Testing clinicalStatementsPanel
    expect(component.find('PluginDetailPanel').at(0).props().name).toEqual(CLINICAL_STATEMENT_PANEL);
    expect(component.find('PluginDetailPanel').at(0).props().title).toEqual('Clinical Statement');
    expect(component.find('PluginDetailPanel').at(0).props().isOpen).toEqual(false);
    expect(component.find('PluginDetailPanel').at(0).props().isBtnShowPanel).toEqual(false);
    expect(component.find('PluginDetailPanel').at(0).props().isShowControlPanel).toEqual(false);

    expect(component.find('.control-label').at(0).text()).toEqual(valuesLabels.TYPE);
    expect(component.find('.control-label').at(1).text()).toEqual(valuesLabels.STATEMENT);
    expect(component.find('.control-label').at(2).text()).toEqual(valuesLabels.TAGS);
    expect(component.find('.control-label').at(3).text()).toEqual(valuesLabels.DATE);
    expect(component.find('.control-label').at(4).text()).toEqual(valuesLabels.AUTHOR);

    const formGroups = component.find('.form-group');
    expect(formGroups).toHaveLength(6);
    expect(formGroups.at(0).find('.form-control-static').text()).toEqual(testProps.detail[valuesNames.TYPE]);
    expect(formGroups.at(1).find('.form-control-static').html()).toEqual(`<div class="form-control-static">${testProps.detail[valuesNames.STATEMENT]}</div>`);
    const formControlStatic3 = formGroups.at(2).find('.form-control-static');
    expect(formControlStatic3.find('TagList')).toHaveLength(1);
    expect(formControlStatic3.find('Tag')).toHaveLength(2);
    expect(formGroups.at(3).find('.form-control-static').text()).toEqual(CONVERT_DATE);
    expect(formGroups.at(4).find('.form-control-static').text()).toEqual(testProps.detail[valuesNames.AUTHOR]);
    expect(formGroups.at(5).find('.form-control-static').text()).toEqual(testProps.detail[valuesNames.SOURCE]);

    expect(component).toMatchSnapshot();
  });
});

