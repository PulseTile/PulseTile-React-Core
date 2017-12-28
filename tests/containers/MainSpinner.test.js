import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

import MainSpinner from '../../src/components/containers/MainSpinner/MainSpinner';

Enzyme.configure({ adapter: new Adapter() });

describe('Component <MainSpinner />', () => {
  it('should renders with props correctly', () => {
    const mainSpinner = mount(<MainSpinner />)
    expect(mainSpinner).toMatchSnapshot();
  });
});
