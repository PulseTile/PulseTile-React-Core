import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import Scrollbar from '../../../../sections/fragments/components/Scrollbar';

Enzyme.configure({ adapter: new Adapter() });

describe('Component <Scrollbar />', () => {
  it('should renders Scrollbar with props correctly', () => {
    const component = shallow(<Scrollbar />);
    expect(component).toMatchSnapshot();
  });
});
