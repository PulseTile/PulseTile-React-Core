import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import moment from 'moment';

import EventsTimelines from '../../../src/components/pages/Events/events-page-component/EventsTimelines';
import { valuesNames } from '../../../src/components/pages/Events/forms.config';

Enzyme.configure({ adapter: new Adapter() });

const testProps = {
  eventsTimeline: {
    1452549600000: [
      {
        [valuesNames.DATE_CREATED]: 1454669420000,
        [valuesNames.DATE_TIME]: 1452595820958,
        dateTimeConvert: '12-Jan-2016',
        [valuesNames.DESCRIPTION]: 'Complications following surgery',
        [valuesNames.NAME]: 'Transfer from ward to ICU',
        sideDateInTimeline: 'left',
        [valuesNames.SOURCE]: 'ethercis',
        [valuesNames.SOURCE_ID]: '1aa74f42-ff10-4fa8-8d21-7242e425d9bb',
        [valuesNames.TYPE]: 'Transfer',
      },
    ],
  },
  id: 'daf9a9fa-a7a0-4809-9456-d0e1adea2a85',
  onCellClick: () => {},
};

const CONVER_DATE_HEADER = moment(1452549600000).format('DD-MMM-YYYY');
const CONVER_DATE_TEXT = moment(1452595820958).format('DD-MMM-YYYY');

describe('Component <EventsTimelines />', () => {
  it('should renders with props correctly shallow testing', () => {
    const component = shallow(<EventsTimelines
      eventsTimeline={testProps.eventsTimeline}
      id={testProps.id}
      onCellClick={testProps.onCellClick}
    />);

    expect(component.find('.timeline-header').text()).toEqual(CONVER_DATE_HEADER);
    expect(component.find('.timeline-date-title').text()).toEqual('Transfer from ward to ICU');
    expect(component.find('.timeline-date-subtitle').text()).toEqual('Transfer');
    expect(component.find('.timeline-date-text').text()).toEqual(CONVER_DATE_TEXT);
    expect(component.find('Scrollbars')).toHaveLength(1);
    expect(component.find('Scrollbars').props().style.height).toEqual(648);

    component.find('.timeline-date').simulate('click');

    expect(component).toMatchSnapshot();
  });

  it('should renders with props correctly mount testing', () => {
    const component = mount(<EventsTimelines
      eventsTimeline={testProps.eventsTimeline}
      id={testProps.id}
      onCellClick={testProps.onCellClick}
    />);

    expect(component).toMatchSnapshot();
  });
});

