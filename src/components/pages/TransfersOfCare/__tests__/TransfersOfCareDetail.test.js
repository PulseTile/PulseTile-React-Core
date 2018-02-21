import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

import TransfersOfCareDetail from '../TransfersOfCareDetail/TransfersOfCareDetail';
import { valuesNames, valuesLabels } from '../forms.config';
// import { getDDMMMYYYY } from '../../../../utils/time-helpers.utils';

Enzyme.configure({ adapter: new Adapter() });

Date.now = jest.fn(() => new Date(Date.UTC(2018, 1, 1, 1)).valueOf())

const propsForTransfersOfCarePanel = {
  detail: {
    [valuesNames.CLINICAL]: 'Review',
    [valuesNames.DATE_CREATED]: 1495704408641,
    [valuesNames.FROM]: 'Worcester Trust',
    [valuesNames.REASON]: 'Testing TOC',
    [valuesNames.RECORDS]: [
      {
        [valuesNames.RECORDS_DATE]: '10-Apr-2017',
        [valuesNames.RECORDS_NAME]: 'Cholecystectomy',
        [valuesNames.RECORDS_SOURCE]: 'ethercis',
        [valuesNames.SOURCE_ID]: '0318e94e-1803-46fe-a92a-647eca029323',
        [valuesNames.TYPE]: 'diagnosis',
        [valuesNames.RECORDS_TYPE]: 'Problems / Diagnosis',
      },
      {
        [valuesNames.RECORDS_DATE]: '11-Feb-2015',
        [valuesNames.RECORDS_NAME]: 'Care Service Team 444',
        [valuesNames.RECORDS_SOURCE]: 'marand',
        [valuesNames.SOURCE_ID]: '3a994bec-2f41-4dc0-aae6-f7e69e573f7a',
        [valuesNames.TYPE]: 'events',
        [valuesNames.RECORDS_TYPE]: 'Events',
      },
    ],
    [valuesNames.SOURCE]: 'qewdDB',
    [valuesNames.TO]: 'Oxford NHS Trust',
    [valuesNames.DATE_TIME]: '2017-05-25T09:25:33.026Z',
    [valuesNames.SOURCE_ID]: 'ae7b874e-3133-4700-a650-2b016ad7b05f',
  },
};

const TRANSFER_OF_CARE_PANEL = 'transferOfCarePanel';

describe('Component <TransfersOfCareDetail />', () => {
  it('should renders with props correctly', () => {
    const component = shallow(<TransfersOfCareDetail />);

    // Testing component when detail filled object, expandedPanel is all, and panel not edited
    component.setProps({ detail: propsForTransfersOfCarePanel.detail, expandedPanel: 'all', editedPanel: { [TRANSFER_OF_CARE_PANEL]: false } });
    expect(component.props().className).toEqual('section-detail');
    expect(component.find('PluginDetailPanel')).toHaveLength(1);
    expect(component.find('RecordsOfTableView')).toHaveLength(1);

    // Testing transferOfCarePanel
    expect(component.find('PluginDetailPanel').at(0).props().name).toEqual(TRANSFER_OF_CARE_PANEL);
    expect(component.find('PluginDetailPanel').at(0).props().title).toEqual('Transfer of Care');
    expect(component.find('PluginDetailPanel').at(0).props().isOpen).toEqual(false);
    expect(component.find('PluginDetailPanel').at(0).props().isShowControlPanel).toEqual(true);

    expect(component.find('RecordsOfTableView').props().records).toEqual(propsForTransfersOfCarePanel.detail[valuesNames.RECORDS]);

    expect(component.find('.control-label').at(0).text()).toEqual(valuesLabels.FROM);
    expect(component.find('.control-label').at(1).text()).toEqual(valuesLabels.TO);
    expect(component.find('.control-label').at(2).text()).toEqual(valuesLabels.DATE_TIME);
    // expect(component.find('.control-label').at(3).text()).toEqual(valuesLabels.RECORDS);
    expect(component.find('.control-label').at(3).text()).toEqual(valuesLabels.REASON);
    expect(component.find('.control-label').at(4).text()).toEqual(valuesLabels.CLINICAL);
    expect(component.find('.control-label').at(5).text()).toEqual(valuesLabels.DATE_CREATED);
    expect(component.find('.control-label').at(6).text()).toEqual(valuesLabels.SOURCE);

    expect(component.find('.form-control-static').at(0).text()).toEqual(propsForTransfersOfCarePanel.detail[valuesNames.FROM]);
    expect(component.find('.form-control-static').at(1).text()).toEqual(propsForTransfersOfCarePanel.detail[valuesNames.TO]);
    // expect(component.find('.form-control-static').at(2).text()).toEqual(CONVERT_DATE);
    expect(component.find('.form-control-static').at(3).text()).toEqual(propsForTransfersOfCarePanel.detail[valuesNames.REASON]);
    expect(component.find('.form-control-static').at(4).text()).toEqual(propsForTransfersOfCarePanel.detail[valuesNames.CLINICAL]);
    // expect(component.find('.form-control-static').at(5).text()).toEqual(CONVERT_DATE);
    expect(component.find('.form-control-static').at(6).text()).toEqual(propsForTransfersOfCarePanel.detail[valuesNames.SOURCE]);

    expect(component).toMatchSnapshot();

    component.setProps({ detail: {} });
    expect(component.find('RecordsOfTableView')).toHaveLength(1);
    // expect(component.find('.form-control-static').at(3).text()).toEqual(valuesLabels.RECORDS_NOT_EXIST);
    expect(component).toMatchSnapshot();
  });

  it('should renders correctly with different state of props', () => {
    const component = shallow(
      <TransfersOfCareDetail />);
    // Testing component when detail empty object, expandedPanel is transferOfCarePanel
    component.setProps({ detail: { [valuesNames.DATE_CREATED]: 1507020019000, [valuesNames.DATE_TIME]: 1511568000000 }, expandedPanel: TRANSFER_OF_CARE_PANEL, editedPanel: { [TRANSFER_OF_CARE_PANEL]: false } });
    expect(component.find('PluginDetailPanel')).toHaveLength(1);
    expect(component.find('PluginDetailPanel').props().name).toEqual(TRANSFER_OF_CARE_PANEL);
    expect(component).toMatchSnapshot();

    // Testing component when detail filled object, expandedPanel is all, and panel is edited
    component.setProps({ detail: propsForTransfersOfCarePanel.detail, expandedPanel: TRANSFER_OF_CARE_PANEL, editedPanel: { [TRANSFER_OF_CARE_PANEL]: true } });
    expect(component.find('ReduxForm')).toHaveLength(1);
    expect(component.find('PluginDetailPanel').props().name).toEqual(TRANSFER_OF_CARE_PANEL);
    expect(component).toMatchSnapshot();
  });
});

