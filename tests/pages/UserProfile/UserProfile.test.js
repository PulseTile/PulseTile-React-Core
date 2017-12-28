import React from 'react';
import Enzyme, { shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import configureStore from 'redux-mock-store';

Enzyme.configure({ adapter: new Adapter() });

import UserProfile from '../../../src/components/pages/UserProfile/UserProfile';
import { valuesSettingsFormLabels, valuesPersonalFormLabels, valuesContactFormLabels } from '../../../src/components/pages/UserProfile/forms/values-names.config';
import themes from '../../../src/components/pages/UserProfile/theme-config';

const patientsInfo = {
	title: 'ripple',
	logoB64: 'data:image/gif;base64,R0lGODlhDwAPAKECAAAAzMzM/////wAAACwAAAAADwAPAAACIISPeQHsrZ5ModrLlN48CXF8m2iQ3YmmKqVlRtW4MLwWACH+H09wdGltaXplZCBieSBVbGVhZCBTbWFydFNhdmVyIQAAOw==',
	themeColor: 'green',
	browserTitle: 'PulseTile',
};
const patientsInfoForPurpleTheme = {
	title: 'ripple',
	logoB64: '',
	themeColor: 'purple',
	browserTitle: 'PulseTile',
};

const mockStore = configureStore();
const store = mockStore({ patientsInfo });
const storeForPurpleTheme = mockStore({ patientsInfo: patientsInfoForPurpleTheme });

const match = {
	params: {},
	path: `/profile`,
	url: `/profile`,
};

const context = {
	router: {
		history: {
			replace: () => {},
			location: {
				pathname: `/profile`,
			},
		},
		match: match,
		patientsInfo: patientsInfo
	},
};

describe('Component <UserProfile />', () => {
	it('should renders with all props correctly', () => {
		const component = shallow(
			<UserProfile
				store={store}
				match={match}
			/>, { context }).dive().dive();

    expect(component).toMatchSnapshot();

		expect(component.find('PersonalInformationPanel')).toHaveLength(4);
		expect(component.find('ReduxForm')).toHaveLength(0);

		const panelApp = component.find('PersonalInformationPanel').at(0);
		const panelPersonal = component.find('PersonalInformationPanel').at(1);
		const panelContact = component.find('PersonalInformationPanel').at(2);
		const panelHistory = component.find('PersonalInformationPanel').at(3);
		const colorName = themes[patientsInfo.themeColor] ? themes[patientsInfo.themeColor].name : themes.default.name;

		expect(panelApp.find('.control-label').at(0).text()).toEqual(valuesSettingsFormLabels.APP_TITLE);
		expect(panelApp.find('.control-label').at(1).text()).toEqual(valuesSettingsFormLabels.LOGO_PATH);
		expect(panelApp.find('.control-label').at(2).text()).toEqual(valuesSettingsFormLabels.SELECT_THEME_ONE);
		expect(panelApp.find('.control-label').at(3).text()).toEqual(valuesSettingsFormLabels.BROWSER_TITLE);

		expect(panelApp.find('.form-control-static').at(0).text()).toEqual(patientsInfo.title);
		expect(panelApp.find('img').props()['src']).toEqual(patientsInfo.logoB64);
		expect(panelApp.find('.palette-color-name').text()).toEqual(colorName);
		expect(panelApp.find('.form-control-static').at(2).text()).toEqual(patientsInfo.browserTitle);

		expect(panelPersonal.find('.control-label').at(0).text()).toEqual(valuesPersonalFormLabels.FIRST_NAME);
		expect(panelPersonal.find('.control-label').at(1).text()).toEqual(valuesPersonalFormLabels.LAST_NAME);
		expect(panelPersonal.find('.control-label').at(2).text()).toEqual(valuesPersonalFormLabels.NHS_NUMBER);
		expect(panelPersonal.find('.control-label').at(3).text()).toEqual(valuesPersonalFormLabels.DATE_OF_BIRTH);
		expect(panelPersonal.find('.control-label').at(4).text()).toEqual(valuesPersonalFormLabels.SELECT_GENDER);
		expect(panelPersonal.find('.control-label').at(5).text()).toEqual(valuesPersonalFormLabels.DOCTOR);

		expect(panelContact.find('.control-label').at(0).text()).toEqual(valuesContactFormLabels.ADDRESS);
		expect(panelContact.find('.control-label').at(1).text()).toEqual(valuesContactFormLabels.CITY);
		expect(panelContact.find('.control-label').at(2).text()).toEqual(valuesContactFormLabels.STATE);
		expect(panelContact.find('.control-label').at(3).text()).toEqual(valuesContactFormLabels.POSTAL_CODE);
		expect(panelContact.find('.control-label').at(4).text()).toEqual(valuesContactFormLabels.SELECT_COUNTRY);
		expect(panelContact.find('.control-label').at(5).text()).toEqual(valuesContactFormLabels.PHONE);
		expect(panelContact.find('.control-label').at(6).text()).toEqual(valuesContactFormLabels.EMAIL);

		expect(panelHistory.find('.panel-body-inner')).toHaveLength(2);
		expect(panelHistory.find('.form-group')).toHaveLength(4);
	});

	it('should renders correctly when open Edit Panel of Application Preferences', () => {
		const component = shallow(
			<UserProfile
				store={store}
				match={match}
			/>, { context }).dive().dive();
		component.setState({ editedPanel: {applicationPreferences: true} });

		expect(component).toMatchSnapshot();

		expect(component.find('PersonalInformationPanel')).toHaveLength(4);
		expect(component.find('ReduxForm')).toHaveLength(1);
		expect(component.find('PersonalInformationPanel').at(0).find('ReduxForm')).toHaveLength(1);
	});

	it('should renders correctly when open Edit Panel of Personal Information', () => {
		const component = shallow(
			<UserProfile
				store={store}
				match={match}
			/>, { context }).dive().dive();
		component.setState({ editedPanel: {personalInformation: true} });

		expect(component).toMatchSnapshot();

		expect(component.find('PersonalInformationPanel')).toHaveLength(4);
		expect(component.find('ReduxForm')).toHaveLength(1);
		expect(component.find('PersonalInformationPanel').at(1).find('ReduxForm')).toHaveLength(1);
	});

	it('should renders correctly when open Edit Panel of Contact Information', () => {
		const component = shallow(
			<UserProfile
				store={store}
				match={match}
			/>, { context }).dive().dive();
		component.setState({ editedPanel: {contactInformation: true} });

		expect(component).toMatchSnapshot();

		expect(component.find('PersonalInformationPanel')).toHaveLength(4);
		expect(component.find('ReduxForm')).toHaveLength(1);
		expect(component.find('PersonalInformationPanel').at(2).find('ReduxForm')).toHaveLength(1);

	});

	it('should work all methods of component', () => {
		const component = shallow(
			<UserProfile
				store={store}
				match={match}
			/>, { context }).dive().dive();

		component.instance().handleShow('applicationPreferences');
		expect(component.state().openedPanel).toEqual('applicationPreferences');
		component.instance().handleShow('personalInformation');
		expect(component.state().openedPanel).toEqual('personalInformation');

		expect(component.state().expandedPanel).toEqual('all');
		component.instance().handleExpand('applicationPreferences');
		expect(component.state().expandedPanel).toEqual('applicationPreferences');
		component.instance().handleExpand('applicationPreferences');
		expect(component.state().expandedPanel).toEqual('all');

		expect(!!component.state().editedPanel.applicationPreferences).toEqual(false);
		component.instance().handleEdit('applicationPreferences');
		expect(component.state().editedPanel.applicationPreferences).toEqual(true);
		component.instance().handleCancel('applicationPreferences');
		expect(component.state().editedPanel.applicationPreferences).toEqual(false);

		component.setProps({ formState: {syncErrors: {title: 'title'}} });
		component.instance().handleSaveSettingsForm(patientsInfo, 'applicationPreferences');
		component.setProps({ formState: {syncErrors: {browserTitle: 'title'}} });
		component.instance().handleSaveSettingsForm(patientsInfo, 'applicationPreferences');
		component.setProps({ formState: {syncErrors: {}} });
		component.instance().handleSaveSettingsForm(patientsInfo, 'applicationPreferences');
	});

	it('should renders correctly when theme is Purple', () => {
		const component = shallow(
			<UserProfile
				store={storeForPurpleTheme}
				match={match}
			/>, { context }).dive().dive();

		expect(component.find('PersonalInformationPanel').at(0).find('.palette-color-name').text()).toEqual(themes.purple.name);
	});
});