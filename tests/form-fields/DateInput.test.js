import React from 'react';
import {configure, shallow, mount} from 'enzyme'
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-15';
configure({ adapter: new Adapter() });

import DateInput from '../../src/components/form-fields/DateInput';

const date = 1513011537424;
const testProps = {
  label: 'Test label',
  placeholder: 'Test placeholder',
  input: {value: new Date(date), name: 'test-name'},
  meta: { error: false, touched: false },
  disabled: false,
  value: new Date(date),
  format: 'DD-MMM-YYYY',
  isSubmit: false,
  showTimeSelect: false,
  timeFormat: 'HH:mm',
  minDate: new Date(date),
  timeIntervals: 5
 }

describe('Component <DateInput />', () => {
  it('should renders with all props correctly', () => {
    const component = shallow(
      <DateInput
        label={testProps.label}
        placeholder={testProps.placeholder}
        input={testProps.input}
        meta={testProps.meta}
        disabled={testProps.disabled}
        format={testProps.format}
        isSubmit={testProps.isSubmit}
        showTimeSelect={testProps.showTimeSelect}
        timeFormat={testProps.timeFormat}
        minDate={testProps.minDate}
        timeIntervals={testProps.timeIntervals}
      />);

    expect(component.find('label')).toHaveLength(1);
    expect(component.find('label.control-label').text()).toEqual(testProps.label);

    expect(component.instance().props['label']).toEqual(testProps.label);
    expect(component.instance().props['placeholder']).toEqual(testProps.placeholder);
    expect(component.instance().props['input']).toEqual(testProps.input);
    expect(component.instance().props['meta']).toEqual(testProps.meta);
    expect(component.instance().props['disabled']).toEqual(testProps.disabled);
    expect(component.instance().props['format']).toEqual(testProps.format);
    expect(component.instance().props['isSubmit']).toEqual(testProps.isSubmit);
    expect(component.instance().props['showTimeSelect']).toEqual(testProps.showTimeSelect);
    expect(component.instance().props['timeFormat']).toEqual(testProps.timeFormat);
    expect(component.instance().props['minDate']).toEqual(testProps.minDate);
    expect(component.instance().props['timeIntervals']).toEqual(testProps.timeIntervals);

    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });

  it('should renders with different state of validation', () => {
    let tree;
    const component = shallow(
      <DateInput
        label={testProps.label}
        placeholder={testProps.placeholder}
        input={testProps.input}
        meta={testProps.meta}
        disabled={testProps.disabled}
        format={testProps.format}
        isSubmit={testProps.isSubmit}
        showTimeSelect={testProps.showTimeSelect}
        timeFormat={testProps.timeFormat}
        minDate={testProps.minDate}
        timeIntervals={testProps.timeIntervals}
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

  it('should renders with/without the given date', () => {
    let tree;
    const component = shallow(
      <DateInput
        label={testProps.label}
        placeholder={testProps.placeholder}
        input={testProps.input}
        meta={testProps.meta}
        disabled={testProps.disabled}
        format={testProps.format}
        isSubmit={testProps.isSubmit}
        showTimeSelect={testProps.showTimeSelect}
        timeFormat={testProps.timeFormat}
        minDate={testProps.minDate}
        timeIntervals={testProps.timeIntervals}
        value={testProps.value}
      />);

    tree = toJson(component);
    expect(tree).toMatchSnapshot();

    component.setProps({
      input: {
        value: null,
        name: 'test-name'
      },
      value: null
    });
  });
});
