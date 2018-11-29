import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import Highlighters from '../../../../sections/fragments/components/Highlighters';

Enzyme.configure({ adapter: new Adapter() });

describe('Component <Highlighters />', () => {
  it('should renders Highlighters with props correctly', () => {
    const component = shallow(<Highlighters />);
    expect(component).toMatchSnapshot();
  });
});
