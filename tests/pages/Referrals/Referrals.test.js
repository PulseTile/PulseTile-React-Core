import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import configureStore from 'redux-mock-store';

import Referrals from '../../../src/components/pages/Referrals/Referrals';
import { valuesNames } from '../../../src/components/pages/Referrals/forms.config';

Enzyme.configure({ adapter: new Adapter() });

// frequently used variables
const userId = '9999999000';
const sourceId = 'acb0eaf2-d1df-4c7a-9382-619b31935f2b';

// storage setup in different configurations
const mockStore = configureStore();
const storeResource = {
  patientsReferrals: {
    '9999999024': [
      {
        [valuesNames.DATE]: 1511283530634,
        [valuesNames.FROM]: 'Tony Shannon1',
        [valuesNames.TO]: 'Ripplefields Optometry service',
        [valuesNames.SOURCE]: 'ethercis',
        [valuesNames.SOURCE_ID]: '94133578-f505-4e76-b4ed-762462508801',
        dateOfReferralConvert: '21-Nov-2017',
      },
    ],
  },
};
const storeWithFormsError = mockStore(Object.assign({
  referralsDetail: {
    '9999999000': {
      [valuesNames.TYPE]: 'Referral To',
      [valuesNames.REASON]: 'Deteriorating vision',
      [valuesNames.SUMMARY]: 'Long-standing impaired visual acuity - getting much worse',
      [valuesNames.FROM]: 'Tony Shannon1',
      [valuesNames.TO]: 'Ripplefields Optometry service',
      [valuesNames.REF]: '',
      [valuesNames.OUTCOME]: '',
      [valuesNames.STATE_DATE]: 1511283530634,
      [valuesNames.STATE]: 'planned',
      [valuesNames.STATE_CODE]: 526,
      [valuesNames.CARE_FLOW]: 'Service request sent',
      [valuesNames.SERVICE]: 'Referral To',
      [valuesNames.AUTHOR]: 'Dr Tony Shannon',
      [valuesNames.DATE]: 1511283530634,
      [valuesNames.DATE_CREATED]: 1511283530000,
      [valuesNames.SOURCE]: 'ethercis',
      [valuesNames.SOURCE_ID]: '94133578-f505-4e76-b4ed-762462508801',
    },
  },
  form: {
    referralsDetailFormSelector: {
      syncErrors: {
        [valuesNames.FROM]: 'You must enter a value.',
        [valuesNames.TO]: 'You must enter a value.',
      },
    },
    referralsCreateFormSelector: {
      syncErrors: {
        [valuesNames.FROM]: 'You must enter a value.',
        [valuesNames.TO]: 'You must enter a value.',
      },
    },
  },
}, storeResource));
const storeEmpty = mockStore(Object.assign({
  referralsDetail: {
    '9999999000': {},
  },
}, storeResource));
const storeWithDetail = mockStore(Object.assign({
  referralsDetail: {
    '9999999000': {
      [valuesNames.TYPE]: 'Referral To',
      [valuesNames.REASON]: 'Deteriorating vision',
      [valuesNames.SUMMARY]: 'Long-standing impaired visual acuity - getting much worse',
      [valuesNames.FROM]: 'Tony Shannon1',
      [valuesNames.TO]: 'Ripplefields Optometry service',
      [valuesNames.REF]: '',
      [valuesNames.OUTCOME]: '',
      [valuesNames.STATE_DATE]: 1511283530634,
      [valuesNames.STATE]: 'planned',
      [valuesNames.STATE_CODE]: 526,
      [valuesNames.CARE_FLOW]: 'Service request sent',
      [valuesNames.SERVICE]: 'Referral To',
      [valuesNames.AUTHOR]: 'Dr Tony Shannon',
      [valuesNames.DATE]: 1511283530634,
      [valuesNames.DATE_CREATED]: 1511283530000,
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
        pathname: `/patients/${userId}/referrals`,
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
const contextCreate = generateNewContext(context, `/patients/${userId}/referrals/create`);
const contextDetail = generateNewContext(context, `/patients/${userId}/referrals/${sourceId}`);

// configuration of forms for testing methods
const formValuesEdit = {
  [valuesNames.FROM]: 'test',
  [valuesNames.TO]: 'test',
  [valuesNames.DATE]: 1511196789986,
  [valuesNames.REASON]: 'test',
  [valuesNames.SUMMARY]: 'test',
};
const formValuesCreate = {
  [valuesNames.AUTHOR]: 'bob.smith@gmail.com',
  [valuesNames.SOURCE_ID]: '',
  [valuesNames.FROM]: 'test',
  [valuesNames.TO]: 'test',
  [valuesNames.DATE]: '21-Dec-2017',
  [valuesNames.REASON]: 'test',
  [valuesNames.SUMMARY]: 'test',
};
const match = {
  params: {
    userId,
  },
};

describe('Component <Referrals />', () => {
  it('should renders correctly with referralPanel and testing Detail Panel', () => {
    const component = shallow(
      <Referrals
        store={storeWithDetail}
        match={match}
      />, { context }).dive().dive().dive()
      .dive()
      .dive()
      .dive();

    // Testing component handleDetailReferralsClick methods
    expect(component.find('PluginListHeader')).toHaveLength(1);
    expect(component.find('PluginMainPanel')).toHaveLength(1);
    expect(component.find('ReferralsDetail')).toHaveLength(0);
    expect(component.find('PluginCreate')).toHaveLength(0);

    component.instance().handleDetailReferralsClick('065d85e3-3cd5-4604-bb94-5685fffb193d');
    const componentStateAfterMethod = component.state();
    component.setState({ isSecondPanel: true, isDetailPanelVisible: true, isBtnExpandVisible: true, isBtnCreateVisible: true, isCreatePanelVisible: false, openedPanel: 'referralPanel', editedPanel: {}, expandedPanel: 'all', isLoading: true });
    const componentStateAfterSetState = component.state();

    expect(componentStateAfterMethod).toEqual(componentStateAfterSetState);
    expect(component.find('ReferralsDetail')).toHaveLength(1);
    expect(component.find('PluginCreate')).toHaveLength(0);
    expect(component).toMatchSnapshot();

    // Testing component handleExpand methods
    expect(component.find('PluginListHeader')).toHaveLength(1);
    expect(component.find('PluginMainPanel')).toHaveLength(1);
    expect(component.state().openedPanel).toEqual('referralPanel');
    expect(component.state().expandedPanel).toEqual('all');
    component.instance().handleExpand('referralPanel', 'referralsDetail');
    expect(component.state().openedPanel).toEqual('referralPanel');
    expect(component.state().expandedPanel).toEqual('referralPanel');
    component.setState({ openedPanel: 'referralPanel', expandedPanel: 'referralPanel' });
    expect(component.find('PluginListHeader')).toHaveLength(0);
    expect(component.find('PluginMainPanel')).toHaveLength(0);
    expect(component).toMatchSnapshot();

    component.setState({ openedPanel: 'referralPanel', expandedPanel: 'all' });

    component.instance().handleExpand('referralPanel', 'referralsCreate');
    component.setState({ expandedPanel: 'all' });
    component.instance().handleExpand('referralPanel', 'referralsMain');
    component.setState({ expandedPanel: 'test' });
    component.instance().handleExpand('referralPanel', 'referralsMain');
    component.setState({ expandedPanel: 'test' });
    component.instance().handleExpand('referralPanel', 'referralsCreate');

    // Testing component detail form methods
    expect(component.state().editedPanel).toEqual({});
    component.instance().handleEdit('referralPanel');
    expect(component.state().editedPanel).toEqual({ referralPanel: true });
    component.instance().handleReferralDetailCancel('referralPanel');
    expect(component.state().editedPanel).toEqual({ referralPanel: false });
    component.instance().handleEdit('referralPanel');
    component.instance().handleSaveSettingsDetailForm(formValuesEdit, 'referralPanel');
    expect(component.state().editedPanel).toEqual({ referralPanel: false });

    expect(component).toMatchSnapshot();
  });

  it('should renders correctly with referralsDetail and testing Create Panel', () => {
    const component = shallow(
      <Referrals
        store={storeWithDetail}
        match={match}
      />, { context }).dive().dive().dive()
      .dive()
      .dive()
      .dive();

    expect(component.find('PluginListHeader')).toHaveLength(1);
    expect(component.find('PluginMainPanel')).toHaveLength(1);
    expect(component.find('ReferralsDetail')).toHaveLength(0);
    expect(component.find('PluginCreate')).toHaveLength(0);

    // Testing component create panel methods
    component.instance().handleCreate();
    const componentStateAfterMethod = component.state();
    component.setState({ isBtnCreateVisible: false, isCreatePanelVisible: true, openedPanel: 'referralsCreate', isSecondPanel: true, isDetailPanelVisible: false, isBtnExpandVisible: false, expandedPanel: 'all', isSubmit: false, isLoading: true })
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
      <Referrals
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
    expect(component.state().openedPanel).toEqual('referralPanel');
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
    expect(component.state().columnNameSortBy).toEqual('dateOfReferral');
    expect(component.state().sortingOrder).toEqual('asc');
    component.instance().handleHeaderCellClick({}, { name: 'referralFrom', sortingOrder: 'desc' });
    expect(component.state().columnNameSortBy).toEqual('referralFrom');
    expect(component.state().sortingOrder).toEqual('desc');

    // Testing component handleSetOffset methods
    expect(component.state().offset).toEqual(0);
    component.instance().handleSetOffset(10);
    expect(component.state().offset).toEqual(10);

    expect(component).toMatchSnapshot();
  });

  it('should renders correctly and testing context and lifecycle componentWillReceiveProps', () => {
    const component = shallow(
      <Referrals
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
      <Referrals
        store={storeWithFormsError}
        match={match}
      />, { context }).dive().dive().dive()
      .dive()
      .dive()
      .dive();

    component.instance().handleSaveSettingsDetailForm(formValuesEdit, 'referralPanel');
    component.instance().handleSaveSettingsCreateForm(formValuesCreate);

    expect(component).toMatchSnapshot();
  });

  it('should renders correctly with empty store', () => {
    const component = shallow(
      <Referrals
        store={storeEmpty}
        match={match}
      />, { context }).dive().dive().dive()
      .dive()
      .dive()
      .dive();

    expect(component).toMatchSnapshot();
  });
});
