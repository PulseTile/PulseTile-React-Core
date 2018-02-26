import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

import { Tag } from '../Tag';

Enzyme.configure({ adapter: new Adapter() });

const testProps = {
  children: 'test-children',
  style: 'test-style',
  restProps: 'restProps',
};

describe('Component <Tag />', () => {
  it('should renders correctly', () => {
    const component = shallow(
      <Tag
        children={testProps.children}
        style={testProps.style}
        restProps={testProps.restProps}
      />);

    expect(component.find('.label')).toHaveLength(1);
    expect(component.find(`.label-${testProps.style}`)).toHaveLength(1);
    expect(component.find('.label').props().restProps).toEqual(testProps.restProps);
    expect(component.find('.label').text()).toEqual(testProps.children);

    expect(component).toMatchSnapshot();
  });
});

