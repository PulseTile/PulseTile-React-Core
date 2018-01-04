import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import configureStore from 'redux-mock-store';

import EventsCreateForm from '../../../src/components/pages/Events/EventsCreate/EventsCreateForm';
import { valuesNames, valuesLabels, connectionOptions, detailsOptions } from '../../../src/components/pages/Events/forms.config';
import {getDDMMMYYYY} from '../../../src/utils/time-helpers.utils';

Enzyme.configure({ adapter: new Adapter() });

const mockStore = configureStore();
const store = mockStore({});
const DATE_TO_USE = new Date('2017');
const DATE_TO_USE_TIME = DATE_TO_USE.getTime();
global.Date = jest.fn(() => DATE_TO_USE);

const FORM_NAME = 'eventsCreateForm';
const DATE_FORMAT = 'DD-MMM-YYYY';
const DATE_FORMAT_WITH_TIME = 'DD-MMM-YYYY HH:mm';

const testProps = {
  isSubmit: false,
  eventsType: 'Appointment',
};

const CONVERT_DATE_CREATED = getDDMMMYYYY(DATE_TO_USE_TIME);

describe('Component <EventsCreateForm />', () => {
  it('should renders with props correctly', () => {
    const component = shallow(
      <EventsCreateForm
        store={store}
        eventsType={testProps.eventsType}
        isSubmit={testProps.isSubmit}
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
    expect(component.find('Field').at(5).props().props.value).toEqual(CONVERT_DATE_CREATED);
    expect(component.find('Field').at(5).props().props.format).toEqual(DATE_FORMAT);

    expect(component).toMatchSnapshot();
  });

  it('should renders correctly when form is submitted', () => {
    const component = shallow(
      <EventsCreateForm
        store={store}
        isSubmit
        eventsType={testProps.eventsType}
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

  it('should renders correctly when eventsType is Discharge', () => {
    const component = shallow(
      <EventsCreateForm
        store={store}
        isSubmit
        eventsType="Discharge"
      />).dive().dive().dive();
    expect(component.find('Field')).toHaveLength(8);
    expect(component.find('form')).toHaveLength(1);
    expect(component.find('form').prop('name')).toEqual(FORM_NAME);

    expect(component.find('Field').at(4).props().name).toEqual(valuesNames.CONNECTION);
    expect(component.find('Field').at(4).props().id).toEqual(valuesNames.CONNECTION);
    expect(component.find('Field').at(4).props().label).toEqual(valuesLabels.CONNECTION);
    expect(component.find('Field').at(4).props().options).toEqual(connectionOptions);
    expect(component.find('Field').at(4).props().props.isSubmit).toEqual(true);
    expect(component.find('Field').at(4).props().props.placeholder).toEqual('-- Select --');

    expect(component.find('Field').at(5).props().name).toEqual(valuesNames.DETAILS);
    expect(component.find('Field').at(5).props().id).toEqual(valuesNames.DETAILS);
    expect(component.find('Field').at(5).props().label).toEqual(valuesLabels.DETAILS);
    expect(component.find('Field').at(5).props().options).toEqual(detailsOptions);
    expect(component.find('Field').at(5).props().props.isSubmit).toEqual(true);
    expect(component.find('Field').at(5).props().props.placeholder).toEqual('-- Select --');

    expect(component).toMatchSnapshot();
  });
});

