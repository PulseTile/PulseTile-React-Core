import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import configureStore from 'redux-mock-store';

import MedicationsCreateForm from '../../../src/components/pages/Medications/MedicationsCreate/MedicationsCreateForm';
import { valuesNames, valuesLabels, routeOptions } from '../../../src/components/pages/Medications/forms.config';
import { getDDMMMYYYY } from '../../../src/utils/time-helpers.utils';

Enzyme.configure({ adapter: new Adapter() });

const mockStore = configureStore();
const store = mockStore({});
const DATE_TO_USE = new Date('2017');
const DATE_TO_USE_TIME = DATE_TO_USE.getTime();
global.Date = jest.fn(() => DATE_TO_USE);
Date.now = jest.fn(() => DATE_TO_USE_TIME);

const FORM_NAME = 'medicationsCreateForm';
const DATE_FORMAT = 'DD-MMM-YYYY';

const testProps = {
  isSubmit: false,
};

const CONVERT_START_DATE = getDDMMMYYYY(DATE_TO_USE_TIME);

const userId = '9999999000';
const pathname = `/patients/${userId}/medications/create`;
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
            name: 'name',
          }
        }
      },
    }
  },
};

describe('Component <MedicationsCreateForm />', () => {
  it('should renders with props correctly', () => {
    const component = shallow(
      <MedicationsCreateForm
        store={store}
        isSubmit={testProps.isSubmit}
      />, { context }).dive().dive().dive();

    expect(component.find('Field')).toHaveLength(8);
    expect(component.find('form')).toHaveLength(1);
    expect(component.find('form').prop('name')).toEqual(FORM_NAME);

    expect(component.find('Field').at(0).props().name).toEqual(valuesNames.NAME);
    expect(component.find('Field').at(0).props().id).toEqual(valuesNames.NAME);
    expect(component.find('Field').at(0).props().label).toEqual(valuesLabels.NAME);
    expect(component.find('Field').at(0).props().props.isSubmit).toEqual(false);

    expect(component.find('Field').at(1).props().name).toEqual(valuesNames.DOSE_AMOUNT);
    expect(component.find('Field').at(1).props().id).toEqual(valuesNames.DOSE_AMOUNT);
    expect(component.find('Field').at(1).props().label).toEqual(valuesLabels.DOSE_AMOUNT);
    expect(component.find('Field').at(1).props().props.isSubmit).toEqual(false);

    expect(component.find('Field').at(2).props().name).toEqual('doseAmountVariable');
    expect(component.find('Field').at(2).props().id).toEqual('doseAmountVariable');
    expect(component.find('Field').at(2).props().label).toEqual('Variable');
    expect(component.find('Field').at(2).props().type).toEqual('checkbox');

    expect(component.find('Field').at(3).props().name).toEqual(valuesNames.DOSE_TIMING);
    expect(component.find('Field').at(3).props().id).toEqual(valuesNames.DOSE_TIMING);
    expect(component.find('Field').at(3).props().label).toEqual(valuesLabels.DOSE_TIMING);
    expect(component.find('Field').at(3).props().props.isSubmit).toEqual(false);

    expect(component.find('Field').at(4).props().name).toEqual(valuesNames.DOSE_DIRECTIONS);
    expect(component.find('Field').at(4).props().id).toEqual(valuesNames.DOSE_DIRECTIONS);
    expect(component.find('Field').at(4).props().label).toEqual(valuesLabels.DOSE_DIRECTIONS);
    expect(component.find('Field').at(4).props().props.isSubmit).toEqual(false);

    expect(component.find('Field').at(5).props().name).toEqual(valuesNames.ROUTE);
    expect(component.find('Field').at(5).props().id).toEqual(valuesNames.ROUTE);
    expect(component.find('Field').at(5).props().label).toEqual(valuesLabels.ROUTE);
    expect(component.find('Field').at(5).props().options).toEqual(routeOptions);
    expect(component.find('Field').at(5).props().props.isSubmit).toEqual(false);
    expect(component.find('Field').at(5).props().props.placeholder).toEqual('-- Route --');

    expect(component.find('Field').at(6).props().name).toEqual(valuesNames.AUTHOR);
    expect(component.find('Field').at(6).props().id).toEqual(valuesNames.AUTHOR);
    expect(component.find('Field').at(6).props().label).toEqual(valuesLabels.AUTHOR);
    expect(component.find('Field').at(6).props().props.isSubmit).toEqual(false);
    expect(component.find('Field').at(6).props().props.disabled).toEqual(true);

    expect(component.find('Field').at(7).props().name).toEqual(valuesNames.START_DATE);
    expect(component.find('Field').at(7).props().id).toEqual(valuesNames.START_DATE);
    expect(component.find('Field').at(7).props().label).toEqual(valuesLabels.START_DATE);
    expect(component.find('Field').at(7).props().props.isSubmit).toEqual(false);
    expect(component.find('Field').at(7).props().props.disabled).toEqual(true);
    expect(component.find('Field').at(7).props().props.value).toEqual(CONVERT_START_DATE);
    expect(component.find('Field').at(7).props().props.format).toEqual(DATE_FORMAT);

    expect(component).toMatchSnapshot();
  });

  it('should renders correctly when form is submitted', () => {
    const component = shallow(
      <MedicationsCreateForm
        store={store}
        isSubmit
      />, { context }).dive().dive().dive();
    expect(component.find('Field')).toHaveLength(8);
    expect(component.find('form')).toHaveLength(1);
    expect(component.find('form').prop('name')).toEqual(FORM_NAME);

    expect(component.find('Field').at(0).props().props.isSubmit).toEqual(true);
    expect(component.find('Field').at(1).props().props.isSubmit).toEqual(true);
    expect(component.find('Field').at(3).props().props.isSubmit).toEqual(true);
    expect(component.find('Field').at(4).props().props.isSubmit).toEqual(true);
    expect(component.find('Field').at(5).props().props.isSubmit).toEqual(true);
    expect(component.find('Field').at(6).props().props.isSubmit).toEqual(true);
    expect(component.find('Field').at(7).props().props.isSubmit).toEqual(true);

    expect(component).toMatchSnapshot();
  });

  it('should renders correctly when data take from Documents how "import"', () => {
    const component = shallow(
      <MedicationsCreateForm
        store={store}
      />, { context: contextImport }).dive().dive().dive();
    expect(component.find('Field')).toHaveLength(9);

    expect(component.find('Field').at(6).props().name).toEqual(valuesNames.IMPORT);
    expect(component.find('Field').at(6).props().label).toEqual(valuesLabels.IMPORT);
    expect(component.find('Field').at(6).props().props.disabled).toEqual(true);

    expect(component).toMatchSnapshot();
  });
});

