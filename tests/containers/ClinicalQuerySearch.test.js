import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import configureStore from 'redux-mock-store';

import ClinicalQuerySearch from '../../src/components/containers/ClinicalQuerySearch/ClinicalQuerySearch';
import { valuesNames } from '../../src/components/containers/ClinicalQuerySearch/forms.config';


Enzyme.configure({ adapter: new Adapter() });

Date.now = jest.fn(() => new Date(Date.UTC(2017, 7, 9, 8)).valueOf())

const mockStore = configureStore();
const storeResource = {
  form: {
    clinicalQuerySearchForm: {
      values: {
        [valuesNames.SELECT_AGE]: 'range',
        [valuesNames.AGE_RANGE]: [
          0,
          100
        ],
        [valuesNames.MALE]: false,
        [valuesNames.FEMALE]: false,
        [valuesNames.QUERY_CONTAINS]: true,
        [valuesNames.SEARCH_TYPE]: 'allergies',
        [valuesNames.SEARCH_TYPE]: 'QUERY_TEXT'
      },
    },
  },
};
const storeResourceFill = {
  form: {
    clinicalQuerySearchForm: {
      values: {
        [valuesNames.SELECT_AGE]: 'birthday',
        [valuesNames.AGE_RANGE]: [
          0,
          100,
        ],
        [valuesNames.MALE]: true,
        [valuesNames.FEMALE]: true,
        [valuesNames.DATE_OF_BIRTH]: '28/09/1937',
        [valuesNames.QUERY_CONTAINS]: true,
        [valuesNames.SEARCH_TYPE]: 'allergies',
        [valuesNames.SEARCH_TYPE]: 'QUERY_TEXT'
      },
    },
  },
};
const store = mockStore(storeResource);
const storeFill = mockStore(storeResourceFill);
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

const simulateEvent = {
  preventDefault: () => {},
};

describe('Component <ClinicalQuerySearch />', () => {
  it('should renders with init data in store correctly', () => {
    const component = shallow(
      <ClinicalQuerySearch
        store={store}
      />, { context }).dive();
    component.setContext(context);
    expect(component.state().isOpen).toEqual(true);
    component.find('.btn-success').at(1).simulate('click', simulateEvent);
    expect(component.state().isOpen).toEqual(false);
    expect(component).toMatchSnapshot();

    component.setProps({ formIsValid: false });
    component.find('.btn-success').at(1).simulate('click', simulateEvent);
    expect(component).toMatchSnapshot();
  });

  it('should renders with fill Data in store correctly', () => {
    const component = shallow(
      <ClinicalQuerySearch
        store={storeFill}
      />, { context }).dive();
    component.setContext(context);
    expect(component.state().isOpen).toEqual(true);
    component.find('.btn-success').at(1).simulate('click', simulateEvent);
    expect(component.state().isOpen).toEqual(false);
    component.find('.btn-success').at(0).simulate('click', simulateEvent);
    expect(component.state().isOpen).toEqual(true);
    expect(component).toMatchSnapshot();
  });

});

