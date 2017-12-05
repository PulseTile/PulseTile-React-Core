import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import sinon from 'sinon'
import { StaticRouter } from 'react-router'

import Sidebar from '../../src/components/presentational/Sidebar/Sidebar';

const mockStore = configureStore();
const dispatch = sinon.spy();
const userId = 9999999000;
const activeLink = 'patients-summary';
const context = {};

describe('Component <Sidebar />', () => {
  it('should renders with props correctly', () => {
    const sidebar = shallow(
      <Sidebar
        dispatch={dispatch}
        store={mockStore({ runtime: {} })}
        userId={userId}
        activeLink={activeLink}
      />);
    expect(sidebar).toMatchSnapshot();
  });
  it('should renders whet it is visible', () => {
    const tree = renderer
      .create(
        <StaticRouter location="someLocation" context={context}>
          <Sidebar
            dispatch={dispatch}
            store={mockStore({ runtime: {} })}
            userId={userId}
            activeLink={activeLink}
            isSidebarVisible
          />
        </StaticRouter>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
