import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

import OrdersSelectable from '../OrdersCreate/OrdersSelectable';
Enzyme.configure({ adapter: new Adapter() });

const DATE_TO_USE = new Date('2017');
const DATE_TO_USE_TIME = DATE_TO_USE.getTime();
global.Date = jest.fn(() => DATE_TO_USE);
Date.now = jest.fn(() => DATE_TO_USE_TIME);

const testProps = {
  cancelAll: () => {},
  cancelItem: () => {},
  chooseAll : () => {},
  chooseItem: () => {},
  pageOne: () => {},
  pageTwo: () => {},
  setSelectedLeft: () => {},
  setSelectedRight: () => {},
  toggleSelectedItem: () => {},
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
  idSelectedLeft: null,
  idSelectedRight: null,
  chosenOrders: [],
  isFirstPage: true,
};

describe('Component <OrdersSelectable />', () => {
  it('should renders with all props correctly', () => {
    const component = shallow(
      <OrdersSelectable
        cancelAll={testProps.cancelAll}
        cancelItem={testProps.cancelItem}
        chooseAll={testProps.chooseAll}
        chooseItem={testProps.chooseItem}
        pageOne={testProps.pageOne}
        pageTwo={testProps.pageTwo}
        setSelectedLeft={testProps.setSelectedLeft}
        setSelectedRight={testProps.setSelectedRight}
        toggleSelectedItem={testProps.toggleSelectedItem}
        listOrders={testProps.listOrders}
        idSelectedLeft={testProps.idSelectedLeft}
        idSelectedRight={testProps.idSelectedRight}
        chosenOrders={testProps.chosenOrders}
        isFirstPage={testProps.isFirstPage}
      />
    );

    // Testing when no items selected
    expect(component.find('label').length).toEqual(2);
    expect(component.find('label').at(0).text()).toEqual('Available Orders');
    expect(component.find('label').at(1).text()).toEqual('Selected Orders');
    expect(component.find('.selectable-from').find('.selectable-item').length).toEqual(4);
    expect(component.find('.selectable-to').find('.selectable-item').length).toEqual(0);
    expect(component.find('.btn-order').length).toEqual(4);
    expect(component.find('PTButton').length).toEqual(1);
    expect(component.find('PTButton').props().className).toEqual('btn btn-success btn-inverse btn-create disabled');
    component.find('.selectable-from').find('.selectable-item').at(0).simulate('click');
    component.find('.selectable-from').find('.selectable-item').at(0).simulate('dblclick');

    expect(component).toMatchSnapshot();

    // Testing when items selected
    component.setProps({ listOrders: [], chosenOrders: testProps.listOrders });
    expect(component.find('.selectable-from').find('.selectable-item').length).toEqual(0);
    expect(component.find('.selectable-to').find('.selectable-item').length).toEqual(4);
    expect(component.find('PTButton').length).toEqual(1);
    expect(component.find('PTButton').props().className).toEqual('btn btn-success btn-inverse btn-create');
    component.find('.selectable-to').find('.selectable-item').at(0).simulate('click');
    component.find('.selectable-to').find('.selectable-item').at(0).simulate('dblclick');

    expect(component).toMatchSnapshot();

    // Testing click on the first page
    component.find('.btn-order').at(0).simulate('click');
    component.find('.btn-order').at(1).simulate('click');
    component.find('.btn-order').at(2).simulate('click');
    component.find('.btn-order').at(3).simulate('click');
    component.find('.btn-create').simulate('click');

    expect(component).toMatchSnapshot();

    // Testing click on the second page
    component.setProps({ isFirstPage: false });
    component.find('.orders-choosen-close').at(0).simulate('click');
    component.find('.btn-primary').simulate('click');

    expect(component).toMatchSnapshot();
  });
});

