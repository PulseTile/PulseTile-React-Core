import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

import PTCustomInput from '../header/PTCustomInput';

Enzyme.configure({ adapter: new Adapter() });

const testProps = {
  name: 'test name',
  value: 'test value',
  onChange: () => {},
}


describe('Component <PTCustomInput />', () => {
  it('should renders with all props correctly', () => {
    const component = shallow(
      <PTCustomInput
        name={testProps.name}
        value={testProps.value}
        onChange={testProps.onChange}
      />);

    expect(component.find('.wrap-fcustominp')).toHaveLength(1);
    expect(component.find('input')).toHaveLength(1);
    expect(component.find('input').props().name).toEqual('dashboard-test name');
    expect(component.find('input').props().value).toEqual('test value');

    expect(component).toMatchSnapshot();

    component.instance().toggleInput()
    component.setProps({ value: undefined });
    component.instance().toggleInput()

  });
});

