import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import configureStore from 'redux-mock-store';

import TransfersOfCareCreateForm from '../../../src/components/pages/TransfersOfCare/TransfersOfCareCreate/TransfersOfCareCreateForm';
import { valuesNames, valuesLabels } from '../../../src/components/pages/TransfersOfCare/forms.config';

Enzyme.configure({ adapter: new Adapter() });

const mockStore = configureStore();
const store = mockStore({});
const FORM_NAME = 'transfersOfCareCreateForm';
const DATE_FORMAT = 'DD-MMM-YYYY';

const DATE_TO_USE = new Date('2018');
global.Date = jest.fn(() => DATE_TO_USE);

const testProps = {
  detail: {
    dateSubmitted: 1507020019000,
  },
  isSubmit: false,
};

describe('Component <TransfersOfCareCreateForm />', () => {
  it('should renders with props correctly', () => {
    const component = shallow(
      <TransfersOfCareCreateForm
        store={store}
        isSubmit={testProps.isSubmit}
        detail={testProps.detail}
      />).dive().dive().dive().dive();
    expect(component.find('Field')).toHaveLength(7);
    expect(component.find('form')).toHaveLength(1);
    expect(component.find('form').prop('name')).toEqual(FORM_NAME);

    expect(component.find('Field').at(0).props().name).toEqual(valuesNames.FROM);
    expect(component.find('Field').at(0).props().id).toEqual(valuesNames.FROM);
    expect(component.find('Field').at(0).props().label).toEqual(valuesLabels.FROM);
    expect(component.find('Field').at(0).props().placeholder).toEqual('-- Select from --');
    expect(component.find('Field').at(0).props().props.isSubmit).toEqual(false);

    expect(component.find('Field').at(1).props().name).toEqual(valuesNames.TO);
    expect(component.find('Field').at(1).props().id).toEqual(valuesNames.TO);
    expect(component.find('Field').at(1).props().label).toEqual(valuesLabels.TO);
    expect(component.find('Field').at(1).props().placeholder).toEqual('-- Select to --');
    expect(component.find('Field').at(1).props().props.isSubmit).toEqual(false);

    expect(component.find('Field').at(2).props().name).toEqual(valuesNames.DATE_TIME);
    expect(component.find('Field').at(2).props().id).toEqual(valuesNames.DATE_TIME);
    expect(component.find('Field').at(2).props().label).toEqual(valuesLabels.DATE_TIME);
    expect(component.find('Field').at(2).props().showTimeSelect).toEqual(true);
    expect(component.find('Field').at(2).props().props.isSubmit).toEqual(false);
    expect(component.find('Field').at(2).props().props.format).toEqual('DD-MMM-YYYY HH:mm');
    expect(component.find('Field').at(2).props().props.showTimeSelect).toEqual(true);
    expect(component.find('Field').at(2).props().props.timeFormat).toEqual('HH:mm');
    expect(component.find('Field').at(2).props().props.timeIntervals).toEqual(5);

    expect(component.find('Field').at(3).props().name).toEqual(valuesNames.RECORDS);
    expect(component.find('Field').at(3).props().id).toEqual(valuesNames.RECORDS);
    expect(component.find('Field').at(3).props().props.isSubmit).toEqual(false);

    expect(component.find('Field').at(4).props().name).toEqual(valuesNames.REASON);
    expect(component.find('Field').at(4).props().id).toEqual(valuesNames.REASON);
    expect(component.find('Field').at(4).props().label).toEqual(valuesLabels.REASON);
    expect(component.find('Field').at(4).props().props.isSubmit).toEqual(false);

    expect(component.find('Field').at(5).props().name).toEqual(valuesNames.CLINICAL);
    expect(component.find('Field').at(5).props().id).toEqual(valuesNames.CLINICAL);
    expect(component.find('Field').at(5).props().label).toEqual(valuesLabels.CLINICAL);
    expect(component.find('Field').at(5).props().props.isSubmit).toEqual(false);

    expect(component.find('Field').at(6).props().name).toEqual(valuesNames.DATE_CREATED);
    expect(component.find('Field').at(6).props().id).toEqual(valuesNames.DATE_CREATED);
    expect(component.find('Field').at(6).props().label).toEqual(valuesLabels.DATE_CREATED);
    expect(component.find('Field').at(6).props().props.isSubmit).toEqual(false);
    expect(component.find('Field').at(6).props().props.disabled).toEqual(true);
    expect(component.find('Field').at(6).props().props.format).toEqual(DATE_FORMAT);

    expect(component).toMatchSnapshot();
  });

  it('should renders correctly when form is submitted', () => {
    const component = shallow(
      <TransfersOfCareCreateForm
        store={store}
        isSubmit
        detail={testProps.detail}
      />).dive().dive().dive().dive();
    expect(component.find('Field')).toHaveLength(7);
    expect(component.find('form')).toHaveLength(1);
    expect(component.find('form').prop('name')).toEqual(FORM_NAME);

    expect(component.find('Field').at(0).props().props.isSubmit).toEqual(true);
    expect(component.find('Field').at(1).props().props.isSubmit).toEqual(true);
    expect(component.find('Field').at(2).props().props.isSubmit).toEqual(true);
    expect(component.find('Field').at(3).props().props.isSubmit).toEqual(true);
    expect(component.find('Field').at(4).props().props.isSubmit).toEqual(true);
    expect(component.find('Field').at(5).props().props.isSubmit).toEqual(true);
    expect(component.find('Field').at(6).props().props.isSubmit).toEqual(true);

    expect(component).toMatchSnapshot();
  });
});

