import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import Sidebar from '../../../../sections/fragments/blocks/Sidebar';

Enzyme.configure({ adapter: new Adapter() });

describe('Component <Sidebar />', () => {
  it('should renders Sidebar with props correctly', () => {
    const component = shallow(<Sidebar />);
    expect(component).toMatchSnapshot();
  });
});
