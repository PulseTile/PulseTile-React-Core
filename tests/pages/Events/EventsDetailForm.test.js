import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import configureStore from 'redux-mock-store';

import EventsDetailForm from '../../../src/components/pages/Events/EventsDetail/EventsDetailForm';
import { valuesNames, valuesLabels } from '../../../src/components/pages/Events/forms.config';

Enzyme.configure({ adapter: new Adapter() });

const mockStore = configureStore();
const store = mockStore({});
const DATE_TO_USE = new Date('2017');
global.Date = jest.fn(() => DATE_TO_USE);

const FORM_NAME = 'eventsPanelForm';
const DATE_FORMAT = 'DD-MMM-YYYY';
const DATE_FORMAT_WITH_TIME = 'DD-MMM-YYYY HH:mm';


const testProps = {
  detail: {
    [valuesNames.DATE_CREATED]: 1507020019000,
  },
  isSubmit: false,
};

describe('Component <EventsDetailForm />', () => {
  it('should renders with props correctly', () => {
    const component = shallow(
      <EventsDetailForm
        store={store}
        isSubmit={testProps.isSubmit}
        detail={testProps.detail}
      />).dive().dive().dive();
    expect(component.find('Field')).toHaveLength(6);
    expect(component.find('form')).toHaveLength(1);
    expect(component.find('form').prop('name')).toEqual(FORM_NAME);

    expect(component.find('Field').at(0).props().name).toEqual(valuesNames.NAME);
    expect(component.find('Field').at(0).props().id).toEqual(valuesNames.NAME);
    expect(component.find('Field').at(0).props().label).toEqual(valuesLabels.NAME);
    expect(component.find('Field').at(0).props().props.isSubmit).toEqual(false);

    expect(component.find('Field').at(1).props().name).toEqual(valuesNames.TYPE);
    expect(component.find('Field').at(1).props().id).toEqual(valuesNames.TYPE);
    expect(component.find('Field').at(1).props().label).toEqual(valuesLabels.TYPE);
    expect(component.find('Field').at(1).props().props.isSubmit).toEqual(false);
    expect(component.find('Field').at(1).props().props.placeholder).toEqual(testProps.eventsType);
    expect(component.find('Field').at(1).props().props.disabled).toEqual(true);

    expect(component.find('Field').at(2).props().name).toEqual(valuesNames.DESCRIPTION);
    expect(component.find('Field').at(2).props().id).toEqual(valuesNames.DESCRIPTION);
    expect(component.find('Field').at(2).props().label).toEqual(valuesLabels.DESCRIPTION);
    expect(component.find('Field').at(2).props().props.isSubmit).toEqual(false);

    expect(component.find('Field').at(3).props().name).toEqual(valuesNames.DATE_TIME);
    expect(component.find('Field').at(3).props().id).toEqual(valuesNames.DATE_TIME);
    expect(component.find('Field').at(3).props().label).toEqual(valuesLabels.EVENT_DATE_TIME);
    expect(component.find('Field').at(3).props().props.isSubmit).toEqual(false);
    expect(component.find('Field').at(3).props().props.format).toEqual(DATE_FORMAT_WITH_TIME);
    expect(component.find('Field').at(3).props().props.showTimeSelect).toEqual(true,);
    expect(component.find('Field').at(3).props().props.timeFormat).toEqual('HH:mm');
    expect(component.find('Field').at(3).props().props.timeIntervals).toEqual(5);

    expect(component.find('Field').at(4).props().name).toEqual(valuesNames.AUTHOR);
    expect(component.find('Field').at(4).props().id).toEqual(valuesNames.AUTHOR);
    expect(component.find('Field').at(4).props().label).toEqual(valuesLabels.AUTHOR);
    expect(component.find('Field').at(4).props().props.isSubmit).toEqual(false);
    expect(component.find('Field').at(4).props().props.disabled).toEqual(true);

    expect(component.find('Field').at(5).props().name).toEqual(valuesNames.DATE_CREATED);
    expect(component.find('Field').at(5).props().id).toEqual(valuesNames.DATE_CREATED);
    expect(component.find('Field').at(5).props().label).toEqual(valuesLabels.DATE);
    expect(component.find('Field').at(5).props().props.isSubmit).toEqual(false);
    expect(component.find('Field').at(5).props().props.disabled).toEqual(true);
    expect(component.find('Field').at(5).props().props.value).toEqual(testProps.detail[valuesNames.DATE_CREATED]);
    expect(component.find('Field').at(5).props().props.format).toEqual(DATE_FORMAT);

    expect(component).toMatchSnapshot();
  });

  it('should renders correctly when form is submitted', () => {
    const component = shallow(
      <EventsDetailForm
        store={store}
        isSubmit
        detail={testProps.detail}
      />).dive().dive().dive();
    expect(component.find('Field')).toHaveLength(6);
    expect(component.find('form')).toHaveLength(1);
    expect(component.find('form').prop('name')).toEqual(FORM_NAME);

    expect(component.find('Field').at(0).props().props.isSubmit).toEqual(true);
    expect(component.find('Field').at(1).props().props.isSubmit).toEqual(true);
    expect(component.find('Field').at(2).props().props.isSubmit).toEqual(true);
    expect(component.find('Field').at(3).props().props.isSubmit).toEqual(true);
    expect(component.find('Field').at(4).props().props.isSubmit).toEqual(true);
    expect(component.find('Field').at(5).props().props.isSubmit).toEqual(true);

    expect(component).toMatchSnapshot();
  });
});

