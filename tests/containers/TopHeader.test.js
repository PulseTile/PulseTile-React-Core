import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import { Provider } from 'react-redux'
import { StaticRouter } from 'react-router'
import configureStore from 'redux-mock-store';

import TopHeader from '../../src/components/containers/TopHeader/TopHeader';

Enzyme.configure({ adapter: new Adapter() })

const mockStore = configureStore();
const storeResource = {
  userAccount: {
    role: 'IDCR',
  },
  patientsInfo: {
    browserTitle: 'PulseTile',
    logoB64: 'testLogo',
    themeColor: 'green',
    title: 'PulseTile',
  },
};
const context = {
  router: {
    history: {
      test: 'test',
      goBack: () => {},
    },
  },
};
const storeProfilePage = mockStore(Object.assign({
  router: {
    location: {
      pathname: '/',
      search: '',
      hash: '#/profile',
    },
  } }, storeResource));
const storeRootPage = mockStore(Object.assign({
  router: {
    location: {
      pathname: '/',
      search: '',
      hash: '#/',
    },
  } }, storeResource));
describe('Component <TopHeader />', () => {
  it('should renders with props correctly', () => {
    const topHeader = mount(
      <Provider store={storeProfilePage}>
        <StaticRouter location="someLocation" context={context}>
          <TopHeader
            openedPanel="userAccountPanel"
          />
        </StaticRouter>
      </Provider>)
    expect(topHeader).toMatchSnapshot();
  });
  it('should renders with props correctly when we are on the page Profile', () => {
    const topHeader = shallow(
      <TopHeader
        store={storeProfilePage}
      />, { context }).dive().dive();
    expect(topHeader).toMatchSnapshot();
    topHeader.setContext(context);
    topHeader.find('.btn-header-prev').simulate('click');
  });
  it('should renders with props correctly when we are on the ROOT page', () => {
    const topHeader = shallow(
      <TopHeader
        store={storeRootPage}
      />).dive().dive();
    expect(topHeader).toMatchSnapshot();
  });
});
