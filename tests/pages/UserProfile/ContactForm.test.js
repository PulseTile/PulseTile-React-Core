import React from 'react';
import Enzyme, { shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import configureStore from 'redux-mock-store';

import ContactForm from '../../../src/components/pages/UserProfile/forms/ContactForm';
import { valuesContactForm, valuesContactFormLabels } from '../../../src/components/pages/UserProfile/forms/values-names.config';
import { optionsForCountryField } from '../../../src/components/pages/UserProfile/forms/options-for-select.config';

Enzyme.configure({ adapter: new Adapter() });

const mockStore = configureStore();
const storeResource = {};
const store = mockStore(storeResource);

const FORM_NAME = 'contactForm';

describe('Component <ContactForm />', () => {
  it('should renders with all props correctly', () => {
    const component = shallow(
      <ContactForm
        store={store}
      />
    ).dive().dive().dive();

    expect(component).toMatchSnapshot();

    expect(component.find('form')).toHaveLength(1);
    expect(component.find('form').prop('name')).toEqual(FORM_NAME);
    expect(component.find('Field')).toHaveLength(7);

    expect(component.find('Field').at(0).props().name).toEqual(valuesContactForm.ADDRESS);
		expect(component.find('Field').at(0).props().label).toEqual(valuesContactFormLabels.ADDRESS);
		expect(component.find('Field').at(0).props().type).toEqual('text');

		expect(component.find('Field').at(1).props().name).toEqual(valuesContactForm.CITY);
		expect(component.find('Field').at(1).props().label).toEqual(valuesContactFormLabels.CITY);
		expect(component.find('Field').at(1).props().type).toEqual('text');

		expect(component.find('Field').at(2).props().name).toEqual(valuesContactForm.STATE);
		expect(component.find('Field').at(2).props().label).toEqual(valuesContactFormLabels.STATE);
		expect(component.find('Field').at(2).props().type).toEqual('text');

		expect(component.find('Field').at(3).props().name).toEqual(valuesContactForm.POSTAL_CODE);
		expect(component.find('Field').at(3).props().label).toEqual(valuesContactFormLabels.POSTAL_CODE);
		expect(component.find('Field').at(3).props().type).toEqual('text');

		expect(component.find('Field').at(4).props().name).toEqual(valuesContactForm.SELECT_COUNTRY);
		expect(component.find('Field').at(4).props().label).toEqual(valuesContactFormLabels.SELECT_COUNTRY);
		expect(component.find('Field').at(4).props().options).toEqual(optionsForCountryField);

		expect(component.find('Field').at(5).props().name).toEqual(valuesContactForm.PHONE);
		expect(component.find('Field').at(5).props().label).toEqual(valuesContactFormLabels.PHONE);
		expect(component.find('Field').at(5).props().type).toEqual('text');

		expect(component.find('Field').at(6).props().name).toEqual(valuesContactForm.EMAIL);
		expect(component.find('Field').at(6).props().label).toEqual(valuesContactFormLabels.EMAIL);
	});
});

