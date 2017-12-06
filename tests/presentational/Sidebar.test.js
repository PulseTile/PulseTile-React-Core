import React from 'react';
import configureStore from 'redux-mock-store';
import sinon from 'sinon'
import { StaticRouter } from 'react-router'
import Enzyme, { shallow, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Sidebar from '../../src/components/presentational/Sidebar/Sidebar';

Enzyme.configure({ adapter: new Adapter() });

const mockStore = configureStore();
const dispatch = sinon.spy();
const userId = 9999999000;
const activeLink = 'patients-summary';
const context = {};
const testUnnecessaryProp = 'test'

describe('Component <Sidebar />', () => {
  it('should renders with props correctly', () => {
    const sidebar = shallow(
      <Sidebar
        dispatch={dispatch}
        store={mockStore({ runtime: {} })}
        userId={userId}
        activeLink={activeLink}
        testUnnecessaryProp={testUnnecessaryProp}
      />);

    const testUnnecessaryProps = sidebar.instance().props.testUnnecessaryProp;

    // init rendering with default props
    expect(sidebar).toMatchSnapshot();
    expect(sidebar.prop('activeLink')).toEqual('patients-summary');
    expect(sidebar.prop('userId')).toEqual(9999999000);
    expect(testUnnecessaryProps).toEqual(testUnnecessaryProp);

    // simulate transition on the another route and change activeLink
    sidebar.setProps({ userId: 9999999024, activeLink: 'allergies' });
    expect(sidebar).toMatchSnapshot();
    expect(sidebar.prop('activeLink')).toEqual('allergies');
    expect(sidebar.prop('userId')).toEqual(9999999024);
  });

  it('should renders whet it is visible', () => {
    const tree = render(
      <StaticRouter location="someLocation" context={context}>
        <Sidebar
          dispatch={dispatch}
          store={mockStore({ runtime: {} })}
          userId={userId}
          activeLink={activeLink}
          isSidebarVisible
        />
      </StaticRouter>);
    expect(tree).toMatchSnapshot();
    expect(tree.find('.active')).toHaveLength(1);
  });
});
