import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import Panels from '../../../../sections/fragments/components/Panels/Panels';
import PanelAccordion from '../../../../sections/fragments/components/Panels/PanelAccordion';
import PanelSubAccordion from '../../../../sections/fragments/components/Panels/PanelSubAccordion';

Enzyme.configure({ adapter: new Adapter() });

describe('Component <Panels />', () => {
  it('should renders Panels with props correctly', () => {
    const component = shallow(<Panels />);
    expect(component).toMatchSnapshot();
  });
});

describe('Component <PanelAccordion />', () => {
  it('should renders PanelAccordion with props correctly', () => {
    const component = shallow(<PanelAccordion />);
    expect(component).toMatchSnapshot();
    component.find('.btn-toggle-rotate').at(0).simulate('click');
    expect(component).toMatchSnapshot();
    component.find('.btn-toggle-rotate').at(1).simulate('click');
    expect(component).toMatchSnapshot();
  });
});

describe('Component <PanelSubAccordion />', () => {
  it('should renders PanelSubAccordion with props correctly', () => {
    const component = shallow(<PanelSubAccordion />);
    expect(component).toMatchSnapshot();

    component.find('.panel-heading').at(0).simulate('click');
    expect(component).toMatchSnapshot();
    component.find('.panel-heading').at(0).simulate('click');

    component.find('.panel-heading').at(1).simulate('click');
    expect(component).toMatchSnapshot();
    component.find('.panel-heading').at(1).simulate('click');
  });
});
