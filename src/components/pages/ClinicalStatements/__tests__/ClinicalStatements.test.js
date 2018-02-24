import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import configureStore from 'redux-mock-store';

import ClinicalStatements from '../ClinicalStatements';
import { valuesNames } from '../forms.config';

Enzyme.configure({ adapter: new Adapter() });

// frequently used variables
const userId = '9999999000';
const sourceId = 'acb0eaf2-d1df-4c7a-9382-619b31935f2b';

// storage setup in different configurations
const mockStore = configureStore();
const storeResource = {
  patientsClinicalStatements: {
    '9999999024': [
      {
        [valuesNames.AUTHOR]: 'bob.smith@gmail.com',
        [valuesNames.DATE_CREATED]: 1510224834000,
        [valuesNames.TYPE]: '11',
        [valuesNames.SOURCE]: 'ethercis',
        [valuesNames.SOURCE_ID]: 'd6b4d397-779c-4a4e-b5eb-2084fb11876f',
        dateCreatedConvert: '09-Nov-2017',
      },
      {
        [valuesNames.AUTHOR]: 'bob.smith@gmail.com',
        [valuesNames.DATE_CREATED]: 1510224834000,
        [valuesNames.TYPE]: '11',
        [valuesNames.SOURCE]: 'ethercis',
        [valuesNames.SOURCE_ID]: 'd6b4d397-779c-4a4e-b5eb-2084fb11876f',
        dateCreatedConvert: '09-Nov-2017',
      },
    ],
  },
};
const storeWithFormsError = mockStore(Object.assign({
  clinicalStatementsDetail: {
    '9999999000': {
      [valuesNames.TAGS]: { chestpain: true, shouder: true },
      [valuesNames.STATEMENT]: '<span class="tag" data-tag-id="1519236197404" data-id="7" data-phrase="The pain was mild at |?| in severity" contenteditable="false">The pain was mild at <span class="editable editable-click editable-unsaved editable-empty editable-open" contenteditable="false" data-arr-subject="The pain was mild at " editable-text="" data-arr-unit="?" data-arr-value=" in severity" data-original-title="" title="" style="background-color: rgba(0, 0, 0, 0);" aria-describedby="popover368681">Empty</span><div class="popover editable-container editable-popup fade top in" role="tooltip" id="popover368681" style="top: -74px; left: 12.6719px; display: block;"><div class="arrow" style="left: 50%;"></div><h3 class="popover-title">Edit Text</h3><div class="popover-content"> <div><div class="editableform-loading" style="display: none;"></div><form class="form-inline editableform" style=""><div class="control-group form-group"><div><div class="editable-input" style="position: relative;"><input type="text" class="form-control input-sm" style="padding-right: 24px;"><span class="editable-clear-x" style=""></span></div><div class="editable-buttons"><button type="submit" class="btn btn-primary btn-sm editable-submit"><i class="glyphicon glyphicon-ok"></i></button><button type="button" class="btn btn-default btn-sm editable-cancel"><i class="glyphicon glyphicon-remove"></i></button></div></div><div class="editable-error-block help-block" style="display: none;"></div></div></form></div></div></div> in severity. <a class="remove" contenteditable="false"><i class="fa fa-close" contenteditable="false"></i></a></span> <span id="temp" contenteditable="false"></span>',
      [valuesNames.TYPE]: 'Test name',
      [valuesNames.AUTHOR]: 'bob.smith@gmail.com',
      [valuesNames.DATE_CREATED]: 1519236225009,
      [valuesNames.SOURCE]: 'qewdDB',
      [valuesNames.SOURCE_ID]: 'd9acb27f-6688-4515-ab0a-5db636f36f05',
    },
  },
  form: {
    clinicalStatementsCreateFormSelector: {
      syncErrors: {
        [valuesNames.TYPE]: 'You must enter a value.',
        [valuesNames.NOTE]: 'You must enter a value.',
      },
    },
  },
}, storeResource));
const storeEmpty = mockStore(Object.assign({
  clinicalStatementsDetail: {
    '9999999000': {},
  },
}, storeResource));
const storeWithDetail = mockStore(Object.assign({
  clinicalStatementsDetail: {
    '9999999000': {
      [valuesNames.TAGS]: { chestpain: true },
      [valuesNames.STATEMENT]: 'The pain was mild at 3 in severity',
      [valuesNames.TYPE]: 'Test name',
      [valuesNames.AUTHOR]: 'bob.smith@gmail.com',
      [valuesNames.DATE_CREATED]: 1519236225009,
      [valuesNames.SOURCE]: 'qewdDB',
      [valuesNames.SOURCE_ID]: 'd9acb27f-6688-4515-ab0a-5db636f36f05',
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
        pathname: `/patients/${userId}/clinicalStatements`,
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
const contextCreate = generateNewContext(context, `/patients/${userId}/clinicalStatements/create`);
const contextDetail = generateNewContext(context, `/patients/${userId}/clinicalStatements/${sourceId}`);

// configuration of forms for testing methods
const formValuesEdit = {
  [valuesNames.TYPE]: '2',
  [valuesNames.NOTE]: 2,
  [valuesNames.AUTHOR]: 'bob.smith@gmail.com',
};
const formValuesCreate = {
  [valuesNames.AUTHOR]: 'bob.smith@gmail.com',
  [valuesNames.SOURCE]: 'openehr',
  [valuesNames.TYPE]: 'test',
  [valuesNames.NOTE]: 'test'
};
const match = {
  params: {
    userId,
  },
};

describe('Component <ClinicalStatements />', () => {
  it('should renders correctly with clinicalStatementPanel and testing Detail Panel', () => {
    const component = shallow(
      <ClinicalStatements
        store={storeWithDetail}
        match={match}
      />, { context }).dive().dive().dive().dive().dive();

    // Testing component handleDetailClinicalStatementsClick methods
    expect(component.find('PluginListHeader')).toHaveLength(1);
    expect(component.find('PluginMainPanel')).toHaveLength(1);
    expect(component.find('ClinicalStatementsDetail')).toHaveLength(0);
    expect(component.find('PluginCreate')).toHaveLength(0);

    component.instance().handleDetailClinicalStatementsClick('065d85e3-3cd5-4604-bb94-5685fffb193d');
    const componentStateAfterMethod = component.state();
    component.setState({ isSecondPanel: true, isDetailPanelVisible: true, isBtnExpandVisible: true, isBtnCreateVisible: true, isCreatePanelVisible: false, openedPanel: 'clinicalStatementPanel', editedPanel: {}, expandedPanel: 'all', isLoading: true });
    const componentStateAfterSetState = component.state();

    expect(componentStateAfterMethod).toEqual(componentStateAfterSetState);
    expect(component.find('ClinicalStatementsDetail')).toHaveLength(1);
    expect(component.find('PluginCreate')).toHaveLength(0);
    expect(component).toMatchSnapshot();

    // Testing component handleExpand methods
    expect(component.find('PluginListHeader')).toHaveLength(1);
    expect(component.find('PluginMainPanel')).toHaveLength(1);
    expect(component.state().openedPanel).toEqual('clinicalStatementPanel');
    expect(component.state().expandedPanel).toEqual('all');
    component.instance().handleExpand('clinicalStatementPanel', 'clinicalStatementsDetail');
    expect(component.state().openedPanel).toEqual('clinicalStatementPanel');
    expect(component.state().expandedPanel).toEqual('clinicalStatementPanel');
    component.setState({ openedPanel: 'clinicalStatementPanel', expandedPanel: 'clinicalStatementPanel' });
    expect(component.find('PluginListHeader')).toHaveLength(0);
    expect(component.find('PluginMainPanel')).toHaveLength(0);
    expect(component).toMatchSnapshot();

    component.setState({ openedPanel: 'clinicalStatementPanel', expandedPanel: 'all' });

    component.instance().handleExpand('clinicalStatementPanel', 'clinicalStatementsCreate');
    component.setState({ expandedPanel: 'all' });
    component.instance().handleExpand('clinicalStatementPanel', 'clinicalStatementsMain');
    component.setState({ expandedPanel: 'test' });
    component.instance().handleExpand('clinicalStatementPanel', 'clinicalStatementsMain');
    component.setState({ expandedPanel: 'test' });
    component.instance().handleExpand('clinicalStatementPanel', 'clinicalStatementsCreate');

    // Testing component detail form mock methods
    component.instance().handleEdit();
    component.instance().handleClinicalStatementDetailCancel();
    component.instance().handleSaveSettingsDetailForm();

    expect(component).toMatchSnapshot();
  });

  it('should renders correctly with clinicalStatementsDetail and testing Create Panel', () => {
    const component = shallow(
      <ClinicalStatements
        store={storeWithDetail}
        match={match}
      />, { context }).dive().dive().dive().dive().dive();

    expect(component.find('PluginListHeader')).toHaveLength(1);
    expect(component.find('PluginMainPanel')).toHaveLength(1);
    expect(component.find('ClinicalStatementsDetail')).toHaveLength(0);
    expect(component.find('PluginCreate')).toHaveLength(0);

    // Testing component create panel methods
    component.instance().handleCreate();
    const componentStateAfterMethod = component.state();
    component.setState({ isBtnCreateVisible: false, isCreatePanelVisible: true, openedPanel: 'clinicalStatementsCreate', isSecondPanel: true, isDetailPanelVisible: false, isSubmit: false, isLoading: true });
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
      <ClinicalStatements
        store={storeWithDetail}
        match={match}
      />, { context }).dive().dive().dive().dive().dive();

    // Testing component hideCreateForm methods
    component.instance().hideCreateForm();
    expect(component.state().isBtnCreateVisible).toEqual(true);
    expect(component.state().isCreatePanelVisible).toEqual(false);
    expect(component.state().openedPanel).toEqual('clinicalStatementPanel');
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
    expect(component.state().columnNameSortBy).toEqual('type');
    expect(component.state().sortingOrder).toEqual('asc');
    component.instance().handleHeaderCellClick({}, { name: 'author', sortingOrder: 'desc' });
    expect(component.state().columnNameSortBy).toEqual('author');
    expect(component.state().sortingOrder).toEqual('desc');

    // Testing component handleSetOffset methods
    expect(component.state().offset).toEqual(0);
    component.instance().handleSetOffset(10);
    expect(component.state().offset).toEqual(10);

    expect(component.state().openedPanel).toEqual('clinicalStatementPanel');
    component.instance().handleShow('anotherName');
    expect(component.state().openedPanel).toEqual('anotherName');

    expect(component).toMatchSnapshot();
  });

  it('should renders correctly and testing context and lifecycle componentWillReceiveProps', () => {
    const component = shallow(
      <ClinicalStatements
        store={storeWithDetail}
        match={match}
      />, { context }).dive().dive().dive().dive().dive();

    component.setProps({ test: 'testing context' });
    component.setContext(contextCreate);
    component.setProps({ test: 'testing create context' });
    component.setContext(contextDetail);
    component.setProps({ test: 'testing edit context' });
  });

  it('should renders correctly with forms error', () => {
    const component = shallow(
      <ClinicalStatements
        store={storeWithFormsError}
        match={match}
      />, { context }).dive().dive().dive().dive().dive();

    component.instance().handleSaveSettingsCreateForm(formValuesCreate);

    expect(component).toMatchSnapshot();
  });

  it('should renders correctly with empty store', () => {
    const component = shallow(
      <ClinicalStatements
        store={storeEmpty}
        match={match}
      />, { context }).dive().dive().dive().dive().dive();

    expect(component).toMatchSnapshot();
  });
});
