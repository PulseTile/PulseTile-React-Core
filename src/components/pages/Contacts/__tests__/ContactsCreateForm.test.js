import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import configureStore from 'redux-mock-store';

import ContactsCreateForm from '../ContactsCreate/ContactsCreateForm';
import {valuesNames, valuesLabels, relationshipOptions, relationshipTypeOptions} from '../forms.config';
import { getDDMMMYYYY } from '../../../../utils/time-helpers.utils';

Enzyme.configure({ adapter: new Adapter() });

const mockStore = configureStore();
const store = mockStore({});
const DATE_TO_USE = new Date('2017');
const DATE_TO_USE_TIME = DATE_TO_USE.getTime();
global.Date = jest.fn(() => DATE_TO_USE);

const CONVERT_DATE = getDDMMMYYYY(DATE_TO_USE_TIME);

const FORM_NAME = 'contactsCreateForm';
const DATE_FORMAT = 'DD-MMM-YYYY';

const testProps = {
  isSubmit: false,
};

describe('Component <ContactsCreateForm />', () => {
  it('should renders with props correctly', () => {
    const component = shallow(
      <ContactsCreateForm
        store={store}
        isSubmit={testProps.isSubmit}
      />).dive().dive().dive();

    expect(component.find('Field')).toHaveLength(8);
    expect(component.find('form')).toHaveLength(1);
    expect(component.find('form').prop('name')).toEqual(FORM_NAME);

    expect(component.find('Field').at(0).props().name).toEqual(valuesNames.NAME);
    expect(component.find('Field').at(0).props().id).toEqual(valuesNames.NAME);
    expect(component.find('Field').at(0).props().label).toEqual(valuesLabels.NAME);
    expect(component.find('Field').at(0).props().props.isSubmit).toEqual(false);

    expect(component.find('Field').at(1).props().name).toEqual(valuesNames.REALATIONSHIP);
    expect(component.find('Field').at(1).props().id).toEqual(valuesNames.REALATIONSHIP);
    expect(component.find('Field').at(1).props().label).toEqual(valuesLabels.REALATIONSHIP);
    expect(component.find('Field').at(1).props().props.isSubmit).toEqual(false);
    expect(component.find('Field').at(1).props().options).toEqual(relationshipOptions);

    expect(component.find('Field').at(2).props().name).toEqual(valuesNames.NEXT_OF_KIN);
    expect(component.find('Field').at(2).props().id).toEqual(valuesNames.NEXT_OF_KIN);
    expect(component.find('Field').at(2).props().label).toEqual(valuesLabels.NEXT_OF_KIN);
    expect(component.find('Field').at(2).props().type).toEqual('checkbox');
    expect(component.find('Field').at(2).props().props.isSubmit).toEqual(false);

    expect(component.find('Field').at(3).props().name).toEqual(valuesNames.REALATIONSHIP_CODE);
    expect(component.find('Field').at(3).props().id).toEqual(valuesNames.REALATIONSHIP_CODE);
    expect(component.find('Field').at(3).props().label).toEqual(valuesLabels.REALATIONSHIP_TYPE);
    expect(component.find('Field').at(3).props().options).toEqual(relationshipTypeOptions);
    expect(component.find('Field').at(3).props().props.isSubmit).toEqual(false);

    expect(component.find('Field').at(4).props().name).toEqual(valuesNames.CONTACT_INFORMATION);
    expect(component.find('Field').at(4).props().id).toEqual(valuesNames.CONTACT_INFORMATION);
    expect(component.find('Field').at(4).props().label).toEqual(valuesLabels.CONTACT_INFORMATION);
    expect(component.find('Field').at(4).props().props.isSubmit).toEqual(false);

    expect(component.find('Field').at(5).props().name).toEqual(valuesNames.NOTES);
    expect(component.find('Field').at(5).props().id).toEqual(valuesNames.NOTES);
    expect(component.find('Field').at(5).props().label).toEqual(valuesLabels.NOTES);
    expect(component.find('Field').at(5).props().props.isSubmit).toEqual(false);

    expect(component.find('Field').at(6).props().name).toEqual(valuesNames.AUTHOR);
    expect(component.find('Field').at(6).props().id).toEqual(valuesNames.AUTHOR);
    expect(component.find('Field').at(6).props().label).toEqual(valuesLabels.AUTHOR);
    expect(component.find('Field').at(6).props().props.isSubmit).toEqual(false);
    expect(component.find('Field').at(6).props().props.disabled).toEqual(true);

    expect(component.find('Field').at(7).props().name).toEqual(valuesNames.DATE);
    expect(component.find('Field').at(7).props().id).toEqual(valuesNames.DATE);
    expect(component.find('Field').at(7).props().label).toEqual(valuesLabels.DATE);
    expect(component.find('Field').at(7).props().props.isSubmit).toEqual(false);
    expect(component.find('Field').at(7).props().props.disabled).toEqual(true);
    expect(component.find('Field').at(7).props().props.value).toEqual(CONVERT_DATE);
    expect(component.find('Field').at(7).props().props.format).toEqual(DATE_FORMAT);

    expect(component).toMatchSnapshot();
  });

  it('should renders correctly when form is submitted', () => {
    const component = shallow(
      <ContactsCreateForm
        store={store}
        isSubmit
      />).dive().dive().dive();
    expect(component.find('Field')).toHaveLength(8);
    expect(component.find('form')).toHaveLength(1);
    expect(component.find('form').prop('name')).toEqual(FORM_NAME);

    expect(component.find('Field').at(0).props().props.isSubmit).toEqual(true);
    expect(component.find('Field').at(1).props().props.isSubmit).toEqual(true);
    expect(component.find('Field').at(2).props().props.isSubmit).toEqual(true);
    expect(component.find('Field').at(3).props().props.isSubmit).toEqual(true);
    expect(component.find('Field').at(4).props().props.isSubmit).toEqual(true);
    expect(component.find('Field').at(5).props().props.isSubmit).toEqual(true);
    expect(component.find('Field').at(6).props().props.isSubmit).toEqual(true);
    expect(component.find('Field').at(7).props().props.isSubmit).toEqual(true);

    expect(component).toMatchSnapshot();
  });
});

