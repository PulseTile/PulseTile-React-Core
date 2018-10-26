import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

import PatientsSummaryPanel from '../header/PatientsSummaryPanel';
import { themeConfigs } from '../../../../themes.config';
import { testStoreContent } from '../../../theme/config/plugins';
import { getPanelsNumber, getHeadingsNumber } from '../functions';

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

const testProps = {
  onCategorySelected: () => {},
  selectedCategory: {
    problems: true,
    contacts: true,
    allergies: true,
    medications: true,
  },
};

configure({ adapter: new Adapter() });

describe('Component <PatientsSummaryPanel />', () => {
  it('should renders with all props correctly', () => {
    const component = shallow(
      <PatientsSummaryPanel
        onCategorySelected={testProps.onCategorySelected}
        selectedCategory={testProps.selectedCategory}
        onViewOfBoardsSelected={() => {}}
      />).dive();
    expect(component).toMatchSnapshot();

    expect(component.instance().props.onCategorySelected).toEqual(testProps.onCategorySelected);
    expect(component.instance().props.selectedCategory).toEqual(testProps.selectedCategory);

    const panelsNumber = getPanelsNumber(testStoreContent);
    const headingsNumber = getHeadingsNumber();

    expect(component.find('.heading')).toHaveLength(headingsNumber);
    if (headingsNumber > 1) {
      expect(component.find('.heading').at(0).text()).toEqual('SHOW');
      expect(component.find('.heading').at(1).text()).toEqual('VIEW OF BOARDS');
      expect(component.find('PTCustomInput[type="checkbox"]')).toHaveLength(panelsNumber);
      expect(component.find('PTCustomInput[type="radio"]')).toHaveLength(2);
    } else {
      expect(component.find('.heading').text()).toEqual('SHOW');
      expect(component.find('PTCustomInput[type="checkbox"]')).toHaveLength(panelsNumber);
    }

    component.instance().toggleCheckbox('dashboard-name');
    component.setState({ selected: {
      problems: true,
      contacts: false,
      allergies: true,
      medications: false,
    } });
    component.setState({ selected: {
      problems: true,
      contacts: false,
      allergies: true,
      medications: false,
    } });

    component.instance().toggleRadio('test');

    component.setState({
      selectedViewOptions: {
        full: false,
        preview: true,
      },
    });

    component.setProps({
      patientsSummaryHasPreviewSettings: true,
    })
  });

  it('should renders with all props correctly with LeedsPHRTheme', () => {
    themeConfigs.isLeedsPHRTheme = true;
    const component = shallow(
      <PatientsSummaryPanel
        onCategorySelected={testProps.onCategorySelected}
        selectedCategory={testProps.selectedCategory}
        onViewOfBoardsSelected={() => {}}
        feeds={testProps.feeds}
      />).dive();

    expect(component).toMatchSnapshot();
  });
});
