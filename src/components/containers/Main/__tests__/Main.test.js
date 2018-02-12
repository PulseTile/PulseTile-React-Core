import React from 'react';
import configureStore from 'redux-mock-store';
import sinon from 'sinon'
import Enzyme, { render, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import { Provider } from 'react-redux'
import { StaticRouter } from 'react-router'

import Main from '../Main';

Enzyme.configure({ adapter: new Adapter() });

const mockStore = configureStore();
const dispatch = sinon.spy();
const storeResource = {
  router: {
    location: {
      pathname: '/',
      search: '',
      hash: '#/patients/9999999000/procedures',
    },
  },
  patientsSummaries: {
    '9999999024': {
      id: 9999999024,
    },
  },
};

const storePhr = mockStore(Object.assign({ initialiseData: { test: 'test' }, userAccount: { role: 'PHR', nhsNumber: 9999999000 } }, storeResource));
const storeIdcr = mockStore(Object.assign({ userAccount: { role: 'IDCR' } }, storeResource));
const storeWithBadBreadcrumbs = mockStore({
  router: {
    location: {
      pathname: '/',
      search: '',
      hash: '#/testExample',
    },
  },
});
const context = {};


describe('Component <Main />', () => {
  it('should renders correctly when Breadcrumbs is Bad', () => {
    const main = render(
      <Provider store={storeWithBadBreadcrumbs}>
        <StaticRouter location="someLocation" context={context}>
          <Main
            dispatch={dispatch}
          />
        </StaticRouter>
      </Provider>)
    expect(main).toMatchSnapshot();
  });
  it('should renders correctly when initialiseData is not empty', () => {
    const main = render(
      <Provider store={storePhr}>
        <StaticRouter location="someLocation" context={context}>
          <Main
            dispatch={dispatch}
          />
        </StaticRouter>
      </Provider>)
    expect(main).toMatchSnapshot();
  });
  it('should renders correctly when initialiseData is empty', () => {
    const main = render(
      <Provider store={storeIdcr}>
        <StaticRouter location="someLocation" context={context}>
          <Main
            dispatch={dispatch}
          />
        </StaticRouter>
      </Provider>)
    expect(main).toMatchSnapshot();
  });
  it('should renders correctly', () => {
    const main = shallow(
      <Provider store={storePhr}>
        <StaticRouter location="someLocation" context={context}>
          <Main
            dispatch={dispatch}
          />
        </StaticRouter>
      </Provider>).dive().dive().dive()
    expect(main).toMatchSnapshot();
  });
});

