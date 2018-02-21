import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

import { TagList } from '../Tag';

Enzyme.configure({ adapter: new Adapter() });

const testProps = {
  children: 'test-children',
};

describe('Component <TagList />', () => {
  it('should renders correctly', () => {
    const component = shallow(
      <TagList
        children={testProps.children}
      />);

    expect(component.find('.control-group')).toHaveLength(1);
    expect(component.find('.control-group').text()).toEqual(testProps.children);

    expect(component).toMatchSnapshot();
  });
});

