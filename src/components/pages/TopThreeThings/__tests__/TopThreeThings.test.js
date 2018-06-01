import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import configureStore from 'redux-mock-store';

import TopThreeThings from '../TopThreeThings';
import { valuesNames } from '../forms.config';

Enzyme.configure({ adapter: new Adapter() });

const DATE_TO_USE = new Date('2018');
global.Date = jest.fn(() => DATE_TO_USE);

// frequently used variables
const userId = '9999999000';
const sourceId = 'acb0eaf2-d1df-4c7a-9382-619b31935f2b';

// storage setup in different configurations
const mockStore = configureStore();
const storeResource = {
  patientsTopThreeThings: {
    '9999999000': [
      {
        [valuesNames.SOURCE]: 'QEWDDB',
        [valuesNames.SOURCE_ID]: '26566e17-0ede-4818-8453-728ea0aa142c',
        [valuesNames.DATE_CREATED]: 1517475061744,
        [valuesNames.NAME1]: 'Item 2',
        [valuesNames.NAME2]: 'Item 2',
        [valuesNames.NAME3]: 'Item 2',
        dateCreatedConvert: '01-Feb-2018',
      },
    ],
  },
};
const storeWithFormsError = mockStore(Object.assign({
  topThreeThingsDetail: {
    '9999999000': {
      [valuesNames.SOURCE]: 'QEWDDB',
      [valuesNames.SOURCE_ID]: '26566e17-0ede-4818-8453-728ea0aa142c',
      [valuesNames.DATE_CREATED]: 1517475061744,
      [valuesNames.NAME1]: 'Item 2',
      [valuesNames.DESCRIPTION1]: 'My first problem',
      [valuesNames.NAME2]: 'Item 2',
      [valuesNames.DESCRIPTION2]: 'My second problem',
      [valuesNames.NAME3]: 'Item 2',
      [valuesNames.DESCRIPTION3]: 1,
    },
  },
  form: {
    topThreeThingsPanelFormSelector: {
      syncErrors: {
        [valuesNames.NAME1]: 'You must enter a value.',
        [valuesNames.DESCRIPTION1]: 'You must enter a value.',
        [valuesNames.NAME2]: 'You must enter a value.',
        [valuesNames.DESCRIPTION2]: 'You must enter a value.',
        [valuesNames.NAME3]: 'You must enter a value.',
        [valuesNames.DESCRIPTION3]: 'You must enter a value.',
      },
    },
    topThreeThingsCreateFormSelector: {
      syncErrors: {
        [valuesNames.NAME1]: 'You must enter a value.',
        [valuesNames.DESCRIPTION1]: 'You must enter a value.',
        [valuesNames.NAME2]: 'You must enter a value.',
        [valuesNames.DESCRIPTION2]: 'You must enter a value.',
        [valuesNames.NAME3]: 'You must enter a value.',
        [valuesNames.DESCRIPTION3]: 'You must enter a value.',
      },
    },
  },
}, storeResource));
const storeEmpty = mockStore(Object.assign({
  topThreeThingsDetail: {
    '9999999000': {},
  },
}, storeResource));
const storeWithDetail = mockStore(Object.assign({
  topThreeThingsDetail: {
    '9999999000': {
      [valuesNames.SOURCE]: 'QEWDDB',
      [valuesNames.SOURCE_ID]: '26566e17-0ede-4818-8453-728ea0aa142c',
      [valuesNames.DATE_CREATED]: 1517475061744,
      [valuesNames.NAME1]: 'Item 2',
      [valuesNames.DESCRIPTION1]: 'My first problem',
      [valuesNames.NAME2]: 'Item 2',
      [valuesNames.DESCRIPTION2]: 'My second problem',
      [valuesNames.NAME3]: 'Item 2',
      [valuesNames.DESCRIPTION3]: 1,
    },
  },
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
      push: () => {},
      replace: () => {},
      goBack: () => {},
      location: {
        pathname: `/patients/${userId}/topThreeThings`,
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
const contextCreate = generateNewContext(context, `/patients/${userId}/topThreeThings/create`);
const contextDetail = generateNewContext(context, `/patients/${userId}/topThreeThings/${sourceId}`);

// configuration of forms for testing methods
const formValuesCreate = {
  [valuesNames.SOURCE]: 'QEWDDB',
  [valuesNames.NAME1]: 'Item 1',
  [valuesNames.DESCRIPTION1]: 'My first problem',
  [valuesNames.NAME2]: 'Item 2',
  [valuesNames.DESCRIPTION2]: 'My second problem',
  [valuesNames.NAME3]: 'Item 3',
  [valuesNames.DESCRIPTION3]: 'My third problem',
};
const formValuesEdit = {
  [valuesNames.SOURCE]: 'QEWDDB',
  [valuesNames.NAME1]: 'Item 1',
  [valuesNames.DESCRIPTION1]: 'My first problem',
  [valuesNames.NAME2]: 'Item 2',
  [valuesNames.DESCRIPTION2]: 'My second problem',
  [valuesNames.NAME3]: 'Item 3',
  [valuesNames.DESCRIPTION3]: 'My third problem',
};
const match = {
  params: {
    userId,
  },
};

describe('Component <TopThreeThings />', () => {
  it('should renders correctly with topThreeThingsPanel and testing Detail Panel', () => {
    const component = shallow(
      <TopThreeThings
        store={storeWithDetail}
        match={match}
      />, { context }).dive().dive().dive().dive().dive().dive().dive();

    // Testing component handleDetailTopThreeThingsClick methods
    expect(component.find('PluginListHeader')).toHaveLength(1);
    expect(component.find('PluginMainPanel')).toHaveLength(1);
    expect(component.find('TopThreeThingsDetail')).toHaveLength(0);
    expect(component.find('PluginCreate')).toHaveLength(0);

    // Testing component handleShow methods
    expect(component.state().openedPanel).toEqual('topThreeThingsPanel');
    component.instance().handleShow('metaPanel');
    expect(component.state().openedPanel).toEqual('metaPanel');
    component.instance().handleShow('topThreeThingsPanel');
    expect(component.state().openedPanel).toEqual('topThreeThingsPanel');

    component.instance().handleDetailTopThreeThingsClick('065d85e3-3cd5-4604-bb94-5685fffb193d');
    const componentStateAfterMethod = component.state();
    component.setState({ isSecondPanel: true, isDetailPanelVisible: true, isBtnExpandVisible: true, openedPanel: 'topThreeThingsPanel', editedPanel: {}, expandedPanel: 'all', isLoading: true });
    const componentStateAfterSetState = component.state();

    expect(componentStateAfterMethod).toEqual(componentStateAfterSetState);
    expect(component.find('TopThreeThingsDetail')).toHaveLength(1);
    expect(component).toMatchSnapshot();

    // Testing component handleExpand methods
    expect(component.find('PluginListHeader')).toHaveLength(1);
    expect(component.find('PluginMainPanel')).toHaveLength(1);
    expect(component.state().openedPanel).toEqual('topThreeThingsPanel');
    expect(component.state().expandedPanel).toEqual('all');
    component.instance().handleExpand('topThreeThingsPanel', 'topThreeThingsDetail');
    expect(component.state().openedPanel).toEqual('topThreeThingsPanel');
    expect(component.state().expandedPanel).toEqual('topThreeThingsPanel');
    component.setState({ openedPanel: 'topThreeThingsPanel', expandedPanel: 'topThreeThingsPanel' });
    expect(component.find('PluginListHeader')).toHaveLength(0);
    expect(component.find('PluginMainPanel')).toHaveLength(0);
    component.instance().handleExpand('topThreeThingsPanel', 'topThreeThingsTest');
    expect(component).toMatchSnapshot();

    component.setState({ openedPanel: 'topThreeThingsPanel', expandedPanel: 'all' });
    component.setState({ expandedPanel: 'all' });
    component.instance().handleExpand('topThreeThingsPanel', 'topThreeThingsMain');
    component.setState({ expandedPanel: 'test' });
    component.instance().handleExpand('topThreeThingsPanel', 'topThreeThingsMain');

    // Testing component detail form methods
    expect(component.state().editedPanel).toEqual({});
    component.instance().handleEdit('topThreeThingsPanel');
    expect(component.state().editedPanel).toEqual({ topThreeThingsPanel: true });
    component.instance().handleTopThreeThingsDetailCancel('topThreeThingsPanel');
    expect(component.state().editedPanel).toEqual({ topThreeThingsPanel: false });
    component.instance().handleEdit('topThreeThingsPanel');
    component.instance().handleSaveSettingsDetailForm(formValuesEdit, 'topThreeThingsPanel');
    expect(component.state().editedPanel).toEqual({ topThreeThingsPanel: false });

    expect(component).toMatchSnapshot();
  });

  it('should renders correctly with TopThreeThingsDetail and testing Create Panel', () => {
    const component = shallow(
      <TopThreeThings
        store={storeWithDetail}
        match={match}
      />, { context }).dive().dive().dive().dive().dive().dive().dive();

      expect(component.find('PluginListHeader')).toHaveLength(1);
      expect(component.find('PluginMainPanel')).toHaveLength(1);
      expect(component.find('TopThreeThingsDetail')).toHaveLength(0);
      expect(component.find('PluginCreate')).toHaveLength(0);

      // Testing component create panel methods
      component.instance().handleCreate();
      const componentStateAfterMethod = component.state();
      component.setState({ isBtnCreateVisible: false, isCreatePanelVisible: true, openedPanel: 'topThreeThingsCreate', isSecondPanel: true, isDetailPanelVisible: false, isLoading: true, isBtnExpandVisible: true, expandedPanel: 'all', isSubmit: false })
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
      <TopThreeThings
        store={storeWithDetail}
        match={match}
      />, { context }).dive().dive().dive().dive().dive().dive().dive();

    // Testing component handleFilterChange methods
    expect(component.state().nameShouldInclude).toEqual('');
    component.instance().handleFilterChange({ target: { value: 'test' } });
    expect(component.state().nameShouldInclude).toEqual('test');
    component.instance().handleFilterChange({ target: { value: '' } });
    expect(component.state().nameShouldInclude).toEqual('');

    // Testing component handleHeaderCellClick methods
    expect(component.state().columnNameSortBy).toEqual('dateCreated');
    expect(component.state().sortingOrder).toEqual('asc');
    component.instance().handleHeaderCellClick({}, { name: 'name1', sortingOrder: 'desc' });
    expect(component.state().columnNameSortBy).toEqual('name1');
    expect(component.state().sortingOrder).toEqual('desc');

    // Testing component handleSetOffset methods
    expect(component.state().offset).toEqual(0);
    component.instance().handleSetOffset(10);
    expect(component.state().offset).toEqual(10);

    expect(component).toMatchSnapshot();
  });

  it('should renders correctly and testing context and lifecycle componentWillReceiveProps', () => {
    const component = shallow(
      <TopThreeThings
        store={storeWithDetail}
        match={match}
      />, { context }).dive().dive().dive().dive().dive().dive().dive();

    component.setProps({ test: 'testing context' });
    component.setContext(contextCreate);
    component.setProps({ test: 'testing create context' });
    component.setContext(contextDetail);
    component.setProps({ test: 'testing edit context' });

    expect(component).toMatchSnapshot();
  });

  it('should renders correctly with forms error', () => {
    const component = shallow(
      <TopThreeThings
        store={storeWithFormsError}
        match={match}
      />, { context }).dive().dive().dive().dive().dive().dive().dive();

    component.instance().handleSaveSettingsDetailForm(formValuesEdit, 'topThreeThingsPanel');
    component.instance().handleSaveSettingsCreateForm(formValuesCreate);

    expect(component).toMatchSnapshot();
  });

  it('should renders correctly with empty store', () => {
    const component = shallow(
      <TopThreeThings
        store={storeEmpty}
        match={match}
      />, { context }).dive().dive().dive().dive().dive().dive().dive();

    component.instance().goBack();

    expect(component).toMatchSnapshot();
  });
});
