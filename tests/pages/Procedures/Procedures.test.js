import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import configureStore from 'redux-mock-store';

import Procedures from '../../../src/components/pages/Procedures/Procedures';
import { valuesNames } from '../../../src/components/pages/Procedures/forms.config';

Enzyme.configure({ adapter: new Adapter() });

// frequently used variables
const userId = '9999999000';
const sourceId = 'acb0eaf2-d1df-4c7a-9382-619b31935f2b';

// storage setup in different configurations
const mockStore = configureStore();
const storeResource = {
  patientsProcedures: {
    '9999999024': [
      {
        [valuesNames.PROCEDURE_NAME]: 'total replacement of hip',
        [valuesNames.DATE]: 1436969493829,
        [valuesNames.TIME]: 54693829,
        [valuesNames.SOURCE]: 'ethercis',
        [valuesNames.SOURCE_ID]: 'fa7408c3-7d69-4f50-84ac-cbf735a0ab18',
        dateConvert: '15-Jul-2015',
        timeConvert: '18:11',
      },
    ],
  },
};
const storeWithFormsError = mockStore(Object.assign({
  proceduresDetail: {
    '9999999000': {
      [valuesNames.NAME]: '123b',
      [valuesNames.PROCEDURE_NAME]: '123b',
      [valuesNames.CODE]: 'at0039',
      [valuesNames.DATE_OF_PROCEDURE]: 1510579904000,
      [valuesNames.TIME]: 48704000,
      [valuesNames.TERMINOLOGY]: 'SNOMED-CT',
      [valuesNames.NOTES]: '123b',
      [valuesNames.PERFORMER]: 'Performer',
      [valuesNames.STATUS]: 'completed',
      [valuesNames.AUTHOR]: 'bob.smith@gmail.com',
      [valuesNames.DATE]: 1510659104000,
      [valuesNames.SOURCE]: 'ethercis',
      [valuesNames.SOURCE_ID]: '08102813-e8d0-4f45-aa95-ac0d633e69fd',
      [valuesNames.ORIGINAL_COMPOSITION]: '',
      [valuesNames.ORIGINAL_SOURCE]: '',
    },
  },
  form: {
    proceduresDetailFormSelector: {
      syncErrors: {
        [valuesNames.PROCEDURE_NAME]: 'You must enter a value.',
        [valuesNames.NOTES]: 'You must enter a value.',
      },
    },
    proceduresCreateFormSelector: {
      syncErrors: {
        [valuesNames.PROCEDURE_NAME]: 'You must enter a value.',
        [valuesNames.NOTES]: 'You must enter a value.',
      },
    },
  },
}, storeResource));
const storeEmpty = mockStore(Object.assign({
  proceduresDetail: {
    '9999999000': {},
  },
}, storeResource));
const storeWithDetail = mockStore(Object.assign({
  proceduresDetail: {
    '9999999000': {
      [valuesNames.NAME]: '123b',
      [valuesNames.PROCEDURE_NAME]: '123b',
      [valuesNames.CODE]: 'at0039',
      [valuesNames.DATE_OF_PROCEDURE]: 1510579904000,
      [valuesNames.TIME]: 48704000,
      [valuesNames.TERMINOLOGY]: 'SNOMED-CT',
      [valuesNames.NOTES]: '123b',
      [valuesNames.PERFORMER]: 'Performer',
      [valuesNames.STATUS]: 'completed',
      [valuesNames.AUTHOR]: 'bob.smith@gmail.com',
      [valuesNames.DATE]: 1510659104000,
      [valuesNames.SOURCE]: 'ethercis',
      [valuesNames.SOURCE_ID]: '08102813-e8d0-4f45-aa95-ac0d633e69fd',
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
        pathname: `/patients/${userId}/procedures`,
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
const contextCreate = generateNewContext(context, `/patients/${userId}/procedures/create`);
const contextDetail = generateNewContext(context, `/patients/${userId}/procedures/${sourceId}`);

// configuration of forms for testing methods
const formValuesEdit = {
  [valuesNames.PROCEDURE_NAME]: '123b',
  [valuesNames.DATE]: 1510579904000,
  [valuesNames.PERFORMER]: 'Performer',
  [valuesNames.NOTES]: '123b',
  [valuesNames.TERMINOLOGY]: 'SNOMED-CT',
  [valuesNames.CODE]: 'at0039',
  [valuesNames.AUTHOR]: 'bob.smith@gmail.com',
};
const formValuesCreate = {
  [valuesNames.AUTHOR]: 'bob.smith@gmail.com',
  [valuesNames.SOURCE_ID]: '',
  [valuesNames.PROCEDURE_NAME]: 'test',
  [valuesNames.DATE]: '13-Dec-2017',
  [valuesNames.PERFORMER]: 'test',
  [valuesNames.NOTES]: 'test',
  [valuesNames.TERMINOLOGY]: 'test',
  [valuesNames.CODE]: 'test',
};
const match = {
  params: {
    userId,
  },
};

describe('Component <Procedures />', () => {
  it('should renders correctly with proceduresDetail and testing Detail Panel', () => {
    const component = shallow(
      <Procedures
        store={storeWithDetail}
        match={match}
      />, { context }).dive().dive().dive().dive().dive().dive().dive();

    // Testing component handleDetailProceduresClick methods
    expect(component.find('PluginListHeader')).toHaveLength(1);
    expect(component.find('PluginMainPanel')).toHaveLength(1);
    expect(component.find('ProceduresDetail')).toHaveLength(0);
    expect(component.find('PluginCreate')).toHaveLength(0);

    component.instance().handleDetailProceduresClick('065d85e3-3cd5-4604-bb94-5685fffb193d');
    const componentStateAfterMethod = component.state();
    component.setState({ isSecondPanel: true, isDetailPanelVisible: true, isBtnExpandVisible: true, isBtnCreateVisible: true, isCreatePanelVisible: false, openedPanel: 'procedurePanel', editedPanel: {}, isLoading: true, expandedPanel: 'all' });
    const componentStateAfterSetState = component.state();

    expect(componentStateAfterMethod).toEqual(componentStateAfterSetState);
    expect(component.find('ProceduresDetail')).toHaveLength(1);
    expect(component.find('PluginCreate')).toHaveLength(0);
    expect(component).toMatchSnapshot();

    // Testing component handleShow methods
    expect(component.state().openedPanel).toEqual('procedurePanel');
    component.instance().handleShow('metaPanel');
    expect(component.state().openedPanel).toEqual('metaPanel');
    component.instance().handleShow('procedurePanel');
    expect(component.state().openedPanel).toEqual('procedurePanel');

    // Testing component handleExpand methods
    expect(component.find('PluginListHeader')).toHaveLength(1);
    expect(component.find('PluginMainPanel')).toHaveLength(1);
    expect(component.state().openedPanel).toEqual('procedurePanel');
    expect(component.state().expandedPanel).toEqual('all');
    component.instance().handleExpand('procedurePanel', 'proceduresDetail');
    expect(component.state().openedPanel).toEqual('procedurePanel');
    expect(component.state().expandedPanel).toEqual('procedurePanel');
    component.setState({ openedPanel: 'procedurePanel', expandedPanel: 'procedurePanel' });
    expect(component.find('PluginListHeader')).toHaveLength(0);
    expect(component.find('PluginMainPanel')).toHaveLength(0);
    expect(component).toMatchSnapshot();

    component.setState({ openedPanel: 'procedurePanel', expandedPanel: 'all' });

    component.instance().handleExpand('procedurePanel', 'proceduresCreate');
    component.setState({ expandedPanel: 'all' });
    component.instance().handleExpand('procedurePanel', 'proceduresMain');
    component.setState({ expandedPanel: 'test' });
    component.instance().handleExpand('procedurePanel', 'proceduresMain');
    component.setState({ expandedPanel: 'test' });
    component.instance().handleExpand('procedurePanel', 'proceduresCreate');

    // Testing component detail form methods
    expect(component.state().editedPanel).toEqual({});
    component.instance().handleEdit('procedurePanel');
    expect(component.state().editedPanel).toEqual({ procedurePanel: true });
    component.instance().handleProcedureDetailCancel('procedurePanel');
    expect(component.state().editedPanel).toEqual({ procedurePanel: false });
    component.instance().handleEdit('procedurePanel');
    component.instance().handleSaveSettingsDetailForm(formValuesEdit, 'procedurePanel');
    expect(component.state().editedPanel).toEqual({ procedurePanel: false });
    component.instance().handleSaveSettingsDetailForm(formValuesEdit, 'metaPanel');

    expect(component).toMatchSnapshot();
  });

  it('should renders correctly with proceduresDetail and testing Create Panel', () => {
    const component = shallow(
      <Procedures
        store={storeWithDetail}
        match={match}
      />, { context }).dive().dive().dive().dive().dive().dive().dive();

    expect(component.find('PluginListHeader')).toHaveLength(1);
    expect(component.find('PluginMainPanel')).toHaveLength(1);
    expect(component.find('ProceduresDetail')).toHaveLength(0);
    expect(component.find('PluginCreate')).toHaveLength(0);

    // Testing component create panel methods
    component.instance().handleCreate();
    const componentStateAfterMethod = component.state();
    component.setState({ isBtnCreateVisible: false, isCreatePanelVisible: true, openedPanel: 'proceduresCreate', isSecondPanel: true, isDetailPanelVisible: false, isLoading: true, isBtnExpandVisible: false, expandedPanel: 'all', isSubmit: false })
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
      <Procedures
        store={storeWithDetail}
        match={match}
      />, { context }).dive().dive().dive().dive().dive().dive().dive();

    // Testing component hideCreateForm methods
    component.instance().hideCreateForm();
    expect(component.state().isBtnCreateVisible).toEqual(true);
    expect(component.state().isCreatePanelVisible).toEqual(false);
    expect(component.state().openedPanel).toEqual('procedurePanel');
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
    component.instance().handleHeaderCellClick({}, { name: 'time', sortingOrder: 'desc' });
    expect(component.state().columnNameSortBy).toEqual('time');
    expect(component.state().sortingOrder).toEqual('desc');

    // Testing component handleSetOffset methods
    expect(component.state().offset).toEqual(0);
    component.instance().handleSetOffset(10);
    expect(component.state().offset).toEqual(10);

    expect(component).toMatchSnapshot();
  });

  it('should renders correctly and testing context and lifecycle componentWillReceiveProps', () => {
    const component = shallow(
      <Procedures
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
      <Procedures
        store={storeWithFormsError}
        match={match}
      />, { context }).dive().dive().dive().dive().dive().dive().dive();

    component.instance().handleSaveSettingsDetailForm(formValuesEdit, 'procedurePanel');
    component.instance().handleSaveSettingsCreateForm(formValuesCreate);

    expect(component).toMatchSnapshot();
  });

  it('should renders correctly with empty store', () => {
    const component = shallow(
      <Procedures
        store={storeEmpty}
        match={match}
      />, { context }).dive().dive().dive().dive().dive().dive().dive();

    expect(component).toMatchSnapshot();
  });
});
