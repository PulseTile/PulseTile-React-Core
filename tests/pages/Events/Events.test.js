import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import configureStore from 'redux-mock-store';

import Events from '../../../src/components/pages/Events/Events';
import { valuesNames } from '../../../src/components/pages/Events/forms.config';

Enzyme.configure({ adapter: new Adapter() });

// frequently used variables
const userId = '9999999000';
const sourceId = 'acb0eaf2-d1df-4c7a-9382-619b31935f2b';

// storage setup in different configurations
const mockStore = configureStore();
const storeResource = {
  patientsEvents: {
    '9999999000': [
      {
        [valuesNames.DATE_CREATED]: 1494586220000,
        [valuesNames.TYPE]: 'Discharge',
        [valuesNames.NAME]: 'Discharge to care home',
        [valuesNames.DESCRIPTION]: 'Needs nursing and supervisory care',
        [valuesNames.DATE_TIME]: 1494496220958,
        [valuesNames.SOURCE]: 'ethercis',
        [valuesNames.SOURCE_ID]: '93ac376d-3ff4-4e0b-b080-47eb3fe81750',
        dateTimeConvert: '11-May-2017',
        sideDateInTimeline: 'right',
        dateTime: 1494496220958,
      },
      {
        [valuesNames.DATE_CREATED]: 1489229420000,
        [valuesNames.TYPE]: 'Admission',
        [valuesNames.NAME]: 'Admit',
        [valuesNames.DESCRIPTION]: 'From home',
        [valuesNames.DATE_TIME]: 1489056620958,
        [valuesNames.SOURCE]: 'ethercis',
        [valuesNames.SOURCE_ID]: '93ac376d-3ff4-4e0b-b080-47eb3fe81750',
        dateTimeConvert: '09-Mar-2017',
        sideDateInTimeline: 'left',
        dateTime: 1489056620958,
      },
    ],
  },
};
const storeWithFormsError = mockStore(Object.assign({
  eventsDetail: {
    '9999999000': {
      [valuesNames.NAME]: '14444',
      [valuesNames.TYPE]: 'Transfer',
      [valuesNames.DESCRIPTION]: '144444',
      [valuesNames.DATE_TIME]: 1511339400000,
      [valuesNames.AUTHOR]: 'bob.smith@gmail.com',
      [valuesNames.DATE_CREATED]: 1512564962000,
      [valuesNames.SOURCE]: 'marand',
      [valuesNames.SOURCE_ID]: 'a7007401-837f-471c-8f73-cbb53c0eb1a1',
    },
  },
  form: {
    eventsDetailFormSelector: {
      syncErrors: {
        [valuesNames.NAME]: 'You must enter a value.',
        [valuesNames.DESCRIPTION]: 'You must enter a value.',
      },
    },
    eventsCreateFormSelector: {
      syncErrors: {
        [valuesNames.NAME]: 'You must enter a value.',
        [valuesNames.DESCRIPTION]: 'You must enter a value.',
      },
    },
  },
}, storeResource));
const storeEmpty = mockStore(Object.assign({
  eventsDetail: {
    '9999999000': {},
  },
}, storeResource));
const storeWithDetail = mockStore(Object.assign({
  eventsDetail: {
    '9999999000': {
      [valuesNames.NAME]: '14444',
      [valuesNames.TYPE]: 'Transfer',
      [valuesNames.DESCRIPTION]: '144444',
      [valuesNames.DATE_TIME]: 1511339400000,
      [valuesNames.AUTHOR]: 'bob.smith@gmail.com',
      [valuesNames.DATE_CREATED]: 1512564962000,
      [valuesNames.SOURCE]: 'marand',
      [valuesNames.SOURCE_ID]: 'a7007401-837f-471c-8f73-cbb53c0eb1a1',
    },
  },
}, storeResource));
const allStoreEmpty = mockStore({
  patientsEvents: {
    '9999999001': [
      {},
    ],
  },
  eventsDetail: {
    '9999999001': {},
  },
});

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
      push: () => {},
      replace: () => {},
      location: {
        pathname: `/patients/${userId}/events`,
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
const contextCreate = generateNewContext(context, `/patients/${userId}/events/create`);
const contextDetail = generateNewContext(context, `/patients/${userId}/events/${sourceId}`);

// configuration of forms for testing methods
const formValuesEdit = {
  [valuesNames.NAME]: 'ff',
  [valuesNames.TYPE]: 'Appointment',
  [valuesNames.DESCRIPTION]: 'y',
  [valuesNames.AUTHOR]: 'bob.smith@gmail.com',
  [valuesNames.DATE_TIME]: 1512922434812,
};
const formValuesCreate = {
  [valuesNames.TYPE]: 'Appointment',
  [valuesNames.AUTHOR]: 'bob.smith@gmail.com',
  [valuesNames.NAME]: 'adada',
  [valuesNames.DESCRIPTION]: 'adada',
  [valuesNames.DATE_TIME]: '23-Dec-2017 15:59'
};
const match = {
  params: {
    userId,
  },
};

describe('Component <Events />', () => {
  it('should renders correctly with eventsDetail and testing Detail Panel', () => {
    const component = shallow(
      <Events
        store={storeWithDetail}
        match={match}
      />, { context }).dive().dive().dive().dive().dive().dive();

    // Testing component handleDetailEventsClick methods
    expect(component.find('EventsListHeader')).toHaveLength(1);
    expect(component.find('EventsMainPanel')).toHaveLength(1);
    expect(component.find('EventsDetail')).toHaveLength(0);
    expect(component.find('PluginCreate')).toHaveLength(0);

    component.instance().handleDetailEventsClick('065d85e3-3cd5-4604-bb94-5685fffb193d');
    const componentStateAfterMethod = component.state();
    component.setState({ isSecondPanel: true, isDetailPanelVisible: true, isBtnExpandVisible: true, isBtnCreateVisible: true, isCreatePanelVisible: false, openedPanel: 'eventPanel', editedPanel: {}, isLoading: true, expandedPanel: 'all' });
    const componentStateAfterSetState = component.state();

    expect(componentStateAfterMethod).toEqual(componentStateAfterSetState);
    expect(component.find('EventsDetail')).toHaveLength(1);
    expect(component.find('PluginCreate')).toHaveLength(0);
    expect(component).toMatchSnapshot();

    // Testing component handleShow methods
    expect(component.state().openedPanel).toEqual('eventPanel');
    component.instance().handleShow('metaPanel');
    expect(component.state().openedPanel).toEqual('metaPanel');
    component.instance().handleShow('eventPanel');
    expect(component.state().openedPanel).toEqual('eventPanel');
    expect(component.state().expandedPanel).toEqual('all');
    component.setState({ expandedPanel: 'test' });
    component.instance().handleShow('eventPanel');
    expect(component.state().openedPanel).toEqual('eventPanel');
    component.setState({ expandedPanel: 'all' });

    // Testing component handleExpand methods
    expect(component.find('EventsListHeader')).toHaveLength(1);
    expect(component.find('EventsMainPanel')).toHaveLength(1);
    expect(component.state().openedPanel).toEqual('eventPanel');
    expect(component.state().expandedPanel).toEqual('all');
    component.instance().handleExpand('eventPanel', 'eventsDetail');
    expect(component.state().openedPanel).toEqual('eventPanel');
    expect(component.state().expandedPanel).toEqual('eventPanel');
    component.setState({ openedPanel: 'eventPanel', expandedPanel: 'eventPanel' });
    expect(component.find('EventsListHeader')).toHaveLength(0);
    expect(component.find('EventsMainPanel')).toHaveLength(0);
    expect(component).toMatchSnapshot();

    component.setState({ openedPanel: 'eventPanel', expandedPanel: 'all' });

    component.instance().handleExpand('eventPanel', 'eventsCreate');
    component.setState({ expandedPanel: 'all' });
    component.instance().handleExpand('eventPanel', 'eventsMain');
    component.setState({ expandedPanel: 'test' });
    component.instance().handleExpand('eventPanel', 'eventsMain');
    component.setState({ expandedPanel: 'test' });
    component.instance().handleExpand('eventPanel', 'eventsCreate');

    // Testing component detail form methods
    expect(component.state().editedPanel).toEqual({});
    component.instance().handleEdit('eventPanel');
    expect(component.state().editedPanel).toEqual({ eventPanel: true });
    component.instance().handleEventDetailCancel('eventPanel');
    expect(component.state().editedPanel).toEqual({ eventPanel: false });
    component.instance().handleEdit('eventPanel');
    component.instance().handleSaveSettingsDetailForm(formValuesEdit, 'eventPanel');
    expect(component.state().editedPanel).toEqual({ eventPanel: false });
    component.instance().handleSaveSettingsDetailForm(formValuesEdit, 'metaPanel');

    expect(component).toMatchSnapshot();
  });

  it('should renders correctly with eventsDetail and testing Create Panel', () => {
    const component = shallow(
      <Events
        store={storeWithDetail}
        match={match}
      />, { context }).dive().dive().dive().dive().dive().dive();

    expect(component.find('EventsListHeader')).toHaveLength(1);
    expect(component.find('EventsMainPanel')).toHaveLength(1);
    expect(component.find('EventsDetail')).toHaveLength(0);
    expect(component.find('PluginCreate')).toHaveLength(0);

    // Testing component create panel methods
    component.instance().handleCreate();
    const componentStateAfterMethod = component.state();
    component.setState({ isBtnCreateVisible: false, isCreatePanelVisible: true, openedPanel: 'eventsCreate', isSecondPanel: true, isDetailPanelVisible: false, isLoading: true, isBtnExpandVisible: false, expandedPanel: 'all', isSubmit: false })
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
      <Events
        store={storeWithDetail}
        match={match}
      />, { context }).dive().dive().dive().dive().dive().dive();

    // Testing component hideCreateForm methods
    component.instance().hideCreateForm();
    expect(component.state().isBtnCreateVisible).toEqual(true);
    expect(component.state().isCreatePanelVisible).toEqual(false);
    expect(component.state().openedPanel).toEqual('eventPanel');
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
    expect(component.state().columnNameSortBy).toEqual(valuesNames.NAME);
    expect(component.state().sortingOrder).toEqual('asc');
    component.instance().handleHeaderCellClick({}, { name: valuesNames.TYPE, sortingOrder: 'desc' });
    expect(component.state().columnNameSortBy).toEqual(valuesNames.TYPE);
    expect(component.state().sortingOrder).toEqual('desc');

    // Testing component handleSetOffset methods
    expect(component.state().offset).toEqual(0);
    component.instance().handleSetOffset(10);
    expect(component.state().offset).toEqual(10);

    // Testing component toggleTimelinesVisibility methods
    expect(component.state().isTimelinesOpen).toEqual(false);
    component.instance().toggleTimelinesVisibility(10);
    expect(component.state().isTimelinesOpen).toEqual(true);

    // Testing component onRangeChange methods
    expect(component.state().valueEventsRange).toEqual([]);
    component.instance().onRangeChange([1452595820958, 1512922434812]);
    component.setState({ valueEventsRange: [1452595820958, 1512922434812] });

    // Testing component toggleViewVisibility methods
    expect(component.state().activeView).toEqual('table');
    component.instance().toggleViewVisibility('timeline');
    expect(component.state().activeView).toEqual('timeline');

    // Testing component setDefaultRangeValues methods
    component.instance().setDefaultRangeValues();

    expect(component).toMatchSnapshot();
  });

  it('should renders correctly and testing context and lifecycle componentWillReceiveProps', () => {
    const component = shallow(
      <Events
        store={storeWithDetail}
        match={match}
      />, { context }).dive().dive().dive().dive().dive().dive();

    component.setProps({ test: 'testing context' });
    component.setContext(contextCreate);
    component.setProps({ test: 'testing create context' });
    component.setContext(contextDetail);
    component.setProps({ test: 'testing edit context' });

    component.setContext(contextCreate);
    component.setState({ eventsType: '' });
    component.setProps({ test: 'testing create context' });

    expect(component).toMatchSnapshot();
  });

  it('should renders correctly with forms error', () => {
    const component = shallow(
      <Events
        store={storeWithFormsError}
        match={match}
      />, { context }).dive().dive().dive().dive().dive().dive();

    component.instance().handleSaveSettingsDetailForm(formValuesEdit, 'eventPanel');
    component.instance().handleSaveSettingsCreateForm(formValuesCreate);

    expect(component).toMatchSnapshot();
  });

  it('should renders correctly with empty store', () => {
    const component = shallow(
      <Events
        store={storeEmpty}
        match={match}
      />, { context }).dive().dive().dive().dive().dive().dive();

    expect(component).toMatchSnapshot();
  });

  it('should renders correctly with all store is empty', () => {
    const component = shallow(
      <Events
        store={allStoreEmpty}
        match={match}
      />, { context }).dive().dive().dive().dive().dive().dive();

    // Testing component setDefaultRangeValues methods
    component.instance().setDefaultRangeValues();

    expect(component).toMatchSnapshot();
  });
});
