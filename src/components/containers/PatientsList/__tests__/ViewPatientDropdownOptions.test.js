import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

import ViewPatientDropdownOptions from '../actions-column/ViewPatientDropdownOptions';

Enzyme.configure({ adapter: new Adapter() });

const handlePatientViewClick = () => console.log('handlePatientViewClick function worked');

describe('Component <ViewPatientDropdownOptions />', () => {
  it('should renders correctly', () => {
    const viewPatientDropdownOptions = shallow(
      <ViewPatientDropdownOptions
        handlePatientViewClick={handlePatientViewClick}
      />
    ).dive();
    viewPatientDropdownOptions.find('.dropdown-menu-item').at(0).simulate('click');
    viewPatientDropdownOptions.find('.dropdown-menu-item').at(1).simulate('click');
    viewPatientDropdownOptions.find('.dropdown-menu-item').at(2).simulate('click');
    viewPatientDropdownOptions.find('.dropdown-menu-item').at(3).simulate('click');
    expect(viewPatientDropdownOptions).toMatchSnapshot();
  });
});

