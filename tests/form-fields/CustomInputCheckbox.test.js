import React from 'react';
// import renderer from 'react-test-renderer';
import {configure, shallow, mount} from 'enzyme'
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-15';
configure({ adapter: new Adapter() });

import CustomInputCheckbox from '../../src/components/form-fields/CustomInputCheckbox';

const id = 'test-id';
const label = 'Test label';
const input = {name: 'test-name', value: true};

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

  // it('changes the text after click', () => {
  //   // Render a checkbox with label in the document
  //   const component = mount(
  //     <CustomInputCheckbox
  //       id={id}
  //       input={input}
  //     />);
  //
  //   const inputEl = component.find('input');
  //   const inputEl = () => component.find('input');
  //
  //   expect(inputEl().props().checked).toEqual(true);
  //   inputEl().toNotBe.checked();
  //   inputEl().simulate('change', {target: {checked: true}});
  //   expect(inputEl().props().checked).toEqual(false);
  //   var checkbox = () => wrapper.find('input');
  //   checkbox().should.not.be.checked();
  //   checkbox().simulate('change', {target: {checked: true}});
  // });
});
