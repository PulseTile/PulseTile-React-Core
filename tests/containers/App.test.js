import React from 'react';
import { shallow, mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import sinon from 'sinon'

import App from '../../src/components/containers/App/App';

const mockStore = configureStore();
const dispatch = sinon.spy();

describe('Component <App />', () => {
  it('should renders correctly with touch device', () => {
    const app = shallow(
      <App
        dispatch={dispatch}
        store={mockStore({ runtime: {} })}
        isTouchDevice
      />);
    expect(app).toMatchSnapshot();
    expect(app.find('.wrapper').hasClass('touch-device')).toEqual(true);
  });
  it('should renders correctly with is not touch device', () => {
    const app = shallow(
      <App
        dispatch={dispatch}
        store={mockStore({ runtime: {} })}
      />);
    expect(app).toMatchSnapshot();
    expect(app.find('.wrapper').hasClass('is-not-touch-device')).toEqual(true);
  });
});

