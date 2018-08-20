import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import configureStore from 'redux-mock-store';
import TopThreeThingsCreateForm from '../TopThreeThingsCreate/TopThreeThingsCreateForm';
import { valuesNames, valuesLabels } from '../forms.config';

Enzyme.configure({ adapter: new Adapter() });

const mockStore = configureStore();
const store = mockStore({});
const DATE_TO_USE = new Date('2017');
const DATE_TO_USE_TIME = DATE_TO_USE.getTime();
global.Date = jest.fn(() => DATE_TO_USE);
Date.now = jest.fn(() => DATE_TO_USE_TIME);

const FORM_NAME = 'topThreeThingsCreateForm';
const DATE_FORMAT = 'DD-MMM-YYYY';

const testProps = {
  isSubmit: false,
};

const userId = '9999999000';
const pathname = `/patients/${userId}/topThreeThings/create`;
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

describe('Component <TopThreeThingsCreateForm />', () => {

  it('should renders with props correctly', () => {
    const component = shallow(
      <TopThreeThingsCreateForm
        store={store}
        isSubmit={testProps.isSubmit}
      />, { context }).dive().dive().dive();

    expect(component.find('Field')).toHaveLength(8);
    expect(component.find('form')).toHaveLength(1);
    expect(component.find('form').prop('name')).toEqual(FORM_NAME);

    expect(component.find('Field').at(0).props().name).toEqual(valuesNames.NAME1);
    expect(component.find('Field').at(0).props().label).toEqual(valuesLabels.NAME);
    expect(component.find('Field').at(0).props().props.isSubmit).toEqual(false);

    expect(component.find('Field').at(1).props().name).toEqual(valuesNames.DESCRIPTION1);
    expect(component.find('Field').at(1).props().label).toEqual(valuesLabels.DESCRIPTION);
    expect(component.find('Field').at(1).props().props.isSubmit).toEqual(false);

    expect(component.find('Field').at(2).props().name).toEqual(valuesNames.NAME2);
    expect(component.find('Field').at(2).props().label).toEqual(valuesLabels.NAME);
    expect(component.find('Field').at(2).props().props.isSubmit).toEqual(false);

    expect(component.find('Field').at(3).props().name).toEqual(valuesNames.DESCRIPTION2);
    expect(component.find('Field').at(3).props().label).toEqual(valuesLabels.DESCRIPTION);
    expect(component.find('Field').at(3).props().props.isSubmit).toEqual(false);

    expect(component.find('Field').at(4).props().name).toEqual(valuesNames.NAME3);
    expect(component.find('Field').at(4).props().label).toEqual(valuesLabels.NAME);
    expect(component.find('Field').at(4).props().props.isSubmit).toEqual(false);

    expect(component.find('Field').at(5).props().name).toEqual(valuesNames.DESCRIPTION3);
    expect(component.find('Field').at(5).props().label).toEqual(valuesLabels.DESCRIPTION);
    expect(component.find('Field').at(5).props().props.isSubmit).toEqual(false);

    expect(component.find('Field').at(6).props().name).toEqual(valuesNames.DATE);
    expect(component.find('Field').at(6).props().label).toEqual(valuesLabels.DATE);
    expect(component.find('Field').at(6).props().props.disabled).toEqual(true);
    expect(component.find('Field').at(6).props().props.value).toEqual(DATE_TO_USE_TIME);
    expect(component.find('Field').at(6).props().props.format).toEqual(DATE_FORMAT);

    expect(component).toMatchSnapshot();
  });
});
