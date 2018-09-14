import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import configureStore from 'redux-mock-store';

import OrdersCreateForm from '../OrdersCreate/OrdersCreateForm';
import { valuesNames, valuesLabels } from '../forms.config';

Enzyme.configure({ adapter: new Adapter() });

const mockStore = configureStore();
const storeResource = {};
const store = mockStore(storeResource);
const DATE_TO_USE = new Date('2017');
const DATE_TO_USE_TIME = DATE_TO_USE.getTime();
global.Date = jest.fn(() => DATE_TO_USE);
Date.now = jest.fn(() => DATE_TO_USE_TIME);

const FORM_NAME = 'orderForm';
const DATE_FORMAT = 'DD-MMM-YYYY';

const testProps = {
  listOrders: [
    {
      code: 'order1',
      text: 'Xray Chest X-ray',
    },
    {
      code: 'order2',
      text: 'Radiology-CT Head',
    },
    {
      code: 'order3',
      text: 'Cardiac-ECG',
    },
    {
      code: 'order4',
      text: 'Physio-crutches',
    },
  ],
  setChosenOrders: () => {},
}

describe('Component <OrdersCreateForm />', () => {
  it('should renders with all props correctly', () => {
    const component = shallow(
      <OrdersCreateForm
        store={store}
        isSubmit={false}
        setChosenOrders={testProps.setChosenOrders}
        listOrders={testProps.listOrders}
      />
    ).dive().dive().dive();

    // The initial state of the component
    expect(component.state().idSelectedLeft).toEqual(null);
    expect(component.state().idSelectedRight).toEqual(null);
    expect(component.state().chosenOrders).toEqual([]);
    expect(component.state().listOrders).toEqual(testProps.listOrders);
    expect(component.state().isFirstPage).toEqual(true);

    // Testing chooseAll methods
    component.instance().chooseAll();
    expect(component.state().chosenOrders).toEqual(testProps.listOrders);
    expect(component.state().listOrders).toEqual([]);

    // Testing pageTwo methods
    component.instance().pageTwo();
    expect(component.state().isFirstPage).toEqual(false);

    // Testing pageTwo methods
    component.instance().pageOne();
    expect(component.state().isFirstPage).toEqual(true);

    // Testing setSelectedRight methods
    expect(component.state().idSelectedRight).toEqual(null);
    component.instance().setSelectedRight('order1');
    expect(component.state().idSelectedRight).toEqual('order1');

    // Testing cancelItem methods
    expect(component.state().chosenOrders.length).toEqual(4);
    expect(component.state().chosenOrders).toEqual(testProps.listOrders);
    expect(component.state().listOrders).toEqual([]);
    component.instance().cancelItem();
    expect(component.state().chosenOrders.length).toEqual(3);
    expect(component.state().listOrders).toEqual([{ 'code': 'order1', 'text': 'Xray Chest X-ray' }]);

    // Testing setSelectedLeft methods
    expect(component.state().idSelectedLeft).toEqual(null);
    component.instance().setSelectedLeft('order1');
    expect(component.state().idSelectedLeft).toEqual('order1');

    // Testing chooseItem methods
    expect(component.state().chosenOrders.length).toEqual(3);
    expect(component.state().listOrders).toEqual([{ 'code': 'order1', 'text': 'Xray Chest X-ray' }]);
    component.instance().chooseItem();
    expect(component.state().chosenOrders.length).toEqual(4);
    expect(component.state().listOrders).toEqual([]);

    // Testing cancelAll methods
    component.instance().cancelAll();
    expect(component.state().chosenOrders.length).toEqual(0);
    expect(component.state().listOrders.length).toEqual(4);

    // Testing toggleSelectedItem methods
    component.instance().toggleSelectedItem('order1');
    expect(component.state().listOrders.length).toEqual(3);
    expect(component.state().chosenOrders.length).toEqual(1);
    component.instance().toggleSelectedItem('order1');

    // Testing methods with additional conditions
    expect(component.state().isFirstPage).toEqual(true);
    component.instance().pageTwo();
    expect(component.state().isFirstPage).toEqual(true);

    expect(component.state().idSelectedLeft).toEqual('order1');
    component.instance().setSelectedLeft('test');
    expect(component.state().idSelectedLeft).toEqual('test');

    component.instance().chooseItem();
    component.instance().chooseAll();
    component.instance().toggleSelectedItem('order1');


    expect(component.find('form')).toHaveLength(1);
    expect(component.find('form').prop('name')).toEqual(FORM_NAME);
    expect(component.find('Field')).toHaveLength(3);

    expect(component.find('Field').at(0).props().name).toEqual(valuesNames.SELECTABLE);

    expect(component.find('Field').at(1).props().name).toEqual(valuesNames.AUTHOR);
    expect(component.find('Field').at(1).props().id).toEqual(valuesNames.AUTHOR);
    expect(component.find('Field').at(1).props().label).toEqual(valuesLabels.AUTHOR);
    expect(component.find('Field').at(1).props().props.disabled).toEqual(true);

    expect(component.find('Field').at(2).props().label).toEqual(valuesLabels.DATE);
    expect(component.find('Field').at(2).props().name).toEqual(valuesNames.DATE);
    expect(component.find('Field').at(2).props().props.value).toEqual(DATE_TO_USE_TIME);
    expect(component.find('Field').at(2).props().props.format).toEqual(DATE_FORMAT);
    expect(component.find('Field').at(2).props().props.disabled).toEqual(true);

    expect(component).toMatchSnapshot();
  });
});

