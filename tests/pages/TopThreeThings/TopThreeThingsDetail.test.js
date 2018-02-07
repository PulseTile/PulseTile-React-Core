import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

import TopThreeThingsDetail from '../../../src/components/pages/TopThreeThings/TopThreeThingsDetail/TopThreeThingsDetail';
import { valuesNames, valuesLabels } from '../../../src/components/pages/TopThreeThings/forms.config';
import { getDDMMMYYYY } from '../../../src/utils/time-helpers.utils';

Enzyme.configure({ adapter: new Adapter() });

const TOP_THREE_THINGS_PANEL = 'topThreeThingsPanel';
const TOP_THREE_THINGS_DETAIL_TITLE = 'Top 3 Thing';
const TOP_THREE_THINGS_DETAIL_EDIT_TITLE = 'Edit Top 3 Thing';

const testProps = {
  onExpand: () => {},
  onEdit: () => {},
  onCancel: () => {},
  onSaveSettings: () => {},
  openedPanel: {},
  expandedPanel: 'all',
  currentPanel: 'currentPanel',
  editedPanel: 'editedPanel',
  topThreeThingFormValues: {},
};

const detail = {
  [valuesNames.SOURCE]: 'QEWDDB',
  [valuesNames.SOURCE_ID]: '26566e17-0ede-4818-8453-728ea0aa142c',
  [valuesNames.DATE_CREATED]: 1517475061744,
  [valuesNames.NAME1]: 'Item 2',
  [valuesNames.DESCRIPTION1]: 'My first problem',
  [valuesNames.NAME2]: 'Item 2',
  [valuesNames.DESCRIPTION2]: 'My second problem',
  [valuesNames.NAME3]: 'Item 2',
  [valuesNames.DESCRIPTION3]: '1',
};

const CONVERT_DATE_CREATED = getDDMMMYYYY(detail[valuesNames.DATE_CREATED]);

describe('Component <TopThreeThingsDetail />', () => {
  it('should renders with all props correctly', () => {
    const component = shallow(
      <TopThreeThingsDetail
        detail={detail}
        onExpand={testProps.onExpand}
        onEdit={testProps.onEdit}
        onCancel={testProps.onCancel}
        onSaveSettings={testProps.onSaveSettings}
        openedPanel={testProps.openedPanel}
        expandedPanel={testProps.expandedPanel}
        currentPanel={testProps.currentPanel}
        editedPanel={testProps.editedPanel}
        topThreeThingFormValues={testProps.topThreeThingFormValues}
        isSubmit={false}
      />
    );

    expect(component).toMatchSnapshot();

    // Testing component when detail filled object, expandedPanel is all, and panel not edited
    expect(component.instance().props.detail).toEqual(detail);
    expect(component.instance().props.onExpand).toEqual(testProps.onExpand);
    expect(component.instance().props.onEdit).toEqual(testProps.onEdit);
    expect(component.instance().props.onCancel).toEqual(testProps.onCancel);
    expect(component.instance().props.onSaveSettings).toEqual(testProps.onSaveSettings);
    expect(component.instance().props.openedPanel).toEqual(testProps.openedPanel);
    expect(component.instance().props.expandedPanel).toEqual(testProps.expandedPanel);
    expect(component.instance().props.currentPanel).toEqual(testProps.currentPanel);
    expect(component.instance().props.editedPanel).toEqual(testProps.editedPanel);
    expect(component.instance().props.topThreeThingFormValues).toEqual(testProps.topThreeThingFormValues);
    expect(component.instance().props.isSubmit).toEqual(false);

    expect(component.find('.section-detail')).toHaveLength(1);
    expect(component.find('.form')).toHaveLength(1);
    expect(component.find('PluginDetailPanel')).toHaveLength(1);
    expect(component.find('FormSectionList')).toHaveLength(3);
    expect(component.find('FormSectionList')).toHaveLength(3);
    expect(component.find('FormSection')).toHaveLength(3);

    expect(component.find('PluginDetailPanel').props().currentPanel).toEqual(testProps.currentPanel);
    expect(component.find('PluginDetailPanel').props().editedPanel).toEqual(testProps.editedPanel);
    expect(component.find('PluginDetailPanel').props().isBtnShowPanel).toEqual(false);
    expect(component.find('PluginDetailPanel').props().isOpen).toEqual(testProps.editedPanel === TOP_THREE_THINGS_PANEL);
    expect(component.find('PluginDetailPanel').props().name).toEqual(TOP_THREE_THINGS_PANEL);
    expect(component.find('PluginDetailPanel').props().onCancel).toEqual(testProps.onCancel);
    expect(component.find('PluginDetailPanel').props().onEdit).toEqual(testProps.onEdit);
    expect(component.find('PluginDetailPanel').props().onExpand).toEqual(testProps.onExpand);
    expect(component.find('PluginDetailPanel').props().onSaveSettings).toEqual(testProps.onSaveSettings);
    expect(component.find('PluginDetailPanel').props().title).toEqual(TOP_THREE_THINGS_DETAIL_TITLE);


    expect(component.find('.control-label').at(0).text()).toEqual(valuesLabels.NAME);
    expect(component.find('.control-label').at(1).text()).toEqual(valuesLabels.DESCRIPTION);
    expect(component.find('.control-label').at(2).text()).toEqual(valuesLabels.NAME);
    expect(component.find('.control-label').at(3).text()).toEqual(valuesLabels.DESCRIPTION);
    expect(component.find('.control-label').at(4).text()).toEqual(valuesLabels.NAME);
    expect(component.find('.control-label').at(5).text()).toEqual(valuesLabels.DESCRIPTION);
    expect(component.find('.control-label').at(6).text()).toEqual(valuesLabels.DATE);
    expect(component.find('.control-label').at(7).text()).toEqual(valuesLabels.SOURCE);

    expect(component.find('.form-control-static').at(0).text()).toEqual(detail[valuesNames.NAME1]);
    expect(component.find('.form-control-static').at(1).text()).toEqual(detail[valuesNames.DESCRIPTION1]);
    expect(component.find('.form-control-static').at(2).text()).toEqual(detail[valuesNames.NAME2]);
    expect(component.find('.form-control-static').at(3).text()).toEqual(detail[valuesNames.DESCRIPTION2]);
    expect(component.find('.form-control-static').at(4).text()).toEqual(detail[valuesNames.NAME3]);
    expect(component.find('.form-control-static').at(5).text()).toEqual(detail[valuesNames.DESCRIPTION3]);
    expect(component.find('.form-control-static').at(6).text()).toEqual(CONVERT_DATE_CREATED);
    expect(component.find('.form-control-static').at(7).text()).toEqual(detail[valuesNames.SOURCE]);
  });

  it('should renders correctly with different state of props', () => {
    const component = shallow(
      <TopThreeThingsDetail
        expandedPanel={'all'}
        editedPanel={{ [TOP_THREE_THINGS_PANEL]: true }}
        openedPanel={{ [TOP_THREE_THINGS_PANEL]: true }}
      />
    );
    expect(component).toMatchSnapshot();

    // Testing component when detail filled object, expandedPanel is all, and panel is edited
    component.setProps({ detail });
    expect(component).toMatchSnapshot();

    expect(component.find('PluginDetailPanel')).toHaveLength(1);
    expect(component.find('ReduxForm')).toHaveLength(1);
    expect(component.find('PluginDetailPanel').props().title).toEqual(TOP_THREE_THINGS_DETAIL_EDIT_TITLE);
  });
});

