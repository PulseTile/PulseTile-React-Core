import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import configureStore from 'redux-mock-store';

import MDTs from '../../../src/components/pages/MDTs/MDTs';
import { valuesNames } from '../../../src/components/pages/MDTs/forms.config';

Enzyme.configure({ adapter: new Adapter() });

// frequently used variables
const userId = '9999999000';
const sourceId = 'acb0eaf2-d1df-4c7a-9382-619b31935f2b';

// storage setup in different configurations
const mockStore = configureStore();
const storeResource = {
  patientsMDTs: {
    '9999999024': [
      {
        [valuesNames.TEAM]: 'MDT Prostate Cancer team',
        [valuesNames.DATE_OF_REQUEST]: 1482170593395,
        [valuesNames.DATE_OF_MEETING]: 1456258262000,
        [valuesNames.SOURCE]: 'ethercis',
        [valuesNames.SOURCE_ID]: '9b65f23b-91fe-4a5e-ac1e-59f1e023e276',
        dateOfRequestConvert: '19-Dec-2016',
        dateOfMeetingConvert: '23-Feb-2016',
      },
    ],
  },
};
const storeWithFormsError = mockStore(Object.assign({
  mdtsDetail: {
    '9999999000': {
      [valuesNames.TEAM]: 'MDT Prostate Cancer team',
      [valuesNames.DATE_OF_REQUEST]: 1482170593395,
      [valuesNames.DATE_OF_MEETING]: 1456258262000,
      [valuesNames.TIME_OF_MEETING]: 72662000,
      [valuesNames.LINK]: '',
      [valuesNames.QUESTION]: 'Increasing back pain',
      [valuesNames.NOTES]: 'Investigations normal. Review in 3 weeks',
      [valuesNames.SOURCE]: 'ethercis',
      [valuesNames.SOURCE_ID]: '94133578-f505-4e76-b4ed-762462508801',
    },
  },
  form: {
    mdtsPanelFormSelector: {
      syncErrors: {
        [valuesNames.TEAM]: 'You must enter a value.',
        [valuesNames.QUESTION]: 'You must enter a value.',
      },
    },
    mdtsCreateFormSelector: {
      syncErrors: {
        [valuesNames.TEAM]: 'You must enter a value.',
        [valuesNames.QUESTION]: 'You must enter a value.',
      },
    },
  },
}, storeResource));
const storeEmpty = mockStore(Object.assign({
  mdtsDetail: {
    '9999999000': {},
  },
}, storeResource));
const storeWithDetail = mockStore(Object.assign({
  mdtsDetail: {
    '9999999000': {
      [valuesNames.TEAM]: 'MDT Prostate Cancer team',
      [valuesNames.DATE_OF_REQUEST]: 1482170593395,
      [valuesNames.DATE_OF_MEETING]: 1456258262000,
      [valuesNames.TIME_OF_MEETING]: 72662000,
      [valuesNames.LINK]: '',
      [valuesNames.QUESTION]: 'Increasing back pain',
      [valuesNames.NOTES]: 'Investigations normal. Review in 3 weeks',
      [valuesNames.SOURCE]: 'ethercis',
      [valuesNames.SOURCE_ID]: '94133578-f505-4e76-b4ed-762462508801',
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
        pathname: `/patients/${userId}/mdt`,
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
const contextCreate = generateNewContext(context, `/patients/${userId}/mdt/create`);
const contextDetail = generateNewContext(context, `/patients/${userId}/mdt/${sourceId}`);

// configuration of forms for testing methods
const formValuesEdit = {
  [valuesNames.TEAM]: 'test',
  [valuesNames.LINK]: 'test',
  [valuesNames.QUESTION]: 'Increasing back pain',
  [valuesNames.NOTES]: 'Investigations normal. Review in 3 weeks',
  [valuesNames.DATE_OF_REQUEST]: 1482170593395,
  [valuesNames.DATE_OF_MEETING]: 1456287062000,
};
const formValuesCreate = {
  [valuesNames.AUTHOR]: 'bob.smith@gmail.com',
  [valuesNames.SOURCE]: 'openehr',
  [valuesNames.TEAM]: 'test',
  [valuesNames.DATE_OF_REQUEST]: '13-Dec-2017',
  [valuesNames.DATE_OF_MEETING]: '22-Dec-2017',
  [valuesNames.LINK]: 'test',
  [valuesNames.QUESTION]: 'test',
  [valuesNames.NOTES]: 'test'
};
const match = {
  params: {
    userId,
  },
};

describe('Component <MDTs />', () => {
  it('should renders correctly with mdtsPanel and testing Detail Panel', () => {
    const component = shallow(
      <MDTs
        store={storeWithDetail}
        match={match}
      />, { context }).dive().dive().dive()
      .dive()
      .dive()
      .dive();

    // Testing component handleDetailMDTsClick methods
    expect(component.find('PluginListHeader')).toHaveLength(1);
    expect(component.find('PluginMainPanel')).toHaveLength(1);
    expect(component.find('MDTsDetail')).toHaveLength(0);
    expect(component.find('PluginCreate')).toHaveLength(0);

    component.instance().handleDetailMDTsClick('065d85e3-3cd5-4604-bb94-5685fffb193d');
    const componentStateAfterMethod = component.state();
    component.setState({ isSecondPanel: true, isDetailPanelVisible: true, isBtnExpandVisible: true, isBtnCreateVisible: true, isCreatePanelVisible: false, openedPanel: 'mdtsPanel', editedPanel: {}, expandedPanel: 'all', isLoading: true });
    const componentStateAfterSetState = component.state();

    expect(componentStateAfterMethod).toEqual(componentStateAfterSetState);
    expect(component.find('MDTsDetail')).toHaveLength(1);
    expect(component.find('PluginCreate')).toHaveLength(0);
    expect(component).toMatchSnapshot();

    // Testing component handleExpand methods
    expect(component.find('PluginListHeader')).toHaveLength(1);
    expect(component.find('PluginMainPanel')).toHaveLength(1);
    expect(component.state().openedPanel).toEqual('mdtsPanel');
    expect(component.state().expandedPanel).toEqual('all');
    component.instance().handleExpand('mdtsPanel', 'mdtsDetail');
    expect(component.state().openedPanel).toEqual('mdtsPanel');
    expect(component.state().expandedPanel).toEqual('mdtsPanel');
    component.setState({ openedPanel: 'mdtsPanel', expandedPanel: 'mdtsPanel' });
    expect(component.find('PluginListHeader')).toHaveLength(0);
    expect(component.find('PluginMainPanel')).toHaveLength(0);
    expect(component).toMatchSnapshot();

    component.setState({ openedPanel: 'mdtsPanel', expandedPanel: 'all' });

    component.instance().handleExpand('mdtsPanel', 'mdtsCreate');
    component.setState({ expandedPanel: 'all' });
    component.instance().handleExpand('mdtsPanel', 'mdtsMain');
    component.setState({ expandedPanel: 'test' });
    component.instance().handleExpand('mdtsPanel', 'mdtsMain');
    component.setState({ expandedPanel: 'test' });
    component.instance().handleExpand('mdtsPanel', 'mdtsCreate');

    // Testing component detail form methods
    expect(component.state().editedPanel).toEqual({});
    component.instance().handleEdit('mdtsPanel');
    expect(component.state().editedPanel).toEqual({ mdtsPanel: true });
    component.instance().handleMDTsDetailCancel('mdtsPanel');
    expect(component.state().editedPanel).toEqual({ mdtsPanel: false });
    component.instance().handleEdit('mdtsPanel');
    component.instance().handleSaveSettingsDetailForm(formValuesEdit, 'mdtsPanel');
    expect(component.state().editedPanel).toEqual({ mdtsPanel: false });

    expect(component).toMatchSnapshot();
  });

  it('should renders correctly with mdtsDetail and testing Create Panel', () => {
    const component = shallow(
      <MDTs
        store={storeWithDetail}
        match={match}
      />, { context }).dive().dive().dive()
      .dive()
      .dive()
      .dive();

    expect(component.find('PluginListHeader')).toHaveLength(1);
    expect(component.find('PluginMainPanel')).toHaveLength(1);
    expect(component.find('MDTsDetail')).toHaveLength(0);
    expect(component.find('PluginCreate')).toHaveLength(0);

    // Testing component create panel methods
    component.instance().handleCreate();
    const componentStateAfterMethod = component.state();
    component.setState({ isBtnCreateVisible: false, isCreatePanelVisible: true, openedPanel: 'mdtsCreate', isSecondPanel: true, isDetailPanelVisible: false, isBtnExpandVisible: true, expandedPanel: 'all', isSubmit: false, isLoading: true })
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
      <MDTs
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
    expect(component.state().openedPanel).toEqual('mdtsPanel');
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
    expect(component.state().columnNameSortBy).toEqual('dateOfRequest');
    expect(component.state().sortingOrder).toEqual('asc');
    component.instance().handleHeaderCellClick({}, { name: 'serviceTeam', sortingOrder: 'desc' });
    expect(component.state().columnNameSortBy).toEqual('serviceTeam');
    expect(component.state().sortingOrder).toEqual('desc');

    // Testing component handleSetOffset methods
    expect(component.state().offset).toEqual(0);
    component.instance().handleSetOffset(10);
    expect(component.state().offset).toEqual(10);

    expect(component).toMatchSnapshot();
  });

  it('should renders correctly and testing context and lifecycle componentWillReceiveProps', () => {
    const component = shallow(
      <MDTs
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

    expect(component).toMatchSnapshot();
  });

  it('should renders correctly with forms error', () => {
    const component = shallow(
      <MDTs
        store={storeWithFormsError}
        match={match}
      />, { context }).dive().dive().dive()
      .dive()
      .dive()
      .dive();

    component.instance().handleSaveSettingsDetailForm(formValuesEdit, 'mdtsPanel');
    component.instance().handleSaveSettingsCreateForm(formValuesCreate);

    expect(component).toMatchSnapshot();
  });

  it('should renders correctly with empty store', () => {
    const component = shallow(
      <MDTs
        store={storeEmpty}
        match={match}
      />, { context }).dive().dive().dive()
      .dive()
      .dive()
      .dive();

    expect(component).toMatchSnapshot();
  });
});
