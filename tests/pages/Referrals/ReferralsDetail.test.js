import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

import ReferralsDetail from '../../../src/components/pages/Referrals/ReferralsDetail/ReferralsDetail';
import { valuesNames, valuesLabels } from '../../../src/components/pages/Referrals/forms.config';
import { getDDMMMYYYY } from '../../../src/utils/time-helpers.utils';

Enzyme.configure({ adapter: new Adapter() });

const propsForRefferalsPanel = {
  detail: {
    [valuesNames.TYPE]: 'Referral To',
    [valuesNames.REASON]: 'Deteriorating vision',
    [valuesNames.SUMMARY]: 'Long-standing impaired visual acuity - getting much worse',
    [valuesNames.FROM]: 'Tony Shannon1',
    [valuesNames.TO]: 'Ripplefields Optometry service',
    [valuesNames.REF]: '',
    [valuesNames.OUTCOME]: '',
    [valuesNames.STATE_DATE]: 1511283530634,
    [valuesNames.STATE]: 'planned',
    [valuesNames.STATE_CODE]: 526,
    [valuesNames.CARE_FLOW]: 'Service request sent',
    [valuesNames.SERVICE]: 'Referral To',
    [valuesNames.AUTHOR]: 'Dr Tony Shannon',
    [valuesNames.DATE]: 1511283530634,
    [valuesNames.DATE_CREATED]: 1511283530000,
    [valuesNames.SOURCE]: 'ethercis',
    [valuesNames.SOURCE_ID]: '94133578-f505-4e76-b4ed-762462508801',
  },
};

const REFERRAL_PANEL = 'referralPanel';
const CONVERT_DATE = getDDMMMYYYY(propsForRefferalsPanel.detail[valuesNames.DATE]);
const CONVERT_DATE_CREATED = getDDMMMYYYY(propsForRefferalsPanel.detail[valuesNames.DATE_CREATED]);

describe('Component <ReferralsDetail />', () => {
  it('should renders with props correctly', () => {
    const component = shallow(<ReferralsDetail />);

    // Testing component when detail filled object, expandedPanel is all, and panel not edited
    component.setProps({ detail: propsForRefferalsPanel.detail, expandedPanel: 'all', editedPanel: { [REFERRAL_PANEL]: false } });
    expect(component.props().className).toEqual('section-detail');
    expect(component.find('PluginDetailPanel')).toHaveLength(1);

    // Testing referralPanel
    expect(component.find('PluginDetailPanel').at(0).props().name).toEqual(REFERRAL_PANEL);
    expect(component.find('PluginDetailPanel').at(0).props().title).toEqual('Referral');
    expect(component.find('PluginDetailPanel').at(0).props().isOpen).toEqual(false);
    expect(component.find('PluginDetailPanel').at(0).props().editedPanel).toEqual({referralPanel: false});
    expect(component.find('PluginDetailPanel').at(0).props().isShowControlPanel).toEqual(true);

    expect(component.find('.control-label').at(0).text()).toEqual(valuesLabels.FROM);
    expect(component.find('.control-label').at(1).text()).toEqual(valuesLabels.TO);
    expect(component.find('.control-label').at(2).text()).toEqual(valuesLabels.DATE);
    expect(component.find('.control-label').at(3).text()).toEqual(valuesLabels.REASON);
    expect(component.find('.control-label').at(4).text()).toEqual(valuesLabels.SUMMARY);
    expect(component.find('.control-label').at(5).text()).toEqual(valuesLabels.AUTHOR);
    expect(component.find('.control-label').at(6).text()).toEqual(valuesLabels.DATE_CREATED);
    expect(component.find('.control-label').at(7).text()).toEqual(valuesLabels.SOURCE);

    expect(component.find('.form-control-static').at(0).text()).toEqual(propsForRefferalsPanel.detail[valuesNames.FROM]);
    expect(component.find('.form-control-static').at(1).text()).toEqual(propsForRefferalsPanel.detail[valuesNames.TO]);
    expect(component.find('.form-control-static').at(2).text()).toEqual(CONVERT_DATE);
    expect(component.find('.form-control-static').at(3).text()).toEqual(propsForRefferalsPanel.detail[valuesNames.REASON]);
    expect(component.find('.form-control-static').at(4).text()).toEqual(propsForRefferalsPanel.detail[valuesNames.SUMMARY]);
    expect(component.find('.form-control-static').at(5).text()).toEqual(propsForRefferalsPanel.detail[valuesNames.AUTHOR]);
    expect(component.find('.form-control-static').at(6).text()).toEqual(CONVERT_DATE_CREATED);
    expect(component.find('.form-control-static').at(7).text()).toEqual(propsForRefferalsPanel.detail[valuesNames.SOURCE]);

    expect(component).toMatchSnapshot();
  });

  it('should renders correctly with different state of props', () => {
    const component = shallow(
      <ReferralsDetail />);
    // Testing component when detail empty object, expandedPanel is referralPanel
    component.setProps({ detail: { [valuesNames.DATE_CREATED]: 1507020019000, [valuesNames.DATE]: 1511568000000 }, expandedPanel: REFERRAL_PANEL, editedPanel: { [REFERRAL_PANEL]: false } });
    expect(component.find('PluginDetailPanel')).toHaveLength(1);
    expect(component.find('PluginDetailPanel').props().name).toEqual(REFERRAL_PANEL);
    expect(component).toMatchSnapshot();

    // Testing component when detail filled object, expandedPanel is all, and panel is edited
    component.setProps({ detail: propsForRefferalsPanel.detail, expandedPanel: REFERRAL_PANEL, editedPanel: { [REFERRAL_PANEL]: true } });
    expect(component.find('ReduxForm')).toHaveLength(1);
    expect(component.find('PluginDetailPanel').props().name).toEqual(REFERRAL_PANEL);
    expect(component).toMatchSnapshot();
  });
});

