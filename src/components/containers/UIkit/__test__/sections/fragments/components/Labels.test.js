import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import Labels from '../../../../sections/fragments/components/Labels';

Enzyme.configure({ adapter: new Adapter() });

describe('Component <Labels />', () => {
  it('should renders Labels with props correctly', () => {
    const component = shallow(<Labels />);
    expect(component).toMatchSnapshot();
  });
});
