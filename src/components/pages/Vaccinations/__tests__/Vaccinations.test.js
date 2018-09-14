import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import configureStore from 'redux-mock-store';

import Vaccinations from '../Vaccinations';
import { valuesNames } from '../forms.config';

Enzyme.configure({ adapter: new Adapter() });

// frequently used variables
const userId = '9999999000';
const sourceId = 'acb0eaf2-d1df-4c7a-9382-619b31935f2b';

// storage setup in different configurations
const mockStore = configureStore();
const storeResource = {
  patientsVaccinations: {
    '9999999024': [
      {
        [valuesNames.NAME]: "Name",
        [valuesNames.DATE]: 1510226572000,
        dateCreatedConvert: "09-Nov-2017",
        [valuesNames.SOURCE]: "ethercis",
        [valuesNames.SOURCE_ID]: "c4f21587-e8d3-47c1-8560-33a302f163c5",
      }, {
        [valuesNames.NAME]: "Vaccination Name",
        [valuesNames.DATE]: 1510226609000,
        dateCreatedConvert: "09-Nov-2017",
        [valuesNames.SOURCE]: "ethercis",
        [valuesNames.SOURCE_ID]: "cab9b3f8-f815-4b12-8421-b09f680f2e4c",
      }
    ],
  },
};

const storeWithFormsError = mockStore(Object.assign({
  vaccinationsDetail: {
    '9999999000': {
      [valuesNames.NAME]: '1',
      [valuesNames.COMMENT]: 'twest',
      [valuesNames.SERIES_NUMBER]: '1',
      [valuesNames.SOURCE]: 'ethercis',
      [valuesNames.SOURCE_ID]: 'b9ececa8-4e84-4229-8ee3-1fa0bc8519a2',
      [valuesNames.DATE_TIME]: 1510437600000,
      [valuesNames.DATE]: 1511434248000,
      [valuesNames.AUTHOR]: 'Dr Tony Shannon',
    },
  },
  form: {
    vaccinationsPanelFormSelector: {
      syncErrors: {
        [valuesNames.NAME]: 'You must enter a value.',
        [valuesNames.DATE_TIME]: 'You must enter a value.',
        [valuesNames.SERIES_NUMBER]: 'You must enter a value.',
        [valuesNames.COMMENT]: 'You must enter a value.',
        [valuesNames.SERIES_NUMBER]: 'You must enter a value.',
      },
    },
    vaccinationsCreateFormSelector: {
      syncErrors: {
        [valuesNames.NAME]: 'You must enter a value.',
        [valuesNames.DATE_TIME]: 'You must enter a value.',
        [valuesNames.SERIES_NUMBER]: 'You must enter a value.',
        [valuesNames.COMMENT]: 'You must enter a value.',
        [valuesNames.SERIES_NUMBER]: 'You must enter a value.',
      },
    },
  },
}, storeResource));
const storeEmpty = mockStore(Object.assign({
  vaccinationsDetail: {
    '9999999000': {},
  },
}, storeResource));
const storeWithDetail = mockStore(Object.assign({
  vaccinationsDetail: {
    '9999999000': {
      [valuesNames.NAME]: '1',
      [valuesNames.COMMENT]: 'twest',
      [valuesNames.SERIES_NUMBER]: '1',
      [valuesNames.SOURCE]: 'ethercis',
      [valuesNames.SOURCE_ID]: 'b9ececa8-4e84-4229-8ee3-1fa0bc8519a2',
      [valuesNames.DATE_TIME]: 1510437600000,
      [valuesNames.DATE]: 1511434248000,
      [valuesNames.AUTHOR]: 'Dr Tony Shannon',
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
        pathname: `/patients/${userId}/vaccinations`,
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
const contextCreate = generateNewContext(context, `/patients/${userId}/vaccinations/create`);
const contextDetail = generateNewContext(context, `/patients/${userId}/vaccinations/${sourceId}`);

// configuration of forms for testing methods
const formValuesEdit = {
  [valuesNames.NAME]: 'Test name',
  [valuesNames.COMMENT]: 'Test comment',
  [valuesNames.SERIES_NUMBER]: '132',
  [valuesNames.SOURCE]: 'ethercis',
  [valuesNames.SOURCE_ID]: 'b9ececa8-4e84-4229-8ee3-1fa0bc8519a2',
  [valuesNames.DATE_TIME]: 1510437600000,
  [valuesNames.AUTHOR]: 'Dr Tony Shannon',
};
const formValuesCreate = {
  [valuesNames.NAME]: 'Test 2 name',
  [valuesNames.COMMENT]: 'Test 2 comment',
  [valuesNames.SERIES_NUMBER]: 'number',
  [valuesNames.SOURCE]: 'marando',
  [valuesNames.DATE_TIME]: 1511434248000,
  [valuesNames.AUTHOR]: 'bob.smith@gmail.com',
};
const match = {
  params: {
    userId,
  },
};

describe('Component <Vaccinations />', () => {
  it('should renders correctly with vaccinationsPanel and testing Detail Panel', () => {
    const component = shallow(
      <Vaccinations
        store={storeWithDetail}
        match={match}
      />, { context }).dive().dive().dive().dive().dive().dive();

    // Testing component handleDetailVaccinationsClick methods
    expect(component.find('PluginListHeader')).toHaveLength(1);
    expect(component.find('PluginMainPanel')).toHaveLength(1);
    expect(component.find('VaccinationDetail')).toHaveLength(0);
    expect(component.find('PluginCreate')).toHaveLength(0);

    component.instance().handleDetailVaccinationsClick('065d85e3-3cd5-4604-bb94-5685fffb193d');
    const componentStateAfterMethod = component.state();
    component.setState({ isSecondPanel: true, isDetailPanelVisible: true, isBtnExpandVisible: true, isBtnCreateVisible: true, isCreatePanelVisible: false, openedPanel: 'vaccinationsPanel', editedPanel: {}, expandedPanel: 'all', isLoading: true });
    const componentStateAfterSetState = component.state();

    expect(componentStateAfterMethod).toEqual(componentStateAfterSetState);
    expect(component.find('VaccinationDetail')).toHaveLength(1);
    expect(component.find('PluginCreate')).toHaveLength(0);
    expect(component).toMatchSnapshot();

    // Testing component handleExpand methods
    expect(component.find('PluginListHeader')).toHaveLength(1);
    expect(component.find('PluginMainPanel')).toHaveLength(1);
    expect(component.state().openedPanel).toEqual('vaccinationsPanel');
    expect(component.state().expandedPanel).toEqual('all');
    component.instance().handleExpand('vaccinationsPanel', 'vaccinationsDetail');
    expect(component.state().openedPanel).toEqual('vaccinationsPanel');
    expect(component.state().expandedPanel).toEqual('vaccinationsPanel');
    component.setState({ openedPanel: 'vaccinationsPanel', expandedPanel: 'vaccinationsPanel' });
    expect(component.find('PluginListHeader')).toHaveLength(0);
    expect(component.find('PluginMainPanel')).toHaveLength(0);
    expect(component).toMatchSnapshot();

    component.setState({ openedPanel: 'vaccinationsPanel', expandedPanel: 'all' });

    component.instance().handleExpand('vaccinationsPanel', 'vaccinationsCreate');
    component.setState({ expandedPanel: 'all' });
    component.instance().handleExpand('vaccinationsPanel', 'vaccinationsMain');
    component.setState({ expandedPanel: 'test' });
    component.instance().handleExpand('vaccinationsPanel', 'vaccinationsMain');
    component.setState({ expandedPanel: 'test' });
    component.instance().handleExpand('vaccinationsPanel', 'vaccinationsCreate');

    // Testing component detail form methods
    expect(component.state().editedPanel).toEqual({});
    component.instance().handleEdit('vaccinationsPanel');
    expect(component.state().editedPanel).toEqual({ vaccinationsPanel: true });
    component.instance().handleVaccinationDetailCancel('vaccinationsPanel');
    expect(component.state().editedPanel).toEqual({ vaccinationsPanel: false });
    component.instance().handleEdit('vaccinationsPanel');
    component.instance().handleSaveSettingsDetailForm(formValuesEdit, 'vaccinationsPanel');
    expect(component.state().editedPanel).toEqual({ vaccinationsPanel: false });

    expect(component).toMatchSnapshot();
  });

  it('should renders correctly with vaccinationsDetail and testing Create Panel', () => {
    const component = shallow(
      <Vaccinations
        store={storeWithDetail}
        match={match}
      />, { context }).dive().dive().dive().dive().dive().dive();

    expect(component.find('PluginListHeader')).toHaveLength(1);
    expect(component.find('PluginMainPanel')).toHaveLength(1);
    expect(component.find('VaccinationDetail')).toHaveLength(0);
    expect(component.find('PluginCreate')).toHaveLength(0);

    // Testing component create panel methods
    component.instance().handleCreate();
    const componentStateAfterMethod = component.state();
    component.setState({ isBtnCreateVisible: false, isCreatePanelVisible: true, openedPanel: 'vaccinationsCreate', isSecondPanel: true, isDetailPanelVisible: false, isSubmit: false, isLoading: true });
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
      <Vaccinations
        store={storeWithDetail}
        match={match}
      />, { context }).dive().dive().dive() .dive().dive().dive();

    // Testing component hideCreateForm methods
    component.instance().hideCreateForm();
    expect(component.state().isBtnCreateVisible).toEqual(true);
    expect(component.state().isCreatePanelVisible).toEqual(false);
    expect(component.state().openedPanel).toEqual('vaccinationsPanel');
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
      <Vaccinations
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
      <Vaccinations
        store={storeWithFormsError}
        match={match}
      />, { context }).dive().dive().dive().dive().dive().dive();

    component.instance().handleSaveSettingsDetailForm(formValuesEdit, 'vaccinationsPanel');
    component.instance().handleSaveSettingsCreateForm(formValuesCreate);

    expect(component).toMatchSnapshot();
  });

  it('should renders correctly with empty store', () => {
    const component = shallow(
      <Vaccinations
        store={storeEmpty}
        match={match}
      />, { context }).dive().dive().dive().dive().dive().dive();

    expect(component).toMatchSnapshot();
  });
});
