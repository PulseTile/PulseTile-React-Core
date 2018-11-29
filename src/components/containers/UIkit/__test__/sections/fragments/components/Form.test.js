import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import Form from '../../../../sections/fragments/components/Form';

Enzyme.configure({ adapter: new Adapter() });

describe('Component <Form />', () => {
  it('should renders Form with props correctly', () => {
    const component = shallow(<Form />);
    expect(component).toMatchSnapshot();
  });
});
