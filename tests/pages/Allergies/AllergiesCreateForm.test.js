import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import configureStore from 'redux-mock-store';

import AllergiesCreateForm from '../../../src/components/pages/Allergies/AllergiesCreate/AllergiesCreateForm';
import { valuesNames, valuesLabels } from '../../../src/components/pages/Allergies/forms.config';

Enzyme.configure({ adapter: new Adapter() });

const mockStore = configureStore();
const store = mockStore({});
const DATE_TO_USE = new Date('2017');
const DATE_TO_USE_TIME = DATE_TO_USE.getTime();
global.Date = jest.fn(() => DATE_TO_USE);
Date.now = jest.fn(() => DATE_TO_USE_TIME);

const FORM_NAME = 'allergiesCreateForm';
const DATE_FORMAT = 'DD-MMM-YYYY';

const testProps = {
  isSubmit: false,
};

const userId = '9999999000';
const pathname = `/patients/${userId}/allergies/create`;
const route = {
  match: {
    params: { userId },
  },
};

const context = {
  router: {
    route,
    history: {
      push: () => {},
      replace: () => {},
      location: { pathname },
    },
  },
};
const contextImport = {
  router: {
    route,
    history: {
      push: () => {},
      replace: () => {},
      location: {
        pathname,
        state: {
          importData: {
            isImport: true,
            originalSource: 'domen.com/documents/documents_id',
            cause: 'cause',
          },
        },
      },
    },
  },
};

const contextImportWithTerminology = {
  router: {
    route,
    history: {
      push: () => {},
      replace: () => {},
      location: {
        pathname,
        state: {
          importData: {
            isImport: true,
            originalSource: 'domen.com/documents/documents_id',
            cause: 'cause',
            causeTerminology: 'causeTerminology',
            terminologyCode: 'terminologyCode',
          },
        },
      },
    },
  },
};

describe('Component <AllergiesCreateForm />', () => {
  it('should renders with props correctly', () => {
    const component = shallow(
      <AllergiesCreateForm
        store={store}
        isSubmit={testProps.isSubmit}
      />, { context }).dive().dive().dive();

    expect(component.find('Field')).toHaveLength(7);
    expect(component.find('form')).toHaveLength(1);
    expect(component.find('form').prop('name')).toEqual(FORM_NAME);

    expect(component.find('Field').at(0).props().name).toEqual(valuesNames.CAUSE);
    expect(component.find('Field').at(0).props().label).toEqual(valuesLabels.CAUSE);
    expect(component.find('Field').at(0).props().props.isSubmit).toEqual(false);

    expect(component.find('Field').at(1).props().name).toEqual(valuesNames.CAUSECODE);
    expect(component.find('Field').at(1).props().label).toEqual(valuesLabels.CAUSECODE);
    expect(component.find('Field').at(1).props().props.isSubmit).toEqual(false);
    expect(component.find('Field').at(1).props().props.className).toEqual('form-control-static');

    expect(component.find('Field').at(2).props().name).toEqual(valuesNames.REACTION);
    expect(component.find('Field').at(2).props().label).toEqual(valuesLabels.REACTION);
    expect(component.find('Field').at(2).props().props.isSubmit).toEqual(false);

    expect(component.find('Field').at(3).props().name).toEqual(valuesNames.TERMINOLOGY);
    expect(component.find('Field').at(3).props().label).toEqual(valuesLabels.TERMINOLOGY);
    expect(component.find('Field').at(3).props().props.className).toEqual('form-control-static');

    expect(component.find('Field').at(4).props().name).toEqual(valuesNames.TERMINOLOGYCODE);
    expect(component.find('Field').at(4).props().label).toEqual(valuesLabels.TERMINOLOGYCODE);
    expect(component.find('Field').at(4).props().props.className).toEqual('form-control-static');

    expect(component.find('Field').at(5).props().name).toEqual(valuesNames.AUTHOR);
    expect(component.find('Field').at(5).props().label).toEqual(valuesLabels.AUTHOR);
    expect(component.find('Field').at(5).props().props.disabled).toEqual(true);

    expect(component.find('Field').at(6).props().name).toEqual(valuesNames.DATE);
    expect(component.find('Field').at(6).props().label).toEqual(valuesLabels.DATE);
    expect(component.find('Field').at(6).props().props.disabled).toEqual(true);
    expect(component.find('Field').at(6).props().props.value).toEqual(DATE_TO_USE_TIME);
    expect(component.find('Field').at(6).props().props.format).toEqual(DATE_FORMAT);

    expect(component).toMatchSnapshot();
  });

  it('should renders correctly when form is submitted', () => {
    const component = shallow(
      <AllergiesCreateForm
        store={store}
        isSubmit
      />, { context }).dive().dive().dive();
    expect(component.find('Field')).toHaveLength(7);
    expect(component.find('form')).toHaveLength(1);
    expect(component.find('form').prop('name')).toEqual(FORM_NAME);

    expect(component.find('Field').at(0).props().props.isSubmit).toEqual(true);
    expect(component.find('Field').at(1).props().props.isSubmit).toEqual(true);
    expect(component.find('Field').at(2).props().props.isSubmit).toEqual(true);

    expect(component).toMatchSnapshot();
  });

  it('should renders correctly when data take from Documents how "import"', () => {
    const component = shallow(
      <AllergiesCreateForm
        store={store}
      />, { context: contextImport }).dive().dive().dive();
    expect(component.find('Field')).toHaveLength(8);

    expect(component.find('Field').at(5).props().name).toEqual(valuesNames.IMPORT);
    expect(component.find('Field').at(5).props().label).toEqual(valuesLabels.IMPORT);
    expect(component.find('Field').at(5).props().props.disabled).toEqual(true);

    expect(component).toMatchSnapshot();
  });

  it('should renders correctly when data take from Documents how "import" with Terminology', () => {
    const component = shallow(
      <AllergiesCreateForm
        store={store}
      />, { context: contextImportWithTerminology }).dive().dive().dive();
    expect(component.find('Field')).toHaveLength(8);

    expect(component.find('Field').at(5).props().name).toEqual(valuesNames.IMPORT);
    expect(component.find('Field').at(5).props().label).toEqual(valuesLabels.IMPORT);
    expect(component.find('Field').at(5).props().props.disabled).toEqual(true);

    expect(component).toMatchSnapshot();
  });
});

