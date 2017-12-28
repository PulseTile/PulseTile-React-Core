import React from 'react';
import {configure, shallow, mount} from 'enzyme'
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-15';
configure({ adapter: new Adapter() });

import RangeInput from '../../src/components/form-fields/RangeInput';

const testProps = {
  label: 'Test label',
  input: {
    name: 'test-name',
    value: 'Input Value',
    onChange: () => {}
  },
};

describe('Component <RangeInput />', () => {
  it('should renders with all props correctly', () => {
    const component = mount(
        <RangeInput
          label={testProps.label}
          input={testProps.input}
        />);

    // expect(component.find('Range')).toHaveLength(1);
    expect(component.find('label')).toHaveLength(1);
    expect(component.find('label.control-label').text()).toEqual(testProps.label);
    expect(component.find('label.control-label').prop('htmlFor')).toEqual(testProps.input.name);


    expect(component.instance().props['label']).toEqual(testProps.label);
    expect(component.instance().props['input']).toEqual(testProps.input);

    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });
});
