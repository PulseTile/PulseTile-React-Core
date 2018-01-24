import React from 'react';
import { configure, shallow, mount } from 'enzyme'
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-15';

configure({ adapter: new Adapter() });

import CustomInputInline from '../../src/components/form-fields/CustomInputInline';

const id = 'test-id';
const className = 'testClass';
const typeCheckbox = 'checkbox';
const typeRadio = 'radio';
const label = 'Test label';
const input = { name: 'test-name', value: true, checked: true };

describe('Component <CustomInputInline />', () => {
  it('should renders with all props correctly', () => {
    const component = shallow(
      <CustomInputInline
        testProps="testProps"
        id={id}
        type={typeCheckbox}
        className={className}
        label={label}
        input={input}
      />);

    expect(component.find('input')).toHaveLength(1);
    expect(component.find('label')).toHaveLength(2);
    expect(component.find('input').prop('type')).toEqual(typeCheckbox);
    expect(component.instance().props.type).toEqual(typeCheckbox);
    expect(component.instance().props.label).toEqual(label);
    expect(component.instance().props.id).toEqual(id);
    expect(component.instance().props.input).toEqual(input);
    expect(component.instance().props.className).toEqual(className);

    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });

  it('should renders without label prop correctly', () => {
    const component = shallow(
      <CustomInputInline
        id={id}
        type={typeRadio}
        label={label}
        input={input}
      />);

    expect(component.find('input')).toHaveLength(1);
    expect(component.find('input').prop('type')).toEqual(typeRadio);
    expect(component.instance().props.type).toEqual(typeRadio);
    expect(component.find('.fcustominp + label').prop('className')).toEqual(undefined);

    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });
});
