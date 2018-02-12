import React from 'react';
import Enzyme, { shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

import PersonalNotesDetail from '../PersonalNotesDetail/PersonalNotesDetail';
import { valuesNames, valuesLabels } from '../forms.config';
import {getDDMMMYYYY} from "../../../../utils/time-helpers.utils";

Enzyme.configure({ adapter: new Adapter() });

const PERSONAL_NOTES_PANEL = 'personalNotesPanel';
const PERSONAL_NOTES_DETAIL_TITLE = 'Personal Note';
const PERSONAL_NOTES_DETAIL_EDIT_TITLE = 'Edit Personal Note';

const testProps = {
  onExpand: () => {},
  onEdit: () => {},
  onCancel: () => {},
  onSaveSettings: () => {},
  openedPanel: {},
  expandedPanel: 'all',
  currentPanel: 'currentPanel',
  editedPanel: 'editedPanel',
  personalNoteFormValues: {},
};

const detail = {
  [valuesNames.TYPE]: 'TYPE',
  [valuesNames.NOTES]: 'NOTES',
  [valuesNames.AUTHOR]: 'AUTHOR@gmail.com',
  [valuesNames.DATE]: 1511956864000,
  [valuesNames.SOURCE]: 'ethercis',
  [valuesNames.SOURCE_ID]: '3739c4ab-f568-44a6-bf35-e83fc4e65b1b',
};

const CONVERT_DATE = getDDMMMYYYY(detail[valuesNames.DATE]);

describe('Component <PersonalNotesDetail />', () => {
  it('should renders with all props correctly', () => {
    const component = shallow(
      <PersonalNotesDetail
        detail={detail}
        onExpand={testProps.onExpand}
        onEdit={testProps.onEdit}
        onCancel={testProps.onCancel}
        onSaveSettings={testProps.onSaveSettings}
        openedPanel={testProps.openedPanel}
        expandedPanel={testProps.expandedPanel}
        currentPanel={testProps.currentPanel}
        editedPanel={testProps.editedPanel}
        personalNoteFormValues={testProps.personalNoteFormValues}
        isSubmit={false}
      />
    );

    expect(component).toMatchSnapshot();

    // Testing component when detail filled object, expandedPanel is all, and panel not edited
    expect(component.instance().props['detail']).toEqual(detail);
    expect(component.instance().props['onExpand']).toEqual(testProps.onExpand);
    expect(component.instance().props['onEdit']).toEqual(testProps.onEdit);
    expect(component.instance().props['onCancel']).toEqual(testProps.onCancel);
    expect(component.instance().props['onSaveSettings']).toEqual(testProps.onSaveSettings);
    expect(component.instance().props['openedPanel']).toEqual(testProps.openedPanel);
    expect(component.instance().props['expandedPanel']).toEqual(testProps.expandedPanel);
    expect(component.instance().props['currentPanel']).toEqual(testProps.currentPanel);
    expect(component.instance().props['editedPanel']).toEqual(testProps.editedPanel);
    expect(component.instance().props['personalNoteFormValues']).toEqual(testProps.personalNoteFormValues);
    expect(component.instance().props['isSubmit']).toEqual(false);

    expect(component.find('.section-detail')).toHaveLength(1);
    expect(component.find('.form')).toHaveLength(1);
    expect(component.find('PluginDetailPanel')).toHaveLength(1);

    expect(component.find('PluginDetailPanel').props().currentPanel).toEqual(testProps.currentPanel);
    expect(component.find('PluginDetailPanel').props().editedPanel).toEqual(testProps.editedPanel);
    expect(component.find('PluginDetailPanel').props().isBtnShowPanel).toEqual(false);
    expect(component.find('PluginDetailPanel').props().isOpen).toEqual(testProps.editedPanel === PERSONAL_NOTES_PANEL);
    expect(component.find('PluginDetailPanel').props().name).toEqual(PERSONAL_NOTES_PANEL);
    expect(component.find('PluginDetailPanel').props().onCancel).toEqual(testProps.onCancel);
    expect(component.find('PluginDetailPanel').props().onEdit).toEqual(testProps.onEdit);
    expect(component.find('PluginDetailPanel').props().onExpand).toEqual(testProps.onExpand);
    expect(component.find('PluginDetailPanel').props().onSaveSettings).toEqual(testProps.onSaveSettings);
    expect(component.find('PluginDetailPanel').props().title).toEqual(PERSONAL_NOTES_DETAIL_TITLE);


    expect(component.find('.control-label').at(0).text()).toEqual(valuesLabels.TYPE);
    expect(component.find('.control-label').at(1).text()).toEqual(valuesLabels.NOTES);
    expect(component.find('.control-label').at(2).text()).toEqual(valuesLabels.AUTHOR);
    expect(component.find('.control-label').at(3).text()).toEqual(valuesLabels.DATE);
    expect(component.find('.control-label').at(4).text()).toEqual(valuesLabels.SOURCE);

    expect(component.find('.form-control-static').at(0).text()).toEqual(detail[valuesNames.TYPE]);
    expect(component.find('.form-control-static').at(1).text()).toEqual(detail[valuesNames.NOTES]);
    expect(component.find('.form-control-static').at(2).text()).toEqual(detail[valuesNames.AUTHOR]);
    expect(component.find('.form-control-static').at(3).text()).toEqual(CONVERT_DATE);
    expect(component.find('.form-control-static').at(4).text()).toEqual(detail[valuesNames.SOURCE]);
  });

  it('should renders correctly with different state of props', () => {
    const component = shallow(
      <PersonalNotesDetail
        expandedPanel={'all'}
        editedPanel={{ [PERSONAL_NOTES_PANEL]: true }}
        openedPanel={{ [PERSONAL_NOTES_PANEL]: true }}
      />
    );
    expect(component).toMatchSnapshot();

    // Testing component when detail filled object, expandedPanel is all, and panel is edited
    component.setProps({ detail: detail });
    expect(component).toMatchSnapshot();

    expect(component.find('PluginDetailPanel')).toHaveLength(1);
    expect(component.find('ReduxForm')).toHaveLength(1);
    expect(component.find('PluginDetailPanel').props().title).toEqual(PERSONAL_NOTES_DETAIL_EDIT_TITLE);
  });
});

