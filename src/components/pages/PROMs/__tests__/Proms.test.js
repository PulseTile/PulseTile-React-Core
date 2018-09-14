import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import configureStore from 'redux-mock-store';

import Proms from '../Proms';
import { valuesNames } from '../forms.config';

Enzyme.configure({ adapter: new Adapter() });

// frequently used variables
const userId = '9999999000';
const sourceId = 'acb0eaf2-d1df-4c7a-9382-619b31935f2b';

// storage setup in different configurations
const mockStore = configureStore();
const storeResource = {
  patientsProms: {
    '9999999000': [
      {
        [valuesNames.NAME]: 'test Proms 1',
        [valuesNames.SCORE]: 9,
        [valuesNames.DATE_CREATED]: 1482170593395,
        [valuesNames.SOURCE]: 'openehr',
        [valuesNames.SOURCE_ID]: 'acb0eaf2-d1df-4c7a-9382-619b31935f2b',
      },
      {
        [valuesNames.NAME]: 'test Proms 2',
        [valuesNames.SCORE]: 3,
        [valuesNames.DATE_CREATED]: 1482190593395,
        [valuesNames.SOURCE]: 'openehr',
        [valuesNames.SOURCE_ID]: 'testSourceID2',
      },
    ],
  },
};
const storeWithFormsError = mockStore(Object.assign({
  promsDetail: {
    '9999999000': {
      [valuesNames.NAME]: 'test Proms 1',
      [valuesNames.RECORDS]: [
        {
          [valuesNames.RECORDS_DATE]: 1482190593395,
          [valuesNames.RECORDS_NAME]: 'test records',
          [valuesNames.SOURCE]: 'test records source',
          [valuesNames.SOURCE_ID]: 'test records sourceId',
          type: 'test records type',
          [valuesNames.RECORDS_TYPE]: 'test records typeTitle',
        },
      ],
      [valuesNames.SCORE]: 9,
      [valuesNames.DATE_CREATED]: 1482170593395,
      [valuesNames.SPECIFIC_Q1]: 'No Pain',
      [valuesNames.SPECIFIC_Q2]: 'No limitations',
      [valuesNames.SPECIFIC_Q3]: 'Around the house',
      [valuesNames.SPECIFIC_Q4]: 'No difficulty',
      [valuesNames.AUTHOR]: 'DR Mary Jones',
      [valuesNames.SOURCE]: 'openehr',
      [valuesNames.SOURCE_ID]: 'testSourceID1',
    },
  },
  form: {
    promsDetailFormSelector: {
      syncErrors: {
        [valuesNames.NAME]: 'You must enter a value.',
        [valuesNames.SCORE]: 'You must enter a value.',
      },
    },
    promsCreateFormSelector: {
      syncErrors: {
        [valuesNames.NAME]: 'You must enter a value.',
        [valuesNames.SCORE]: 'You must enter a value.',
      },
    },
  },
}, storeResource));
const storeEmpty = mockStore(Object.assign({
  promsDetail: {
    '9999999000': {},
  },
}, storeResource));
const storeWithDetail = mockStore(Object.assign({
  promsDetail: {
    '9999999000': {
      [valuesNames.NAME]: 'test Proms 1',
      [valuesNames.RECORDS]: [
        {
          [valuesNames.RECORDS_DATE]: 1482190593395,
          [valuesNames.RECORDS_NAME]: 'test records',
          [valuesNames.SOURCE]: 'test records source',
          [valuesNames.SOURCE_ID]: 'test records sourceId',
          type: 'test records type',
          [valuesNames.RECORDS_TYPE]: 'test records typeTitle',
        },
      ],
      [valuesNames.SCORE]: 9,
      [valuesNames.DATE_CREATED]: 1482170593395,
      [valuesNames.SPECIFIC_Q1]: 'No Pain',
      [valuesNames.SPECIFIC_Q2]: 'No limitations',
      [valuesNames.SPECIFIC_Q3]: 'Around the house',
      [valuesNames.SPECIFIC_Q4]: 'No difficulty',
      [valuesNames.AUTHOR]: 'DR Mary Jones',
      [valuesNames.SOURCE]: 'openehr',
      [valuesNames.SOURCE_ID]: 'testSourceID1',
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
        pathname: `/patients/${userId}/proms`,
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
const contextCreate = generateNewContext(context, `/patients/${userId}/proms/create`);
const contextDetail = generateNewContext(context, `/patients/${userId}/proms/${sourceId}`);

// configuration of forms for testing methods
const formValuesEdit = {
  [valuesNames.TYPE]: '2',
  [valuesNames.NOTES]: 2,
  [valuesNames.AUTHOR]: 'bob.smith@gmail.com',
};
const formValuesCreate = {
  [valuesNames.AUTHOR]: 'DR Mary Jones',
  [valuesNames.SOURCE_ID]: '',
  [valuesNames.NAME]: 'sgs',
  [valuesNames.RECORDS]: [
    {
      [valuesNames.RECORDS_DATE]: 1482190593395,
      [valuesNames.RECORDS_NAME]: 'test records',
      [valuesNames.SOURCE]: 'test records source',
      [valuesNames.SOURCE_ID]: 'test records sourceId',
      type: 'test records type',
      [valuesNames.RECORDS_TYPE]: 'test records typeTitle',
    },
  ],
  [valuesNames.SPECIFIC_Q1]: 'Severe',
  [valuesNames.SPECIFIC_Q2]: 'Occasional limitations',
  [valuesNames.SPECIFIC_Q3]: 'Around the house',
  [valuesNames.SPECIFIC_Q4]: 'Severe difficulty'
};
const match = {
  params: {
    userId,
  },
};

describe('Component <Proms />', () => {
  it('should renders correctly with promPanel and testing Detail Panel', () => {
    const component = shallow(
      <Proms
        store={storeWithDetail}
        match={match}
      />, { context }).dive().dive().dive().dive().dive().dive();

    // Testing component handleDetailPromsClick methods
    expect(component.find('PromsListHeader')).toHaveLength(1);
    expect(component.find('PromsMainPanel')).toHaveLength(1);
    expect(component.find('PromsDetail')).toHaveLength(0);
    expect(component.find('PluginCreate')).toHaveLength(0);

    component.instance().handleDetailPromsClick('065d85e3-3cd5-4604-bb94-5685fffb193d');
    const componentStateAfterMethod = component.state();
    component.setState({ isSecondPanel: true, isDetailPanelVisible: true, isBtnExpandVisible: true, isBtnCreateVisible: true, isCreatePanelVisible: false, openedPanel: 'promPanel', editedPanel: {}, expandedPanel: 'all', isLoading: true });
    const componentStateAfterSetState = component.state();

    expect(componentStateAfterMethod).toEqual(componentStateAfterSetState);
    expect(component.find('PromsDetail')).toHaveLength(1);
    expect(component.find('PluginCreate')).toHaveLength(0);
    expect(component).toMatchSnapshot();

    // Testing component handleExpand methods
    expect(component.find('PromsListHeader')).toHaveLength(1);
    expect(component.find('PromsMainPanel')).toHaveLength(1);
    expect(component.state().openedPanel).toEqual('promPanel');
    expect(component.state().expandedPanel).toEqual('all');
    component.instance().handleExpand('promPanel', 'promsDetail');
    expect(component.state().openedPanel).toEqual('promPanel');
    expect(component.state().expandedPanel).toEqual('promPanel');
    component.setState({ openedPanel: 'promPanel', expandedPanel: 'promPanel' });
    expect(component.find('PromsListHeader')).toHaveLength(0);
    expect(component.find('PromsMainPanel')).toHaveLength(0);
    expect(component).toMatchSnapshot();

    component.setState({ openedPanel: 'promPanel', expandedPanel: 'all' });

    component.instance().handleExpand('promPanel', 'promsCreate');
    component.setState({ expandedPanel: 'all' });
    component.instance().handleExpand('promPanel', 'promsMain');
    component.setState({ expandedPanel: 'test' });
    component.instance().handleExpand('promPanel', 'promsMain');
    component.setState({ expandedPanel: 'test' });
    component.instance().handleExpand('promPanel', 'promsCreate');

    // Testing component detail form methods
    expect(component.state().editedPanel).toEqual({});
    component.instance().handleEdit('promPanel');
    expect(component.state().editedPanel).toEqual({ promPanel: true });
    component.instance().handlePromDetailCancel('promPanel');
    expect(component.state().editedPanel).toEqual({ promPanel: false });
    component.instance().handleEdit('promPanel');
    component.instance().handleSaveSettingsDetailForm(formValuesEdit, 'promPanel');
    expect(component.state().editedPanel).toEqual({ promPanel: false });

    // Testing component chartLoad methods
    component.instance().chartLoad(storeResource.patientsProms[userId]);
    component.instance().chartLoad([]);

    // Testing component changeScoreStatus methods
    component.instance().changeScoreStatus(2);
    expect(component.state().scoreStatus).toEqual('success');
    component.instance().changeScoreStatus(9);
    expect(component.state().scoreStatus).toEqual('danger');

    // Testing component toggleViewVisibility methods
    expect(component.state().activeView).toEqual('tableNews');
    component.instance().toggleViewVisibility('chartNews');
    expect(component.state().activeView).toEqual('chartNews');
    component.setState({ activeView: 'tableNews' });
    component.instance().toggleViewVisibility('tableNews');

    // Testing component modificateProms methods
    component.instance().modificateProms([]);

    expect(component).toMatchSnapshot();
  });

  it('should renders correctly with promsDetail and testing Create Panel', () => {
    const component = shallow(
      <Proms
        store={storeWithDetail}
        match={match}
      />, { context }).dive().dive().dive().dive().dive().dive();

    expect(component.find('PromsListHeader')).toHaveLength(1);
    expect(component.find('PromsMainPanel')).toHaveLength(1);
    expect(component.find('PromsDetail')).toHaveLength(0);
    expect(component.find('PluginCreate')).toHaveLength(0);

    // Testing component create panel methods
    component.instance().handleCreate();
    const componentStateAfterMethod = component.state();
    component.setState({ isBtnCreateVisible: false, isCreatePanelVisible: true, openedPanel: 'promsCreate', isSecondPanel: true, isDetailPanelVisible: false, isSubmit: false, isLoading: true });
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
      <Proms
        store={storeWithDetail}
        match={match}
      />, { context }).dive().dive().dive() .dive().dive().dive();

    // Testing component hideCreateForm methods
    component.instance().hideCreateForm();
    expect(component.state().isBtnCreateVisible).toEqual(true);
    expect(component.state().isCreatePanelVisible).toEqual(false);
    expect(component.state().openedPanel).toEqual('promPanel');
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
    component.instance().handleHeaderCellClick({}, { name: 'score', sortingOrder: 'desc' });
    expect(component.state().columnNameSortBy).toEqual('score');
    expect(component.state().sortingOrder).toEqual('desc');

    // Testing component handleSetOffset methods
    expect(component.state().offset).toEqual(0);
    component.instance().handleSetOffset(10);
    expect(component.state().offset).toEqual(10);

    expect(component).toMatchSnapshot();
  });

  it('should renders correctly and testing context and lifecycle componentWillReceiveProps', () => {
    const component = shallow(
      <Proms
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
      <Proms
        store={storeWithFormsError}
        match={match}
      />, { context }).dive().dive().dive().dive().dive().dive();

    component.instance().handleSaveSettingsDetailForm(formValuesEdit, 'promPanel');
    component.instance().handleSaveSettingsCreateForm(formValuesCreate);

    expect(component).toMatchSnapshot();
  });

  it('should renders correctly with empty store', () => {
    const component = shallow(
      <Proms
        store={storeEmpty}
        match={match}
      />, { context }).dive().dive().dive().dive().dive().dive();

    expect(component).toMatchSnapshot();
  });
});
