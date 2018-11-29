import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import Spinner from '../../../../sections/fragments/components/Spinner';

Enzyme.configure({ adapter: new Adapter() });

describe('Component <Spinner />', () => {
  it('should renders Spinner with props correctly', () => {
    const component = shallow(<Spinner />);
    expect(component).toMatchSnapshot();
  });
});
