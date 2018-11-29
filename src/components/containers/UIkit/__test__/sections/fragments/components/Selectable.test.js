import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import Selectable from '../../../../sections/fragments/components/Selectable';

Enzyme.configure({ adapter: new Adapter() });

const BUTTONS_NUMBER = 4;
const ITEMS_NUMBER = 6;

describe('Component <Selectable />', () => {
  it('should renders Selectable with props correctly', () => {
    const component = shallow(<Selectable />);
    expect(component).toMatchSnapshot();
    for (let i = 0; i < ITEMS_NUMBER; i++) {
        component.find('.selectable-item').at(i).simulate('click');
        expect(component).toMatchSnapshot();
    }
    for (let i = 0; i < BUTTONS_NUMBER; i++) {
      component.find('.btn.btn-inverse.btn-success.btn-order').at(i).simulate('click');
      expect(component).toMatchSnapshot();
    }
  });
});
