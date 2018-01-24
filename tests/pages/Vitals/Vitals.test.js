import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import configureStore from 'redux-mock-store';

import Vitals from '../../../src/components/pages/Vitals/Vitals';
import { valuesNames } from '../../../src/components/pages/Vitals/forms.config';

Enzyme.configure({ adapter: new Adapter() });

// frequently used variables
const userId = '9999999000';
const sourceId = 'acb0eaf2-d1df-4c7a-9382-619b31935f2b';

// storage setup in different configurations
const mockStore = configureStore();
const storeResource = {
  patientsVitals: {
    '9999999000': [
      {
        [valuesNames.AUTHOR]: 'Dr Tony Shannon',
        [valuesNames.DATE_CREATED]: 1515684602000,
        [valuesNames.NEWS_SCORE]: 3,
        [valuesNames.RESPIRATION_RATE]: '12.0',
        [valuesNames.OXYGEN_SUPPLEMENTAL]: 'true',
        [valuesNames.HEART_RATE]: '45.0',
        [valuesNames.TEMPERATURE]: '37.0',
        [valuesNames.LEVEL_OF_CONSCIOUSNESS]: 'Alert',
        [valuesNames.SYSTOLIC_BP]: '112.0',
        [valuesNames.DIASTOLIC_BP]: '64.0',
        [valuesNames.OXYGEN_SATURATION]: '97.0',
        [valuesNames.SOURCE]: 'ethercis',
        [valuesNames.SOURCE_ID]: '27ee5e25-4c32-46d2-b45a-f74149d72030',
        [valuesNames.ID]: 1,
        highlighters: [{ name: 'newsScore', status: 'success' }],
        dateCreatedConvert: '11-May-2017',
      },
      {
        [valuesNames.AUTHOR]: 'Dr Tony Shannon',
        [valuesNames.DATE_CREATED]: 1515683002100,
        [valuesNames.NEWS_SCORE]: 3,
        [valuesNames.RESPIRATION_RATE]: '12.0',
        [valuesNames.OXYGEN_SUPPLEMENTAL]: 'true',
        [valuesNames.HEART_RATE]: '45.0',
        [valuesNames.TEMPERATURE]: '37.0',
        [valuesNames.LEVEL_OF_CONSCIOUSNESS]: 'Alert',
        [valuesNames.SYSTOLIC_BP]: '112.0',
        [valuesNames.DIASTOLIC_BP]: '64.0',
        [valuesNames.OXYGEN_SATURATION]: '97.0',
        [valuesNames.SOURCE]: 'ethercis',
        [valuesNames.SOURCE_ID]: '27ee5e25-4c32-46d2-b45a-f74149d72030',
        [valuesNames.ID]: 1,
        highlighters: [{ name: 'newsScore', status: 'success' }],
        dateCreatedConvert: '11-May-2017',
      },
      {
        [valuesNames.AUTHOR]: 'Dr Tony Shannon',
        [valuesNames.DATE_CREATED]: 1505792407000,
        [valuesNames.NEWS_SCORE]: 3,
        [valuesNames.RESPIRATION_RATE]: '12.0',
        [valuesNames.OXYGEN_SUPPLEMENTAL]: 'true',
        [valuesNames.HEART_RATE]: '45.0',
        [valuesNames.TEMPERATURE]: '37.0',
        [valuesNames.LEVEL_OF_CONSCIOUSNESS]: 'Alert',
        [valuesNames.SYSTOLIC_BP]: '112.0',
        [valuesNames.DIASTOLIC_BP]: '64.0',
        [valuesNames.OXYGEN_SATURATION]: '97.0',
        [valuesNames.SOURCE]: 'ethercis',
        [valuesNames.SOURCE_ID]: '27ee5e25-4c32-46d2-b45a-f74149d72030',
        [valuesNames.ID]: 1,
        highlighters: [{ name: 'newsScore', status: 'success' }],
        dateCreatedConvert: '11-May-2017',
      },
      {
        [valuesNames.AUTHOR]: 'Dr Tony Shannon',
        [valuesNames.DATE_CREATED]: 1425782407000,
        [valuesNames.NEWS_SCORE]: 3,
        [valuesNames.RESPIRATION_RATE]: '12.0',
        [valuesNames.OXYGEN_SUPPLEMENTAL]: 'true',
        [valuesNames.HEART_RATE]: '45.0',
        [valuesNames.TEMPERATURE]: '37.0',
        [valuesNames.LEVEL_OF_CONSCIOUSNESS]: 'Alert',
        [valuesNames.SYSTOLIC_BP]: '112.0',
        [valuesNames.DIASTOLIC_BP]: '64.0',
        [valuesNames.OXYGEN_SATURATION]: '97.0',
        [valuesNames.SOURCE]: 'ethercis',
        [valuesNames.SOURCE_ID]: '27ee5e25-4c32-46d2-b45a-f74149d72030',
        [valuesNames.ID]: 1,
        highlighters: [{ name: 'newsScore', status: 'success' }],
        dateCreatedConvert: '11-May-2017',
      },
      {
        [valuesNames.AUTHOR]: 'Dr Tony Shannon',
        [valuesNames.DATE_CREATED]: 1205682407000,
        [valuesNames.NEWS_SCORE]: 3,
        [valuesNames.RESPIRATION_RATE]: '12.0',
        [valuesNames.OXYGEN_SUPPLEMENTAL]: 'true',
        [valuesNames.HEART_RATE]: '45.0',
        [valuesNames.TEMPERATURE]: '37.0',
        [valuesNames.LEVEL_OF_CONSCIOUSNESS]: 'Pain',
        [valuesNames.SYSTOLIC_BP]: '112.0',
        [valuesNames.DIASTOLIC_BP]: '64.0',
        [valuesNames.OXYGEN_SATURATION]: '97.0',
        [valuesNames.SOURCE]: 'ethercis',
        [valuesNames.SOURCE_ID]: '27ee5e25-4c32-46d2-b45a-f74149d72030',
        [valuesNames.ID]: 1,
        highlighters: [{ name: 'newsScore', status: 'warning' }],
        dateCreatedConvert: '11-May-2017',
      },
    ],
  },
};
const storeWithFormsError = mockStore(Object.assign({
  vitalsDetail: {
    '9999999000': {
      [valuesNames.AUTHOR]: 'Dr Tony Shannon',
      [valuesNames.DATE_CREATED]: 1515682407000,
      [valuesNames.NEWS_SCORE]: 3,
      [valuesNames.RESPIRATION_RATE]: '12.0',
      [valuesNames.OXYGEN_SUPPLEMENTAL]: 'true',
      [valuesNames.HEART_RATE]: '45.0',
      [valuesNames.TEMPERATURE]: '37.0',
      [valuesNames.LEVEL_OF_CONSCIOUSNESS]: 'Pain',
      [valuesNames.SYSTOLIC_BP]: '112.0',
      [valuesNames.DIASTOLIC_BP]: '64.0',
      [valuesNames.OXYGEN_SATURATION]: '97.0',
      [valuesNames.SOURCE]: 'ethercis',
      [valuesNames.SOURCE_ID]: '27ee5e25-4c32-46d2-b45a-f74149d72030',
    },
  },
  form: {
    vitalsDetailFormSelector: {
      syncErrors: {
        [valuesNames.RESPIRATION_RATE]: 'You must enter a correct value.',
        [valuesNames.OXYGEN_SATURATION]: 'You must enter a correct value from 0 to 100.',
      },
    },
    vitalsCreateFormSelector: {
      syncErrors: {
        [valuesNames.RESPIRATION_RATE]: 'You must enter a correct value.',
        [valuesNames.OXYGEN_SATURATION]: 'You must enter a correct value from 0 to 100.',
      },
    },
  },
}, storeResource));
const storeEmpty = mockStore(Object.assign({
  vitalsDetail: {
    '9999999000': {},
  },
}, storeResource));
const storeWithDetail = mockStore(Object.assign({
  vitalsDetail: {
    '9999999000': {
      [valuesNames.AUTHOR]: 'Dr Tony Shannon',
      [valuesNames.DATE_CREATED]: 1515682407000,
      [valuesNames.NEWS_SCORE]: 3,
      [valuesNames.RESPIRATION_RATE]: '12.0',
      [valuesNames.OXYGEN_SUPPLEMENTAL]: 'true',
      [valuesNames.HEART_RATE]: '45.0',
      [valuesNames.TEMPERATURE]: '37.0',
      [valuesNames.LEVEL_OF_CONSCIOUSNESS]: 'Pain',
      [valuesNames.SYSTOLIC_BP]: '112.0',
      [valuesNames.DIASTOLIC_BP]: '64.0',
      [valuesNames.OXYGEN_SATURATION]: '97.0',
      [valuesNames.SOURCE]: 'ethercis',
      [valuesNames.SOURCE_ID]: '27ee5e25-4c32-46d2-b45a-f74149d72030',
    },
  },
}, storeResource));
const allStoreEmpty = mockStore({
  patientsVitals: {
    '9999999001': [
      {},
    ],
  },
  vitalsDetail: {
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
        pathname: `/patients/${userId}/vitals`,
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
const contextCreate = generateNewContext(context, `/patients/${userId}/vitals/create`);
const contextDetail = generateNewContext(context, `/patients/${userId}/vitals/${sourceId}`);

// configuration of forms for testing methods
const formValuesEdit = {
  [valuesNames.AUTHOR]: 'Dr Tony Shannon',
  [valuesNames.RESPIRATION_RATE]: 11,
  [valuesNames.OXYGEN_SUPPLEMENTAL]: true,
  [valuesNames.HEART_RATE]: 52,
  [valuesNames.TEMPERATURE]: 37,
  [valuesNames.LEVEL_OF_CONSCIOUSNESS]: 'Pain',
  [valuesNames.SYSTOLIC_BP]: 92,
  [valuesNames.DIASTOLIC_BP]: 64,
  [valuesNames.OXYGEN_SATURATION]: 97,
  [valuesNames.NEWS_SCORE]: 8,
};
const formValuesCreate = {
  [valuesNames.AUTHOR]: 'bob.smith@gmail.com',
  [valuesNames.RESPIRATION_RATE]: '12.0',
  [valuesNames.OXYGEN_SUPPLEMENTAL]: 'true',
  [valuesNames.HEART_RATE]: '45.0',
  [valuesNames.TEMPERATURE]: '37.0',
  [valuesNames.LEVEL_OF_CONSCIOUSNESS]: 'Pain',
  [valuesNames.SYSTOLIC_BP]: '112.0',
  [valuesNames.DIASTOLIC_BP]: '64.0',
  [valuesNames.OXYGEN_SATURATION]: '97.0',
  [valuesNames.SOURCE_ID]: '',
};
const match = {
  params: {
    userId,
  },
};

describe('Component <Vitals />', () => {
  it('should renders correctly with vitalsDetail and testing Detail Panel', () => {
    const component = shallow(
      <Vitals
        store={storeWithDetail}
        match={match}
      />, { context }).dive().dive().dive()
      .dive()
      .dive()
      .dive();

    // Testing component handleDetailVitalsClick methods
    expect(component.find('VitalsListHeader')).toHaveLength(1);
    expect(component.find('VitalsMainPanel')).toHaveLength(1);
    expect(component.find('VitalsDetail')).toHaveLength(0);
    expect(component.find('PluginCreate')).toHaveLength(0);

    component.instance().handleDetailVitalsClick('065d85e3-3cd5-4604-bb94-5685fffb193d');
    const componentStateAfterMethod = component.state();
    component.setState({ isSecondPanel: true, isDetailPanelVisible: true, isBtnExpandVisible: true, isBtnCreateVisible: true, isCreatePanelVisible: false, openedPanel: 'vitalPanel', editedPanel: {}, isLoading: true, expandedPanel: 'all' });
    const componentStateAfterSetState = component.state();

    expect(componentStateAfterMethod).toEqual(componentStateAfterSetState);
    expect(component.find('VitalsDetail')).toHaveLength(1);
    expect(component.find('PluginCreate')).toHaveLength(0);
    expect(component).toMatchSnapshot();

    // Testing component handleExpand methods
    expect(component.find('VitalsListHeader')).toHaveLength(1);
    expect(component.find('VitalsMainPanel')).toHaveLength(1);
    expect(component.state().openedPanel).toEqual('vitalPanel');
    expect(component.state().expandedPanel).toEqual('all');
    component.instance().handleExpand('vitalPanel', 'vitalsDetail');
    expect(component.state().openedPanel).toEqual('vitalPanel');
    expect(component.state().expandedPanel).toEqual('vitalPanel');
    component.setState({ openedPanel: 'vitalPanel', expandedPanel: 'vitalPanel' });
    expect(component.find('VitalsListHeader')).toHaveLength(0);
    expect(component.find('VitalsMainPanel')).toHaveLength(0);
    expect(component).toMatchSnapshot();

    component.setState({ openedPanel: 'vitalPanel', expandedPanel: 'all' });

    component.instance().handleExpand('vitalPanel', 'vitalsCreate');
    component.setState({ expandedPanel: 'all' });
    component.instance().handleExpand('vitalPanel', 'vitalsMain');
    component.setState({ expandedPanel: 'test' });
    component.instance().handleExpand('vitalPanel', 'vitalsMain');
    component.setState({ expandedPanel: 'test' });
    component.instance().handleExpand('vitalPanel', 'vitalsCreate');

    // Testing component detail form methods
    expect(component.state().editedPanel).toEqual({});
    component.instance().handleEdit('vitalPanel');
    expect(component.state().editedPanel).toEqual({ vitalPanel: true });
    component.instance().handleVitalDetailCancel('vitalPanel');
    expect(component.state().editedPanel).toEqual({ vitalPanel: false });
    component.instance().handleEdit('vitalPanel');
    component.instance().handleSaveSettingsDetailForm(formValuesEdit, 'vitalPanel');
    expect(component.state().editedPanel).toEqual({ vitalPanel: false });

    // Testing component chartLoad methods
    component.instance().chartLoad(storeResource.patientsVitals[userId])
    component.instance().chartLoad([]);

    // Testing component vitalName methods
    component.instance().getHighlighterClass('respirationRate');

    expect(component).toMatchSnapshot();
  });

  it('should renders correctly with vitalsDetail and testing Create Panel', () => {
    const component = shallow(
      <Vitals
        store={storeWithDetail}
        match={match}
      />, { context }).dive().dive().dive()
      .dive()
      .dive()
      .dive();

    expect(component.find('VitalsListHeader')).toHaveLength(1);
    expect(component.find('VitalsMainPanel')).toHaveLength(1);
    expect(component.find('VitalsDetail')).toHaveLength(0);
    expect(component.find('PluginCreate')).toHaveLength(0);

    // Testing component create panel methods
    component.instance().handleCreate();
    const componentStateAfterMethod = component.state();
    component.setState({ isBtnCreateVisible: false, isCreatePanelVisible: true, openedPanel: 'vitalsCreate', isSecondPanel: true, isDetailPanelVisible: false, isLoading: true, isBtnExpandVisible: false, expandedPanel: 'all', isSubmit: false })
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
      <Vitals
        store={storeWithDetail}
        match={match}
      />, { context }).dive().dive().dive()
      .dive()
      .dive()
      .dive();

    // Testing component hideCreateForm methods
    component.instance().hideCreateForm();
    expect(component.state().isBtnCreateVisible).toEqual(true);
    expect(component.state().isCreatePanelVisible).toEqual(false);
    expect(component.state().openedPanel).toEqual('vitalPanel');
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
    expect(component.state().columnNameSortBy).toEqual(valuesNames.ID);
    expect(component.state().sortingOrder).toEqual('asc');
    component.instance().handleHeaderCellClick({}, { name: valuesNames.NEWS_SCORE, sortingOrder: 'desc' });
    expect(component.state().columnNameSortBy).toEqual(valuesNames.NEWS_SCORE);
    expect(component.state().sortingOrder).toEqual('desc');

    // Testing component handleSetOffset methods
    expect(component.state().offset).toEqual(0);
    component.instance().handleSetOffset(10);
    expect(component.state().offset).toEqual(10);

    // Testing component toggleViewVisibility methods
    expect(component.state().activeView).toEqual('tableNews');
    expect(component.state().isChartOpen).toEqual(false);
    component.instance().toggleViewVisibility('chartNews');
    expect(component.state().isChartOpen).toEqual(true);
    expect(component.state().activeView).toEqual('chartNews');
    component.setState({ activeView: 'tableNews' });
    component.instance().toggleViewVisibility('tableNews');

    expect(component).toMatchSnapshot();
  });

  it('should renders correctly and testing context and lifecycle componentWillReceiveProps', () => {
    const component = shallow(
      <Vitals
        store={storeWithDetail}
        match={match}
      />, { context }).dive().dive().dive()
      .dive()
      .dive()
      .dive();

    component.setProps({ test: 'testing context' });
    component.setContext(contextCreate);
    component.setProps({ test: 'testing create context' });
    component.setContext(contextDetail);
    component.setProps({ test: 'testing edit context' });
    component.setProps({ vitalsDetailFormState: { values: 'test' } });
    component.setProps({ vitalsCreateFormState: { values: 'test' }, vitalsDetailFormState: { values: '' }, vitalDetail: null });
    component.setProps({ vitalsCreateFormState: null, vitalDetail: null });

    expect(component).toMatchSnapshot();
  });

  it('should renders correctly with forms error', () => {
    const component = shallow(
      <Vitals
        store={storeWithFormsError}
        match={match}
      />, { context }).dive().dive().dive()
      .dive()
      .dive()
      .dive();

    component.instance().handleSaveSettingsDetailForm(formValuesEdit, 'vitalPanel');
    component.instance().handleSaveSettingsCreateForm(formValuesCreate);

    expect(component).toMatchSnapshot();
  });

  it('should renders correctly with empty store', () => {
    const component = shallow(
      <Vitals
        store={storeEmpty}
        match={match}
      />, { context }).dive().dive().dive()
      .dive()
      .dive()
      .dive();

    expect(component).toMatchSnapshot();
  });

  it('should renders correctly with all store is empty', () => {
    const component = shallow(
      <Vitals
        store={allStoreEmpty}
        match={match}
      />, { context }).dive().dive().dive()
      .dive()
      .dive()
      .dive();

    expect(component).toMatchSnapshot();
  });
});
