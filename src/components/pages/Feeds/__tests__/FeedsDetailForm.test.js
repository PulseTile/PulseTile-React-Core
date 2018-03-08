import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import configureStore from 'redux-mock-store';

import FeedsDetailForm from '../FeedsDetail/FeedsDetailForm';
import { valuesNames, valuesLabels } from '../forms.config';

Enzyme.configure({ adapter: new Adapter() });

const mockStore = configureStore();
const storeResource = {};
const store = mockStore(storeResource);
const DATE_TO_USE = new Date('2018');
const DATE_TO_USE_TIME = DATE_TO_USE.getTime();
global.Date = jest.fn(() => DATE_TO_USE);

const FORM_NAME = 'feedsPanelForm';
const DATE_FORMAT = 'DD-MMM-YYYY';

const detail = {
  [valuesNames.DATE_CREATED]: DATE_TO_USE_TIME,
};

describe('Component <FeedsDetailForm />', () => {
  it('should renders with all props correctly', () => {
    const component = shallow(
      <FeedsDetailForm
        store={store}
        detail={detail}
        isSubmit={false}
      />
    ).dive().dive().dive();

    expect(component).toMatchSnapshot();

    expect(component.instance().props.isSubmit).toEqual(false);
    expect(component.find('form')).toHaveLength(1);
    expect(component.find('form').prop('name')).toEqual(FORM_NAME);
    expect(component.find('Field')).toHaveLength(5);

    expect(component.find('Field').at(0).props().name).toEqual(valuesNames.NAME);
    expect(component.find('Field').at(0).props().id).toEqual(valuesNames.NAME);
    expect(component.find('Field').at(0).props().label).toEqual(valuesLabels.NAME);
    expect(component.find('Field').at(0).props().type).toEqual('text');
    expect(component.find('Field').at(0).props().props.isSubmit).toEqual(false);

    expect(component.find('Field').at(1).props().name).toEqual(valuesNames.LANDING_PAGE_URL);
    expect(component.find('Field').at(1).props().id).toEqual(valuesNames.LANDING_PAGE_URL);
    expect(component.find('Field').at(1).props().label).toEqual(valuesLabels.LANDING_PAGE_URL);
    expect(component.find('Field').at(1).props().props.isSubmit).toEqual(false);

    expect(component.find('Field').at(2).props().name).toEqual(valuesNames.RSS_FEED_URL);
    expect(component.find('Field').at(2).props().id).toEqual(valuesNames.RSS_FEED_URL);
    expect(component.find('Field').at(2).props().label).toEqual(valuesLabels.RSS_FEED_URL);
    expect(component.find('Field').at(2).props().props.isSubmit).toEqual(false);

    expect(component.find('Field').at(3).props().name).toEqual(valuesNames.AUTHOR);
    expect(component.find('Field').at(3).props().id).toEqual(valuesNames.AUTHOR);
    expect(component.find('Field').at(3).props().label).toEqual(valuesLabels.AUTHOR);
    expect(component.find('Field').at(3).props().props.disabled).toEqual(true);

    expect(component.find('Field').at(4).props().name).toEqual(valuesNames.DATE_CREATED);
    expect(component.find('Field').at(4).props().label).toEqual(valuesLabels.DATE_CREATED);
    expect(component.find('Field').at(4).props().props.value).toEqual(DATE_TO_USE_TIME);
    expect(component.find('Field').at(4).props().props.format).toEqual(DATE_FORMAT);
    expect(component.find('Field').at(4).props().props.disabled).toEqual(true);
  });

  it('should renders correctly when form is submitted', () => {
    const component = shallow(
      <FeedsDetailForm
        store={store}
        detail={detail}
        isSubmit
      />
    ).dive().dive().dive();

    expect(component).toMatchSnapshot();

    expect(component.find('Field').at(0).props().props.isSubmit).toEqual(true);
    expect(component.find('Field').at(1).props().props.isSubmit).toEqual(true);
    expect(component.find('Field').at(2).props().props.isSubmit).toEqual(true);
  });
});

