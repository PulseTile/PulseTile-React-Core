import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import configureStore from 'redux-mock-store';

import ClinicalNotesCreateForm from '../../../src/components/pages/ClinicalNotes/ClinicalNotesCreate/ClinicalNotesCreateForm';
import { valuesNames, valuesLabels } from '../../../src/components/pages/ClinicalNotes/forms.config';

Enzyme.configure({ adapter: new Adapter() });

const mockStore = configureStore();
const store = mockStore({});
const DATE_TO_USE = new Date('2017');
const DATE_TO_USE_TIME = DATE_TO_USE.getTime();
global.Date = jest.fn(() => DATE_TO_USE);

const FORM_NAME = 'clinicalNoteCreateForm';
const DATE_FORMAT = 'DD-MMM-YYYY';

const testProps = {
  isSubmit: false,
};

describe('Component <ClinicalNotesCreateForm />', () => {
  it('should renders with props correctly', () => {
    const component = shallow(
      <ClinicalNotesCreateForm
        store={store}
        isSubmit={testProps.isSubmit}
      />).dive().dive().dive();

    expect(component.find('Field')).toHaveLength(4);
    expect(component.find('form')).toHaveLength(1);
    expect(component.find('form').prop('name')).toEqual(FORM_NAME);

    expect(component.find('Field').at(0).props().name).toEqual(valuesNames.TYPE);
    expect(component.find('Field').at(0).props().id).toEqual(valuesNames.TYPE);
    expect(component.find('Field').at(0).props().label).toEqual(valuesLabels.TYPE);
    expect(component.find('Field').at(0).props().props.isSubmit).toEqual(false);

    expect(component.find('Field').at(1).props().name).toEqual(valuesNames.NOTE);
    expect(component.find('Field').at(1).props().id).toEqual(valuesNames.NOTE);
    expect(component.find('Field').at(1).props().label).toEqual(valuesLabels.NOTE);
    expect(component.find('Field').at(1).props().props.isSubmit).toEqual(false);

    expect(component.find('Field').at(2).props().name).toEqual(valuesNames.AUTHOR);
    expect(component.find('Field').at(2).props().id).toEqual(valuesNames.AUTHOR);
    expect(component.find('Field').at(2).props().label).toEqual(valuesLabels.AUTHOR);
    expect(component.find('Field').at(2).props().props.disabled).toEqual(true);

    expect(component.find('Field').at(3).props().name).toEqual(valuesNames.DATE);
    expect(component.find('Field').at(3).props().label).toEqual(valuesLabels.DATE);
    expect(component.find('Field').at(3).props().props.disabled).toEqual(true);
    expect(component.find('Field').at(3).props().props.value).toEqual(DATE_TO_USE_TIME);
    expect(component.find('Field').at(3).props().props.format).toEqual(DATE_FORMAT);

    expect(component).toMatchSnapshot();
  });

  it('should renders correctly when form is submitted', () => {
    const component = shallow(
      <ClinicalNotesCreateForm
        store={store}
        isSubmit
      />).dive().dive().dive();
    expect(component.find('Field')).toHaveLength(4);
    expect(component.find('form')).toHaveLength(1);
    expect(component.find('form').prop('name')).toEqual(FORM_NAME);

    expect(component.find('Field').at(0).props().props.isSubmit).toEqual(true);
    expect(component.find('Field').at(1).props().props.isSubmit).toEqual(true);

    expect(component).toMatchSnapshot();
  });
});

