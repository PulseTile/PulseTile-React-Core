import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import Modal from '../../../../sections/fragments/components/Modal';

Enzyme.configure({ adapter: new Adapter() });

describe('Component <Modal />', () => {
  it('should renders Modal with props correctly', () => {
    const component = shallow(<Modal />);
    expect(component).toMatchSnapshot();
    component.find('.btn.btn-info').simulate('click');
    expect(component).toMatchSnapshot();
  });
});
