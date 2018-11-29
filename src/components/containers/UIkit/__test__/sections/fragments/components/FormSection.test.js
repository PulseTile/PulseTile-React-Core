import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import FormSection from '../../../../sections/fragments/components/FormSection';

Enzyme.configure({ adapter: new Adapter() });

const ACCORDIONS_NUMBER = 6;

describe('Component <FormSection />', () => {
  it('should renders FormSection with props correctly', () => {
    const component = shallow(<FormSection />);
    expect(component).toMatchSnapshot();
    for (let i = 0; i < ACCORDIONS_NUMBER; i++) {
      component.find('.btn-form-group-section-toggle').at(i).simulate('click');
      expect(component).toMatchSnapshot();
      component.find('.btn-form-group-section-toggle').at(i).simulate('click');
    }
    expect(component).toMatchSnapshot();
  });
});
