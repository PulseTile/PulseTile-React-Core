import React from 'react';
import Enzyme, { shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import configureStore from 'redux-mock-store';

import PersonalForm from '../forms/PersonalForm';
import { valuesPersonalForm, valuesPersonalFormLabels } from '../forms.config';
import { optionsForGenderField } from '../forms/options-for-select.config';

Enzyme.configure({ adapter: new Adapter() });

const mockStore = configureStore();
const storeResource = {};
const store = mockStore(storeResource);

const FORM_NAME = 'personalForm';
const DATE_FORMAT = 'DD-MMM-YYYY';


describe('Component <PersonalForm />', () => {
  it('should renders with all props correctly', () => {
    const component = shallow(
      <PersonalForm
        store={store}
      />
    ).dive().dive().dive();

    expect(component).toMatchSnapshot();

    expect(component.find('form')).toHaveLength(1);
    expect(component.find('form').prop('name')).toEqual(FORM_NAME);
    expect(component.find('Field')).toHaveLength(6);

    expect(component.find('Field').at(0).props().name).toEqual(valuesPersonalForm.FIRST_NAME);
		expect(component.find('Field').at(0).props().label).toEqual(valuesPersonalFormLabels.FIRST_NAME);
		expect(component.find('Field').at(0).props().type).toEqual('text');

		expect(component.find('Field').at(1).props().name).toEqual(valuesPersonalForm.LAST_NAME);
		expect(component.find('Field').at(1).props().label).toEqual(valuesPersonalFormLabels.LAST_NAME);
		expect(component.find('Field').at(1).props().type).toEqual('text');

		expect(component.find('Field').at(2).props().name).toEqual(valuesPersonalForm.NHS_NUMBER);
		expect(component.find('Field').at(2).props().label).toEqual(valuesPersonalFormLabels.NHS_NUMBER);
		expect(component.find('Field').at(2).props().type).toEqual('text');

		expect(component.find('Field').at(3).props().name).toEqual(valuesPersonalForm.DATE_OF_BIRTH);
		expect(component.find('Field').at(3).props().label).toEqual(valuesPersonalFormLabels.DATE_OF_BIRTH);
		expect(component.find('Field').at(3).props().props.format).toEqual(DATE_FORMAT);

		expect(component.find('Field').at(4).props().name).toEqual(valuesPersonalForm.SELECT_GENDER);
		expect(component.find('Field').at(4).props().label).toEqual(valuesPersonalFormLabels.SELECT_GENDER);
		expect(component.find('Field').at(4).props().options).toEqual(optionsForGenderField);

		expect(component.find('Field').at(5).props().name).toEqual(valuesPersonalForm.DOCTOR);
		expect(component.find('Field').at(5).props().label).toEqual(valuesPersonalFormLabels.DOCTOR);
		expect(component.find('Field').at(5).props().type).toEqual('text');
	});
});

