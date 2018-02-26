import React from 'react';
import { configure, shallow, mount } from 'enzyme'
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-15';

configure({ adapter: new Adapter() });

import StaticFormField from '../StaticFormField';

const testProps = {
  label: 'Test label',
  input: { name: 'test-name', value: 'Input Value' },
  className: 'test-class-name',
};

describe('Component <StaticFormField />', () => {
  it('should renders with all props correctly', () => {
    const component = shallow(
      <StaticFormField
        label={testProps.label}
        input={testProps.input}
        className={testProps.className}
      />);

    expect(component.find('input')).toHaveLength(0);
    expect(component.find('label')).toHaveLength(1);
    expect(component.find('label.control-label').text()).toEqual(testProps.label);
    expect(component.find(`div.${testProps.className}`)).toHaveLength(1);
    expect(component.find(`div.${testProps.className}`).text()).toEqual(testProps.input.value);


    expect(component.instance().props.label).toEqual(testProps.label);
    expect(component.instance().props.input).toEqual(testProps.input);
    expect(component.instance().props.className).toEqual(testProps.className);

    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });
});
