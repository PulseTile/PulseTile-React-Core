import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

import FormTitle from '../FormTitle';

Enzyme.configure({ adapter: new Adapter() });

const testProps = {
  className: 'test-class-name',
  text: 'test text',
  restProps: 'restProps',
};

describe('Component <FormTitle />', () => {
  it('should renders correctly', () => {
    const component = shallow(
      <FormTitle
        className={testProps.className}
        text={testProps.text}
        restProps={testProps.restProps}
      />);

    expect(component.find('.form-title-block')).toHaveLength(1);
    expect(component.find('.test-class-name')).toHaveLength(1);
    expect(component.find('.form-title')).toHaveLength(1);

    expect(component.find('.test-class-name').props().restProps).toEqual(testProps.restProps);
    expect(component.find('.form-title').text()).toEqual(testProps.text);

    expect(component).toMatchSnapshot();
  });
});

