import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import configureStore from 'redux-mock-store';

import TestResults from '../../../src/components/pages/TestResults/TestResults';
import { valuesNames } from '../../../src/components/pages/TestResults/forms.config';

Enzyme.configure({ adapter: new Adapter() });

// frequently used variables
const userId = '9999999000';
const sourceId = 'acb0eaf2-d1df-4c7a-9382-619b31935f2b';

// storage setup in different configurations
const mockStore = configureStore();
const storeResource = {
  patientsTestResults: {
    '9999999024': [
      {
        [valuesNames.DATE]: 1426997462000,
        currentDateConvert: "25-Dec-2017",
        [valuesNames.TAKEN]: 1424556662518,
        sampleTakenConvert: "22-Feb-2015",
        [valuesNames.SOURCE]: "ethercis",
        [valuesNames.SOURCE_ID]: "1d27906b-ebc7-4848-9f1b-73187ee4f72e",
        [valuesNames.NAME]: "Urea, electrolytes and creatinine measurement",
      }, {
        [valuesNames.DATE]: 1439953862000,
        currentDateConvert: "25-Dec-2017",
        [valuesNames.TAKEN]: 1440450662518,
        sampleTakenConvert: "25-Aug-2015",
        [valuesNames.SOURCE]: "ethercis",
        [valuesNames.SOURCE_ID]: "e54ffbfe-969e-4cae-bc5e-4850b298f5a4",
        [valuesNames.NAME]: "complete blood count",
      }
    ],
  },
};

const storeEmpty = mockStore(Object.assign({
  testResultsDetail: {
    '9999999000': {},
  },
}, storeResource));
const storeWithDetail = mockStore(Object.assign({
  testResultsDetail: {
    '9999999000': {
      [valuesNames.AUTHOR]: 'Dr Lab',
      [valuesNames.CONCLUSION]: 'abnormal result indicating infection',
      [valuesNames.DATE]: 1439935862518,
      [valuesNames.TAKEN]: 1440454262518,
      [valuesNames.SOURCE]: 'marand',
      [valuesNames.SOURCE_ID]: 'f6763678-71dc-49c8-b6d1-88a5871a10a6',
      [valuesNames.STATUS]: 'Final',
      [valuesNames.NAME]: 'complete blood count',
      [valuesNames.TR]: [{
        [valuesNames.TR_COMMENT]: 'indicates infection',
        [valuesNames.TR_NORMAL]: ' - ',
        [valuesNames.TR_RESULT]: 'white blood cell count',
        [valuesNames.TR_UNIT]: '10*9/l',
        [valuesNames.TR_VALUE]: '13.6',
      }]
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
        pathname: `/patients/${userId}/results`,
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
const contextDetail = generateNewContext(context, `/patients/${userId}/results/${sourceId}`);

const match = {
  params: {
    userId,
  },
};

describe('Component <TestResults />', () => {
  it('should renders correctly with testResultPanel and testing Detail Panel', () => {
    const component = shallow(
      <TestResults
        store={storeWithDetail}
        match={match}
      />, { context }).dive().dive().dive();

    // Testing component handleDetailTestResultsClick methods
    expect(component.find('PluginListHeader')).toHaveLength(1);
    expect(component.find('PluginMainPanel')).toHaveLength(1);
    expect(component.find('TestResultsDetail')).toHaveLength(0);
    expect(component.find('PluginCreate')).toHaveLength(0);

    component.instance().handleDetailTestResultsClick('065d85e3-3cd5-4604-bb94-5685fffb193d');
    const componentStateAfterMethod = component.state();
    component.setState({ isSecondPanel: true, isDetailPanelVisible: true, isBtnExpandVisible: true, isCreatePanelVisible: false, openedPanel: 'testResultPanel', editedPanel: {}, expandedPanel: 'all', isLoading: true });
    const componentStateAfterSetState = component.state();

    expect(componentStateAfterMethod).toEqual(componentStateAfterSetState);
    expect(component.find('TestResultsDetail')).toHaveLength(1);
    expect(component.find('PluginCreate')).toHaveLength(0);
    expect(component).toMatchSnapshot();

    // Testing component handleExpand methods
    expect(component.find('PluginListHeader')).toHaveLength(1);
    expect(component.find('PluginMainPanel')).toHaveLength(1);
    expect(component.state().openedPanel).toEqual('testResultPanel');
    expect(component.state().expandedPanel).toEqual('all');
    component.instance().handleExpand('testResultPanel', 'testResultsDetail');
    expect(component.state().openedPanel).toEqual('testResultPanel');
    expect(component.state().expandedPanel).toEqual('testResultPanel');
    component.setState({ openedPanel: 'testResultPanel', expandedPanel: 'testResultPanel' });
    expect(component.find('PluginListHeader')).toHaveLength(0);
    expect(component.find('PluginMainPanel')).toHaveLength(0);

    component.instance().handleExpand('testResultsDetail', 'testResultsMain');
    expect(component.state().openedPanel).toEqual('testResultPanel');
    expect(component.state().expandedPanel).toEqual('all');

    component.setState({expandedPanel: 'metaPanel'})
    component.instance().handleExpand('testResultsDetail', 'metaPanel');
    expect(component.state().expandedPanel).toEqual('all');

    component.instance().handleExpand('testResultsDetail', 'testResultsMain');
    expect(component.state().expandedPanel).toEqual('testResultsDetail');

    // component.setState({ openedPanel: 'testResultPanel', expandedPanel: 'testResultPanel' });
    // expect(component.find('PluginListHeader')).toHaveLength(0);
    // expect(component.find('PluginMainPanel')).toHaveLength(0);

    expect(component).toMatchSnapshot();

    // Testing component detail form methods
    expect(component.state().editedPanel).toEqual({});
    component.instance().handleEdit('testResultPanel');
    expect(component.state().editedPanel).toEqual({ testResultPanel: true });
    component.instance().handleTestResultDetailCancel('testResultPanel');
    expect(component.state().editedPanel).toEqual({ testResultPanel: false });
    component.instance().handleEdit('testResultPanel');
    component.instance().handleSaveSettingsDetailForm();
    component.instance().handleCreate();

    expect(component).toMatchSnapshot();
  });

  it('should renders correctly and testing another methods', () => {
    const component = shallow(
      <TestResults
        store={storeWithDetail}
        match={match}
      />, { context }).dive().dive().dive();

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

    // Testing component handleShow methods
    expect(component.state().openedPanel).toEqual('testResultPanel');
    component.instance().handleShow('metaPanel');
    expect(component.state().openedPanel).toEqual('metaPanel');



    expect(component).toMatchSnapshot();
  });

  it('should renders correctly and testing context and lifecycle componentWillReceiveProps', () => {
    const component = shallow(
      <TestResults
        store={storeWithDetail}
        match={match}
      />, { context }).dive().dive().dive();

    component.setProps({ test: 'testing context' });
    component.setContext(contextDetail);
    component.setProps({ test: 'testing edit context' });

    expect(component).toMatchSnapshot();
  });

  it('should renders correctly with empty store', () => {
    const component = shallow(
      <TestResults
        store={storeEmpty}
        match={match}
      />, { context }).dive().dive().dive();

    expect(component).toMatchSnapshot();
  });
});
