import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

import TestResultsDetail from '../../../src/components/pages/TestResults/TestResultsDetail/TestResultsDetail';
import { valuesNames, valuesLabels } from '../../../src/components/pages/TestResults/forms.config';
import { getDDMMMYYYY } from '../../../src/utils/time-helpers.utils';

Enzyme.configure({ adapter: new Adapter() });

const TEST_RESULTS_PANEL = 'testResultPanel';
const META_PANEL = 'metaPanel';
const TEST_RESULTS_DETAIL_TITLE = 'Test Result';

const testProps = {
  onExpand: () => {},
  onShow: () => {},
  onEdit: () => {},
  onCancel: () => {},
  onSaveSettings: () => {},
  openedPanel: {},
  expandedPanel: 'all',
  currentPanel: 'currentPanel',
  editedPanel: {},
  testResultsDetailFormValues: {},
};

const detail = {
  [valuesNames.AUTHOR]: 'Dr Lab',
  [valuesNames.CONCLUSION]: 'abnormal result indicating infection',
  [valuesNames.DATE]: 1439935862518,
  [valuesNames.TAKEN]: 1440454262518,
  [valuesNames.SOURCE]: 'marand',
  [valuesNames.SOURCE_ID]: 'f6763678-71dc-49c8-b6d1-88a5871a10a6',
  [valuesNames.STATUS]: 'Final',
  [valuesNames.NAME]: 'complete blood count',
  [valuesNames.TR]: [{
    [valuesNames.TR_COMMENT]: 'indicates infection',
    [valuesNames.TR_NORMAL]: ' - ',
    [valuesNames.TR_RESULT]: 'white blood cell count',
    [valuesNames.TR_UNIT]: '10*9/l',
    [valuesNames.TR_VALUE]: '13.6',
  }, {
    [valuesNames.TR_COMMENT]: '',
    [valuesNames.TR_NORMAL]: ' - ',
    [valuesNames.TR_RESULT]: 'platelet count',
    [valuesNames.TR_UNIT]: '10*9/l',
    [valuesNames.TR_VALUE]: '587',
  }, {
    [valuesNames.TR_COMMENT]: '',
    [valuesNames.TR_NORMAL]: ' - ',
    [valuesNames.TR_RESULT]: 'platelet count',
    [valuesNames.TR_UNIT]: '10*9/l',
    [valuesNames.TR_VALUE]: '587',
  }],
};

const CONVERT_TAKEN = getDDMMMYYYY(detail[valuesNames.TAKEN]);
const CONVERT_DATE = getDDMMMYYYY(detail[valuesNames.DATE]);

describe('Component <TestResultsDetail />', () => {
  it('should renders with all props correctly', () => {
    const component = shallow(
      <TestResultsDetail
        detail={detail}
        onExpand={testProps.onExpand}
        onShow={testProps.onShow}
        onEdit={testProps.onEdit}
        onCancel={testProps.onCancel}
        onSaveSettings={testProps.onSaveSettings}
        openedPanel={testProps.openedPanel}
        expandedPanel={testProps.expandedPanel}
        currentPanel={testProps.currentPanel}
        editedPanel={testProps.editedPanel}
        testResultsDetailFormValues={testProps.testResultsDetailFormValues}
        isSubmit={false}
      />
    );


    expect(component).toMatchSnapshot();

    // Testing component when detail filled object, expandedPanel is all, and panel not edited
    expect(component.instance().props.detail).toEqual(detail);
    expect(component.instance().props.onExpand).toEqual(testProps.onExpand);
    expect(component.instance().props.onShow).toEqual(testProps.onShow);
    expect(component.instance().props.onEdit).toEqual(testProps.onEdit);
    expect(component.instance().props.onCancel).toEqual(testProps.onCancel);
    expect(component.instance().props.onSaveSettings).toEqual(testProps.onSaveSettings);
    expect(component.instance().props.openedPanel).toEqual(testProps.openedPanel);
    expect(component.instance().props.expandedPanel).toEqual(testProps.expandedPanel);
    expect(component.instance().props.currentPanel).toEqual(testProps.currentPanel);
    expect(component.instance().props.editedPanel).toEqual(testProps.editedPanel);
    expect(component.instance().props.testResultsDetailFormValues).toEqual(testProps.testResultsDetailFormValues);
    expect(component.instance().props.isSubmit).toEqual(false);

    expect(component.find('.section-detail')).toHaveLength(1);
    expect(component.find('.form')).toHaveLength(4);
    expect(component.find('PluginDetailPanel')).toHaveLength(2);
    expect(component.find('PluginDetailPanel').at(0).find('.form')).toHaveLength(1);
    expect(component.find('PluginDetailPanel').at(1).find('.form')).toHaveLength(3);

    expect(component.find('PluginDetailPanel').at(0).props().currentPanel).toEqual(testProps.currentPanel);
    expect(component.find('PluginDetailPanel').at(0).props().editedPanel).toEqual(testProps.editedPanel);
    expect(component.find('PluginDetailPanel').at(0).props().isBtnShowPanel).toEqual(true);
    expect(component.find('PluginDetailPanel').at(0).props().isOpen).toEqual(testProps.editedPanel === TEST_RESULTS_PANEL);
    expect(component.find('PluginDetailPanel').at(0).props().name).toEqual(TEST_RESULTS_PANEL);
    expect(component.find('PluginDetailPanel').at(0).props().onCancel).toEqual(testProps.onCancel);
    expect(component.find('PluginDetailPanel').at(0).props().onEdit).toEqual(testProps.onEdit);
    expect(component.find('PluginDetailPanel').at(0).props().onExpand).toEqual(testProps.onExpand);
    expect(component.find('PluginDetailPanel').at(0).props().onShow).toEqual(testProps.onShow);
    expect(component.find('PluginDetailPanel').at(0).props().onSaveSettings).toEqual(testProps.onSaveSettings);
    expect(component.find('PluginDetailPanel').at(0).props().title).toEqual(TEST_RESULTS_DETAIL_TITLE);

    expect(component.find('.control-label').at(0).text()).toEqual(valuesLabels.NAME);
    expect(component.find('.control-label').at(1).text()).toEqual(valuesLabels.STATUS);
    expect(component.find('.control-label').at(2).text()).toEqual(valuesLabels.TAKEN);
    expect(component.find('.control-label').at(3).text()).toEqual(valuesLabels.CONCLUSION);
    expect(component.find('.control-label').at(4).text()).toEqual(valuesLabels.AUTHOR);
    expect(component.find('.control-label').at(5).text()).toEqual(valuesLabels.DATE);
    expect(component.find('.control-label').at(6).text()).toEqual(valuesLabels.SOURCE);

    expect(component.find('.form-control-static').at(0).text()).toEqual(detail[valuesNames.NAME]);
    expect(component.find('.form-control-static').at(1).text()).toEqual(detail[valuesNames.STATUS]);
    expect(component.find('.form-control-static').at(2).text()).toEqual(CONVERT_TAKEN);
    expect(component.find('.form-control-static').at(3).text()).toEqual(detail[valuesNames.CONCLUSION]);
    expect(component.find('.form-control-static').at(4).text()).toEqual(detail[valuesNames.AUTHOR]);
    expect(component.find('.form-control-static').at(5).text()).toEqual(CONVERT_DATE);
    expect(component.find('.form-control-static').at(6).text()).toEqual(detail[valuesNames.SOURCE]);


    expect(component.find('PluginDetailPanel').at(1).props().title).toEqual(`Results (${detail[valuesNames.TR].length})`);
    expect(component.find('PluginDetailPanel').at(1).find('.panel-expand-row')).toHaveLength(2);
    expect(component.find('PluginDetailPanel').at(1).find('.panel-expand-item')).toHaveLength(3);

    expect(component.find('PluginDetailPanel').at(1).find('.panel-expand-item').at(0)
      .find('.form-group')).toHaveLength(5);
    expect(component.find('PluginDetailPanel').at(1).find('.panel-expand-item').at(1)
      .find('.form-group')).toHaveLength(4);
    expect(component.find('PluginDetailPanel').at(1).find('.panel-expand-item').at(2)
      .find('.form-group')).toHaveLength(4);
  });

  it('should renders correctly with different state of props', () => {
    detail[valuesNames.TR] = [];

    const component = shallow(
      <TestResultsDetail
        detail={detail}
        editedPanel={testProps.editedPanel}
        expandedPanel={testProps.expandedPanel}
        openedPanel={{ [META_PANEL]: true }}
        onExpand={testProps.onExpand}
        onShow={testProps.onShow}
      />
    );
    expect(component).toMatchSnapshot();
    expect(component.find('PluginDetailPanel').at(1).props().title).toEqual('Results (0)');

    component.setProps({ expandedPanel: META_PANEL });
    expect(component.find('PluginDetailPanel')).toHaveLength(1);
    expect(component).toMatchSnapshot();

    component.setProps({ expandedPanel: TEST_RESULTS_PANEL });
    expect(component.find('PluginDetailPanel')).toHaveLength(1);
    expect(component).toMatchSnapshot();

    component.setProps({ detail: null });
  });
});

