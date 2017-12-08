import React from 'react';
import configureStore from 'redux-mock-store';
import sinon from 'sinon'
import Enzyme, { render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux'
import { StaticRouter } from 'react-router'

import HeaderToolbar from '../../src/components/containers/Header/HeaderToolbar/HeaderToolbar';

Enzyme.configure({ adapter: new Adapter() });

const mockStore = configureStore();
const dispatch = sinon.spy();
const store = mockStore({
  runtime: {},
  router: {
    location: {
      pathname: '/',
      search: '',
      hash: '#/patients/9999999000/procedures',
    },
  },
  isSidebarVisible: true,
});
const context = {};

describe('Component <HeaderToolbar />', () => {
  it('should renders correctly', () => {
    const headerToolbar = render(
      <Provider store={store}>
        <StaticRouter location="someLocation" context={context}>
          <HeaderToolbar
            dispatch={dispatch}
          />
        </StaticRouter>
      </Provider>)
    expect(headerToolbar).toMatchSnapshot();
  });
});

