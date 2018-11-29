import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import Footer from '../../../../sections/fragments/blocks/Footer';

Enzyme.configure({ adapter: new Adapter() });

describe('Component <Footer />', () => {
  it('should renders Footer with props correctly', () => {
    const component = shallow(<Footer />);
    expect(component).toMatchSnapshot();
  });
});
