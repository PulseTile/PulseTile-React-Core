import React from 'react';
import {configure, shallow, mount} from 'enzyme'
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-15';
configure({ adapter: new Adapter() });

import SelectFormGroup from '../../src/components/form-fields/SelectFormGroup';
import PropTypes from "prop-types";

const testProps = {
  label: 'Test label',
  placeholder: 'Test placeholder',
  input: {name: 'test-name', value: ''},
  options: [
    { value: 1, title: 'One' },
    { value: 2, title: 'Two' },
    { value: 3, title: 'Three' },
    { value: 4, title: 'For' },
    { value: 5, title: 'Fife' },
  ],
  meta: {
    active: false,
    error: false,
  },
  id: 'test-id',
};

describe('Component <SelectFormGroup />', () => {
  it('should renders with all props correctly', () => {
    let tree;
    const component = shallow(
        <SelectFormGroup
          id={testProps.id}
          label={testProps.label}
          input={testProps.input}
          meta={testProps.meta}
          options={testProps.options}
          isSubmit={true}
          isAdvancedSearch={false}
          isNotValidate={false}
          disabled={false}
          placeholder={testProps.placeholder}
        />);

    expect(component.find('select')).toHaveLength(1);
    expect(component.find('option')).toHaveLength(6);
    expect(component.find('option').at(0).text()).toEqual(testProps.placeholder);

    expect(component.find('label.control-label').text()).toEqual(testProps.label);
    expect(component.find('label.control-label').prop('htmlFor')).toEqual(testProps.id);
    expect(component.find('select').prop('id')).toEqual(testProps.id);
    expect(component.find('select').prop('disabled')).toEqual(false);

    expect(component.instance().props['id']).toEqual(testProps.id);
    expect(component.instance().props['label']).toEqual(testProps.label);
    expect(component.instance().props['input']).toEqual(testProps.input);
    expect(component.instance().props['meta']).toEqual(testProps.meta);
    expect(component.instance().props['options']).toEqual(testProps.options);
    expect(component.instance().props['placeholder']).toEqual(testProps.placeholder);
    expect(component.instance().props['isSubmit']).toEqual(true);
    expect(component.instance().props['isAdvancedSearch']).toEqual(false);
    expect(component.instance().props['isNotValidate']).toEqual(false);
    expect(component.instance().props['disabled']).toEqual(false);

    tree = toJson(component);
    expect(tree).toMatchSnapshot();

    component.setProps({
      id: '',
      placeholder: '',
      input: {name: 'test-name', value: 5}
    });
    expect(component.find('select')).toHaveLength(1);
    expect(component.find('option')).toHaveLength(6);
    expect(component.find('option').at(0).text()).toEqual('');
    expect(component.find('option').at(5).text()).toEqual(testProps.options[4].title);
  });

  it('should renders with different state of validation', () => {
    let tree;
    const component = shallow(
      <SelectFormGroup
        id={testProps.id}
        label={testProps.label}
        input={testProps.input}
        meta={testProps.meta}
        isSubmit={true}
        isAdvancedSearch={false}
        isNotValidate={false}
        disabled={false}
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

    // When the validation classes are disabled
    // Must not be 'has-success' class
    component.setProps({ isNotValidate: true });
    expect(component.find('.form-group').at(0).hasClass('has-error')).toEqual(false);
    expect(component.find('.form-group').at(0).hasClass('has-success')).toEqual(false);
    tree = toJson(component);
    expect(tree).toMatchSnapshot();

    // Must not be 'has-error' class
    component.setProps({
      meta: {
        dirty: true,
        touched: true,
        error: 'Error'
      },
      isSubmit: true
    });
    expect(component.find('.form-group').at(0).hasClass('has-error')).toEqual(false);
    expect(component.find('.form-group').at(0).hasClass('has-success')).toEqual(false);
    tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });

  it('should renders with error message correctly', () => {
    let tree;
    const component = shallow(
      <SelectFormGroup
        id={testProps.id}
        label={testProps.label}
        input={testProps.input}
        meta={{
          dirty: true,
          touched: true,
          error: 'Error'
        }}
        isSubmit={true}
      />);

    expect(component.find('.form-group').at(0).hasClass('has-error')).toEqual(true);

    // 1 case when isNotValidate===false and isAdvancedSearch === false
    expect(component.find('.required-label')).toHaveLength(0);
    expect(component.find('.help-block')).toHaveLength(1);
    expect(component.instance().props['isNotValidate']).toEqual(undefined);
    expect(component.instance().props['isAdvancedSearch']).toEqual(undefined);
    tree = toJson(component);
    expect(tree).toMatchSnapshot();

    // 2 case when isNotValidate===false and isAdvancedSearch === true
    component.setProps({ isAdvancedSearch: true });

    expect(component.find('.required-label')).toHaveLength(1);
    expect(component.find('.help-block')).toHaveLength(0);
    expect(component.instance().props['isNotValidate']).toEqual(undefined);
    expect(component.instance().props['isAdvancedSearch']).toEqual(true);
    tree = toJson(component);
    expect(tree).toMatchSnapshot();

    // 3 case when isNotValidate===true and isAdvancedSearch === true
    component.setProps({ isNotValidate: true });
    expect(component.find('.required-label')).toHaveLength(0);
    expect(component.find('.help-block')).toHaveLength(0);
    expect(component.instance().props['isNotValidate']).toEqual(true);
    expect(component.instance().props['isAdvancedSearch']).toEqual(true);
    tree = toJson(component);
    expect(tree).toMatchSnapshot();

    // 4 case when isNotValidate===true and isAdvancedSearch === false
    component.setProps({ isAdvancedSearch: false });

    expect(component.find('.required-label')).toHaveLength(0);
    expect(component.find('.help-block')).toHaveLength(0);
    expect(component.instance().props['isNotValidate']).toEqual(true);
    expect(component.instance().props['isAdvancedSearch']).toEqual(false);
    tree = toJson(component);
    expect(tree).toMatchSnapshot();

  });
});
