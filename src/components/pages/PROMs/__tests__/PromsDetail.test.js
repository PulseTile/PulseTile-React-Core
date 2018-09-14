import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

import PromsDetail from '../PromsDetail/PromsDetail';
import { valuesNames, valuesLabels } from '../forms.config';

Enzyme.configure({ adapter: new Adapter() });

Date.now = jest.fn(() => new Date(Date.UTC(2018, 1, 1, 1)).valueOf());

const propsForPromsPanel = {
  detail: {
    [valuesNames.NAME]: 'test Proms 1',
    [valuesNames.RECORDS]: [
      {
        [valuesNames.RECORDS_DATE]: 1482190593395,
        [valuesNames.RECORDS_NAME]: 'test records',
        [valuesNames.SOURCE]: 'test records source',
        [valuesNames.SOURCE_ID]: 'test records sourceId',
        type: 'test records type',
        [valuesNames.TYPE]: 'test records typeTitle',
      },
    ],
    [valuesNames.SCORE]: '9',
    [valuesNames.DATE_CREATED]: 1482170593395,
    [valuesNames.SPECIFIC_Q1]: 'No Pain',
    [valuesNames.SPECIFIC_Q2]: 'No limitations',
    [valuesNames.SPECIFIC_Q3]: 'Around the house',
    [valuesNames.SPECIFIC_Q4]: 'No difficulty',
    [valuesNames.AUTHOR]: 'DR Mary Jones',
    [valuesNames.SOURCE]: 'openehr',
    [valuesNames.SOURCE_ID]: 'testSourceID1',
  },
};

const PROM_PANEL = 'promPanel';

describe('Component <PromsDetail />', () => {
  it('should renders with props correctly', () => {
    const component = shallow(<PromsDetail />);

    // Testing component when detail filled object, expandedPanel is all, and panel not edited
    component.setProps({ detail: propsForPromsPanel.detail, expandedPanel: 'all', editedPanel: { [PROM_PANEL]: false } });
    expect(component.props().className).toEqual('section-detail');
    expect(component.find('PluginDetailPanel')).toHaveLength(1);
    expect(component.find('RecordsOfTableView')).toHaveLength(1);

    // Testing promPanel
    expect(component.find('PluginDetailPanel').at(0).props().name).toEqual(PROM_PANEL);
    expect(component.find('PluginDetailPanel').at(0).props().title).toEqual('PROM');
    expect(component.find('PluginDetailPanel').at(0).props().isOpen).toEqual(false);
    expect(component.find('PluginDetailPanel').at(0).props().isShowControlPanel).toEqual(true);

    expect(component.find('RecordsOfTableView').props().records).toEqual(propsForPromsPanel.detail[valuesNames.RECORDS]);

    expect(component.find('.control-label').at(0).text()).toEqual(valuesLabels.NAME);
    expect(component.find('.control-label').at(1).text()).toEqual(valuesLabels.QUESTION_PAIN);
    expect(component.find('.control-label').at(2).text()).toEqual(valuesLabels.QUESTION_LIMITATIONS);
    expect(component.find('.control-label').at(3).text()).toEqual(valuesLabels.QUESTION_WALKING);
    expect(component.find('.control-label').at(4).text()).toEqual(valuesLabels.QUESTION_WALKING_SURFACES);
    expect(component.find('.control-label').at(5).text()).toEqual(valuesLabels.SCORE);
    expect(component.find('.control-label').at(6).text()).toEqual(valuesLabels.DATE_CREATED);
    expect(component.find('.control-label').at(7).text()).toEqual(valuesLabels.SOURCE);

    expect(component.find('.form-control-static').at(0).text()).toEqual(propsForPromsPanel.detail[valuesNames.NAME]);
    expect(component.find('.form-control-static').at(1).text()).toEqual(propsForPromsPanel.detail[valuesNames.SPECIFIC_Q1]);
    expect(component.find('.form-control-static').at(2).text()).toEqual(propsForPromsPanel.detail[valuesNames.SPECIFIC_Q2]);
    expect(component.find('.form-control-static').at(3).text()).toEqual(propsForPromsPanel.detail[valuesNames.SPECIFIC_Q3]);
    expect(component.find('.form-control-static').at(4).text()).toEqual(propsForPromsPanel.detail[valuesNames.SPECIFIC_Q4]);
    expect(component.find('.form-control-static').at(6).text()).toEqual(propsForPromsPanel.detail[valuesNames.SOURCE]);

    expect(component.find('.form-control').at(0).text()).toEqual(propsForPromsPanel.detail[valuesNames.SCORE]);

    expect(component).toMatchSnapshot();

    component.setProps({ detail: {} });
    expect(component.find('RecordsOfTableView')).toHaveLength(1);
    expect(component).toMatchSnapshot();

  });

  it('should renders correctly with different state of props', () => {
    const component = shallow(
      <PromsDetail />);
    // Testing component when detail empty object, expandedPanel is promPanel
    component.setProps({ detail: { [valuesNames.DATE_CREATED]: 1507020019000 }, expandedPanel: PROM_PANEL, editedPanel: { [PROM_PANEL]: false } });
    expect(component.find('PluginDetailPanel')).toHaveLength(1);
    expect(component.find('PluginDetailPanel').props().name).toEqual(PROM_PANEL);
    expect(component).toMatchSnapshot();

    // Testing component when detail filled object, expandedPanel is all, and panel is edited
    component.setProps({ detail: propsForPromsPanel.detail, expandedPanel: PROM_PANEL, editedPanel: { [PROM_PANEL]: true } });
    expect(component.find('ReduxForm')).toHaveLength(1);
    expect(component.find('PluginDetailPanel').props().name).toEqual(PROM_PANEL);
    expect(component).toMatchSnapshot();
  });
});

