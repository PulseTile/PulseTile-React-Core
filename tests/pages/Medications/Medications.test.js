import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import configureStore from 'redux-mock-store';

import Medications from '../../../src/components/pages/Medications/Medications';
import { valuesNames } from '../../../src/components/pages/Medications/forms.config';

Enzyme.configure({ adapter: new Adapter() });

// frequently used variables
const userId = '9999999000';
const sourceId = 'acb0eaf2-d1df-4c7a-9382-619b31935f2b';

// storage setup in different configurations
const mockStore = configureStore();
const storeResource = {
  patientsMedications: {
    '9999999024': [
      {
        [valuesNames.NAME]: 'name',
        [valuesNames.DOSE_AMOUNT]: 'test',
        [valuesNames.DATE_CREATED]: 1507020019000,
        [valuesNames.SOURCE]: 'marand',
        [valuesNames.SOURCE_ID]: 'a7007401-837f-471c-8f73-cbb53c0eb1a1',
        dateCreatedConvert: '15-Jul-2015',
      },
      {
        [valuesNames.NAME]: 'name2',
        [valuesNames.DOSE_AMOUNT]: 'test2',
        [valuesNames.DATE_CREATED]: 1507020019000,
        [valuesNames.SOURCE]: 'marand',
        [valuesNames.SOURCE_ID]: 'a7007401-837f-471c-8f73-cbb53c0eb1a1',
        dateCreatedConvert: '15-Jul-2015',
      },
    ],
  },
};
const storeWithFormsError = mockStore(Object.assign({
  medicationsDetail: {
    '9999999000': {
      [valuesNames.NAME]: 'test',
      [valuesNames.DOSE_AMOUNT]: 'test',
      [valuesNames.DOSE_DIRECTIONS]: 'test',
      [valuesNames.DOSE_TIMING]: 'test',
      [valuesNames.ROUTE]: 'test',
      [valuesNames.START_DATE]: 1507020019000,
      [valuesNames.START_TIME]: null,
      [valuesNames.MEDICATION_CODE]: '',
      [valuesNames.MEDICATION_TERMINOLOGY]: '',
      [valuesNames.AUTHOR]: '',
      [valuesNames.DATE_CREATED]: 1507020019000,
      [valuesNames.SOURCE]: 'marand',
      [valuesNames.SOURCE_ID]: 'a7007401-837f-471c-8f73-cbb53c0eb1a1',
    },
  },
  form: {
    medicationsDetailFormSelector: {
      syncErrors: {
        [valuesNames.NAME]: 'You must enter a value.',
        [valuesNames.DOSE_AMOUNT]: 'You must enter a value.',
      },
    },
    medicationsCreateFormSelector: {
      syncErrors: {
        [valuesNames.NAME]: 'You must enter a value.',
        [valuesNames.DOSE_AMOUNT]: 'You must enter a value.',
      },
    },
  },
}, storeResource));
const storeEmpty = mockStore(Object.assign({
  medicationsDetail: {
    '9999999000': {},
  },
}, storeResource));
const storeWithDetail = mockStore(Object.assign({
  medicationsDetail: {
    '9999999000': {
      [valuesNames.NAME]: 'test',
      [valuesNames.DOSE_AMOUNT]: 'test',
      [valuesNames.DOSE_DIRECTIONS]: 'test',
      [valuesNames.DOSE_TIMING]: 'test',
      [valuesNames.ROUTE]: 'test',
      [valuesNames.START_DATE]: 1507020019000,
      [valuesNames.START_TIME]: null,
      [valuesNames.MEDICATION_CODE]: '',
      [valuesNames.MEDICATION_TERMINOLOGY]: '',
      [valuesNames.AUTHOR]: '',
      [valuesNames.DATE_CREATED]: 1507020019000,
      [valuesNames.SOURCE]: 'marand',
      [valuesNames.SOURCE_ID]: 'a7007401-837f-471c-8f73-cbb53c0eb1a1',
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
      replace: () => {},
      location: {
        pathname: `/patients/${userId}/medications`,
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
const contextCreate = generateNewContext(context, `/patients/${userId}/medications/create`);
const contextDetail = generateNewContext(context, `/patients/${userId}/medications/${sourceId}`);

// configuration of forms for testing methods
const formValuesEdit = {
  [valuesNames.NAME]: 'test',
  [valuesNames.DOSE_AMOUNT]: 'test',
  [valuesNames.DOSE_DIRECTIONS]: 'test',
  doseAmountVariable: true,
};
const formValuesCreate = {
  [valuesNames.AUTHOR]: 'bob.smith@gmail.com',
  [valuesNames.SOURCE_ID]: '',
  [valuesNames.MEDICATION_CODE]: 173134014,
  [valuesNames.MEDICATION_TERMINOLOGY]: 'SNOMED-CT',
  [valuesNames.NAME]: 'test',
  [valuesNames.DOSE_AMOUNT]: 'tesr',
  doseAmountVariable: true,
  [valuesNames.DOSE_TIMING]: 'test',
  [valuesNames.DOSE_DIRECTIONS]: 'test',
  [valuesNames.ROUTE]: 'IV Intra Venous',
};
const match = {
  params: {
    userId,
  },
};

describe('Component <Medications />', () => {
  it('should renders correctly with medicationsDetail and testing Detail Panel', () => {
    const component = shallow(
      <Medications
        store={storeWithDetail}
        match={match}
      />, { context }).dive().dive().dive()
      .dive()
      .dive()
      .dive()
      .dive();

    // Testing component handleDetailMedicationsClick methods
    expect(component.find('PluginListHeader')).toHaveLength(1);
    expect(component.find('PluginMainPanel')).toHaveLength(1);
    expect(component.find('MedicationsDetail')).toHaveLength(0);
    expect(component.find('PluginCreate')).toHaveLength(0);

    component.instance().handleDetailMedicationsClick('065d85e3-3cd5-4604-bb94-5685fffb193d');
    const componentStateAfterMethod = component.state();
    component.setState({ isSecondPanel: true, isDetailPanelVisible: true, isBtnExpandVisible: true, isBtnCreateVisible: true, isCreatePanelVisible: false, openedPanel: 'medicationPanel', editedPanel: {}, isLoading: true, expandedPanel: 'all' });
    const componentStateAfterSetState = component.state();

    expect(componentStateAfterMethod).toEqual(componentStateAfterSetState);
    expect(component.find('MedicationsDetail')).toHaveLength(1);
    expect(component.find('PluginCreate')).toHaveLength(0);
    expect(component).toMatchSnapshot();

    // Testing component handleShow methods
    expect(component.state().openedPanel).toEqual('medicationPanel');
    component.instance().handleShow('prescriptionPanel');
    expect(component.state().openedPanel).toEqual('prescriptionPanel');
    component.instance().handleShow('medicationPanel');
    expect(component.state().openedPanel).toEqual('medicationPanel');
    expect(component.state().expandedPanel).toEqual('all');
    component.setState({ expandedPanel: 'test' });
    component.instance().handleShow('medicationPanel');
    expect(component.state().openedPanel).toEqual('medicationPanel');
    expect(component.state().expandedPanel).toEqual('medicationPanel');
    component.setState({ expandedPanel: 'all' });

    // Testing component handleExpand methods
    expect(component.find('PluginListHeader')).toHaveLength(1);
    expect(component.find('PluginMainPanel')).toHaveLength(1);
    expect(component.state().openedPanel).toEqual('medicationPanel');
    expect(component.state().expandedPanel).toEqual('all');
    component.instance().handleExpand('medicationPanel', 'medicationsDetail');
    expect(component.state().openedPanel).toEqual('medicationPanel');
    expect(component.state().expandedPanel).toEqual('medicationPanel');
    component.setState({ openedPanel: 'medicationPanel', expandedPanel: 'medicationPanel' });
    expect(component.find('PluginListHeader')).toHaveLength(0);
    expect(component.find('PluginMainPanel')).toHaveLength(0);
    expect(component).toMatchSnapshot();

    component.setState({ openedPanel: 'medicationPanel', expandedPanel: 'all' });

    component.instance().handleExpand('medicationPanel', 'medicationsCreate');
    component.setState({ expandedPanel: 'all' });
    component.instance().handleExpand('medicationPanel', 'medicationsMain');
    component.setState({ expandedPanel: 'test' });
    component.instance().handleExpand('medicationPanel', 'medicationsMain');
    component.setState({ expandedPanel: 'test' });
    component.instance().handleExpand('medicationPanel', 'medicationsCreate');

    // Testing component detail form methods
    expect(component.state().editedPanel).toEqual({});
    component.instance().handleEdit('medicationPanel');
    expect(component.state().editedPanel).toEqual({ medicationPanel: true });
    component.instance().handleMedicationsDetailCancel('medicationPanel');
    expect(component.state().editedPanel).toEqual({ medicationPanel: false });
    component.instance().handleEdit('medicationPanel');
    component.instance().handleSaveSettingsDetailForm(formValuesEdit, 'medicationPanel');
    expect(component.state().editedPanel).toEqual({ medicationPanel: false });
    component.instance().handleSaveSettingsDetailForm(formValuesEdit, 'prescriptionPanel');

    expect(component).toMatchSnapshot();
  });

  it('should renders correctly with medicationsDetail and testing Create Panel', () => {
    const component = shallow(
      <Medications
        store={storeWithDetail}
        match={match}
      />, { context }).dive().dive().dive()
      .dive()
      .dive()
      .dive()
      .dive();

    expect(component.find('PluginListHeader')).toHaveLength(1);
    expect(component.find('PluginMainPanel')).toHaveLength(1);
    expect(component.find('MedicationsDetail')).toHaveLength(0);
    expect(component.find('PluginCreate')).toHaveLength(0);

    // Testing component create panel methods
    component.instance().handleCreate();
    const componentStateAfterMethod = component.state();
    component.setState({ isBtnCreateVisible: false, isCreatePanelVisible: true, openedPanel: 'medicationsCreate', isSecondPanel: true, isDetailPanelVisible: false, isLoading: true, isBtnExpandVisible: false, expandedPanel: 'all', isSubmit: false })
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
      <Medications
        store={storeWithDetail}
        match={match}
      />, { context }).dive().dive().dive()
      .dive()
      .dive()
      .dive()
      .dive();

    // Testing component hideCreateForm methods
    component.instance().hideCreateForm();
    expect(component.state().isBtnCreateVisible).toEqual(true);
    expect(component.state().isCreatePanelVisible).toEqual(false);
    expect(component.state().openedPanel).toEqual('medicationPanel');
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
    component.instance().handleHeaderCellClick({}, { name: 'doseAmmount', sortingOrder: 'desc' });
    expect(component.state().columnNameSortBy).toEqual('doseAmmount');
    expect(component.state().sortingOrder).toEqual('desc');

    // Testing component handleSetOffset methods
    expect(component.state().offset).toEqual(0);
    component.instance().handleSetOffset(10);
    expect(component.state().offset).toEqual(10);

    // Testing component toggleHourlySchedule methods
    expect(component.state().isOpenHourlySchedule).toEqual(true);
    component.instance().toggleHourlySchedule();
    expect(component.state().isOpenHourlySchedule).toEqual(false);

    expect(component).toMatchSnapshot();
  });

  it('should renders correctly and testing context and lifecycle componentWillReceiveProps', () => {
    const component = shallow(
      <Medications
        store={storeWithDetail}
        match={match}
      />, { context }).dive().dive().dive()
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
      <Medications
        store={storeWithFormsError}
        match={match}
      />, { context }).dive().dive().dive()
      .dive()
      .dive()
      .dive()
      .dive();

    component.instance().handleSaveSettingsDetailForm(formValuesEdit, 'medicationPanel');
    component.instance().handleSaveSettingsCreateForm(formValuesCreate);

    expect(component).toMatchSnapshot();
  });

  it('should renders correctly with empty store', () => {
    const component = shallow(
      <Medications
        store={storeEmpty}
        match={match}
      />, { context }).dive().dive().dive()
      .dive()
      .dive()
      .dive()
      .dive();

    expect(component).toMatchSnapshot();
  });
});
