import React from 'react';
import Enzyme, { shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import configureStore from 'redux-mock-store';

import AppSettingsForm from '../forms/AppSettingsForm';
import { valuesSettingsForm, valuesSettingsFormLabels } from '../forms/values-names.config';
import { optionsForThemesField } from '../forms/options-for-select.config';

Enzyme.configure({ adapter: new Adapter() });

const mockStore = configureStore();
const storeResource = {};
const store = mockStore(storeResource);

const FORM_NAME = 'appSettingsForm';

const patientsInfo = {
	title: 'ripple',
	logoB64: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAAA5CAYAAACMERbpAAAKPWlDQ1BpY2MAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN/rXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH/w/qQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1',
	themeColor: 'green',
	browserTitle: 'PulseTile',
};


describe('Component <AppSettingsForm />', () => {
  it('should renders with all props correctly', () => {
    const component = shallow(
      <AppSettingsForm
        store={store}
        patientsInfo={patientsInfo}
      />
    ).dive().dive().dive();

    expect(component).toMatchSnapshot();

    expect(component.find('form')).toHaveLength(1);
    expect(component.find('form').prop('name')).toEqual(FORM_NAME);
    expect(component.find('Field')).toHaveLength(4);

    expect(component.find('Field').at(0).props().name).toEqual(valuesSettingsForm.APP_TITLE);
		expect(component.find('Field').at(0).props().label).toEqual(valuesSettingsFormLabels.APP_TITLE);
		expect(component.find('Field').at(0).props().type).toEqual('text');

		expect(component.find('Field').at(1).props().name).toEqual(valuesSettingsForm.LOGO_PATH);
		expect(component.find('Field').at(1).props().label).toEqual(valuesSettingsFormLabels.LOGO_PATH);
		expect(component.find('Field').at(1).props().id).toEqual(valuesSettingsForm.LOGO_PATH);

		expect(component.find('Field').at(2).props().name).toEqual(valuesSettingsForm.SELECT_THEME);
		expect(component.find('Field').at(2).props().label).toEqual(valuesSettingsFormLabels.SELECT_THEME);
		expect(component.find('Field').at(2).props().options).toEqual(optionsForThemesField);

		expect(component.find('Field').at(3).props().name).toEqual(valuesSettingsForm.BROWSER_TITLE);
		expect(component.find('Field').at(3).props().label).toEqual(valuesSettingsFormLabels.BROWSER_TITLE);
		expect(component.find('Field').at(3).props().type).toEqual('text');

		component.instance().setThemeHook(() => {})('green');
	});
});

