import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import ThemeColors from '../../../../sections/fragments/components/ThemeColors';

Enzyme.configure({ adapter: new Adapter() });

describe('Component <ThemeColors />', () => {
  it('should renders ThemeColors with props correctly', () => {
    const component = shallow(<ThemeColors />);
    expect(component).toMatchSnapshot();
  });
});
