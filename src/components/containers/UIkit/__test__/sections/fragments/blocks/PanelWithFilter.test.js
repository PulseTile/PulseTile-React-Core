import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import PanelWithFilter from '../../../../sections/fragments/blocks/PanelWithFilter';

Enzyme.configure({ adapter: new Adapter() });

describe('Component <PanelWithFilter />', () => {
  it('should renders PanelWithFilter with props correctly', () => {
    const component = shallow(<PanelWithFilter />);
    component.find('.btn.btn-success.btn-inverse.btn-filter').simulate('click');
    expect(component).toMatchSnapshot();
    component.find('.btn.btn-success.btn-inverse.btn-filter').simulate('click');
    expect(component).toMatchSnapshot();
  });
});
