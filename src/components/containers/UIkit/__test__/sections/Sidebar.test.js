import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import Sidebar from '../../sections/Sidebar';

Enzyme.configure({ adapter: new Adapter() });

const LINKS_NUMBER = 5;
const SUBLINKS_NUMBER = 41;

describe('Component <Sidebar />', () => {
  it('should renders Sidebar with props correctly', () => {
    const sidebar = shallow(<Sidebar />);
    for (let i = 0; i < LINKS_NUMBER; i++) {
      sidebar.find('.ui-sidebar-link').at(i).simulate('click');
    }
    for (let i = 0; i < SUBLINKS_NUMBER; i++) {
      sidebar.find('.ui-sidebar-sub-link').at(i).simulate('click');
    }
    expect(sidebar).toMatchSnapshot();
  });
});