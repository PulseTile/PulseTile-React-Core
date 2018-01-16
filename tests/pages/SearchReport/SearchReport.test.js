import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import configureStore from 'redux-mock-store';

import SearchReport from '../../../src/components/pages/SearchReport/SearchReport';

Enzyme.configure({ adapter: new Adapter() });

const mockStore = configureStore();
const storeResource = {
  clinicalQuerySearch: [
    {
      id: '9999999000',
      nhsNumber: '9999999000',
      name: 'Ivor Cox',
      address: '6948 Et St., Halesowen, Worcestershire, VX27 5DV',
      dateOfBirth: -806976000000,
      gender: 'Male',
      phone: '(011981) 32362',
      gpName: 'Goff Carolyn D.',
      gpAddress: 'Hamilton Practice, 5544 Ante Street, Hamilton, Lanarkshire, N06 5LP',
      pasNo: 352541,
      department: 'Neighbourhood',
    },
  ],
};
const storeWithClinicalQuerySearch = mockStore(Object.assign({}, storeResource));
const emptyStore = mockStore();
const location = {
  pathname: '/search-report',
  search: '?searchString=%7B%22minValue%22%3A0%2C%22maxValue%22%3A100%2C%22queryContains%22%3Atrue%2C%22queryText%22%3A%221%22%2C%22sexMale%22%3Atrue%2C%22sexFemale%22%3Afalse%2C%22type%22%3A%22allergies%22%7D&queryType=clinicalQuery',
};
const history = {
  push: () => {},
  replace: () => {},
  location,
};
const context = {
  router: {
    history,
    route: {
      match: {
        params: {},
      },
    },
  },
};

const generateNewContext = (oldContext, search) => {
  const newContext = Object.assign({}, oldContext);
  newContext.router = Object.assign({}, newContext.router);
  newContext.router.history = Object.assign({}, newContext.router.history);
  newContext.router.history.location = { search };
  return newContext;
};

const contextWithAllGender = generateNewContext(context, '?searchString=%7B%22minValue%22%3A0%2C%22maxValue%22%3A100%2C%22queryContains%22%3Atrue%2C%22queryText%22%3A%22s%22%2C%22sexMale%22%3Atrue%2C%22sexFemale%22%3Atrue%2C%22type%22%3A%22allergies%22%7D&queryType=clinicalQuery');
const contextWithOnlySexFemale = generateNewContext(context, '?searchString=%7B%22minValue%22%3A0%2C%22maxValue%22%3A100%2C%22queryContains%22%3Atrue%2C%22queryText%22%3A%22s%22%2C%22sexMale%22%3Afalse%2C%22sexFemale%22%3Atrue%2C%22type%22%3A%22allergies%22%7D&queryType=clinicalQuery');
const contextWithDateOfBirth = generateNewContext(context, '?searchString=%7B%22queryContains%22%3Atrue%2C%22queryText%22%3A%221%22%2C%22sexMale%22%3Afalse%2C%22sexFemale%22%3Afalse%2C%22type%22%3A%22allergies%22%2C%22dateOfBirth%22%3A%221944-06-06T16%3A10%3A58.000Z%22%7D&queryType=clinicalQuery');

describe('Component <SearchReport />', () => {
  it('should renders correctly when store not empty', () => {
    const component = shallow(
      <SearchReport
        store={storeWithClinicalQuerySearch}
        history={history}
        location={location}
      />, { context }).dive().dive().dive();

    expect(component.find('PTPanel')).toHaveLength(1);
    expect(component.find('PTPanel').props().children.props.title).toEqual('Found Patients By Clinical Query');
    expect(component.find('PTPanel').props().children.props.isChartsDataReceived).toEqual(true);
    expect(component.find('PTPanel').props().children.props.isClinicalQueryChart).toEqual(true);

    expect(component).toMatchSnapshot();

    // Testing methods
    component.instance().handleBarClick(storeResource.clinicalQuerySearch);
    component.setProps({ clinicalQuerySearch: storeResource.clinicalQuerySearch });

    expect(component).toMatchSnapshot();

    component.setContext(contextWithAllGender);
    component.setProps({ test: 'test' });

    component.setContext(contextWithOnlySexFemale);
    component.setProps({ test: 'test' });

    component.setContext(contextWithDateOfBirth);
    component.setProps({ test: 'test' });

    expect(component).toMatchSnapshot();
  });

  it('should renders correctly when store empty', () => {
    const component = shallow(
      <SearchReport
        store={emptyStore}
        history={history}
        location={location}
      />, { context }).dive().dive().dive();

    expect(component).toMatchSnapshot();
  });
});

