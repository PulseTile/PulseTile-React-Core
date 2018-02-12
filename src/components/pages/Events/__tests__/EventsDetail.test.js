import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import moment from 'moment';

import EventsDetail from '../EventsDetail/EventsDetail';
import { valuesNames, valuesLabels } from '../forms.config';
import { getDDMMMYYYY } from '../../../../utils/time-helpers.utils';

Enzyme.configure({ adapter: new Adapter() });

const propsForEventsPanel = {
  detail: {
    [valuesNames.NAME]: '14444',
    [valuesNames.TYPE]: 'Appointment',
    [valuesNames.DESCRIPTION]: '144444',
    [valuesNames.DATE_TIME]: 1511339400000,
    [valuesNames.AUTHOR]: 'bob.smith@gmail.com',
    [valuesNames.DATE_CREATED]: 1512564962000,
    [valuesNames.SOURCE]: 'marand',
    [valuesNames.SOURCE_ID]: 'a7007401-837f-471c-8f73-cbb53c0eb1a1',
  },
};

const onShow = () => {};

const EVENT_PANEL = 'eventPanel';
const META_PANEL = 'metaPanel';
const CHAT_PANEL = 'chatPanel';

const CONVERT_DATE_CREATED = getDDMMMYYYY(propsForEventsPanel.detail[valuesNames.DATE_CREATED]);
const CONVERT_EVENT_DATE = moment(propsForEventsPanel.detail[valuesNames.DATE_TIME]).format('DD-MMM-YYYY HH:mm');

describe('Component <EventsDetail />', () => {
  it('should renders with props correctly', () => {
    const component = shallow(<EventsDetail
      onShow={onShow}
    />);

    // Testing component when detail filled object, expandedPanel is all, and panel not edited
    component.setProps({ detail: propsForEventsPanel.detail, expandedPanel: 'all', editedPanel: { [EVENT_PANEL]: false } });
    expect(component.props().className).toEqual('section-detail');
    expect(component.find('EventsDetailPanel')).toHaveLength(3);

    // Testing eventPanel
    expect(component.find('EventsDetailPanel').at(0).props().name).toEqual(EVENT_PANEL);
    expect(component.find('EventsDetailPanel').at(0).props().title).toEqual('Event - Appointment Details');
    expect(component.find('EventsDetailPanel').at(0).props().isOpen).toEqual(false);
    expect(component.find('EventsDetailPanel').at(0).props().isBtnShowPanel).toEqual(true);
    expect(component.find('EventsDetailPanel').at(0).props().isShowControlPanel).toEqual(true);

    expect(component.find('EventsDetailPanel').at(0).find('.control-label').at(0)
      .text()).toEqual(valuesLabels.NAME);
    expect(component.find('EventsDetailPanel').at(0).find('.control-label').at(1)
      .text()).toEqual(valuesLabels.TYPE);
    expect(component.find('EventsDetailPanel').at(0).find('.control-label').at(2)
      .text()).toEqual(valuesLabels.DESCRIPTION);
    expect(component.find('EventsDetailPanel').at(0).find('.control-label').at(3)
      .text()).toEqual(valuesLabels.EVENT_DATE);
    expect(component.find('EventsDetailPanel').at(0).find('.control-label').at(4)
      .text()).toEqual(valuesLabels.DATE);

    expect(component.find('EventsDetailPanel').at(0).find('.form-control-static').at(0)
      .text()).toEqual(propsForEventsPanel.detail[valuesNames.NAME]);
    expect(component.find('EventsDetailPanel').at(0).find('.form-control-static').at(1)
      .text()).toEqual(propsForEventsPanel.detail[valuesNames.TYPE]);
    expect(component.find('EventsDetailPanel').at(0).find('.form-control-static').at(2)
      .text()).toEqual(propsForEventsPanel.detail[valuesNames.DESCRIPTION]);
    expect(component.find('EventsDetailPanel').at(0).find('.form-control-static').at(3)
      .text()).toEqual(CONVERT_EVENT_DATE);
    expect(component.find('EventsDetailPanel').at(0).find('.form-control-static').at(4)
      .text()).toEqual(CONVERT_DATE_CREATED);

    // Testing metaPanel
    expect(component.find('EventsDetailPanel').at(1).props().name).toEqual(META_PANEL);
    expect(component.find('EventsDetailPanel').at(1).props().title).toEqual('Event - Appointment Metadata');
    expect(component.find('EventsDetailPanel').at(1).props().isOpen).toEqual(false);
    expect(component.find('EventsDetailPanel').at(1).props().isBtnShowPanel).toEqual(true);
    expect(component.find('EventsDetailPanel').at(1).props().isShowControlPanel).toEqual(false);

    expect(component.find('EventsDetailPanel').at(1).find('.control-label').at(0)
      .text()).toEqual(valuesLabels.AUTHOR);
    expect(component.find('EventsDetailPanel').at(1).find('.control-label').at(1)
      .text()).toEqual(valuesLabels.SOURCE);

    expect(component.find('EventsDetailPanel').at(1).find('.form-control-static').at(0)
      .text()).toEqual(propsForEventsPanel.detail[valuesNames.AUTHOR]);
    expect(component.find('EventsDetailPanel').at(1).find('.form-control-static').at(1)
      .text()).toEqual(propsForEventsPanel.detail[valuesNames.SOURCE]);

    // Testing chatPanel
    expect(component.find('EventsDetailPanel').at(2).props().name).toEqual(CHAT_PANEL);
    expect(component.find('EventsDetailPanel').at(2).props().title).toEqual('Chat');
    expect(component.find('EventsDetailPanel').at(2).props().isOpen).toEqual(false);
    expect(component.find('EventsDetailPanel').at(2).props().isBtnShowPanel).toEqual(true);
    expect(component.find('EventsDetailPanel').at(2).props().isShowControlPanel).toEqual(false);

    expect(component).toMatchSnapshot();

    // Testing canJoinAppointment method
    component.setProps({ userAccount: { role: 'PHR' }, appoitmentId: 'a7007401-837f-471c-8f73-cbb53c0eb1a1' });
    component.instance().canJoinAppointment();
    component.setProps({ detail: {} });
    component.instance().canJoinAppointment();
    component.setProps({ detail: { test: 'test', type: 'Appointment' }, userAccount: { role: 'IDCR' } });

    // Testing canStartAppointment method
    component.instance().canStartAppointment();
    component.setProps({ detail: {} });
    component.instance().canStartAppointment();

    expect(component.find('.list-reset')).toHaveLength(0);
    component.setProps({
      messages: [
        {
          timestamp: 'timestamp test',
          author: 'author test',
          message: 'message test',
        }
      ]
    });
    expect(component.find('.list-reset')).toHaveLength(1);

    expect(component).toMatchSnapshot();
  });

  it('should renders correctly with different state of props', () => {
    const component = shallow(
      <EventsDetail />);
    // Testing component when detail empty object, expandedPanel is eventPanel
    component.setProps({ detail: { [valuesNames.DATE_CREATED]: 1510588832000, [valuesNames.DATE_TIME]: 1510588832000 }, expandedPanel: EVENT_PANEL, editedPanel: { [EVENT_PANEL]: false } });
    expect(component.find('PluginDetailPanel')).toHaveLength(0);
    expect(component.find('EventsDetailPanel')).toHaveLength(1);
    expect(component.find('EventsDetailPanel').props().name).toEqual(EVENT_PANEL);
    expect(component).toMatchSnapshot();

    // Testing component when detail empty object, expandedPanel is metaPanel
    component.setProps({ detail: { [valuesNames.DATE_CREATED]: 1510588832000, [valuesNames.DATE_TIME]: 1510588832000 }, expandedPanel: META_PANEL });
    expect(component.find('PluginDetailPanel')).toHaveLength(0);
    expect(component.find('EventsDetailPanel')).toHaveLength(1);
    expect(component.find('EventsDetailPanel').props().name).toEqual(META_PANEL);
    expect(component).toMatchSnapshot();

    // Testing component when detail empty object, expandedPanel is chatPanel
    component.setProps({ detail: { [valuesNames.DATE_CREATED]: 1510588832000, [valuesNames.DATE_TIME]: 1510588832000 }, expandedPanel: CHAT_PANEL });
    expect(component.find('PluginDetailPanel')).toHaveLength(0);
    expect(component.find('EventsDetailPanel')).toHaveLength(1);
    expect(component.find('EventsDetailPanel').props().name).toEqual(CHAT_PANEL);
    expect(component).toMatchSnapshot();

    // Testing component when detail filled object, expandedPanel is all, and EVENT_PANEL is edited
    component.setProps({ detail: propsForEventsPanel.detail, expandedPanel: EVENT_PANEL, editedPanel: { [EVENT_PANEL]: true } });
    expect(component.find('ReduxForm')).toHaveLength(1);
    expect(component.find('EventsDetailPanel').props().name).toEqual(EVENT_PANEL);

    expect(component).toMatchSnapshot();
  });
});

