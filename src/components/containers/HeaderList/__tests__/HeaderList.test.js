import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

import HeaderList from '../HeaderList';

Enzyme.configure({ adapter: new Adapter() });

const testProps = {
  items: [
    <img src="test1" alt="header img 1" />,
    <img src="test2" alt="header img 2" />,
  ],
};

describe('Component <HeaderList />', () => {
  it('should renders correctly when items is not Empty', () => {
    const component = shallow(
      <HeaderList
        items={testProps.items}
      />);

    expect(component.find('.header-list')).toHaveLength(1);
    expect(component.find('img')).toHaveLength(2);

    expect(component).toMatchSnapshot();
  });

  it('should renders correctly when items is Empty', () => {
    const component = shallow(
      <HeaderList
        items={[]}
      />);

    expect(component.find('.header-list')).toHaveLength(0);
    expect(component.find('img')).toHaveLength(0);

    expect(component).toMatchSnapshot();
  });
});

