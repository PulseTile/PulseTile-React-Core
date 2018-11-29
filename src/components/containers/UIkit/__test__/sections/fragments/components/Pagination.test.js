import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import Pagination from '../../../../sections/fragments/components/Pagination';

Enzyme.configure({ adapter: new Adapter() });

describe('Component <Pagination />', () => {
  it('should renders Pagination with props correctly', () => {
    const component = shallow(<Pagination />);
    expect(component).toMatchSnapshot();
  });
});
