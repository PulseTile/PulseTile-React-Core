import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import { JSDOM } from 'jsdom';

import { App } from '../../src/components/containers/App/App';

Enzyme.configure({ adapter: new Adapter() });

const jsdom = new JSDOM('<!doctype html><html><body></body></html>');
const { window } = jsdom;
global.window = window;

describe('Component <App />', () => {
  it('should renders correctly when props is empty', () => {
    const component = shallow(
      <App
        isTouchDevice
        requestError={{}}
        initialiseData={{}}
      />);
    expect(component.find('Connect(LoadingBar)')).toHaveLength(1);
    expect(component.find('Footer')).toHaveLength(1);
    expect(component.find('MainSpinner')).toHaveLength(0);
    expect(component.find('HandleErrors')).toHaveLength(0);
    expect(component.find('.wrapper')).toHaveLength(1);
    expect(component.find('TopHeader')).toHaveLength(0);

    expect(component).toMatchSnapshot();
  });
  it('should renders correctly when props not empty', () => {
    const component = shallow(
      <App
        isTouchDevice
        requestError={{}}
        initialiseData={{
          ok: true,
          mode: 'demo',
        }}
      />);
    expect(component.find('Connect(LoadingBar)')).toHaveLength(1);
    expect(component.find('Footer')).toHaveLength(1);
    expect(component.find('MainSpinner')).toHaveLength(1);
    expect(component.find('HandleErrors')).toHaveLength(0);
    expect(component.find('.wrapper')).toHaveLength(1);
    expect(component.find('Connect(Connect(TopHeader))')).toHaveLength(1);
    expect(component.find('Header')).toHaveLength(1);
    expect(component.find('.wrapper').hasClass('touch-device')).toEqual(true);

    expect(component).toMatchSnapshot();
  });
  it('should renders correctly with is not touch device and requestError not empty', () => {
    const component = shallow(
      <App
        testProps="testProps"
        requestError={{
          type: 'HANDLE_ERRORS',
          error: true,
          payload: {
            message: 'ajax error 400',
            xhr: {},
            request: {
              async: true,
              crossDomain: false,
              withCredentials: false,
              headers: {
                headers: {},
                'X-Requested-With': 'XMLHttpRequest',
              },
              method: 'GET',
              responseType: 'json',
              timeout: 0,
              url: '/api/patients/9999999000/referrals/9d19b534-9324-418f-a6b7-4cffbf73f879',
            },
            status: 400,
          },
        }}
        initialiseData={{
          ok: true,
          mode: 'demo',
        }}
      />, { context: { isLeedsPHRHeaderList: true } });
    component.setContext({ isLeedsPHRHeaderList: true });
    expect(component.find('Connect(LoadingBar)')).toHaveLength(1);
    expect(component.find('Footer')).toHaveLength(1);
    expect(component.find('MainSpinner')).toHaveLength(1);
    expect(component.find('Connect(HandleErrors)')).toHaveLength(1);
    expect(component.find('.wrapper')).toHaveLength(1);
    expect(component.find('Connect(Connect(TopHeader))')).toHaveLength(1);
    expect(component.find('Header')).toHaveLength(1);
    expect(component.find('.wrapper').hasClass('is-not-touch-device')).toEqual(true);
    expect(component).toMatchSnapshot();
  });
  it('should renders correctly with context', () => {
    global.ontouchstart = window.ontouchstart;
    const component = shallow(
      <App
        testProps="testProps"
        requestError={{}}
        initialiseData={{
          ok: true,
          mode: 'demo',
        }}
      />);
    expect(component.find('.wrapper').hasClass('touch-device')).toEqual(true);
    expect(component).toMatchSnapshot();
  });
});

