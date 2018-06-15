import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import configureStore from 'redux-mock-store';

import Diagnosis from '../Diagnosis';
import { valuesNames } from '../forms.config';

Enzyme.configure({ adapter: new Adapter() });

// frequently used variables
const userId = '9999999000';
const sourceId = 'acb0eaf2-d1df-4c7a-9382-619b31935f2b';

// storage setup in different configurations
const mockStore = configureStore();
const storeResource = {
  patientsDiagnoses: {
    '9999999024': [
      {
        [valuesNames.PROBLEM]: 'Cholecystectomy',
        [valuesNames.DATE_OF_ONSET]: 1491861600000,
        [valuesNames.SOURCE]: 'ethercis',
        [valuesNames.SOURCE_ID]: '0318e94e-1803-46fe-a92a-647eca029323',
        dateOfOnsetConvert: '11-Apr-2017',
      },
    ],
  },
};
const storeWithFormsError = mockStore(Object.assign({
  diagnosesDetail: {
    '9999999000': {
      [valuesNames.PROBLEM]: '1.0',
      [valuesNames.DATE_OF_ONSET]: 1510272000000,
      [valuesNames.DESCRIPTION]: 'sdsda',
      [valuesNames.TERMINOLOGY]: 'dadadyuio',
      [valuesNames.CODE]: '1.239389E7',
      [valuesNames.AUTHOR]: 'Dr Tony Shannon',
      [valuesNames.DATE_CREATED]: 1511284969000,
      [valuesNames.SOURCE]: 'ethercis',
      [valuesNames.SOURCE_ID]: '8abeb5bb-717e-4b25-9bbf-d79f5e7a34e2',
    },
  },
  form: {
    diagnosesPanelFormSelector: {
      syncErrors: {
        [valuesNames.PROBLEM]: 'You must enter a value.',
        [valuesNames.DESCRIPTION]: 'You must enter a value.',
      },
    },
    diagnosesCreateFormSelector: {
      syncErrors: {
        [valuesNames.PROBLEM]: 'You must enter a value.',
        [valuesNames.DESCRIPTION]: 'You must enter a value.',
      },
    },
  },
}, storeResource));
const storeEmpty = mockStore(Object.assign({
  diagnosesDetail: {
    '9999999000': {},
  },
}, storeResource));
const storeWithDetail = mockStore(Object.assign({
  diagnosesDetail: {
    '9999999000': {
      [valuesNames.PROBLEM]: '1.0',
      [valuesNames.DATE_OF_ONSET]: 1510272000000,
      [valuesNames.DESCRIPTION]: 'sdsda',
      [valuesNames.TERMINOLOGY]: 'dadadyuio',
      [valuesNames.CODE]: '1.239389E7',
      [valuesNames.AUTHOR]: 'Dr Tony Shannon',
      [valuesNames.DATE_CREATED]: 1511284969000,
      [valuesNames.SOURCE]: 'ethercis',
      [valuesNames.SOURCE_ID]: '8abeb5bb-717e-4b25-9bbf-d79f5e7a34e2',
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
        pathname: `/patients/${userId}/diagnoses`,
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
const contextCreate = generateNewContext(context, `/patients/${userId}/diagnoses/create`);
const contextDetail = generateNewContext(context, `/patients/${userId}/diagnoses/${sourceId}`);

const contextImport = {
  router: {
    route: { match: { params: { userId } } },
    history: {
      push: () => {},
      replace: () => {},
      goBack: () => {},
      location: {
        pathname: `/patients/${userId}/diagnoses/create`,
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

// configuration of forms for testing methods
const formValuesEdit = {
  [valuesNames.PROBLEM]: '1.0e',
  [valuesNames.DATE_OF_ONSET]: 1510272000000,
  [valuesNames.DESCRIPTION]: 'sdsda',
  [valuesNames.TERMINOLOGY]: 'dadadyuio',
  [valuesNames.CODE]: '1.239389E7',
  [valuesNames.AUTHOR]: 'Dr Tony Shannon',
  [valuesNames.IS_IMPORT]: true,
};
const formValuesCreate = {
  [valuesNames.AUTHOR]: 'bob.smith@gmail.com',
  [valuesNames.SOURCE_ID]: '',
  [valuesNames.IS_IMPORT]: false,
  [valuesNames.CODE]: '12393890',
  [valuesNames.TERMINOLOGY]: 'SNOMED-CT',
  [valuesNames.PROBLEM]: 'test',
  [valuesNames.DESCRIPTION]: 'test',
  [valuesNames.DATE_OF_ONSET]: '20-Dec-2017',
};
const formValuesImportCreate = {
  [valuesNames.AUTHOR]: 'bob.smith@gmail.com',
  [valuesNames.SOURCE_ID]: '',
  [valuesNames.IS_IMPORT]: true,
  [valuesNames.IMPORT]: 'domen.com/documents/documents_id',
  [valuesNames.CODE]: '12393890',
  [valuesNames.TERMINOLOGY]: 'SNOMED-CT',
  [valuesNames.PROBLEM]: 'test',
  [valuesNames.DESCRIPTION]: 'test',
  [valuesNames.DATE_OF_ONSET]: '20-Dec-2017',
};
const match = {
  params: {
    userId,
  },
};

describe('Component <Diagnosis />', () => {
  it('should renders correctly with diagnosisDetail and testing Detail Panel', () => {
    const component = shallow(
      <Diagnosis
        store={storeWithDetail}
        match={match}
      />, { context }).dive().dive().dive().dive().dive().dive();

    // Testing component handleDetailDiagnosesClick methods
    expect(component.find('PluginListHeader')).toHaveLength(1);
    expect(component.find('PluginMainPanel')).toHaveLength(1);
    expect(component.find('DiagnosisDetail')).toHaveLength(0);
    expect(component.find('PluginCreate')).toHaveLength(0);

    component.instance().handleDetailDiagnosesClick('065d85e3-3cd5-4604-bb94-5685fffb193d');
    const componentStateAfterMethod = component.state();
    component.setState({ isSecondPanel: true, isDetailPanelVisible: true, isBtnExpandVisible: true, isBtnCreateVisible: true, isCreatePanelVisible: false, openedPanel: 'diagnosesPanel', editedPanel: {}, expandedPanel: 'all', isLoading: true });
    const componentStateAfterSetState = component.state();

    expect(componentStateAfterMethod).toEqual(componentStateAfterSetState);
    expect(component.find('DiagnosisDetail')).toHaveLength(1);
    expect(component.find('PluginCreate')).toHaveLength(0);
    expect(component).toMatchSnapshot();

    // Testing component handleExpand methods
    expect(component.find('PluginListHeader')).toHaveLength(1);
    expect(component.find('PluginMainPanel')).toHaveLength(1);
    expect(component.state().openedPanel).toEqual('diagnosesPanel');
    expect(component.state().expandedPanel).toEqual('all');
    component.instance().handleExpand('diagnosesPanel', 'diagnosesDetail');
    expect(component.state().openedPanel).toEqual('diagnosesPanel');
    expect(component.state().expandedPanel).toEqual('diagnosesPanel');
    component.setState({ openedPanel: 'diagnosesPanel', expandedPanel: 'diagnosesPanel' });
    expect(component.find('PluginListHeader')).toHaveLength(0);
    expect(component.find('PluginMainPanel')).toHaveLength(0);
    expect(component).toMatchSnapshot();

    component.setState({ openedPanel: 'diagnosesPanel', expandedPanel: 'all' });

    component.instance().handleExpand('diagnosesPanel', 'diagnosesCreate');
    component.setState({ expandedPanel: 'all' });
    component.instance().handleExpand('diagnosesPanel', 'diagnosesMain');
    component.setState({ expandedPanel: 'test' });
    component.instance().handleExpand('diagnosesPanel', 'diagnosesMain');
    component.setState({ expandedPanel: 'test' });
    component.instance().handleExpand('diagnosesPanel', 'diagnosesCreate');

    // Testing component detail form methods
    expect(component.state().editedPanel).toEqual({});
    component.instance().handleEdit('diagnosesPanel');
    expect(component.state().editedPanel).toEqual({ diagnosesPanel: true });
    component.instance().handleDiagnosisDetailCancel('diagnosesPanel');
    expect(component.state().editedPanel).toEqual({ diagnosesPanel: false });
    component.instance().handleEdit('diagnosesPanel');
    component.instance().handleSaveSettingsDetailForm(formValuesEdit, 'diagnosesPanel');
    expect(component.state().editedPanel).toEqual({ diagnosesPanel: false });

    expect(component).toMatchSnapshot();
  });

  it('should renders correctly with diagnosesDetail and testing Create Panel', () => {
    const component = shallow(
      <Diagnosis
        store={storeWithDetail}
        match={match}
      />, { context }).dive().dive().dive().dive().dive().dive();

    expect(component.find('PluginListHeader')).toHaveLength(1);
    expect(component.find('PluginMainPanel')).toHaveLength(1);
    expect(component.find('DiagnosisDetail')).toHaveLength(0);
    expect(component.find('PluginCreate')).toHaveLength(0);

    // Testing component create panel methods
    component.instance().handleCreate();
    const componentStateAfterMethod = component.state();
    component.setState({ isBtnCreateVisible: false, isCreatePanelVisible: true, openedPanel: 'diagnosesCreate', isSecondPanel: true, isDetailPanelVisible: false, isBtnExpandVisible: true, expandedPanel: 'all', isSubmit: false, isLoading: true })
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
      <Diagnosis
        store={storeWithDetail}
        match={match}
      />, { context }).dive().dive().dive().dive().dive().dive();

    // Testing component hideCreateForm methods
    component.instance().hideCreateForm();
    expect(component.state().isBtnCreateVisible).toEqual(true);
    expect(component.state().isCreatePanelVisible).toEqual(false);
    expect(component.state().openedPanel).toEqual('diagnosesPanel');
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
    expect(component.state().columnNameSortBy).toEqual('problem');
    expect(component.state().sortingOrder).toEqual('asc');
    component.instance().handleHeaderCellClick({}, { name: 'dateOfOnset', sortingOrder: 'desc' });
    expect(component.state().columnNameSortBy).toEqual('dateOfOnset');
    expect(component.state().sortingOrder).toEqual('desc');

    // Testing component handleSetOffset methods
    expect(component.state().offset).toEqual(0);
    component.instance().handleSetOffset(10);
    expect(component.state().offset).toEqual(10);

    expect(component).toMatchSnapshot();
  });

  it('should renders correctly and testing context and lifecycle componentWillReceiveProps', () => {
    const component = shallow(
      <Diagnosis
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
      <Diagnosis
        store={storeWithFormsError}
        match={match}
      />, { context }).dive().dive().dive().dive().dive().dive();

    component.instance().handleSaveSettingsDetailForm(formValuesEdit, 'diagnosesPanel');
    component.instance().handleSaveSettingsCreateForm(formValuesCreate);

    expect(component).toMatchSnapshot();
  });

  it('should renders correctly with empty store', () => {
    const component = shallow(
      <Diagnosis
        store={storeEmpty}
        match={match}
      />, { context }).dive().dive().dive().dive().dive().dive();

    expect(component).toMatchSnapshot();
  });

  it('should renders correctly when data take from Documents how "import"', () => {
    const component = shallow(
      <Diagnosis
        store={storeEmpty}
        match={match}
      />, { context: contextImport }).dive().dive().dive().dive().dive().dive();

    component.instance().goBack();
    component.instance().handleSaveSettingsCreateForm(formValuesImportCreate);

    expect(component).toMatchSnapshot();
  });
});
