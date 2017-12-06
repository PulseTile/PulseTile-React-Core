import React from 'react';
import configureStore from 'redux-mock-store';
import sinon from 'sinon'
import Enzyme, { render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import HeaderTitle from '../../src/components/containers/Header/HeaderTitle/HeaderTitle';

Enzyme.configure({ adapter: new Adapter() });

const mockStore = configureStore();
const dispatch = sinon.spy();
const store = mockStore({
  router: {
    location: {
      pathname: '/',
      search: '',
      hash: '#/afafa',
    },
  },
});
describe('Component <HeaderTitle />', () => {
  it('should renders correctly', () => {
    const header = render(
      <HeaderTitle
        dispatch={dispatch}
        store={store}
      />);
    expect(header).toMatchSnapshot();
    expect(header.text()).toEqual('System Dashboard');
  });
  it('should renders correctly on the user profile page', () => {
    const header = render(
      <HeaderTitle
        dispatch={dispatch}
        store={mockStore({
          router: {
            location: {
              pathname: '/',
              search: '',
              hash: '#/profile',
            },
          },
        })}
      />);
    expect(header).toMatchSnapshot();
    expect(header.text()).toEqual('Personal Information');
  });
});

