import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import Main from '../../sections/Main';

Enzyme.configure({ adapter: new Adapter() });

describe('Component <Main />', () => {
  it('should renders Main with props correctly', () => {
    const component = shallow(<Main />);
    expect(component).toMatchSnapshot();
  });
});
