import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import configureStore from 'redux-mock-store';

import Orders from '../../../src/components/pages/Orders/Orders';
import { valuesNames } from '../../../src/components/pages/Orders/forms.config';

Enzyme.configure({ adapter: new Adapter() });

// frequently used variables
const userId = '9999999000';
const sourceId = 'acb0eaf2-d1df-4c7a-9382-619b31935f2b';

// storage setup in different configurations
const mockStore = configureStore();
const storeResource = {
  patientsOrders: {
    '9999999000': [
      {
        [valuesNames.NAME]: 'Cardiac-ECG',
        [valuesNames.ORDER_DATE]: 1458738936944,
        [valuesNames.SOURCE]: 'ethercis',
        [valuesNames.SOURCE_ID]: 'd6b4d397-779c-4a4e-b5eb-2084fb11876f',
        orderDateConvert: '23-Mar-2016',
      },
      {
        [valuesNames.NAME]: 'Cardiac-ECG',
        [valuesNames.ORDER_DATE]: 1458738936944,
        [valuesNames.SOURCE]: 'ethercis',
        [valuesNames.SOURCE_ID]: 'd6b4d397-779c-4a4e-b5eb-2084fb11876f',
        orderDateConvert: '23-Mar-2016',
      },
    ],
  },
};
const storeWithFormsError = mockStore(Object.assign({
  ordersDetail: {
    '9999999000': {
      [valuesNames.NAME]: 'Cardiac-ECG',
      [valuesNames.CODE]: 'order3',
      [valuesNames.TERMINOLOGY]: 'SNOMED-CT',
      [valuesNames.ORDER_DATE]: 1459845495014,
      [valuesNames.AUTHOR]: 'Dr John Smith',
      [valuesNames.DATE]: 1459845501000,
      [valuesNames.SOURCE]: 'ethercis',
      [valuesNames.SOURCE_ID]: '7ae34463-0770-4a36-bbde-4869bb6a0f05',
    },
  },
  form: {
    ordersPanelFormSelector: {
      syncErrors: {
        [valuesNames.NAME]: 'You must enter a value.',
        [valuesNames.CODE]: 'You must enter a value.',
      },
    },
    ordersCreateFormSelector: {
      syncErrors: {
        [valuesNames.NAME]: 'You must enter a value.',
        [valuesNames.CODE]: 'You must enter a value.',
      },
    },
  },
}, storeResource));
const storeEmpty = mockStore(Object.assign({
  ordersDetail: {
    '9999999000': {},
  },
}, storeResource));
const storeWithDetail = mockStore(Object.assign({
  ordersDetail: {
    '9999999000': {
      [valuesNames.NAME]: 'Cardiac-ECG',
      [valuesNames.CODE]: 'order3',
      [valuesNames.TERMINOLOGY]: 'SNOMED-CT',
      [valuesNames.ORDER_DATE]: 1459845495014,
      [valuesNames.AUTHOR]: 'Dr John Smith',
      [valuesNames.DATE]: 1459845501000,
      [valuesNames.SOURCE]: 'ethercis',
      [valuesNames.SOURCE_ID]: '7ae34463-0770-4a36-bbde-4869bb6a0f05',
    },
  },
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
}, storeResource));

// configure context for various tests
const generateNewContext = (oldContext, pathname) => {
  const newContext = Object.assign({}, oldContext);
  newContext.router = Object.assign({}, newContext.router);
  newContext.router.history = Object.assign({}, newContext.router.history);
  newContext.router.history.location = { pathname };
  return newContext;
};
const context = {
  router: {
    history: {
      replace: () => {},
      location: {
        pathname: `/patients/${userId}/orders`,
      },
    },
    route: {
      match: {
        params: {
          sourceId,
          userId,
        },
      },
    },
  },
};
const contextCreate = generateNewContext(context, `/patients/${userId}/orders/create`);
const contextDetail = generateNewContext(context, `/patients/${userId}/orders/${sourceId}`);

// configuration of forms for testing methods
const formValuesCreate = {
  [valuesNames.AUTHOR]: 'bob.smith@gmail.com',
};
const match = {
  params: {
    userId,
  },
};

describe('Component <Orders />', () => {
  it('should renders correctly with ordersPanel and testing Detail Panel', () => {
    const component = shallow(
      <Orders
        store={storeWithDetail}
        match={match}
      />, { context }).dive().dive().dive()
      .dive()
      .dive()
      .dive()
      .dive()
      .dive();

    // Testing component handleDetailOrdersClick methods
    expect(component.find('PluginListHeader')).toHaveLength(1);
    expect(component.find('PluginMainPanel')).toHaveLength(1);
    expect(component.find('OrdersDetail')).toHaveLength(0);
    expect(component.find('PluginCreate')).toHaveLength(0);

    component.instance().handleDetailOrdersClick('065d85e3-3cd5-4604-bb94-5685fffb193d');
    const componentStateAfterMethod = component.state();
    component.setState({ isSecondPanel: true, isDetailPanelVisible: true, isBtnExpandVisible: true, isBtnCreateVisible: true, isCreatePanelVisible: false, openedPanel: 'ordersPanel', editedPanel: {}, expandedPanel: 'all', isLoading: true });
    const componentStateAfterSetState = component.state();

    expect(componentStateAfterMethod).toEqual(componentStateAfterSetState);
    expect(component.find('OrdersDetail')).toHaveLength(1);
    expect(component.find('PluginCreate')).toHaveLength(0);
    expect(component).toMatchSnapshot();

    // Testing component handleExpand methods
    expect(component.find('PluginListHeader')).toHaveLength(1);
    expect(component.find('PluginMainPanel')).toHaveLength(1);
    expect(component.state().openedPanel).toEqual('ordersPanel');
    expect(component.state().expandedPanel).toEqual('all');
    component.instance().handleExpand('ordersPanel', 'ordersDetail');
    expect(component.state().openedPanel).toEqual('ordersPanel');
    expect(component.state().expandedPanel).toEqual('ordersPanel');
    component.setState({ openedPanel: 'ordersPanel', expandedPanel: 'ordersPanel' });
    expect(component.find('PluginListHeader')).toHaveLength(0);
    expect(component.find('PluginMainPanel')).toHaveLength(0);
    expect(component).toMatchSnapshot();

    component.setState({ openedPanel: 'ordersPanel', expandedPanel: 'all' });

    component.instance().handleExpand('ordersPanel', 'ordersCreate');
    component.setState({ expandedPanel: 'all' });
    component.instance().handleExpand('ordersPanel', 'ordersMain');
    component.setState({ expandedPanel: 'test' });
    component.instance().handleExpand('ordersPanel', 'ordersMain');
    component.setState({ expandedPanel: 'test' });
    component.instance().handleExpand('ordersPanel', 'ordersCreate');

    expect(component).toMatchSnapshot();
  });

  it('should renders correctly with ordersDetail and testing Create Panel', () => {
    const component = shallow(
      <Orders
        store={storeWithDetail}
        match={match}
      />, { context }).dive().dive().dive()
      .dive()
      .dive()
      .dive()
      .dive()
      .dive();

    expect(component.find('PluginListHeader')).toHaveLength(1);
    expect(component.find('PluginMainPanel')).toHaveLength(1);
    expect(component.find('OrdersDetail')).toHaveLength(0);
    expect(component.find('PluginCreate')).toHaveLength(0);

    // Testing component create panel methods
    component.instance().handleCreate();
    const componentStateAfterMethod = component.state();
    component.setState({ isBtnCreateVisible: false, isCreatePanelVisible: true, openedPanel: 'ordersCreate', isSecondPanel: true, isDetailPanelVisible: false, isSubmit: false, isLoading: true });
    const componentStateAfterSetState = component.state();
    expect(componentStateAfterMethod).toEqual(componentStateAfterSetState);
    expect(component.find('PluginCreate')).toHaveLength(1);
    expect(component).toMatchSnapshot();
    component.instance().handleCreateCancel();
    component.instance().handleSaveSettingsCreateForm(formValuesCreate);

    expect(component).toMatchSnapshot();
  });

  it('should renders correctly and testing another methods', () => {
    const component = shallow(
      <Orders
        store={storeWithDetail}
        match={match}
      />, { context }).dive().dive().dive()
      .dive()
      .dive()
      .dive()
      .dive()
      .dive();

    // Testing component hideCreateForm methods
    component.instance().hideCreateForm();
    expect(component.state().isBtnCreateVisible).toEqual(true);
    expect(component.state().isCreatePanelVisible).toEqual(false);
    expect(component.state().openedPanel).toEqual('ordersPanel');
    expect(component.state().isSecondPanel).toEqual(false);
    expect(component.state().expandedPanel).toEqual('all');
    expect(component.state().isBtnExpandVisible).toEqual(false);

    // Testing component handleFilterChange methods
    expect(component.state().nameShouldInclude).toEqual('');
    component.instance().handleFilterChange({ target: { value: 'test' } });
    expect(component.state().nameShouldInclude).toEqual('test');
    component.instance().handleFilterChange({ target: { value: '' } });
    expect(component.state().nameShouldInclude).toEqual('');

    // Testing component handleHeaderCellClick methods
    expect(component.state().columnNameSortBy).toEqual('name');
    expect(component.state().sortingOrder).toEqual('asc');
    component.instance().handleHeaderCellClick({}, { name: 'source', sortingOrder: 'desc' });
    expect(component.state().columnNameSortBy).toEqual('source');
    expect(component.state().sortingOrder).toEqual('desc');

    // Testing component handleSetOffset methods
    expect(component.state().offset).toEqual(0);
    component.instance().handleSetOffset(10);
    expect(component.state().offset).toEqual(10);

    // Testing component setChosenOrders methods
    expect(component.state().chosenOrders).toEqual([]);
    component.instance().setChosenOrders('test');
    expect(component.state().chosenOrders).toEqual('test');

    expect(component).toMatchSnapshot();
  });

  it('should renders correctly and testing context and lifecycle componentWillReceiveProps', () => {
    const component = shallow(
      <Orders
        store={storeWithDetail}
        match={match}
      />, { context }).dive().dive().dive()
      .dive()
      .dive()
      .dive()
      .dive()
      .dive();

    component.setProps({ test: 'testing context' });
    component.setContext(contextCreate);
    component.setProps({ test: 'testing create context' });
    component.setContext(contextDetail);
    component.setProps({ test: 'testing edit context' });

    expect(component).toMatchSnapshot();
  });

  it('should renders correctly with forms error', () => {
    const component = shallow(
      <Orders
        store={storeWithFormsError}
        match={match}
      />, { context }).dive().dive().dive()
      .dive()
      .dive()
      .dive()
      .dive()
      .dive();

    component.instance().handleSaveSettingsCreateForm(formValuesCreate);

    expect(component).toMatchSnapshot();
  });

  it('should renders correctly with empty store', () => {
    const component = shallow(
      <Orders
        store={storeEmpty}
        match={match}
      />, { context }).dive().dive().dive()
      .dive()
      .dive()
      .dive()
      .dive()
      .dive();

    expect(component).toMatchSnapshot();
  });
});
