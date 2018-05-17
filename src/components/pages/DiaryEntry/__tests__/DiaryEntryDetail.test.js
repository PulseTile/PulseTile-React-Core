import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

import DiaryEntryDetail from '../DiaryEntryDetail/DiaryEntryDetail';
import { valuesNames, valuesLabels } from '../forms.config';
import { getDDMMMYYYY } from '../../../../utils/time-helpers.utils';

Enzyme.configure({ adapter: new Adapter() });

const propsForDiaryEntryPanel = {
  detail: {
    [valuesNames.NOTE]: '11',
    [valuesNames.TYPE]: 'Exam Report',
    [valuesNames.AUTHOR]: 'bob.smith@gmail.com',
    [valuesNames.DATE_CREATED]: 1510224834000,
    [valuesNames.SOURCE]: 'ethercis',
    [valuesNames.SOURCE_ID]: '7ae34463-0770-4a36-bbde-4869bb6a0f05',
  },
};

const DIARY_ENTRY_PANEL = 'diaryEntriesPanel';
const CONVERT_DATE = getDDMMMYYYY(propsForDiaryEntryPanel.detail[valuesNames.DATE_CREATED]);

describe('Component <DiaryEntryDetail />', () => {
  it('should renders with props correctly', () => {
    const component = shallow(<DiaryEntryDetail />);

    // Testing component when detail filled object, expandedPanel is all, and panel not edited
    component.setProps({ detail: propsForDiaryEntryPanel.detail, expandedPanel: 'all', editedPanel: { [DIARY_ENTRY_PANEL]: false } });
    expect(component.props().className).toEqual('section-detail');
    expect(component.find('PluginDetailPanel')).toHaveLength(1);

    // Testing diaryEntriesPanel
    expect(component.find('PluginDetailPanel').at(0).props().name).toEqual(DIARY_ENTRY_PANEL);
    expect(component.find('PluginDetailPanel').at(0).props().title).toEqual('Diary Entry Item');
    expect(component.find('PluginDetailPanel').at(0).props().isOpen).toEqual(false);
    expect(component.find('PluginDetailPanel').at(0).props().isBtnShowPanel).toEqual(false);
    expect(component.find('PluginDetailPanel').at(0).props().isShowControlPanel).toEqual(true);

    expect(component.find('.control-label').at(0).text()).toEqual(valuesLabels.TYPE);
    expect(component.find('.control-label').at(1).text()).toEqual(valuesLabels.NOTE);
    expect(component.find('.control-label').at(2).text()).toEqual(valuesLabels.AUTHOR);
    expect(component.find('.control-label').at(3).text()).toEqual(valuesLabels.DATE);
    expect(component.find('.control-label').at(4).text()).toEqual(valuesLabels.SOURCE);

    expect(component.find('.form-control-static').at(0).text()).toEqual(propsForDiaryEntryPanel.detail[valuesNames.TYPE]);
    expect(component.find('.form-control-static').at(1).text()).toEqual(propsForDiaryEntryPanel.detail[valuesNames.NOTE]);
    expect(component.find('.form-control-static').at(2).text()).toEqual(propsForDiaryEntryPanel.detail[valuesNames.AUTHOR]);
    expect(component.find('.form-control-static').at(3).text()).toEqual(CONVERT_DATE);
    expect(component.find('.form-control-static').at(4).text()).toEqual(propsForDiaryEntryPanel.detail[valuesNames.SOURCE]);

    expect(component).toMatchSnapshot();
  });

  it('should renders correctly with different state of props', () => {
    const component = shallow(
      <DiaryEntryDetail />);
    // Testing component when detail empty object, expandedPanel is diaryEntriesPanel
    component.setProps({ detail: { [valuesNames.DATE_CREATED]: 1507020019000 }, expandedPanel: DIARY_ENTRY_PANEL, editedPanel: { [DIARY_ENTRY_PANEL]: false } });
    expect(component.find('PluginDetailPanel')).toHaveLength(1);
    expect(component.find('PluginDetailPanel').props().name).toEqual(DIARY_ENTRY_PANEL);
    expect(component).toMatchSnapshot();

    // Testing component when detail filled object, expandedPanel is all, and panel is edited
    component.setProps({ detail: propsForDiaryEntryPanel.detail, expandedPanel: DIARY_ENTRY_PANEL, editedPanel: { [DIARY_ENTRY_PANEL]: true } });
    expect(component.find('Connect(ReduxForm)')).toHaveLength(1);
    expect(component.find('PluginDetailPanel').props().name).toEqual(DIARY_ENTRY_PANEL);
    expect(component).toMatchSnapshot();
  });
});
