import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

import Header from '../../src/components/containers/Header/Header';

Enzyme.configure({ adapter: new Adapter() });

describe('Component <Header />', () => {
  it('should renders correctly', () => {
    const header = shallow(<Header />);
    expect(header).toMatchSnapshot();
  });
});

