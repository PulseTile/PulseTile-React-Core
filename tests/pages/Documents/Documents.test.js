import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import configureStore from 'redux-mock-store';

import Documents from '../../../src/components/pages/Documents/Documents';
import { valuesNames } from '../../../src/components/pages/Documents/forms.config';

Enzyme.configure({ adapter: new Adapter() });

// frequently used variables
const userId = '9999999000';
const sourceId = 'acb0eaf2-d1df-4c7a-9382-619b31935f2b';

// storage setup in different configurations
const mockStore = configureStore();
const storeResource = {
  patientsDocuments: {
    '9999999024': [
      {
        [valuesNames.TYPE]: 'Discharge Summary',
        [valuesNames.DATE]: 1426997462000,
        currentDateConvert: "25-Dec-2017",
        [valuesNames.SOURCE]: "ethercis",
        [valuesNames.SOURCE_ID]: "1d27906b-ebc7-4848-9f1b-73187ee4f72e",
      }, {
        [valuesNames.TYPE]: 'Referral Summary',
        [valuesNames.DATE]: 1439953862000,
        currentDateConvert: "25-Dec-2017",
        [valuesNames.SOURCE]: "ethercis",
        [valuesNames.SOURCE_ID]: "e54ffbfe-969e-4cae-bc5e-4850b298f5a4",
      }
    ],
  },
};

const storeEmpty = mockStore(Object.assign({
  documentsDetail: {
    '9999999000': {},
  },
}, storeResource));
const storeWithDetail = mockStore(Object.assign({
  documentsDetail: {
    '9999999000': {
      [valuesNames.TYPE]: 'Discharge Summary',
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
        pathname: `/patients/${userId}/documents`,
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
const contextDetail = generateNewContext(context, `/patients/${userId}/documents/${sourceId}`);

const match = {
  params: {
    userId,
  },
};

describe('Component <Documents />', () => {
  it('should renders correctly with documentPanel and testing Detail Panel', () => {
    const component = shallow(
      <Documents
        store={storeWithDetail}
        match={match}
      />, { context }).dive().dive().dive().dive();

    // Testing component handleDetailDocumentsClick methods
    expect(component.find('PluginListHeader')).toHaveLength(1);
    expect(component.find('PluginMainPanel')).toHaveLength(1);
    expect(component.find('DocumentsDetail')).toHaveLength(0);

    component.instance().handleDetailDocumentsClick('065d85e3-3cd5-4604-bb94-5685fffb193d');
    const componentStateAfterMethod = component.state();
    component.setState({ isSecondPanel: true, isDetailPanelVisible: true, isBtnExpandVisible: true, isCreatePanelVisible: false, openedPanel: 'documentPanel', editedPanel: {}, expandedPanel: 'all', isLoading: true });
    const componentStateAfterSetState = component.state();

    expect(componentStateAfterMethod).toEqual(componentStateAfterSetState);
    expect(component.find('DocumentsDetail')).toHaveLength(1);
    expect(component).toMatchSnapshot();

    // Testing component handleExpand methods
    expect(component.find('PluginListHeader')).toHaveLength(1);
    expect(component.find('PluginMainPanel')).toHaveLength(1);
    expect(component.state().openedPanel).toEqual('documentPanel');
    expect(component.state().expandedPanel).toEqual('all');
    component.instance().handleExpand('documentPanel', 'documentsDetail');
    expect(component.state().openedPanel).toEqual('documentPanel');
    expect(component.state().expandedPanel).toEqual('documentPanel');
    component.setState({ openedPanel: 'documentPanel', expandedPanel: 'documentPanel' });
    expect(component.find('PluginListHeader')).toHaveLength(0);
    expect(component.find('PluginMainPanel')).toHaveLength(0);

    component.instance().handleExpand('documentsDetail', 'documentsMain');
    expect(component.state().openedPanel).toEqual('documentPanel');
    expect(component.state().expandedPanel).toEqual('all');

    component.instance().handleExpand('documentsDetail', 'documentsMain');
    expect(component.state().expandedPanel).toEqual('documentsDetail');
    component.instance().handleExpand('all', 'all');

    expect(component).toMatchSnapshot();

    // Testing component detail form methods
    expect(component.state().editedPanel).toEqual({});
    component.instance().handleEdit('documentPanel');
    expect(component.state().editedPanel).toEqual({ documentPanel: true });
    component.instance().handleDocumentDetailCancel('documentPanel');
    expect(component.state().editedPanel).toEqual({ documentPanel: false });
    component.instance().handleEdit('documentPanel');
    component.instance().handleSaveSettingsDetailForm();
    component.instance().handleCreate();

    component.instance().handleShow('otherPanel');

    expect(component).toMatchSnapshot();
  });

  it('should renders correctly and testing another methods', () => {
    const component = shallow(
      <Documents
        store={storeWithDetail}
        match={match}
      />, { context }).dive().dive().dive().dive();

    // Testing component handleFilterChange methods
    expect(component.state().nameShouldInclude).toEqual('');
    component.instance().handleFilterChange({ target: { value: 'test' } });
    expect(component.state().nameShouldInclude).toEqual('test');
    component.instance().handleFilterChange({ target: { value: '' } });
    expect(component.state().nameShouldInclude).toEqual('');

    // Testing component handleHeaderCellClick methods
    expect(component.state().columnNameSortBy).toEqual('documentType');
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
      <Documents
        store={storeWithDetail}
        match={match}
      />, { context }).dive().dive().dive().dive();

    component.setProps({ test: 'testing context' });
    component.setContext(contextDetail);
    component.setProps({ test: 'testing edit context' });

    expect(component).toMatchSnapshot();
  });

  it('should renders correctly with empty store', () => {
    const component = shallow(
      <Documents
        store={storeEmpty}
        match={match}
      />, { context }).dive().dive().dive().dive();

    expect(component).toMatchSnapshot();
  });
});
