import React from 'react';
import { configure, shallow, mount } from 'enzyme'
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-15';

configure({ adapter: new Adapter() });

import FileInput from '../FileInput';

const testProps = {
  label: 'Test label',
  input: { name: 'test-name', value: '' },
  inputAndImgSRC: { name: 'test-name', value: 'image.jpg' },
  meta: {
    active: false,
    error: false,
  },
  id: 'test-id',
};

describe('Component <FileInput />', () => {
  it('should renders with all props correctly', () => {
    const component = shallow(
      <FileInput
        id={testProps.id}
        label={testProps.label}
        input={testProps.input}
        meta={testProps.meta}
      />);

    expect(component.find('input')).toHaveLength(1);
    expect(component.find('label')).toHaveLength(2);
    expect(component.find('img')).toHaveLength(0);

    expect(component.find('label.control-label').text()).toEqual(testProps.label);
    expect(component.find('input + label').prop('htmlFor')).toEqual(testProps.id);
    expect(component.find('input').prop('id')).toEqual(testProps.id);

    expect(component.instance().props.id).toEqual(testProps.id);
    expect(component.instance().props.label).toEqual(testProps.label);
    expect(component.instance().props.input).toEqual(testProps.input);
    expect(component.instance().props.meta).toEqual(testProps.meta);

    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });

  it('should renders with image correctly', () => {
    const component = shallow(
      <FileInput
        id={testProps.id}
        label={testProps.label}
        input={testProps.inputAndImgSRC}
        meta={testProps.meta}
      />);

    expect(component.find('img')).toHaveLength(1);
    expect(component.find('img').prop('src')).toEqual(testProps.inputAndImgSRC.value);

    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });

  it('should renders with different state of validation', () => {
    let tree;
    const component = shallow(
      <FileInput
        id={testProps.id}
        label={testProps.label}
        input={testProps.inputAndImgSRC}
        meta={testProps.meta}
      />);

    expect(component.find('.form-group').at(0).hasClass('has-error')).toEqual(false);
    expect(component.find('.form-group').at(0).hasClass('has-success')).toEqual(false);
    tree = toJson(component);
    expect(tree).toMatchSnapshot();

    component.setProps({ meta: {
      active: false,
      error: 'Error',
    } });
    expect(component.find('.form-group').at(0).hasClass('has-error')).toEqual(true);
    expect(component.find('.form-group').at(0).hasClass('has-success')).toEqual(false);
    tree = toJson(component);
    expect(tree).toMatchSnapshot();

    component.setProps({ meta: {
      active: true,
      error: false,
    } });
    expect(component.find('.form-group').at(0).hasClass('has-error')).toEqual(false);
    expect(component.find('.form-group').at(0).hasClass('has-success')).toEqual(true);
    tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });

  it('testing onChange functionality', () => {
    const component = shallow(
      <FileInput
        id={testProps.id}
        label={testProps.label}
        input={testProps.input}
        meta={testProps.meta}
      />);
    const image = document.createElement('img');
    image.src = 'data:image/gif;base64,R0lGODlhDwAPAKECAAAAzMzM/////wAAACwAAAAADwAPAAACIISPeQHsrZ5ModrLlN48CXF8m2iQ3YmmKqVlRtW4MLwWACH+H09wdGltaXplZCBieSBVbGVhZCBTbWFydFNhdmVyIQAAOw==';
    const simulateEvent = {
      preventDefault: () => {},
      target: {
        files: [new Blob([image], { type: 'image/gif' })],
      },
    };

    expect(component.find('input')).toHaveLength(1);
    component.find('input').simulate('change', simulateEvent);

    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });
});
