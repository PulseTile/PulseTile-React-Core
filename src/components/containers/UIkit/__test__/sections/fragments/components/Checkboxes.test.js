import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import Checkboxes from '../../../../sections/fragments/components/Checkboxes';

Enzyme.configure({ adapter: new Adapter() });

const CHECKBOXES_NUMBER = 6;

describe('Component <Checkboxes />', () => {
  it('should renders Checkboxes with props correctly', () => {
    const component = shallow(<Checkboxes />);
    expect(component).toMatchSnapshot();
    for (let i = 0; i < CHECKBOXES_NUMBER; i++) {
      component.find('.fcustominp').at(i).simulate('click');
      expect(component).toMatchSnapshot();
      component.find('.fcustominp').at(i).simulate('click');
    }
    expect(component).toMatchSnapshot();
  });
});
