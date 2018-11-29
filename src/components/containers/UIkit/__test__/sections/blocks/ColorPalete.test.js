import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import ColorPalete from '../../../sections/blocks/ColorPalete';

Enzyme.configure({ adapter: new Adapter() });

describe('Component <ColorPalete />', () => {
  it('should renders ColorPalete with props correctly', () => {
    const component = shallow(<ColorPalete />);
    expect(component).toMatchSnapshot();
  });
});
