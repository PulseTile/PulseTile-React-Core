import React from 'react';
import {configure, shallow, mount} from 'enzyme'
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-15';
configure({ adapter: new Adapter() });

import ValidatedTextareaFormGroup from '../../src/components/form-fields/ValidatedTextareaFormGroup';

const testProps = {
  label: 'Test label',
  input: {name: 'test-name', value: ''},
  inputAndImgSRC: {name: 'test-name', value: 'image.jpg'},
  meta: {
    active: false,
    error: false,
  },
  id: 'test-id',
};

describe('Component <ValidatedTextareaFormGroup />', () => {
  it('should renders with all props correctly', () => {
    const component = shallow(
        <ValidatedTextareaFormGroup
          id={testProps.id}
          label={testProps.label}
          input={testProps.input}
          meta={testProps.meta}
          isSubmit={true}
          isAdvancedSearce={false}
        />);

    expect(component.find('input')).toHaveLength(0);
    expect(component.find('textarea')).toHaveLength(1);
    expect(component.find('label')).toHaveLength(1);

    expect(component.find('label.control-label').text()).toEqual(testProps.label);
    expect(component.find('label.control-label').prop('htmlFor')).toEqual(testProps.id);

    expect(component.find('textarea').prop('id')).toEqual(testProps.id);

    expect(component.instance().props['id']).toEqual(testProps.id);
    expect(component.instance().props['label']).toEqual(testProps.label);
    expect(component.instance().props['input']).toEqual(testProps.input);
    expect(component.instance().props['meta']).toEqual(testProps.meta);
    expect(component.instance().props['isSubmit']).toEqual(true);
    expect(component.instance().props['isAdvancedSearce']).toEqual(false);

    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });

  // it('should renders with image correctly', () => {
  //   const component = shallow(
  //     <ValidatedTextareaFormGroup
  //       id={testProps.id}
  //       label={testProps.label}
  //       input={testProps.inputAndImgSRC}
  //       meta={testProps.meta}
  //     />);
  //
  //   expect(component.find('img')).toHaveLength(1);
  //   expect(component.find('img').prop('src')).toEqual(testProps.inputAndImgSRC.value);
  //
  //   const tree = toJson(component);
  //   expect(tree).toMatchSnapshot();
  // });

  // it('should renders with different state of validation', () => {
  //   let tree;
  //   const component = shallow(
  //     <ValidatedTextareaFormGroup
  //       id={testProps.id}
  //       label={testProps.label}
  //       input={testProps.inputAndImgSRC}
  //       meta={testProps.meta}
  //     />);
  //
  //   expect(component.find('.form-group').at(0).hasClass('has-error')).toEqual(false);
  //   expect(component.find('.form-group').at(0).hasClass('has-success')).toEqual(false);
  //   tree = toJson(component);
  //   expect(tree).toMatchSnapshot();
  //
  //   component.setProps({ meta: {
  //     active: false,
  //     error: 'Error'
  //   }});
  //   expect(component.find('.form-group').at(0).hasClass('has-error')).toEqual(true);
  //   expect(component.find('.form-group').at(0).hasClass('has-success')).toEqual(false);
  //   tree = toJson(component);
  //   expect(tree).toMatchSnapshot();
  //
  //   component.setProps({meta: {
  //     active: true,
  //     error: false
  //   }});
  //   expect(component.find('.form-group').at(0).hasClass('has-error')).toEqual(false);
  //   expect(component.find('.form-group').at(0).hasClass('has-success')).toEqual(true);
  //   tree = toJson(component);
  //   expect(tree).toMatchSnapshot();
  // });
});
