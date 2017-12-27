import React from 'react';
import {configure, shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-15';
configure({ adapter: new Adapter() });

import PTCustomCheckbox from '../../../src/components/pages/PatientsSummary/header/PTCustomCheckbox';

const testProps = {
	onChange: () => {},
	title: 'Test title',
	name: 'test-name',
};

describe('Component <PTCustomCheckbox />', () => {
  it('should renders with all props correctly', () => {
    const component = shallow(
        <PTCustomCheckbox
          onChange={testProps.onChange}
          title={testProps.title}
          name={testProps.name}
          isChecked={false}
        />);
		expect(component).toMatchSnapshot();

		expect(component.instance().props['onChange']).toEqual(testProps.onChange);
		expect(component.instance().props['title']).toEqual(testProps.title);
		expect(component.instance().props['name']).toEqual(testProps.name);
		expect(component.instance().props['isChecked']).toEqual(false);
		expect(component.instance().props['disabled']).toEqual(undefined);

    expect(component.find('input')).toHaveLength(1);
    expect(component.find('label')).toHaveLength(2);

    const idInput = `dashboard-${testProps.name}`;
		expect(component.find('input').prop('type')).toEqual('checkbox');
		expect(component.find('input').prop('id')).toEqual(idInput);
		expect(component.find('input').prop('name')).toEqual(idInput);
		expect(component.find('label').at(0).prop('htmlFor')).toEqual(idInput);
		expect(component.find('label').at(1).prop('htmlFor')).toEqual(idInput);

		component.instance().toggleCheckbox();
		component.setProps({ disabled: true});
		expect(component.instance().props['disabled']).toEqual(true);
		component.instance().toggleCheckbox();
  });
});
