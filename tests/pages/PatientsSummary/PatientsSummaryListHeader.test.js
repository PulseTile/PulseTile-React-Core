import React from 'react';
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-15';

configure({ adapter: new Adapter() });

import PatientsSummaryListHeader from '../../../src/components/pages/PatientsSummary/header/PatientsSummaryListHeader';

const testProps = {
  onCategorySelected: () => {},
  selectedCategory: {
    problems: true,
    contacts: true,
    allergies: true,
    medications: true,
  },
};

describe('Component <PatientsSummaryListHeader />', () => {
  it('should renders with all props correctly', () => {
    const component = shallow(
      <PatientsSummaryListHeader
        onCategorySelected={testProps.onCategorySelected}
        selectedCategory={testProps.selectedCategory}
      />);
    expect(component).toMatchSnapshot();

    expect(component.instance().props.onCategorySelected).toEqual(testProps.onCategorySelected);
    expect(component.instance().props.selectedCategory).toEqual(testProps.selectedCategory);
    expect(component.instance().state.isPatientSummaryPanelVisible).toEqual(false);

    expect(component.find('.dropdown')).toHaveLength(1);
    expect(component.find('.dropdown').hasClass('open')).toEqual(false);
    expect(component.find('PTButton')).toHaveLength(1);
    expect(component.find('PatientsSummaryPanel')).toHaveLength(0);
    expect(component.find('.panel-title').text()).toEqual('Patient Summary');

    component.instance().togglePatientSummaryPanelVisibility();
    component.instance().togglePatientSummaryPanelVisibility({}, true);

    component.setState({ isPatientSummaryPanelVisible: true });
    expect(component.instance().state.isPatientSummaryPanelVisible).toEqual(true);
    expect(component.find('.dropdown').hasClass('open')).toEqual(true);

    expect(component).toMatchSnapshot();
  });
});
