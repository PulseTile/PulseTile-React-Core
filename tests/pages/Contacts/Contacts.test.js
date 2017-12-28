import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import configureStore from 'redux-mock-store';

import Contacts from '../../../src/components/pages/Contacts/Contacts';
import { valuesNames } from '../../../src/components/pages/Contacts/forms.config';

Enzyme.configure({ adapter: new Adapter() });

// frequently used variables
const userId = '9999999000';
const sourceId = 'acb0eaf2-d1df-4c7a-9382-619b31935f2b';

// storage setup in different configurations
const mockStore = configureStore();
const storeResource = {
  patientsContacts: {
    '9999999024': [
      {
        [valuesNames.NAME]: 'Name',
        [valuesNames.REALATIONSHIP]: 'Name',
        [valuesNames.NEXT_OF_KIN]: true,
        [valuesNames.SOURCE]: 'ethercis',
        [valuesNames.SOURCE_ID]: '8f8d258c-9c6d-4b94-94f9-c38c58363bbb',
      },
      {
        [valuesNames.NAME]: 'Name',
        [valuesNames.REALATIONSHIP]: 'Name',
        [valuesNames.SOURCE]: 'ethercis',
        [valuesNames.SOURCE_ID]: '8f8d258c-9c6d-4b94-94f9-c38c58363bbb',
      },
    ],
  },
};
const storeWithFormsError = mockStore(Object.assign({
  contactsDetail: {
    '9999999000': {
      [valuesNames.NAME]: 123458,
      [valuesNames.REALATIONSHIP]: 'Sister',
      [valuesNames.REALATIONSHIP_TYPE]: 'Informal carer',
      [valuesNames.REALATIONSHIP_CODE]: 'at0036',
      [valuesNames.REALATIONSHIP_TERMINOLOGY]: 'local',
      [valuesNames.CONTACT_INFORMATION]: 'test',
      [valuesNames.NEXT_OF_KIN]: 'Yes',
      [valuesNames.NOTES]: 'test',
      [valuesNames.AUTHOR]: 'bob.smith@gmail.com',
      [valuesNames.DATE_CREATED]: 1512579806000,
      [valuesNames.SOURCE]: 'ethercis',
      [valuesNames.SOURCE_ID]: 'e2f4670c-6f7b-477f-b4f8-7a2f98b0f960',
    },
  },
  form: {
    contactsDetailFormSelector: {
      syncErrors: {
        [valuesNames.NAME]: 'You must enter a value.',
        [valuesNames.NOTES]: 'You must enter a value.',
      },
    },
    contactsCreateFormSelector: {
      syncErrors: {
        [valuesNames.NAME]: 'You must enter a value.',
        [valuesNames.NOTES]: 'You must enter a value.',
      },
    },
  },
}, storeResource));
const storeEmpty = mockStore(Object.assign({
  contactsDetail: {
    '9999999000': {},
  },
}, storeResource));
const storeWithDetail = mockStore(Object.assign({
  contactsDetail: {
    '9999999000': {
      [valuesNames.NAME]: 123458,
      [valuesNames.REALATIONSHIP]: 'Sister',
      [valuesNames.REALATIONSHIP_TYPE]: 'Informal carer',
      [valuesNames.REALATIONSHIP_CODE]: 'at0036',
      [valuesNames.REALATIONSHIP_TERMINOLOGY]: 'local',
      [valuesNames.CONTACT_INFORMATION]: 'test',
      [valuesNames.NEXT_OF_KIN]: 'Yes',
      [valuesNames.NOTES]: 'test',
      [valuesNames.AUTHOR]: 'bob.smith@gmail.com',
      [valuesNames.DATE_CREATED]: 1512579806000,
      [valuesNames.SOURCE]: 'ethercis',
      [valuesNames.SOURCE_ID]: 'e2f4670c-6f7b-477f-b4f8-7a2f98b0f960',
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
        pathname: `/patients/${userId}/contacts`,
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
const contextCreate = generateNewContext(context, `/patients/${userId}/contacts/create`);
const contextDetail = generateNewContext(context, `/patients/${userId}/contacts/${sourceId}`);

// configuration of forms for testing methods
const formValuesEdit = {
  [valuesNames.NAME]: '123ABC1',
  [valuesNames.REALATIONSHIP]: 'Father',
  [valuesNames.NEXT_OF_KIN]: true,
  [valuesNames.REALATIONSHIP_CODE]: 'at0038',
  [valuesNames.CONTACT_INFORMATION]: 'ert1rrrrrrrr',
  [valuesNames.NOTES]: 'notesrrrrrr',
  [valuesNames.AUTHOR]: 'bob.smith@gmail.com',
};
const formValuesCreate = {
  [valuesNames.AUTHOR]: 'bob.smith@gmail.com',
  [valuesNames.SOURCE_ID]: '',
  [valuesNames.REALATIONSHIP_CODE]: 'at0039',
  [valuesNames.REALATIONSHIP_TERMINOLOGY]: 'local',
  [valuesNames.NAME]: 'tersw',
  [valuesNames.REALATIONSHIP]: 'Mother',
  [valuesNames.CONTACT_INFORMATION]: 'fafaf',
  [valuesNames.NOTES]: 'afafa',
};
const match = {
  params: {
    userId,
  },
};

describe('Component <Contacts />', () => {
  it('should renders correctly with diagnosisDetail and testing Detail Panel', () => {
    const component = shallow(
      <Contacts
        store={storeWithDetail}
        match={match}
      />, { context }).dive().dive().dive()
      .dive()
      .dive()
      .dive().dive();

    // Testing component handleDetailContactsClick methods
    expect(component.find('PluginListHeader')).toHaveLength(1);
    expect(component.find('PluginMainPanel')).toHaveLength(1);
    expect(component.find('ContactsDetail')).toHaveLength(0);
    expect(component.find('PluginCreate')).toHaveLength(0);

    component.instance().handleDetailContactsClick('065d85e3-3cd5-4604-bb94-5685fffb193d');
    const componentStateAfterMethod = component.state();
    component.setState({ isSecondPanel: true, isDetailPanelVisible: true, isBtnExpandVisible: true, isBtnCreateVisible: true, isCreatePanelVisible: false, openedPanel: 'contactPanel', editedPanel: {}, expandedPanel: 'all', isLoading: true });
    const componentStateAfterSetState = component.state();

    expect(componentStateAfterMethod).toEqual(componentStateAfterSetState);
    expect(component.find('ContactsDetail')).toHaveLength(1);
    expect(component.find('PluginCreate')).toHaveLength(0);
    expect(component).toMatchSnapshot();

    // Testing component handleShow methods
    expect(component.state().openedPanel).toEqual('contactPanel');
    component.instance().handleShow('contactPanel');
    expect(component.state().openedPanel).toEqual('contactPanel');

    // Testing component handleExpand methods
    expect(component.find('PluginListHeader')).toHaveLength(1);
    expect(component.find('PluginMainPanel')).toHaveLength(1);
    expect(component.state().openedPanel).toEqual('contactPanel');
    expect(component.state().expandedPanel).toEqual('all');
    component.instance().handleExpand('contactPanel', 'contactsDetail');
    expect(component.state().openedPanel).toEqual('contactPanel');
    expect(component.state().expandedPanel).toEqual('contactPanel');
    component.setState({ openedPanel: 'contactPanel', expandedPanel: 'contactPanel' });
    expect(component.find('PluginListHeader')).toHaveLength(0);
    expect(component.find('PluginMainPanel')).toHaveLength(0);
    expect(component).toMatchSnapshot();

    component.setState({ openedPanel: 'contactPanel', expandedPanel: 'all' });

    component.instance().handleExpand('contactPanel', 'contactsCreate');
    component.setState({ expandedPanel: 'all' });
    component.instance().handleExpand('contactPanel', 'contactsMain');
    component.setState({ expandedPanel: 'test' });
    component.instance().handleExpand('contactPanel', 'contactsMain');
    component.setState({ expandedPanel: 'test' });
    component.instance().handleExpand('contactPanel', 'contactsCreate');

    // Testing component detail form methods
    expect(component.state().editedPanel).toEqual({});
    component.instance().handleEdit('contactPanel');
    expect(component.state().editedPanel).toEqual({ contactPanel: true });
    component.instance().handleContactDetailCancel('contactPanel');
    expect(component.state().editedPanel).toEqual({ contactPanel: false });
    component.instance().handleEdit('contactPanel');
    component.instance().handleSaveSettingsDetailForm(formValuesEdit, 'contactPanel');
    expect(component.state().editedPanel).toEqual({ contactPanel: false });

    expect(component).toMatchSnapshot();
  });

  it('should renders correctly with contactsDetail and testing Create Panel', () => {
    const component = shallow(
      <Contacts
        store={storeWithDetail}
        match={match}
      />, { context }).dive().dive().dive()
      .dive()
      .dive()
      .dive()
      .dive();

    expect(component.find('PluginListHeader')).toHaveLength(1);
    expect(component.find('PluginMainPanel')).toHaveLength(1);
    expect(component.find('ContactsDetail')).toHaveLength(0);
    expect(component.find('PluginCreate')).toHaveLength(0);

    // Testing component create panel methods
    component.instance().handleCreate();
    const componentStateAfterMethod = component.state();
    component.setState({ isBtnCreateVisible: false, isCreatePanelVisible: true, openedPanel: 'contactsCreate', isSecondPanel: true, isDetailPanelVisible: false, isSubmit: false, isLoading: true });
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
      <Contacts
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
    expect(component.state().openedPanel).toEqual('contactPanel');
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
    component.instance().handleHeaderCellClick({}, { name: 'relationship', sortingOrder: 'desc' });
    expect(component.state().columnNameSortBy).toEqual('relationship');
    expect(component.state().sortingOrder).toEqual('desc');

    // Testing component handleSetOffset methods
    expect(component.state().offset).toEqual(0);
    component.instance().handleSetOffset(10);
    expect(component.state().offset).toEqual(10);

    expect(component).toMatchSnapshot();
  });

  it('should renders correctly and testing context and lifecycle componentWillReceiveProps', () => {
    const component = shallow(
      <Contacts
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
      <Contacts
        store={storeWithFormsError}
        match={match}
      />, { context }).dive().dive().dive()
      .dive()
      .dive()
      .dive()
      .dive();

    component.instance().handleSaveSettingsDetailForm(formValuesEdit, 'contactPanel');
    component.instance().handleSaveSettingsCreateForm(formValuesCreate);

    expect(component).toMatchSnapshot();
  });

  it('should renders correctly with empty store', () => {
    const component = shallow(
      <Contacts
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
