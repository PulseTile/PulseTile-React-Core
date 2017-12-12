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
          isAdvancedSearch={false}
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
    expect(component.instance().props['isAdvancedSearch']).toEqual(false);

    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });

  it('should renders with different state of validation', () => {
    let tree;
    const component = shallow(
      <ValidatedTextareaFormGroup
        id={testProps.id}
        label={testProps.label}
        input={testProps.input}
        meta={testProps.meta}
        isSubmit={true}
        isAdvancedSearch={false}
      />);

    expect(component.find('.form-group').at(0).hasClass('has-error')).toEqual(false);
    expect(component.find('.form-group').at(0).hasClass('has-success')).toEqual(false);
    expect(component.state('isChanged')).toEqual(false);
    tree = toJson(component);
    expect(tree).toMatchSnapshot();

    // Is there a check has-error class
    // 1 case
    component.setProps({
      meta: {
        touched: false,
        error: 'Error'
      },
      isSubmit: true
    });
    expect(component.find('.form-group').at(0).hasClass('has-error')).toEqual(true);
    expect(component.find('.form-group').at(0).hasClass('has-success')).toEqual(false);
    expect(component.state('isChanged')).toEqual(false);
    tree = toJson(component);
    expect(tree).toMatchSnapshot();

    // 2 case
    component.setProps({
      meta: {
        touched: true,
        error: 'Error'
      },
      isSubmit: false
    });
    expect(component.find('.form-group').at(0).hasClass('has-error')).toEqual(true);
    expect(component.find('.form-group').at(0).hasClass('has-success')).toEqual(false);
    expect(component.state('isChanged')).toEqual(false);
    tree = toJson(component);
    expect(tree).toMatchSnapshot();

    // 3 case
    component.setProps({
      meta: {
        dirty: true,
        touched: false,
        error: 'Error'
      },
      isSubmit: false
    });
    expect(component.find('.form-group').at(0).hasClass('has-error')).toEqual(true);
    expect(component.find('.form-group').at(0).hasClass('has-success')).toEqual(false);
    expect(component.state('isChanged')).toEqual(true);
    tree = toJson(component);
    expect(tree).toMatchSnapshot();


    // Is there a check has-success class
    component.setProps({
      meta: {
        dirty: true,
        touched: true,
        error: false
      },
      isSubmit: true
    });
    expect(component.find('.form-group').at(0).hasClass('has-error')).toEqual(false);
    expect(component.find('.form-group').at(0).hasClass('has-success')).toEqual(true);
    expect(component.state('isChanged')).toEqual(true);
    tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });

  it('should renders with error message correctly', () => {
    let tree;
    const component = shallow(
      <ValidatedTextareaFormGroup
        id={testProps.id}
        label={testProps.label}
        input={testProps.inputAndImgSRC}
        meta={{
          dirty: true,
          touched: true,
          error: 'Error'
        }}
        isSubmit={true}
      />);

    expect(component.find('.form-group').at(0).hasClass('has-error')).toEqual(true);

    // 1 case when isAdvancedSearch === false
    expect(component.find('.required-label')).toHaveLength(0);
    expect(component.find('.help-block')).toHaveLength(1);
    expect(component.instance().props['isAdvancedSearch']).toEqual(undefined);

    tree = toJson(component);
    expect(tree).toMatchSnapshot();

    // 1 case when isAdvancedSearch === false
    component.setProps({ isAdvancedSearch: true });

    expect(component.find('.required-label')).toHaveLength(1);
    expect(component.find('.help-block')).toHaveLength(0);
    expect(component.instance().props['isAdvancedSearch']).toEqual(true);

    tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });
});
