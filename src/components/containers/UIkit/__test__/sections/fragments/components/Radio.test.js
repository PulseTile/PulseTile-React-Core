import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import Radio from '../../../../sections/fragments/components/Radio';

Enzyme.configure({ adapter: new Adapter() });

const RADIO_NUMBER = 6;

describe('Component <Radio />', () => {
  it('should renders Radio with props correctly', () => {
    const component = shallow(<Radio />);
    expect(component).toMatchSnapshot();
    for (let i = 0; i < RADIO_NUMBER; i++) {
      component.find('.fcustominp').at(i).simulate('click');
      expect(component).toMatchSnapshot();
    }
  });
});
