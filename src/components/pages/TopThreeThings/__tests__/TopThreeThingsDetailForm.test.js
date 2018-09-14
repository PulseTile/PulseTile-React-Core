import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import configureStore from 'redux-mock-store';

import TopThreeThingsDetailForm from '../TopThreeThingsDetail/TopThreeThingsDetailForm';
import { valuesNames, valuesLabels } from '../forms.config';
import { getDDMMMYYYY } from '../../../../utils/time-helpers.utils';

Enzyme.configure({ adapter: new Adapter() });

const mockStore = configureStore();
const storeResource = {};
const store = mockStore(storeResource);
const DATE_TO_USE = new Date('2017');
const DATE_TO_USE_TIME = DATE_TO_USE.getTime();
global.Date = jest.fn(() => DATE_TO_USE);

const FORM_NAME = 'topThreeThingsPanelForm';
const DATE_FORMAT = 'DD-MMM-YYYY';

const detail = {
  [valuesNames.DATE]: DATE_TO_USE_TIME,
};

const CONVERT_DATE_CREATED = getDDMMMYYYY(DATE_TO_USE_TIME);

describe('Component <TopThreeThingsDetailForm />', () => {
  it('should renders with all props correctly', () => {
    const component = shallow(
      <TopThreeThingsDetailForm
        store={store}
        detail={detail}
        isSubmit={false}
      />
    ).dive().dive().dive();

    expect(component).toMatchSnapshot();

    expect(component.instance().props.isSubmit).toEqual(false);
    expect(component.find('form')).toHaveLength(1);
    expect(component.find('form').prop('name')).toEqual(FORM_NAME);
    expect(component.find('Field')).toHaveLength(8);

    expect(component.find('Field').at(0).props().name).toEqual(valuesNames.NAME1);
    expect(component.find('Field').at(0).props().label).toEqual(valuesLabels.NAME);
    expect(component.find('Field').at(0).props().type).toEqual('text');
    expect(component.find('Field').at(0).props().props.isSubmit).toEqual(false);

    expect(component.find('Field').at(1).props().name).toEqual(valuesNames.DESCRIPTION1);
    expect(component.find('Field').at(1).props().label).toEqual(valuesLabels.DESCRIPTION);
    expect(component.find('Field').at(1).props().props.isSubmit).toEqual(false);

    expect(component.find('Field').at(2).props().name).toEqual(valuesNames.NAME2);
    expect(component.find('Field').at(2).props().label).toEqual(valuesLabels.NAME);
    expect(component.find('Field').at(2).props().props.isSubmit).toEqual(false);

    expect(component.find('Field').at(3).props().name).toEqual(valuesNames.DESCRIPTION2);
    expect(component.find('Field').at(3).props().label).toEqual(valuesLabels.DESCRIPTION);
    expect(component.find('Field').at(3).props().props.isSubmit).toEqual(false);

    expect(component.find('Field').at(4).props().name).toEqual(valuesNames.NAME3);
    expect(component.find('Field').at(4).props().label).toEqual(valuesLabels.NAME);
    expect(component.find('Field').at(4).props().props.isSubmit).toEqual(false);

    expect(component.find('Field').at(5).props().name).toEqual(valuesNames.DESCRIPTION3);
    expect(component.find('Field').at(5).props().label).toEqual(valuesLabels.DESCRIPTION);
    expect(component.find('Field').at(5).props().props.isSubmit).toEqual(false);

    expect(component.find('Field').at(6).props().name).toEqual(valuesNames.DATE);
    expect(component.find('Field').at(6).props().label).toEqual(valuesLabels.DATE);
    expect(component.find('Field').at(6).props().props.value).toEqual(CONVERT_DATE_CREATED);
    expect(component.find('Field').at(6).props().props.format).toEqual(DATE_FORMAT);
    expect(component.find('Field').at(6).props().props.disabled).toEqual(true);

    expect(component.find('Field').at(7).props().name).toEqual(valuesNames.SOURCE);
    expect(component.find('Field').at(7).props().label).toEqual(valuesLabels.SOURCE);
    expect(component.find('Field').at(7).props().props.disabled).toEqual(true);
  });

  it('should renders correctly when form is submitted', () => {
    const component = shallow(
      <TopThreeThingsDetailForm
        store={store}
        detail={detail}
        isSubmit
      />
    ).dive().dive().dive();

    expect(component).toMatchSnapshot();

    expect(component.find('Field').at(0).props().props.isSubmit).toEqual(true);
    expect(component.find('Field').at(1).props().props.isSubmit).toEqual(true);
    expect(component.find('Field').at(2).props().props.isSubmit).toEqual(true);
    expect(component.find('Field').at(3).props().props.isSubmit).toEqual(true);
    expect(component.find('Field').at(4).props().props.isSubmit).toEqual(true);
    expect(component.find('Field').at(5).props().props.isSubmit).toEqual(true);
  });
});

