import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import configureStore from 'redux-mock-store';

import ContactsDetailForm from '../../../src/components/pages/Contacts/ContactsDetail/ContactsDetailForm';
import { valuesNames, valuesLabels, relationshipOptions, relationshipTypeOptions } from '../../../src/components/pages/Contacts/forms.config';

Enzyme.configure({ adapter: new Adapter() });

const mockStore = configureStore();
const store = mockStore({});
const FORM_NAME = 'contactsDetailForm';
const DATE_FORMAT = 'DD-MMM-YYYY';

const testProps = {
  detail: {
    dateCreated: 1507020019000,
    [valuesNames.REALATIONSHIP_TYPE]: 'Informal carer',
  },
  isSubmit: false,
};

describe('Component <ContactsDetailForm />', () => {
  it('should renders with props correctly', () => {
    const component = shallow(
      <ContactsDetailForm
        store={store}
        isSubmit={testProps.isSubmit}
        detail={testProps.detail}
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
    expect(component.find('Field').at(7).props().props.value).toEqual(testProps.detail.dateCreated);
    expect(component.find('Field').at(7).props().props.format).toEqual(DATE_FORMAT);

    expect(component).toMatchSnapshot();
  });

  it('should renders correctly when form is submitted', () => {
    const component = shallow(
      <ContactsDetailForm
        store={store}
        isSubmit
        detail={{ [valuesNames.REALATIONSHIP_CODE]: 'at0036' }}
      />).dive().dive().dive();
    expect(component.find('Field')).toHaveLength(8);
    expect(component.find('form')).toHaveLength(1);
    expect(component.find('form').prop('name')).toEqual(FORM_NAME);

    expect(component.find('Field').at(0).props().props.isSubmit).toEqual(true);
    expect(component.find('Field').at(1).props().props.isSubmit).toEqual(true);
    expect(component.find('Field').at(2).props().props.isSubmit).toEqual(true);
    expect(component.find('Field').at(4).props().props.isSubmit).toEqual(true);
    expect(component.find('Field').at(5).props().props.isSubmit).toEqual(true);
    expect(component.find('Field').at(6).props().props.isSubmit).toEqual(true);
    expect(component.find('Field').at(7).props().props.isSubmit).toEqual(true);

    expect(component).toMatchSnapshot();
  });
});

