import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import { Provider } from 'react-redux'
import { StaticRouter } from 'react-router'
import configureStore from 'redux-mock-store';

import NavSearch from '../../src/components/containers/NavSearch/NavSearch';

Enzyme.configure({ adapter: new Adapter() });

const mockStore = configureStore();
const store = mockStore({
  runtime: {},
  userAccount: { role: 'IDCR' },
});
const context = {};
const userAccountIDCR = { role: 'IDCR' };
const userAccountPHR = { role: 'PHR' };
const onClose = () => console.log('onClose function worked');

describe('Component <NavSearch />', () => {
  it('should renders mount correctly', () => {
    const navSearch = mount(
      <Provider store={store}>
        <StaticRouter location="someLocation" context={context}>
          <NavSearch
            userAccount={userAccountIDCR}
            onClose={onClose}
          />
        </StaticRouter>
      </Provider>
    );
    navSearch.find('.dropdown-menu-item').at(1).simulate('click');
    expect(navSearch).toMatchSnapshot();
    navSearch.find('.btn-danger').simulate('click');
    navSearch.find('.btn-search-toggle').at(0).simulate('click');
    navSearch.find('.dropdown-menu-item').at(0).simulate('click');
    expect(navSearch).toMatchSnapshot();
  });
  it('should renders mount correctly', () => {
    const navSearch = mount(
      <Provider store={store}>
        <StaticRouter location="someLocation" context={context}>
          <NavSearch
            userAccount={userAccountPHR}
          />
        </StaticRouter>
      </Provider>
    );
    navSearch.find('.btn-search-toggle').at(0).simulate('click');
    expect(navSearch).toMatchSnapshot();
  });
  it('should renders shallow correctly shallow', () => {
    const navSearch = shallow(
      <NavSearch
        userAccount={userAccountIDCR}
      />
    );
    navSearch.setState({ selected: 'advancedSearch' });
    expect(navSearch.state().selected).toEqual('advancedSearch');
    navSearch.find('.advanced-search').simulate('click');
    navSearch.find('.btn-search-toggle').simulate('click');
    navSearch.find('.btn-search-toggle').simulate('click');
    navSearch.unmount();
    expect(navSearch).toMatchSnapshot();
  });
});

