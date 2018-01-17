import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

import Switch from '../../src/components/form-fields/Switch';

Enzyme.configure({ adapter: new Adapter() });

describe('Component <Switch />', () => {
  it('should renders with all props correctly testing checkbox and edit', () => {
    const component = shallow(
      <Switch
        editOrCreate
        id="oxygenSupplemental"
        input={{ checked: true, name: 'oxygenSupplemental', value: true }}
        type="checkbox"
        disabled
      />);

    expect(component.find('input')).toHaveLength(1);
    expect(component.find('label')).toHaveLength(1);
    expect(component.find('.slider').props().className).toEqual('slider disabled');
    expect(component.find('.disabled')).toHaveLength(1);
    expect(component.find('.text-check-true')).toHaveLength(1);
    expect(component.find('.text-check-false')).toHaveLength(1);
    expect(component.find('.text-check-true').text()).toEqual('Yes');
    expect(component.find('.text-check-false').text()).toEqual('No');

    expect(component.find('input').props().checked).toEqual(true);
    expect(component.find('input').props().id).toEqual('oxygenSupplemental');
    expect(component.find('input').props().name).toEqual('oxygenSupplemental');
    expect(component.find('input').props().type).toEqual('checkbox');
    expect(component.find('input').props().value).toEqual(true);

    expect(component).toMatchSnapshot();
  });

  it('should renders with all props correctly testing checkbox and not edit', () => {
    const component = shallow(
      <Switch
        editOrCreate={false}
        name="oxygenSupplemental"
        type="checkbox"
        value
        disabled
      />);

    expect(component.find('input')).toHaveLength(1);
    expect(component.find('label')).toHaveLength(1);
    expect(component.find('.slider').props().className).toEqual('slider disabled');
    expect(component.find('.disabled')).toHaveLength(1);
    expect(component.find('.text-check-true')).toHaveLength(1);
    expect(component.find('.text-check-false')).toHaveLength(1);
    expect(component.find('.text-check-true').text()).toEqual('Yes');
    expect(component.find('.text-check-false').text()).toEqual('No');

    expect(component.find('input').props().checked).toEqual(true);
    expect(component.find('input').props().disabled).toEqual(true);
    expect(component.find('input').props().name).toEqual('oxygenSupplemental');
    expect(component.find('input').props().type).toEqual('checkbox');
    expect(component.find('input').props().value).toEqual(true);

    expect(component).toMatchSnapshot();
  });

  it('should renders with all props correctly testing radio button and not edit', () => {
    const component = shallow(
      <Switch
        editOrCreate={false}
        name="oxygenSupplemental"
        type="radio"
        value
        transitionValue
        disabled={false}
        text="test text"
      />);

    expect(component.find('input')).toHaveLength(1);
    expect(component.find('label')).toHaveLength(1);
    expect(component.find('.slider').props().className).toEqual('slider ');
    expect(component.find('.disabled')).toHaveLength(0);
    expect(component.find('.text-check-true')).toHaveLength(0);
    expect(component.find('.text-check-false')).toHaveLength(0);
    expect(component.find('.text').text()).toEqual('test text');

    expect(component.find('input').props().checked).toEqual(true);
    expect(component.find('input').props().disabled).toEqual(false);
    expect(component.find('input').props().name).toEqual('oxygenSupplemental');
    expect(component.find('input').props().type).toEqual('radio');
    expect(component.find('input').props().value).toEqual(true);

    expect(component).toMatchSnapshot();
  });

  it('should renders with all props correctly testing radio button and not edit', () => {
    const component = shallow(
      <Switch
        editOrCreate={false}
        name="oxygenSupplemental"
        type="radio"
        value
        transitionValue={false}
        disabled={false}
        text="test text"
      />);

    expect(component).toMatchSnapshot();
  });
});
