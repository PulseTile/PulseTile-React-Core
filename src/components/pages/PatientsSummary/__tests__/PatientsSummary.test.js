import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import configureStore from 'redux-mock-store';

import PatientsSummary from '../PatientsSummary';
import { themeConfigs } from '../../../../themes.config';

Enzyme.configure({ adapter: new Adapter() });

class LocalStorageMock {
  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key] || null;
  }

  setItem(key, value) {
    this.store[key] = value.toString();
  }

  removeItem(key) {
    delete this.store[key];
  }
}
global.localStorage = new LocalStorageMock();

const mockStore = configureStore();
const store = mockStore({
  userId: '9999999000',
  patientsDiagnoses: {},
  patientsContacts: {},
  patientsAllergies: {},
  patientsMedications: {},
  patientsVaccinations: {},
  patientsTopThreeThings: {},
});
const match = {
  params: {},
};
const location = {
  pathname: '/patients',
  search: '?ageRange=61-80',
};
const context = {
  router: {
    history: {
      push: () => {},
      replace: () => {},
      location: {
        pathname: '/patients',
        search: '?ageRange=61-80',
      },
    },
    route: {
      match: {
        params: {},
      },
    },
  },
};

const testProps = {
  onCategorySelected: () => {},
  selectedCategory: {
    problems: true,
    contacts: true,
    allergies: true,
    medications: true,
  },
};

describe('Component <PatientsSummary />', () => {
  it('should renders with all props correctly', () => {
    const component = shallow(
      <PatientsSummary
        store={store}
        match={match}
        location={location}
        onCategorySelected={testProps.onCategorySelected}
        selectedCategory={testProps.selectedCategory}
      />, { context }).dive().dive().dive();

    expect(component).toMatchSnapshot();

    expect(component.instance().props.onCategorySelected).toEqual(testProps.onCategorySelected);
    expect(component.instance().props.selectedCategory).toEqual(testProps.selectedCategory);

    expect(component.find('.page-wrapper')).toHaveLength(1);
    expect(component.find('PatientsSummaryListHeader')).toHaveLength(1);
    expect(component.find('.dashboard')).toHaveLength(1);
    expect(component.find('SimpleDashboardPanel')).toHaveLength(4);
    expect(component.find('ConfirmationModal')).toHaveLength(0);


    component.instance().handleGoToState('contacts');

    component.instance().handleCategorySelected({
      problems: false,
      contacts: false,
      allergies: false,
      medications: false,
    });
    component.setState({ selectedCategory: {
      problems: false,
      contacts: false,
      allergies: false,
      medications: false,
    } });

    component.instance().handleViewOfBoardsSelected({ full: true });
    component.instance().handleViewOfBoardsSelected({ preview: true });

    expect(component.find('SimpleDashboardPanel')).toHaveLength(0);

    themeConfigs.isLeedsPHRTheme = true;
    themeConfigs.patientsSummaryHasPreviewSettings = true;
    component.setState({ selectedCategory: { 'nytimes_com': true } });
    expect(component.find('SimpleDashboardPanel')).toHaveLength(0);

    component.instance().handleGoToState('http://www.bbc.co.uk/news/health');
    component.instance().handleGoToState('http://www.bbc.co.uk/news/health', 'http://testUrl1');
  });

  it('should renders with Disclaimer Modal correctly', () => {
    localStorage.setItem('isShowDisclaimerOfRedirect', true);
    const component = shallow(
      <PatientsSummary
        store={store}
        match={match}
        location={location}
        onCategorySelected={testProps.onCategorySelected}
        selectedCategory={testProps.selectedCategory}
      />, { context }).dive().dive().dive();

    expect(component).toMatchSnapshot();

    expect(component.find('ConfirmationModal')).toHaveLength(1);
    component.instance().closeDisclaimer();
    expect(component.find('ConfirmationModal')).toHaveLength(1);
  });
});

