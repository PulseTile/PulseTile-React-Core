import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

import ContactsDetail from '../ContactsDetail/ContactsDetail';
import { valuesNames, valuesLabels } from '../forms.config';
import { getDDMMMYYYY } from '../../../../utils/time-helpers.utils';

Enzyme.configure({ adapter: new Adapter() });

const propsForContactPanel = {
  detail: {
    [valuesNames.NAME]: '123458',
    [valuesNames.REALATIONSHIP]: 'Sister',
    [valuesNames.REALATIONSHIP_TYPE]: 'Informal carer',
    [valuesNames.REALATIONSHIP_CODE]: 'at0036',
    [valuesNames.REALATIONSHIP_TERMINOLOGY]: 'local',
    [valuesNames.CONTACT_INFORMATION]: 'test',
    [valuesNames.NEXT_OF_KIN]: 'Yes',
    [valuesNames.NOTES]: 'test',
    [valuesNames.AUTHOR]: 'bob.smith@gmail.com',
    [valuesNames.DATE_CREATED]: 1512579806000,
    [valuesNames.SOURCE]: 'ethercis',
    [valuesNames.SOURCE_ID]: '9e06d22b-3f60-4bc6-bb6e-1b42bff75ed2',
  },
};

const CONTACT_PANEL = 'contactPanel';
const CONVERT_DATE_CREATED = getDDMMMYYYY(propsForContactPanel.detail[valuesNames.DATE_CREATED]);

describe('Component <ContactsDetail />', () => {
  it('should renders with props correctly', () => {
    const component = shallow(<ContactsDetail />);

    // Testing component when detail filled object, expandedPanel is all, and panel not edited
    component.setProps({ detail: propsForContactPanel.detail, expandedPanel: 'all', editedPanel: { [CONTACT_PANEL]: false } });
    expect(component.props().className).toEqual('section-detail');
    expect(component.find('PluginDetailPanel')).toHaveLength(1);

    // Testing diagnosesPanel
    expect(component.find('PluginDetailPanel').at(0).props().name).toEqual(CONTACT_PANEL);
    expect(component.find('PluginDetailPanel').at(0).props().title).toEqual('Contact');
    expect(component.find('PluginDetailPanel').at(0).props().isOpen).toEqual(false);
    expect(component.find('PluginDetailPanel').at(0).props().editedPanel).toEqual({contactPanel: false});
    expect(component.find('PluginDetailPanel').at(0).props().isBtnShowPanel).toEqual(true);
    expect(component.find('PluginDetailPanel').at(0).props().isShowControlPanel).toEqual(true);

    expect(component.find('.control-label').at(0).text()).toEqual(valuesLabels.NAME);
    expect(component.find('.control-label').at(1).text()).toEqual(valuesLabels.REALATIONSHIP);
    expect(component.find('.control-label').at(2).text()).toEqual(valuesLabels.REALATIONSHIP_TYPE);
    expect(component.find('.control-label').at(3).text()).toEqual(valuesLabels.CONTACT_INFORMATION);
    expect(component.find('.control-label').at(4).text()).toEqual(valuesLabels.NEXT_OF_KIN);
    expect(component.find('.control-label').at(5).text()).toEqual(valuesLabels.NOTES);
    expect(component.find('.control-label').at(6).text()).toEqual(valuesLabels.AUTHOR);
    expect(component.find('.control-label').at(7).text()).toEqual(valuesLabels.DATE);
    expect(component.find('.control-label').at(8).text()).toEqual(valuesLabels.SOURCE);

    expect(component.find('.form-control-static').at(0).text()).toEqual(propsForContactPanel.detail[valuesNames.NAME]);
    expect(component.find('.form-control-static').at(1).text()).toEqual(propsForContactPanel.detail[valuesNames.REALATIONSHIP]);
    expect(component.find('.form-control-static').at(2).text()).toEqual(propsForContactPanel.detail[valuesNames.REALATIONSHIP_TYPE]);
    expect(component.find('.form-control-static').at(3).text()).toEqual(propsForContactPanel.detail[valuesNames.CONTACT_INFORMATION]);
    expect(component.find('.form-control-static').at(4).text()).toEqual(propsForContactPanel.detail[valuesNames.NEXT_OF_KIN]);
    expect(component.find('.form-control-static').at(5).text()).toEqual(propsForContactPanel.detail[valuesNames.NOTES]);
    expect(component.find('.form-control-static').at(6).text()).toEqual(propsForContactPanel.detail[valuesNames.AUTHOR]);
    expect(component.find('.form-control-static').at(7).text()).toEqual(CONVERT_DATE_CREATED);
    expect(component.find('.form-control-static').at(8).text()).toEqual(propsForContactPanel.detail[valuesNames.SOURCE]);

    expect(component).toMatchSnapshot();
  });

  it('should renders correctly with different state of props', () => {
    const component = shallow(
      <ContactsDetail />);
    // Testing component when detail empty object, expandedPanel is contactPanel
    component.setProps({ detail: { [valuesNames.DATE_CREATED]: 1507020019000}, expandedPanel: CONTACT_PANEL, editedPanel: { [CONTACT_PANEL]: false } });
    expect(component.find('PluginDetailPanel')).toHaveLength(1);
    expect(component.find('PluginDetailPanel').props().name).toEqual(CONTACT_PANEL);
    expect(component).toMatchSnapshot();

    // Testing component when detail filled object, expandedPanel is all, and panel is edited
    component.setProps({ detail: propsForContactPanel.detail, expandedPanel: CONTACT_PANEL, editedPanel: { [CONTACT_PANEL]: true } });
    expect(component.find('ReduxForm')).toHaveLength(1);
    expect(component.find('PluginDetailPanel').props().name).toEqual(CONTACT_PANEL);
    expect(component).toMatchSnapshot();
  });
});

