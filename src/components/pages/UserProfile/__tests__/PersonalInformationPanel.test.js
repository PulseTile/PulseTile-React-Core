import React from 'react';
import Enzyme, { shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
// import configureStore from 'redux-mock-store';

import ControlPanel from '../ControlPanel';

Enzyme.configure({ adapter: new Adapter() });

// const mockStore = configureStore();
// const storeResource = {};
// const store = mockStore(storeResource);

const testProps = {
	onShow: () => {},
	onExpand: () => {},
	onEdit: () => {},
	onCancel: () => {},
	onSaveSettings: () => {},
	editedPanel: {},
	name: 'changeHistory',
	title: 'Test tile',
	children: null,
	formValues: {},
};

describe('Component <ControlPanel />', () => {
  it('should renders with all props correctly', () => {
    const component = shallow(
      <ControlPanel
				onShow={testProps.onShow}
				onExpand={testProps.onExpand}
				onEdit={testProps.onEdit}
				onCancel={testProps.onCancel}
				onSaveSettings={testProps.onSaveSettings}
				editedPanel={testProps.editedPanel}
				name={testProps.name}
				title={testProps.title}
				children={testProps.children}
				formValues={testProps.formValues}
				isOpen={true}
      />
    );

    expect(component).toMatchSnapshot();

		expect(component.instance().props['onShow']).toEqual(testProps.onShow);
		expect(component.instance().props['onExpand']).toEqual(testProps.onExpand);
		expect(component.instance().props['onEdit']).toEqual(testProps.onEdit);
		expect(component.instance().props['onCancel']).toEqual(testProps.onCancel);
		expect(component.instance().props['onSaveSettings']).toEqual(testProps.onSaveSettings);
		expect(component.instance().props['editedPanel']).toEqual(testProps.editedPanel);
		expect(component.instance().props['name']).toEqual(testProps.name);
		expect(component.instance().props['title']).toEqual(testProps.title);
		expect(component.instance().props['children']).toEqual(testProps.children);
		expect(component.instance().props['formValues']).toEqual(testProps.formValues);
		expect(component.instance().props['isOpen']).toEqual(true);

		expect(component.find('PTButton')).toHaveLength(2);
		expect(component.find('.panel-heading')).toHaveLength(1);
		expect(component.find('.panel-heading').find('PTButton')).toHaveLength(2);
		component.find('.panel-heading').find('PTButton').at(0).simulate('click');
		component.find('.panel-heading').find('PTButton').at(1).simulate('click');
		expect(component.find('.panel-title')).toHaveLength(1);
		expect(component.find('.panel-title').text()).toEqual(testProps.title);
		expect(component.find('.panel-body')).toHaveLength(1);
		expect(component.find('.panel-body').text()).toEqual('');

		// test panel with edit
		component.setProps({ name: 'name'});
		expect(component).toMatchSnapshot();

		expect(component.find('PTButton')).toHaveLength(3);
		expect(component.find('.panel-heading').find('PTButton')).toHaveLength(2);
		expect(component.find('.panel-body').find('PTButton')).toHaveLength(1);
		component.find('.panel-body').find('PTButton').at(0).simulate('click');

		// test panel with confirm edit
		component.setProps({ editedPanel: {'name': true }});
		expect(component).toMatchSnapshot();

		expect(component.find('PTButton')).toHaveLength(4);
		expect(component.find('.panel-heading').find('PTButton')).toHaveLength(2);
		expect(component.find('.panel-body').find('PTButton')).toHaveLength(2);
		component.find('.panel-body').find('PTButton').at(0).simulate('click');
		component.find('.panel-body').find('PTButton').at(1).simulate('click');

		// test applicationPreferences panel with confirm edit
		component.setProps({ name: 'applicationPreferences', editedPanel: {'applicationPreferences': true }});
		expect(component).toMatchSnapshot();

		expect(component.find('PTButton')).toHaveLength(4);
		expect(component.find('.panel-heading').find('PTButton')).toHaveLength(2);
		expect(component.find('.panel-body').find('PTButton')).toHaveLength(2);
		component.find('.panel-body').find('PTButton').at(0).simulate('click');
		component.find('.panel-body').find('PTButton').at(1).simulate('click');
	});
});

