import React from 'react';
import {configure, shallow, mount} from 'enzyme'
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-15';
configure({ adapter: new Adapter() });

import CustomInputCheckbox from '../../src/components/form-fields/CustomInputCheckbox';

const id = 'test-id';
const label = 'Test label';
const input = {name: 'test-name', value: true, checked: true};

describe('Component <CustomInputCheckbox />', () => {
  it('should renders with all props correctly', () => {
    const component = shallow(
        <CustomInputCheckbox
          testProps='testProps'
          id={id}
          label={label}
          input={input}
        />);

    expect(component.find('input')).toHaveLength(1);
    expect(component.find('label')).toHaveLength(2);
    expect(component.find('input').prop('type')).toEqual('checkbox');
    expect(component.instance().props['label']).toEqual(label);
    expect(component.instance().props['id']).toEqual(id);
    expect(component.instance().props['input']).toEqual(input);

    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });

  it('should renders without label prop correctly', () => {
    const component = shallow(
        <CustomInputCheckbox
          id={id}
          input={input}
        />);

    expect(component.find('input')).toHaveLength(1);
    expect(component.find('label')).toHaveLength(1);
    expect(component.instance().props['label']).toEqual(undefined);

    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });

  it('should renders without id prop correctly', () => {
    const component = shallow(
        <CustomInputCheckbox
          label={label}
          input={input}
        />);

    expect(component.find('input')).toHaveLength(1);
    expect(component.instance().props['id']).toEqual(undefined);

    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });

  it('should renders after change props', () => {
    const component = mount(
      <CustomInputCheckbox
        id={id}
        input={input}
      />);

    let tree = toJson(component);
    expect(tree).toMatchSnapshot();
    expect(component.instance().props['input']).toEqual(input);

    const nextProps = {name: 'test-name', value: false, checked: false}
    component.setProps({ input: nextProps});
    tree = toJson(component);
    expect(tree).toMatchSnapshot();
    expect(component.instance().props['input']).toEqual(nextProps);
  });
});
