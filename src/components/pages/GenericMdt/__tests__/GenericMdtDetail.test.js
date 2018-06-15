import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

import MDTsDetail from '../GenericMdtDetail/GenericMdtDetail';
import { valuesNames, valuesLabels } from '../forms.config';
import { getDDMMMYYYY } from '../../../../utils/time-helpers.utils';

Enzyme.configure({ adapter: new Adapter() });

const propsForMDTsPanel = {
  detail: {
    [valuesNames.TEAM]: 'MDT Prostate Cancer team',
    [valuesNames.DATE_OF_REQUEST]: 1482170593395,
    [valuesNames.DATE_OF_MEETING]: 1456258262000,
    [valuesNames.TIME_OF_MEETING]: 72662000,
    [valuesNames.LINK]: 'test',
    [valuesNames.QUESTION]: 'Increasing back pain',
    [valuesNames.NOTES]: 'Investigations normal. Review in 3 weeks',
    [valuesNames.SOURCE]: 'ethercis',
    [valuesNames.SOURCE_ID]: '94133578-f505-4e76-b4ed-762462508801',
  },
};

const MDTS_PANEL = 'mdtsPanel';
const CONVERT_DATE_OF_REQUEST = getDDMMMYYYY(propsForMDTsPanel.detail[valuesNames.DATE_OF_REQUEST]);
const CONVERT_DATE_OF_MEETING = getDDMMMYYYY(propsForMDTsPanel.detail[valuesNames.DATE_OF_MEETING]);

describe('Component <MDTsDetail />', () => {
  it('should renders with props correctly', () => {
    const component = shallow(<MDTsDetail />);

    // Testing component when detail filled object, expandedPanel is all, and panel not edited
    component.setProps({ detail: propsForMDTsPanel.detail, expandedPanel: 'all', editedPanel: { [MDTS_PANEL]: false } });
    expect(component.props().className).toEqual('section-detail');
    expect(component.find('PluginDetailPanel')).toHaveLength(1);

    // Testing mdtsPanel
    expect(component.find('PluginDetailPanel').at(0).props().name).toEqual(MDTS_PANEL);
    expect(component.find('PluginDetailPanel').at(0).props().title).toEqual('Generic MDT Meeting');
    expect(component.find('PluginDetailPanel').at(0).props().isOpen).toEqual(false);
    expect(component.find('PluginDetailPanel').at(0).props().editedPanel).toEqual({ mdtsPanel: false });
    expect(component.find('PluginDetailPanel').at(0).props().isShowControlPanel).toEqual(true);

    expect(component.find('.control-label').at(0).text()).toEqual(valuesLabels.TEAM);
    expect(component.find('.control-label').at(1).text()).toEqual(valuesLabels.DATE_OF_REQUEST);
    expect(component.find('.control-label').at(2).text()).toEqual(valuesLabels.DATE_OF_MEETING);
    expect(component.find('.control-label').at(3).text()).toEqual(valuesLabels.LINK);
    expect(component.find('.control-label').at(4).text()).toEqual(valuesLabels.QUESTION);
    expect(component.find('.control-label').at(5).text()).toEqual(valuesLabels.NOTES);
    expect(component.find('.control-label').at(6).text()).toEqual(valuesLabels.SOURCE);

    expect(component.find('.form-control-static').at(0).text()).toEqual(propsForMDTsPanel.detail[valuesNames.TEAM]);
    expect(component.find('.form-control-static').at(1).text()).toEqual(CONVERT_DATE_OF_REQUEST);
    expect(component.find('.form-control-static').at(2).text()).toEqual(propsForMDTsPanel.detail[valuesNames.LINK]);
    expect(component.find('.form-control-static').at(3).text()).toEqual(propsForMDTsPanel.detail[valuesNames.SOURCE]);


    expect(component.find('.list-reset').at(2).text()).toEqual(CONVERT_DATE_OF_MEETING);
    expect(component.find('.list-reset').at(3).text()).toEqual(propsForMDTsPanel.detail[valuesNames.QUESTION]);
    expect(component.find('.list-reset').at(4).text()).toEqual(propsForMDTsPanel.detail[valuesNames.NOTES]);

    expect(component).toMatchSnapshot();
  });

  it('should renders correctly with different state of props', () => {
    const component = shallow(
      <MDTsDetail />);
    // Testing component when detail empty object, expandedPanel is mdtsPanel
    component.setProps({ detail: { [valuesNames.SOURCE_ID]: '94133578-f505-4e76-b4ed-762462508801' }, expandedPanel: MDTS_PANEL, editedPanel: { [MDTS_PANEL]: false } });
    expect(component.find('PluginDetailPanel')).toHaveLength(1);
    expect(component.find('PluginDetailPanel').props().name).toEqual(MDTS_PANEL);

    expect(component.find('.form-control-static').at(0).text()).toEqual(valuesLabels.TEAM_NOT);
    expect(component.find('.form-control-static').at(1).text()).toEqual(valuesLabels.DATE_OF_REQUEST_NOT);
    expect(component.find('.form-control-static').at(2).text()).toEqual(valuesLabels.LINK_NOT);
    expect(component.find('.form-control-static').at(3).text()).toEqual('');

    expect(component).toMatchSnapshot();

    // Testing component when detail filled object, expandedPanel is all, and panel is edited
    component.setProps({ detail: propsForMDTsPanel.detail, expandedPanel: MDTS_PANEL, editedPanel: { [MDTS_PANEL]: true } });
    expect(component.find('ReduxForm')).toHaveLength(1);
    expect(component.find('PluginDetailPanel').props().name).toEqual(MDTS_PANEL);
    expect(component).toMatchSnapshot();
  });
});

