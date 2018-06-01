import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import configureStore from 'redux-mock-store';

import PromsCreateForm from '../PromsCreate/PromsCreateForm';
import { valuesNames, valuesLabels } from '../forms.config';

Enzyme.configure({ adapter: new Adapter() });

const mockStore = configureStore();
const store = mockStore({});
const FORM_NAME = 'promsCreateForm';
const DATE_FORMAT = 'DD-MMM-YYYY';

const DATE_TO_USE = new Date('2018');
global.Date = jest.fn(() => DATE_TO_USE);

const testProps = {
  detail: {
    dateCreated: 1507020019000,
  },
  isSubmit: false,
  changeScoreStatus: (value) => value,
};

describe('Component <PromsCreateForm />', () => {
  it('should renders with props correctly', () => {
    const component = shallow(
      <PromsCreateForm
        store={store}
        isSubmit={testProps.isSubmit}
        detail={testProps.detail}
        changeScoreStatus={testProps.changeScoreStatus}
      />).dive().dive().dive();
    expect(component.find('Field')).toHaveLength(10);
    expect(component.find('form')).toHaveLength(1);
    expect(component.find('form').prop('name')).toEqual(FORM_NAME);

    expect(component.find('Field').at(0).props().name).toEqual(valuesNames.NAME);
    expect(component.find('Field').at(0).props().id).toEqual(valuesNames.NAME);
    expect(component.find('Field').at(0).props().label).toEqual(valuesLabels.NAME);
    expect(component.find('Field').at(0).props().props.isSubmit).toEqual(false);

    expect(component.find('Field').at(1).props().name).toEqual(valuesNames.RECORDS);
    expect(component.find('Field').at(1).props().id).toEqual(valuesNames.RECORDS);
    expect(component.find('Field').at(1).props().props.isSubmit).toEqual(false);

    expect(component.find('Field').at(2).props().name).toEqual(valuesNames.SPECIFIC_Q1);
    expect(component.find('Field').at(2).props().id).toEqual(valuesNames.SPECIFIC_Q1);
    expect(component.find('Field').at(2).props().label).toEqual(valuesLabels.QUESTION_1);
    expect(component.find('Field').at(2).props().placeholder).toEqual('-- Select --');
    expect(component.find('Field').at(2).props().props.isSubmit).toEqual(false);

    expect(component.find('Field').at(3).props().name).toEqual(valuesNames.SPECIFIC_Q2);
    expect(component.find('Field').at(3).props().id).toEqual(valuesNames.SPECIFIC_Q2);
    expect(component.find('Field').at(3).props().label).toEqual(valuesLabels.QUESTION_2);
    expect(component.find('Field').at(3).props().placeholder).toEqual('-- Select --');
    expect(component.find('Field').at(3).props().props.isSubmit).toEqual(false);

    expect(component.find('Field').at(4).props().name).toEqual(valuesNames.SPECIFIC_Q3);
    expect(component.find('Field').at(4).props().id).toEqual(valuesNames.SPECIFIC_Q3);
    expect(component.find('Field').at(4).props().label).toEqual(valuesLabels.QUESTION_3);
    expect(component.find('Field').at(4).props().placeholder).toEqual('-- Select --');
    expect(component.find('Field').at(4).props().props.isSubmit).toEqual(false);

    expect(component.find('Field').at(5).props().name).toEqual(valuesNames.SPECIFIC_Q4);
    expect(component.find('Field').at(5).props().id).toEqual(valuesNames.SPECIFIC_Q4);
    expect(component.find('Field').at(5).props().label).toEqual(valuesLabels.QUESTION_4);
    expect(component.find('Field').at(5).props().placeholder).toEqual('-- Select --');
    expect(component.find('Field').at(5).props().props.isSubmit).toEqual(false);

    expect(component.find('Field').at(6).props().name).toEqual(valuesNames.SPECIFIC_Q5);
    expect(component.find('Field').at(6).props().id).toEqual(valuesNames.SPECIFIC_Q5);
    expect(component.find('Field').at(6).props().label).toEqual(valuesLabels.QUESTION_5);
    expect(component.find('Field').at(6).props().placeholder).toEqual('-- Select --');
    expect(component.find('Field').at(6).props().props.isSubmit).toEqual(false);

    expect(component.find('Field').at(7).props().name).toEqual(valuesNames.SCORE);
    expect(component.find('Field').at(7).props().props.min).toEqual(0);
    expect(component.find('Field').at(7).props().props.max).toEqual(100);
    expect(component.find('Field').at(7).props().props.defaultValue).toEqual(0);

    expect(component.find('Field').at(8).props().name).toEqual(valuesNames.AUTHOR);
    expect(component.find('Field').at(8).props().id).toEqual(valuesNames.AUTHOR);
    expect(component.find('Field').at(8).props().label).toEqual(valuesLabels.AUTHOR);
    expect(component.find('Field').at(8).props().props.disabled).toEqual(true);

    expect(component.find('Field').at(9).props().name).toEqual(valuesNames.DATE_CREATED);
    expect(component.find('Field').at(9).props().id).toEqual(valuesNames.DATE_CREATED);
    expect(component.find('Field').at(9).props().label).toEqual(valuesLabels.DATE_CREATED);
    expect(component.find('Field').at(9).props().props.isSubmit).toEqual(false);
    expect(component.find('Field').at(9).props().props.disabled).toEqual(true);
    expect(component.find('Field').at(9).props().props.format).toEqual(DATE_FORMAT);

    expect(component.find('FormTitle').at(0).props().text).toEqual('Specific Question');
    expect(component.find('FormTitle').at(1).props().text).toEqual('General Score');

    expect(component).toMatchSnapshot();
  });

  it('should renders correctly when form is submitted', () => {
    const component = shallow(
      <PromsCreateForm
        store={store}
        isSubmit
        detail={testProps.detail}
        changeScoreStatus={testProps.changeScoreStatus}
      />).dive().dive().dive();
    expect(component.find('Field')).toHaveLength(10);
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

