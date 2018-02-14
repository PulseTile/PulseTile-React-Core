import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import configureStore from 'redux-mock-store';

import GenericPlugin from '../GenericPlugin';
import { valuesNames } from '../forms.config';

Enzyme.configure({ adapter: new Adapter() });

// frequently used variables
const userId = '9999999000';
const sourceId = 'acb0eaf2-d1df-4c7a-9382-619b31935f2b';

// storage setup in different configurations
const mockStore = configureStore();
const storeResource = {
  patientsGenericPlugin: {
    '9999999024': [
      {
        [valuesNames.AUTHOR]: 'bob.smith@gmail.com',
        [valuesNames.DATE_CREATED]: 1510224834000,
        [valuesNames.TYPE]: '11',
        [valuesNames.SOURCE]: 'ethercis',
        [valuesNames.SOURCE_ID]: 'd6b4d397-779c-4a4e-b5eb-2084fb11876f',
        dateCreatedConvert: '09-Nov-2017',
      },
      {
        [valuesNames.AUTHOR]: 'bob.smith@gmail.com',
        [valuesNames.DATE_CREATED]: 1510224834000,
        [valuesNames.TYPE]: '11',
        [valuesNames.SOURCE]: 'ethercis',
        [valuesNames.SOURCE_ID]: 'd6b4d397-779c-4a4e-b5eb-2084fb11876f',
        dateCreatedConvert: '09-Nov-2017',
      },
    ],
  },
};
const storeWithFormsError = mockStore(Object.assign({
  genericPluginDetail: {
    '9999999000': {
      [valuesNames.NOTE]: '11',
      [valuesNames.TYPE]: '11',
      [valuesNames.AUTHOR]: 'bob.smith@gmail.com',
      [valuesNames.DATE_CREATED]: 1510224834000,
      [valuesNames.SOURCE]: 'ethercis',
      [valuesNames.SOURCE_ID]: 'd6b4d397-779c-4a4e-b5eb-2084fb11876f'
    },
  },
  form: {
    genericPluginsDetailFormSelector: {
      syncErrors: {
        [valuesNames.TYPE]: 'You must enter a value.',
        [valuesNames.NOTE]: 'You must enter a value.',
      },
    },
    genericPluginsCreateFormSelector: {
      syncErrors: {
        [valuesNames.TYPE]: 'You must enter a value.',
        [valuesNames.NOTE]: 'You must enter a value.',
      },
    },
  },
}, storeResource));
const storeEmpty = mockStore(Object.assign({
  genericPluginDetail: {
    '9999999000': {},
  },
}, storeResource));
const storeWithDetail = mockStore(Object.assign({
  genericPluginDetail: {
    '9999999000': {
      [valuesNames.NOTE]: '11',
      [valuesNames.TYPE]: '11',
      [valuesNames.AUTHOR]: 'bob.smith@gmail.com',
      [valuesNames.DATE_CREATED]: 1510224834000,
      [valuesNames.SOURCE]: 'ethercis',
      [valuesNames.SOURCE_ID]: 'd6b4d397-779c-4a4e-b5eb-2084fb11876f'
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
        pathname: `/patients/${userId}/genericPlugin`,
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
const contextCreate = generateNewContext(context, `/patients/${userId}/genericPlugin/create`);
const contextDetail = generateNewContext(context, `/patients/${userId}/genericPlugin/${sourceId}`);

// configuration of forms for testing methods
const formValuesEdit = {
  [valuesNames.TYPE]: '2',
  [valuesNames.NOTE]: 2,
  [valuesNames.AUTHOR]: 'bob.smith@gmail.com',
};
const formValuesCreate = {
  [valuesNames.AUTHOR]: 'bob.smith@gmail.com',
  [valuesNames.SOURCE]: 'openehr',
  [valuesNames.TYPE]: 'test',
  [valuesNames.NOTE]: 'test'
};
const match = {
  params: {
    userId,
  },
};

describe('Component <GenericPlugin />', () => {
  it('should renders correctly with genericPluginsPanel and testing Detail Panel', () => {
    const component = shallow(
      <GenericPlugin
        store={storeWithDetail}
        match={match}
      />, { context }).dive().dive().dive().dive().dive().dive();

    // Testing component handleDetailGenericPluginClick methods
    expect(component.find('PluginListHeader')).toHaveLength(1);
    expect(component.find('PluginMainPanel')).toHaveLength(1);
    expect(component.find('GenericPluginDetail')).toHaveLength(0);
    expect(component.find('PluginCreate')).toHaveLength(0);

    component.instance().handleDetailGenericPluginClick('065d85e3-3cd5-4604-bb94-5685fffb193d');
    const componentStateAfterMethod = component.state();
    component.setState({ isSecondPanel: true, isDetailPanelVisible: true, isBtnExpandVisible: true, isBtnCreateVisible: true, isCreatePanelVisible: false, openedPanel: 'genericPluginsPanel', editedPanel: {}, expandedPanel: 'all', isLoading: true });
    const componentStateAfterSetState = component.state();

    expect(componentStateAfterMethod).toEqual(componentStateAfterSetState);
    expect(component.find('GenericPluginDetail')).toHaveLength(1);
    expect(component.find('PluginCreate')).toHaveLength(0);
    expect(component).toMatchSnapshot();

    // Testing component handleExpand methods
    expect(component.find('PluginListHeader')).toHaveLength(1);
    expect(component.find('PluginMainPanel')).toHaveLength(1);
    expect(component.state().openedPanel).toEqual('genericPluginsPanel');
    expect(component.state().expandedPanel).toEqual('all');
    component.instance().handleExpand('genericPluginsPanel', 'genericPluginsDetail');
    expect(component.state().openedPanel).toEqual('genericPluginsPanel');
    expect(component.state().expandedPanel).toEqual('genericPluginsPanel');
    component.setState({ openedPanel: 'genericPluginsPanel', expandedPanel: 'genericPluginsPanel' });
    expect(component.find('PluginListHeader')).toHaveLength(0);
    expect(component.find('PluginMainPanel')).toHaveLength(0);
    expect(component).toMatchSnapshot();

    component.setState({ openedPanel: 'genericPluginsPanel', expandedPanel: 'all' });

    component.instance().handleExpand('genericPluginsPanel', 'genericPluginsCreate');
    component.setState({ expandedPanel: 'all' });
    component.instance().handleExpand('genericPluginsPanel', 'genericPluginsMain');
    component.setState({ expandedPanel: 'test' });
    component.instance().handleExpand('genericPluginsPanel', 'genericPluginsMain');
    component.setState({ expandedPanel: 'test' });
    component.instance().handleExpand('genericPluginsPanel', 'genericPluginsCreate');

    // Testing component detail form methods
    expect(component.state().editedPanel).toEqual({});
    component.instance().handleEdit('genericPluginsPanel');
    expect(component.state().editedPanel).toEqual({ genericPluginsPanel: true });
    component.instance().handleGenericPluginDetailCancel('genericPluginsPanel');
    expect(component.state().editedPanel).toEqual({ genericPluginsPanel: false });
    component.instance().handleEdit('genericPluginsPanel');
    component.instance().handleSaveSettingsDetailForm(formValuesEdit, 'genericPluginsPanel');
    expect(component.state().editedPanel).toEqual({ genericPluginsPanel: false });

    expect(component).toMatchSnapshot();
  });

  it('should renders correctly with genericPluginsDetail and testing Create Panel', () => {
    const component = shallow(
      <GenericPlugin
        store={storeWithDetail}
        match={match}
      />, { context }).dive().dive().dive().dive().dive().dive();

    expect(component.find('PluginListHeader')).toHaveLength(1);
    expect(component.find('PluginMainPanel')).toHaveLength(1);
    expect(component.find('GenericPluginDetail')).toHaveLength(0);
    expect(component.find('PluginCreate')).toHaveLength(0);

    // Testing component create panel methods
    component.instance().handleCreate();
    const componentStateAfterMethod = component.state();
    component.setState({ isBtnCreateVisible: false, isCreatePanelVisible: true, openedPanel: 'genericPluginsCreate', isSecondPanel: true, isDetailPanelVisible: false, isSubmit: false, isLoading: true });
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
      <GenericPlugin
        store={storeWithDetail}
        match={match}
      />, { context }).dive().dive().dive().dive().dive().dive();

    // Testing component hideCreateForm methods
    component.instance().hideCreateForm();
    expect(component.state().isBtnCreateVisible).toEqual(true);
    expect(component.state().isCreatePanelVisible).toEqual(false);
    expect(component.state().openedPanel).toEqual('genericPluginsPanel');
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
    expect(component.state().columnNameSortBy).toEqual('type');
    expect(component.state().sortingOrder).toEqual('asc');
    component.instance().handleHeaderCellClick({}, { name: 'author', sortingOrder: 'desc' });
    expect(component.state().columnNameSortBy).toEqual('author');
    expect(component.state().sortingOrder).toEqual('desc');

    // Testing component handleSetOffset methods
    expect(component.state().offset).toEqual(0);
    component.instance().handleSetOffset(10);
    expect(component.state().offset).toEqual(10);

    expect(component).toMatchSnapshot();
  });

  it('should renders correctly and testing context and lifecycle componentWillReceiveProps', () => {
    const component = shallow(
      <GenericPlugin
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
      <GenericPlugin
        store={storeWithFormsError}
        match={match}
      />, { context }).dive().dive().dive().dive().dive().dive();

    component.instance().handleSaveSettingsDetailForm(formValuesEdit, 'genericPluginsPanel');
    component.instance().handleSaveSettingsCreateForm(formValuesCreate);

    expect(component).toMatchSnapshot();
  });

  it('should renders correctly with empty store', () => {
    const component = shallow(
      <GenericPlugin
        store={storeEmpty}
        match={match}
      />, { context }).dive().dive().dive().dive().dive().dive();

    expect(component).toMatchSnapshot();
  });
});
