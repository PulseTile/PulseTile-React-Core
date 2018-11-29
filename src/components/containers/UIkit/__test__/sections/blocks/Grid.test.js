import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import Grid from '../../../sections/blocks/Grid';

Enzyme.configure({ adapter: new Adapter() });

describe('Component <Grid />', () => {
  it('should renders Grid with props correctly', () => {
    const component = shallow(<Grid />);
    expect(component).toMatchSnapshot();

    component.find('#gridButtonDetails').simulate('click');
    expect(component).toMatchSnapshot();

    component.find('#gridButtonMain').simulate('click');
    expect(component).toMatchSnapshot();
  });
});
