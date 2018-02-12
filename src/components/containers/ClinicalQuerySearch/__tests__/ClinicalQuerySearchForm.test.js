import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import configureStore from 'redux-mock-store';

import ClinicalQuerySearchForm from '../ClinicalQuerySearchForm/ClinicalQuerySearchForm';
import { valuesNames, valuesLabels, optionsForSearchType, optionsForSearchQuery, optionsForAgeField } from '../forms.config';

Enzyme.configure({ adapter: new Adapter() });

const mockStore = configureStore();
const store = mockStore({});
const formValuesWithBirthday = {
  selectAgeField: 'birthday',
};
const FORM_NAME = 'clinicalQuerySearchForm';

describe('Component <ClinicalQuerySearchForm />', () => {
  it('should renders with props correctly when select range', () => {
    const component = shallow(
      <ClinicalQuerySearchForm
        store={store}
      />).dive().dive().dive();

    expect(component.find('Field')).toHaveLength(7);
    expect(component.find('form')).toHaveLength(1);
    expect(component.find('form').prop('name')).toEqual(FORM_NAME);

    expect(component.find('Field').at(0).props().name).toEqual(valuesNames.SEARCH_TYPE);
    expect(component.find('Field').at(0).props().label).toEqual(valuesLabels.SEARCH_TYPE);
    expect(component.find('Field').at(0).props().options).toEqual(optionsForSearchType);

    expect(component.find('Field').at(1).props().name).toEqual(valuesNames.QUERY_CONTAINS);
    expect(component.find('Field').at(1).props().label).toEqual(valuesLabels.QUERY_CONTAINS);
    expect(component.find('Field').at(1).props().options).toEqual(optionsForSearchQuery);

    expect(component.find('Field').at(2).props().name).toEqual(valuesNames.QUERY_TEXT);
    expect(component.find('Field').at(2).props().label).toEqual(valuesLabels.QUERY_TEXT);

    expect(component.find('Field').at(3).props().name).toEqual(valuesNames.SELECT_AGE);
    expect(component.find('Field').at(3).props().label).toEqual(valuesLabels.SELECT_AGE);
    expect(component.find('Field').at(3).props().options).toEqual(optionsForAgeField);

    expect(component.find('Field').at(4).props().name).toEqual(valuesNames.AGE_RANGE);
    expect(component.find('Field').at(4).props().label).toEqual(`${valuesLabels.AGE_RANGE} (Years)`);

    expect(component.find('Field').at(5).props().name).toEqual(valuesNames.MALE);
    expect(component.find('Field').at(5).props().label).toEqual(valuesLabels.MALE);
    expect(component.find('Field').at(5).props().type).toEqual('checkbox');

    expect(component.find('Field').at(6).props().name).toEqual(valuesNames.FEMALE);
    expect(component.find('Field').at(6).props().label).toEqual(valuesLabels.FEMALE);
    expect(component.find('Field').at(6).props().type).toEqual('checkbox');

    expect(component).toMatchSnapshot();
  });

  it('should renders with props correctly when select range', () => {
    const component = shallow(
      <ClinicalQuerySearchForm
        store={store}
        formValues={formValuesWithBirthday}
      />).dive().dive().dive();

    expect(component.find('Field')).toHaveLength(7);
    expect(component.find('form')).toHaveLength(1);
    expect(component.find('form').prop('name')).toEqual(FORM_NAME);

    expect(component.find('Field').at(3).props().name).toEqual(valuesNames.SELECT_AGE);
    expect(component.find('Field').at(3).props().label).toEqual(valuesLabels.SELECT_AGE);
    expect(component.find('Field').at(3).props().options).toEqual(optionsForAgeField);

    expect(component.find('Field').at(4).props().name).toEqual(valuesNames.DATE_OF_BIRTH);
    expect(component.find('Field').at(4).props().label).toEqual(valuesLabels.DATE_OF_BIRTH);
    expect(component.find('Field').at(4).props().placeholder).toEqual('03/08/1970');
    expect(component.find('Field').at(4).props().props.format).toEqual('MM/DD/YYYY');

    expect(component).toMatchSnapshot();
  });
});

