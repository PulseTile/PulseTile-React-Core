import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import configureStore from 'redux-mock-store';

import TransfersOfCare from '../TransfersOfCare';
import { valuesNames } from '../forms.config';

Enzyme.configure({ adapter: new Adapter() });

// frequently used variables
const userId = '9999999000';
const sourceId = 'acb0eaf2-d1df-4c7a-9382-619b31935f2b';

// storage setup in different configurations
const mockStore = configureStore();
const storeResource = {
  patientsTransfersOfCare: {
    '9999999024': [
      {
        [valuesNames.SOURCE_ID]: '09ce8ef7-80fb-4553-874e-4944e527a27b',
        [valuesNames.FROM]: 'St James\' Hospital',
        [valuesNames.TO]: 'Worcester Trust',
        [valuesNames.DATE_TIME]: 1518523260000,
        [valuesNames.SOURCE]: 'qewdDB',
        [valuesNames.NUMBER_TEXT]: 'Transfer #1',
        [valuesNames.NUMBER]: 1,
        transferDateTimeConvert: '13-Feb-2018'
      },
    ],
  },
};
const storeWithFormsError = mockStore(Object.assign({
  transfersOfCareDetail: {
    '9999999000': {
      [valuesNames.CLINICAL]: 'Review',
      [valuesNames.DATE_CREATED]: 1495704408641,
      [valuesNames.FROM]: 'Worcester Trust',
      [valuesNames.REASON]: 'Testing TOC',
      [valuesNames.RECORDS]: [
        {
          [valuesNames.RECORDS_DATE]: '10-Apr-2017',
          [valuesNames.RECORDS_NAME]: 'Cholecystectomy',
          [valuesNames.RECORDS_SOURCE]: 'ethercis',
          [valuesNames.SOURCE_ID]: '0318e94e-1803-46fe-a92a-647eca029323',
          [valuesNames.TYPE]: 'diagnosis',
          [valuesNames.RECORDS_TYPE]: 'Problems / Diagnosis',
        },
        {
          [valuesNames.RECORDS_DATE]: '11-Feb-2015',
          [valuesNames.RECORDS_NAME]: 'Care Service Team 444',
          [valuesNames.RECORDS_SOURCE]: 'marand',
          [valuesNames.SOURCE_ID]: '3a994bec-2f41-4dc0-aae6-f7e69e573f7a',
          [valuesNames.TYPE]: 'events',
          [valuesNames.RECORDS_TYPE]: 'Events',
        },
      ],
      [valuesNames.SOURCE]: 'qewdDB',
      [valuesNames.TO]: 'Oxford NHS Trust',
      [valuesNames.DATE_TIME]: '2017-05-25T09:25:33.026Z',
      [valuesNames.SOURCE_ID]: 'ae7b874e-3133-4700-a650-2b016ad7b05f',
    },
  },
  form: {
    transfersOfCareDetailFormSelector: {
      syncErrors: {
        [valuesNames.CLINICAL]: 'You must enter a value.',
      },
    },
    transfersOfCareCreateFormSelector: {
      syncErrors: {
        [valuesNames.CLINICAL]: 'You must enter a value.',
      },
    },
  },
}, storeResource));
const storeEmpty = mockStore(Object.assign({
  transfersOfCareDetail: {
    '9999999000': {},
  },
}, storeResource));
const storeWithDetail = mockStore(Object.assign({
  transfersOfCareDetail: {
    '9999999000': {
      [valuesNames.CLINICAL]: 'Review',
      [valuesNames.DATE_CREATED]: 1495704408641,
      [valuesNames.FROM]: 'Worcester Trust',
      [valuesNames.REASON]: 'Testing TOC',
      [valuesNames.RECORDS]: [
        {
          [valuesNames.RECORDS_DATE]: '10-Apr-2017',
          [valuesNames.RECORDS_NAME]: 'Cholecystectomy',
          [valuesNames.RECORDS_SOURCE]: 'ethercis',
          [valuesNames.SOURCE_ID]: '0318e94e-1803-46fe-a92a-647eca029323',
          [valuesNames.TYPE]: 'diagnosis',
          [valuesNames.RECORDS_TYPE]: 'Problems / Diagnosis',
        },
        {
          [valuesNames.RECORDS_DATE]: '11-Feb-2015',
          [valuesNames.RECORDS_NAME]: 'Care Service Team 444',
          [valuesNames.RECORDS_SOURCE]: 'marand',
          [valuesNames.SOURCE_ID]: '3a994bec-2f41-4dc0-aae6-f7e69e573f7a',
          [valuesNames.TYPE]: 'events',
          [valuesNames.RECORDS_TYPE]: 'Events',
        },
      ],
      [valuesNames.SOURCE]: 'qewdDB',
      [valuesNames.TO]: 'Oxford NHS Trust',
      [valuesNames.DATE_TIME]: '2017-05-25T09:25:33.026Z',
      [valuesNames.SOURCE_ID]: 'ae7b874e-3133-4700-a650-2b016ad7b05f',
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
      location: {
        pathname: `/patients/${userId}/transfer-of-care`,
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
const contextWithoutSourceId = {
  router: {
    history: {
      push: () => {},
      replace: () => {},
      location: {
        pathname: `/patients/${userId}/transfer-of-care`,
      },
    },
    route: {
      match: {
        params: {
          userId,
        },
      },
    },
  },
};
const contextCreate = generateNewContext(context, `/patients/${userId}/transfer-of-care/create`);
const contextDetail = generateNewContext(context, `/patients/${userId}/transfer-of-care/${sourceId}`);

// configuration of forms for testing methods
const formValuesEdit = {
  [valuesNames.FROM]: 'Oxford NHS Trust',
  [valuesNames.TO]: 'Worcester Trust',
  [valuesNames.REASON]: 'test',
  [valuesNames.CLINICAL]: 'test',
  [valuesNames.DATE_TIME]: '01-Feb-2018 13:23',
  [valuesNames.DATE_CREATED]: 1517397838198
};
const formValuesCreate = {
  [valuesNames.FROM]: 'Oxford NHS Trust',
  [valuesNames.TO]: 'Worcester Trust',
  [valuesNames.REASON]: 'test',
  [valuesNames.CLINICAL]: 'test',
  [valuesNames.DATE_TIME]: '01-Feb-2018 13:23',
  [valuesNames.DATE_CREATED]: 1517397838198
};
const match = {
  params: {
    userId,
  },
};

describe('Component <TransfersOfCare />', () => {
  it('should renders correctly with transfersOfCareDetail and testing Detail Panel', () => {
    const component = shallow(
      <TransfersOfCare
        store={storeWithDetail}
        match={match}
      />, { context }).dive().dive().dive().dive().dive().dive();

    // Testing component handleDetailTransfersOfCareClick methods
    expect(component.find('PluginListHeader')).toHaveLength(1);
    expect(component.find('PluginMainPanel')).toHaveLength(1);
    expect(component.find('TransfersOfCareDetail')).toHaveLength(0);
    expect(component.find('PluginCreate')).toHaveLength(0);

    component.instance().handleDetailTransfersOfCareClick('065d85e3-3cd5-4604-bb94-5685fffb193d');
    const componentStateAfterMethod = component.state();
    component.setState({ isSecondPanel: true, isDetailPanelVisible: true, isBtnExpandVisible: true, isBtnCreateVisible: true, isCreatePanelVisible: false, openedPanel: 'transferOfCarePanel', editedPanel: {}, isLoading: true, expandedPanel: 'all' });
    const componentStateAfterSetState = component.state();

    expect(componentStateAfterMethod).toEqual(componentStateAfterSetState);
    expect(component.find('TransfersOfCareDetail')).toHaveLength(1);
    expect(component.find('PluginCreate')).toHaveLength(0);
    expect(component).toMatchSnapshot();

    // Testing component handleShow methods
    expect(component.state().openedPanel).toEqual('transferOfCarePanel');
    component.instance().handleShow('metaPanel');
    expect(component.state().openedPanel).toEqual('metaPanel');
    component.instance().handleShow('transferOfCarePanel');
    expect(component.state().openedPanel).toEqual('transferOfCarePanel');

    // Testing component handleExpand methods
    expect(component.find('PluginListHeader')).toHaveLength(1);
    expect(component.find('PluginMainPanel')).toHaveLength(1);
    expect(component.state().openedPanel).toEqual('transferOfCarePanel');
    expect(component.state().expandedPanel).toEqual('all');
    component.instance().handleExpand('transferOfCarePanel', 'transfersOfCareDetail');
    expect(component.state().openedPanel).toEqual('transferOfCarePanel');
    expect(component.state().expandedPanel).toEqual('transferOfCarePanel');
    component.setState({ openedPanel: 'transferOfCarePanel', expandedPanel: 'transferOfCarePanel' });
    expect(component.find('PluginListHeader')).toHaveLength(0);
    expect(component.find('PluginMainPanel')).toHaveLength(0);
    expect(component).toMatchSnapshot();

    component.setState({ openedPanel: 'transferOfCarePanel', expandedPanel: 'all' });

    component.instance().handleExpand('transferOfCarePanel', 'transfersOfCareCreate');
    component.setState({ expandedPanel: 'all' });
    component.instance().handleExpand('transferOfCarePanel', 'transfersOfCareMain');
    component.setState({ expandedPanel: 'test' });
    component.instance().handleExpand('transferOfCarePanel', 'transfersOfCareMain');
    component.setState({ expandedPanel: 'test' });
    component.instance().handleExpand('transferOfCarePanel', 'transfersOfCareCreate');

    // Testing component detail form methods
    expect(component.state().editedPanel).toEqual({});
    component.instance().handleEdit('transferOfCarePanel');
    expect(component.state().editedPanel).toEqual({ transferOfCarePanel: true });
    component.instance().handleTransferOfCareDetailCancel('transferOfCarePanel');
    expect(component.state().editedPanel).toEqual({ transferOfCarePanel: false });
    component.instance().handleEdit('transferOfCarePanel');
    component.instance().handleSaveSettingsDetailForm(formValuesEdit, 'transferOfCarePanel');
    expect(component.state().editedPanel).toEqual({ transferOfCarePanel: false });
    component.instance().handleSaveSettingsDetailForm(formValuesEdit, 'metaPanel');

    expect(component).toMatchSnapshot();
  });

  it('should renders correctly with transfersOfCareDetail and testing Create Panel', () => {
    const component = shallow(
      <TransfersOfCare
        store={storeWithDetail}
        match={match}
      />, { context }).dive().dive().dive().dive().dive().dive();

    expect(component.find('PluginListHeader')).toHaveLength(1);
    expect(component.find('PluginMainPanel')).toHaveLength(1);
    expect(component.find('TransfersOfCareDetail')).toHaveLength(0);
    expect(component.find('PluginCreate')).toHaveLength(0);

    // Testing component create panel methods
    component.instance().handleCreate();
    const componentStateAfterMethod = component.state();
    component.setState({ isBtnCreateVisible: false, isCreatePanelVisible: true, openedPanel: 'transfersOfCareCreate', isSecondPanel: true, isDetailPanelVisible: false, isLoading: true, isBtnExpandVisible: false, expandedPanel: 'all', isSubmit: false })
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
      <TransfersOfCare
        store={storeWithDetail}
        match={match}
      />, { context }).dive().dive().dive().dive().dive().dive();

    // Testing component hideCreateForm methods
    component.instance().hideCreateForm();
    expect(component.state().isBtnCreateVisible).toEqual(true);
    expect(component.state().isCreatePanelVisible).toEqual(false);
    expect(component.state().openedPanel).toEqual('transferOfCarePanel');
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
    expect(component.state().columnNameSortBy).toEqual('numberText');
    expect(component.state().sortingOrder).toEqual('asc');
    component.instance().handleHeaderCellClick({}, { name: 'from', sortingOrder: 'desc' });
    expect(component.state().columnNameSortBy).toEqual('from');
    expect(component.state().sortingOrder).toEqual('desc');

    // Testing component handleSetOffset methods
    expect(component.state().offset).toEqual(0);
    component.instance().handleSetOffset(10);
    expect(component.state().offset).toEqual(10);

    expect(component).toMatchSnapshot();
  });

  it('should renders correctly and testing context and lifecycle componentWillReceiveProps', () => {
    const component = shallow(
      <TransfersOfCare
        store={storeWithDetail}
        match={match}
      />, { context }).dive().dive().dive().dive().dive().dive();

    component.setProps({ test: 'testing context' });
    component.setContext(contextCreate);
    component.setProps({ test: 'testing create context' });
    component.setContext(contextDetail);
    component.setProps({ test: 'testing edit context' });

    expect(component).toMatchSnapshot();
  });

  it('should renders correctly with forms error', () => {
    const component = shallow(
      <TransfersOfCare
        store={storeWithFormsError}
        match={match}
      />, { context }).dive().dive().dive().dive().dive().dive();

    component.instance().handleSaveSettingsDetailForm(formValuesEdit, 'transferOfCarePanel');
    component.instance().handleSaveSettingsCreateForm(formValuesCreate);

    expect(component).toMatchSnapshot();
  });

  it('should renders correctly with empty store', () => {
    const component = shallow(
      <TransfersOfCare
        store={storeEmpty}
        match={match}
      />, { context }).dive().dive().dive().dive().dive().dive();

    expect(component).toMatchSnapshot();

    component.setContext(contextDetail);
    component.setProps({ transferOfCareDetail: { test: 'test' } });
    component.setContext(contextWithoutSourceId);
    component.setProps({ transferOfCareDetail: { test: 'test' } });
  });
});
