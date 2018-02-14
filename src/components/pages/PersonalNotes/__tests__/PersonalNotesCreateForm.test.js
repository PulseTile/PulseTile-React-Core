import React from 'react';
import Enzyme, { shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import configureStore from 'redux-mock-store';

import PersonalNotesCreateForm from '../PersonalNotesCreate/PersonalNotesCreateForm';
import { valuesNames, valuesLabels } from '../forms.config';

Enzyme.configure({ adapter: new Adapter() });

const mockStore = configureStore();
const storeResource = {};
const store = mockStore(storeResource);
const DATE_TO_USE = new Date('2017');
const DATE_TO_USE_TIME = DATE_TO_USE.getTime();
global.Date = jest.fn(() => DATE_TO_USE);

const FORM_NAME = 'personalNoteCreateForm';
const DATE_FORMAT = 'DD-MMM-YYYY';

describe('Component <PersonalNotesCreateForm />', () => {
  it('should renders with all props correctly', () => {
    const component = shallow(
      <PersonalNotesCreateForm
        store={store}
        isSubmit={false}
      />
    ).dive().dive().dive();

    expect(component).toMatchSnapshot();

    expect(component.instance().props['isSubmit']).toEqual(false);
    expect(component.find('form')).toHaveLength(1);
    expect(component.find('form').prop('name')).toEqual(FORM_NAME);
    expect(component.find('Field')).toHaveLength(4);

    expect(component.find('Field').at(0).props().name).toEqual(valuesNames.TYPE);
    expect(component.find('Field').at(0).props().label).toEqual(valuesLabels.TYPE);
    expect(component.find('Field').at(0).props().type).toEqual('text');
    expect(component.find('Field').at(0).props().props.isSubmit).toEqual(false);

    expect(component.find('Field').at(1).props().name).toEqual(valuesNames.NOTES);
    expect(component.find('Field').at(1).props().label).toEqual(valuesLabels.NOTES);
    expect(component.find('Field').at(1).props().props.isSubmit).toEqual(false);

    expect(component.find('Field').at(2).props().name).toEqual(valuesNames.AUTHOR);
    expect(component.find('Field').at(2).props().label).toEqual(valuesLabels.AUTHOR);
    expect(component.find('Field').at(2).props().props.disabled).toEqual(true);

    expect(component.find('Field').at(3).props().name).toEqual(valuesNames.DATE);
    expect(component.find('Field').at(3).props().label).toEqual(valuesLabels.DATE);
    expect(component.find('Field').at(3).props().props.value).toEqual(DATE_TO_USE_TIME);
    expect(component.find('Field').at(3).props().props.format).toEqual(DATE_FORMAT);
    expect(component.find('Field').at(3).props().props.disabled).toEqual(true);
  });

  it('should renders correctly when form is submitted', () => {
    const component = shallow(
      <PersonalNotesCreateForm
        store={store}
        isSubmit
      />
    ).dive().dive().dive();

    expect(component).toMatchSnapshot();

    expect(component.find('Field').at(0).props().props.isSubmit).toEqual(true);
    expect(component.find('Field').at(1).props().props.isSubmit).toEqual(true);
  });
});

