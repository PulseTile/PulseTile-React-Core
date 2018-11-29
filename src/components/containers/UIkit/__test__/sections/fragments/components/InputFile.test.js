import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import InputFile from '../../../../sections/fragments/components/InputFile';

Enzyme.configure({ adapter: new Adapter() });

describe('Component <InputFile />', () => {
  it('should renders InputFile with props correctly', () => {
    const component = shallow(<InputFile />);
    expect(component).toMatchSnapshot();
  });
});
