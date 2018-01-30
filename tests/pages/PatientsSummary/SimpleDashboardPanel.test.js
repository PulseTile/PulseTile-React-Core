import React from 'react';
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-15';

configure({ adapter: new Adapter() });

import SimpleDashboardPanel from '../../../src/components/pages/PatientsSummary/SimpleDashboardPanel';

const testProps = {
  goToState: () => {},
  navigateTo: () => {},
  title: 'Contacts',
  items: [{
    source: 'Marand',
    sourceId: '07d7fbb8-88e7-4f69-b901-38395dd36a6b',
    text:	'John Smithy',
  }, {
    source: 'Marand',
    sourceId: '96e5537f-600e-4334-aaad-629ecfaeadf8',
    text: 'Andrew Finch',
  }],
  state: 'contacts',
};

describe('Component <SimpleDashboardPanel />', () => {
  it('should renders with all props correctly', () => {
    const component = shallow(
      <SimpleDashboardPanel
        goToState={testProps.goToState}
        navigateTo={testProps.navigateTo}
        title={testProps.title}
        items={testProps.items}
        state={testProps.state}
      />);

    expect(component).toMatchSnapshot();

    expect(component.instance().props.goToState).toEqual(testProps.goToState);
    expect(component.instance().props.navigateTo).toEqual(testProps.navigateTo);
    expect(component.instance().props.title).toEqual(testProps.title);
    expect(component.instance().props.items).toEqual(testProps.items);
    expect(component.instance().props.state).toEqual(testProps.state);

    expect(component.find('.dashboard-item')).toHaveLength(1);
    expect(component.find('.board')).toHaveLength(1);
    expect(component.find('.board-title')).toHaveLength(1);
    expect(component.find('.board-title').text()).toEqual(testProps.title);
    expect(component.find('ul')).toHaveLength(1);
    expect(component.find('li')).toHaveLength(2);
    expect(component.find('button')).toHaveLength(1);
    component.find('button').simulate('click');
    component.find('li').at(0).simulate('click');
  });
});

