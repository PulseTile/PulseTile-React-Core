import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import configureStore from 'redux-mock-store';
import { get } from 'lodash';

import Allergies from '../Allergies';
import { valuesNames } from '../forms.config';
import { themeConfigs } from '../../../../themes.config';
import { isButtonVisible } from '../../../../utils/themeSettings-helper';

Enzyme.configure({ adapter: new Adapter() });

const hiddenButtons = get(themeConfigs, 'buttonsToHide.allergies', []);

// frequently used variables
const userId = '9999999000';
const sourceId = 'acb0eaf2-d1df-4c7a-9382-619b31935f2b';

// storage setup in different configurations
const mockStore = configureStore();
const storeResource = {
  patientsAllergies: {
    '9999999024': [
      {
        [valuesNames.SOURCE_ID]: sourceId,
        [valuesNames.SOURCE]: 'EtherCIS',
        text: 'fsfsfs',
      },
    ],
  },
};
const storeWithFormsError = mockStore(Object.assign({
  allergiesDetail: {
    '9999999000': {
      [valuesNames.CAUSE]: 111,
      [valuesNames.CAUSECODE]: 111,
      [valuesNames.TERMINOLOGY]: 1239085,
      [valuesNames.TERMINOLOGYCODE]: 111,
      [valuesNames.REACTION]: 111,
      [valuesNames.AUTHOR]: 'Dr Tony Shannon',
      [valuesNames.DATE_CREATED]: 1507019519000,
      [valuesNames.SOURCE]: 'ethercis',
      [valuesNames.SOURCE_ID]: sourceId,
      [valuesNames.ORIGINAL_COMPOSITION]: '',
      [valuesNames.ORIGINAL_SOURCE]: '',
    },
  },
  form: {
    allergiePanelFormSelector: {
      syncErrors: {
        [valuesNames.CAUSE]: 'You must enter a value.',
        [valuesNames.REACTION]: 'You must enter a value.',
      },
    },
    allergiesCreateFormSelector: {
      syncErrors: {
        [valuesNames.CAUSE]: 'You must enter a value.',
        [valuesNames.REACTION]: 'You must enter a value.',
      },
    },
  },
}, storeResource));
const storeEmpty = mockStore(Object.assign({
  allergiesDetail: {
    '9999999000': {},
  },
}, storeResource));
const storeWithDetail = mockStore(Object.assign({
  allergiesDetail: {
    '9999999000': {
      [valuesNames.CAUSE]: 111,
      [valuesNames.CAUSECODE]: 111,
      [valuesNames.TERMINOLOGY]: 1239085,
      [valuesNames.TERMINOLOGYCODE]: 111,
      [valuesNames.REACTION]: 111,
      [valuesNames.AUTHOR]: 'Dr Tony Shannon',
      [valuesNames.DATE_CREATED]: 1507019519000,
      [valuesNames.SOURCE]: 'ethercis',
      [valuesNames.SOURCE_ID]: sourceId,
      [valuesNames.ORIGINAL_COMPOSITION]: '',
      [valuesNames.ORIGINAL_SOURCE]: '',
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
        pathname: `/patients/${userId}/allergies`,
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
const contextCreate = generateNewContext(context, `/patients/${userId}/allergies/create`);
const contextDetail = generateNewContext(context, `/patients/${userId}/allergies/${sourceId}`);

const contextImport = {
  router: {
    route: { match: { params: { userId } } },
    history: {
      push: () => {},
      replace: () => {},
      goBack: () => {},
      location: {
        pathname: `/patients/${userId}/allergies/create`,
        state: {
          importData: {
            isImport: true,
            originalSource: 'domen.com/documents/documents_id',
            cause: 'cause',
          }
        }
      },
    }
  },
};

// configuration of forms for testing methods
const formValuesEdit = {
  [valuesNames.CAUSE]: 112,
  [valuesNames.REACTION]: 112,
  [valuesNames.AUTHOR]: 'Dr Tony Shannon',
};
const formValuesCreate = {
  [valuesNames.AUTHOR]: 'bob.smith@gmail.com',
  [valuesNames.CAUSECODE]: '1239085',
  [valuesNames.SOURCE_ID]: '',
  [valuesNames.ISIMPORT]: false,
  [valuesNames.TERMINOLOGYCODE]: '12393890',
  [valuesNames.TERMINOLOGY]: 'SNOMED-CT',
  [valuesNames.CAUSE]: 'test',
  [valuesNames.REACTION]: 'test',
};
const formValuesImportCreate = {
  [valuesNames.AUTHOR]: 'bob.smith@gmail.com',
  [valuesNames.CAUSECODE]: '1239085',
  [valuesNames.SOURCE_ID]: '',
  [valuesNames.ISIMPORT]: true,
  [valuesNames.IMPORT]: 'domen.com/documents/documents_id',
  [valuesNames.TERMINOLOGYCODE]: '12393890',
  [valuesNames.TERMINOLOGY]: 'SNOMED-CT',
  [valuesNames.CAUSE]: 'cause',
  [valuesNames.REACTION]: 'test',
};
const match = {
  params: {
    userId,
  },
};

describe('Component <Allergies />', () => {
  it('should renders correctly with allergiesDetail and testing Detail Panel', () => {
    const component = shallow(
      <Allergies
        store={storeWithDetail}
        match={match}
      />, { context }).dive().dive().dive().dive().dive().dive().dive();

    // Testing component handleDetailAllergiesClick methods
    expect(component.find('PluginListHeader')).toHaveLength(1);
    expect(component.find('PluginMainPanel')).toHaveLength(1);
    expect(component.find('AllergiesDetail')).toHaveLength(0);
    expect(component.find('PluginCreate')).toHaveLength(0);

    component.instance().handleDetailAllergiesClick('065d85e3-3cd5-4604-bb94-5685fffb193d');
    const componentStateAfterMethod = component.state();
    component.setState({
      isSecondPanel: true,
      isDetailPanelVisible: true,
      isBtnExpandVisible: true,
      isBtnCreateVisible: isButtonVisible(hiddenButtons, 'create', true),
      isCreatePanelVisible: false,
      openedPanel: 'allergiePanel',
      editedPanel: {},
      isLoading: true,
      expandedPanel: 'all'
    });
    const componentStateAfterSetState = component.state();

    expect(componentStateAfterMethod).toEqual(componentStateAfterSetState);
    expect(component.find('AllergiesDetail')).toHaveLength(1);
    expect(component.find('PluginCreate')).toHaveLength(0);
    expect(component).toMatchSnapshot();

    // Testing component handleShow methods
    expect(component.state().openedPanel).toEqual('allergiePanel');
    component.instance().handleShow('metaPanel');
    expect(component.state().openedPanel).toEqual('metaPanel');
    component.instance().handleShow('allergiePanel');
    expect(component.state().openedPanel).toEqual('allergiePanel');

    // Testing component handleExpand methods
    expect(component.find('PluginListHeader')).toHaveLength(1);
    expect(component.find('PluginMainPanel')).toHaveLength(1);
    expect(component.state().openedPanel).toEqual('allergiePanel');
    expect(component.state().expandedPanel).toEqual('all');
    component.instance().handleExpand('allergiePanel', 'allergiesDetail');
    expect(component.state().openedPanel).toEqual('allergiePanel');
    expect(component.state().expandedPanel).toEqual('allergiePanel');
    component.setState({ openedPanel: 'allergiePanel', expandedPanel: 'allergiePanel' });
    expect(component.find('PluginListHeader')).toHaveLength(0);
    expect(component.find('PluginMainPanel')).toHaveLength(0);
    expect(component).toMatchSnapshot();

    component.setState({ openedPanel: 'allergiePanel', expandedPanel: 'all' });

    component.instance().handleExpand('allergiePanel', 'allergiesCreate');
    component.setState({ expandedPanel: 'all' });
    component.instance().handleExpand('allergiePanel', 'allergiesMain');
    component.setState({ expandedPanel: 'test' });
    component.instance().handleExpand('allergiePanel', 'allergiesMain');
    component.setState({ expandedPanel: 'test' });
    component.instance().handleExpand('allergiePanel', 'allergiesCreate');

    // Testing component detail form methods
    expect(component.state().editedPanel).toEqual({});
    component.instance().handleEdit('allergiePanel');
    expect(component.state().editedPanel).toEqual({ allergiePanel: true});
    component.instance().handleAllergieDetailCancel('allergiePanel');
    expect(component.state().editedPanel).toEqual({ allergiePanel: false});
    component.instance().handleEdit('allergiePanel');
    component.instance().handleSaveSettingsDetailForm(formValuesEdit, 'allergiePanel');
    expect(component.state().editedPanel).toEqual({ allergiePanel: false});
    component.instance().handleSaveSettingsDetailForm(formValuesEdit, 'metaPanel');

    expect(component).toMatchSnapshot();
  });

  it('should renders correctly with allergiesDetail and testing Create Panel', () => {
    const component = shallow(
      <Allergies
        store={storeWithDetail}
        match={match}
      />, { context }).dive().dive().dive().dive().dive().dive().dive();

    expect(component.find('PluginListHeader')).toHaveLength(1);
    expect(component.find('PluginMainPanel')).toHaveLength(1);
    expect(component.find('AllergiesDetail')).toHaveLength(0);
    expect(component.find('PluginCreate')).toHaveLength(0);

    // Testing component create panel methods
    component.instance().handleCreate();
    const componentStateAfterMethod = component.state();
    component.setState({ isBtnCreateVisible: false, isCreatePanelVisible: true, openedPanel: 'allergiesCreate', isSecondPanel: true, isDetailPanelVisible: false, isLoading: true, isBtnExpandVisible: true, expandedPanel: 'all', isSubmit: false })
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
      <Allergies
        store={storeWithDetail}
        match={match}
      />, { context }).dive().dive().dive().dive().dive().dive().dive();

    // Testing component hideCreateForm methods
    component.instance().hideCreateForm();
    expect(component.state().isBtnCreateVisible).toEqual(true);
    expect(component.state().isCreatePanelVisible).toEqual(false);
    expect(component.state().openedPanel).toEqual('allergiePanel');
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
    expect(component.state().columnNameSortBy).toEqual('cause');
    expect(component.state().sortingOrder).toEqual('asc');
    component.instance().handleHeaderCellClick({}, { name: 'reaction', sortingOrder: 'desc' });
    expect(component.state().columnNameSortBy).toEqual('reaction');
    expect(component.state().sortingOrder).toEqual('desc');

    // Testing component handleSetOffset methods
    expect(component.state().offset).toEqual(0);
    component.instance().handleSetOffset(10);
    expect(component.state().offset).toEqual(10);

    expect(component).toMatchSnapshot();
  });

  it('should renders correctly and testing context and lifecycle componentWillReceiveProps', () => {
    const component = shallow(
      <Allergies
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
      <Allergies
        store={storeWithFormsError}
        match={match}
      />, { context }).dive().dive().dive().dive().dive().dive().dive();

    component.instance().handleSaveSettingsDetailForm(formValuesEdit, 'allergiePanel');
    component.instance().handleSaveSettingsCreateForm(formValuesCreate);

    expect(component).toMatchSnapshot();
  });

  it('should renders correctly with empty store', () => {
    const component = shallow(
      <Allergies
        store={storeEmpty}
        match={match}
      />, { context }).dive().dive().dive().dive().dive().dive().dive();

    expect(component).toMatchSnapshot();
  });

  it('should renders correctly when data take from Documents how "import"', () => {
    const component = shallow(
      <Allergies
        store={storeEmpty}
        match={match}
      />, { context: contextImport }).dive().dive().dive().dive().dive().dive().dive();

    component.instance().goBack();
    component.instance().handleSaveSettingsCreateForm(formValuesImportCreate);

    expect(component).toMatchSnapshot();
  });
});
