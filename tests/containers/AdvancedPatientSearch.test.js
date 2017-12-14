import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux'
import { StaticRouter } from 'react-router'

import AdvancedPatientSearch from '../../src/components/containers/AdvancedPatientSearch/AdvancedPatientSearch';

Enzyme.configure({ adapter: new Adapter() });
const mockStore = configureStore();
const storeResource = {
  form: {
    advancedPatientSearchForm: {
      values: {
        selectAgeField: 'range',
        ageRange: [
          0,
          100,
        ],
        sexMale: false,
        sexFemale: false,
      },
    },
  },
};
const storeResourceFill = {
  form: {
    advancedPatientSearchForm: {
      values: {
        selectAgeField: 'birthday',
        ageRange: [
          0,
          100,
        ],
        sexMale: true,
        sexFemale: true,
        nhsNumber: '9999999012',
        surname: 'fafaf',
        forename: 'afafafafafa',
        dateOfBirth: '28/09/1937',
      },
    },
  },
};
const storeResourceWithoutNHS = {
  form: {
    advancedPatientSearchForm: {
      values: {
        selectAgeField: 'birthday',
        ageRange: [
          0,
          100,
        ],
        sexMale: true,
        sexFemale: true,
        surname: 'fafaf',
        forename: 'afafafafafa',
        dateOfBirth: '28/09/1937',
      },
    },
  },
};
const store = mockStore(storeResource);
const storeFill = mockStore(storeResourceFill);
const storeWithoutNHS = mockStore(storeResourceWithoutNHS);
const context = {
  router: {
    history: {
      test: 'test',
      goBack: () => {},
      push: () => {},
      replace: () => {},
    },
  },
};


describe('Component <AdvancedPatientSearch />', () => {
  it('should renders mount with fill Data in store correctly', () => {
    const advancedPatientSearch = mount(
      <Provider store={storeFill}>
        <StaticRouter location="someLocation" context={context}>
          <AdvancedPatientSearch />
        </StaticRouter>
      </Provider>);
    expect(advancedPatientSearch).toMatchSnapshot();
  });

  it('should renders with init data in store correctly', () => {
    const advancedPatientSearch = shallow(
      <AdvancedPatientSearch
        store={store}
      />, { context }).dive();
    advancedPatientSearch.setContext(context);
    expect(advancedPatientSearch.state().isOpen).toEqual(true);
    advancedPatientSearch.find('.btn-success').at(1).simulate('click');
    expect(advancedPatientSearch.state().isOpen).toEqual(false);
    expect(advancedPatientSearch).toMatchSnapshot();
  });

  it('should renders with fill Data in store correctly', () => {
    const advancedPatientSearch = shallow(
      <AdvancedPatientSearch
        store={storeFill}
      />, { context }).dive();
    advancedPatientSearch.setContext(context);
    expect(advancedPatientSearch.state().isOpen).toEqual(true);
    advancedPatientSearch.find('.btn-success').at(1).simulate('click');
    expect(advancedPatientSearch.state().isOpen).toEqual(false);
    advancedPatientSearch.find('.btn-success').at(0).simulate('click');
    expect(advancedPatientSearch.state().isOpen).toEqual(true);
    expect(advancedPatientSearch).toMatchSnapshot();
  });

  it('should renders with Data except nhs number in store correctly', () => {
    const advancedPatientSearch = shallow(
      <AdvancedPatientSearch
        store={storeWithoutNHS}
      />, { context }).dive();
    advancedPatientSearch.setContext(context);
    expect(advancedPatientSearch.state().isOpen).toEqual(true);
    advancedPatientSearch.find('.btn-success').at(1).simulate('click');
    expect(advancedPatientSearch.state().isOpen).toEqual(false);
    advancedPatientSearch.find('.btn-success').at(0).simulate('click');
    expect(advancedPatientSearch.state().isOpen).toEqual(true);
    expect(advancedPatientSearch).toMatchSnapshot();
  });
});

