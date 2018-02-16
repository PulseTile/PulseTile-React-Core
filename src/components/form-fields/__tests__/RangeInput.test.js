import React from 'react';
import { configure, shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-15';

import RangeInput from '../RangeInput';

configure({ adapter: new Adapter() });

const testProps = {
  label: 'Test label',
  input: {
    name: 'test-name',
    value: [0, 100],
    onChange: () => {},
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


    expect(component.instance().props.label).toEqual(testProps.label);
    expect(component.instance().props.input).toEqual(testProps.input);

    expect(component).toMatchSnapshot();
  });

  it('should renders with all props correctly shallow testing', () => {
    const component = shallow(
      <RangeInput
        label={testProps.label}
        input={{
          name: 'test-name',
          value: [],
          onChange: () => {},
        }}
      />);

    expect(component).toMatchSnapshot();
  });
});
