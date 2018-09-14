import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import configureStore from 'redux-mock-store';

import Feeds from '../Feeds';
import { valuesNames } from '../forms.config';

Enzyme.configure({ adapter: new Adapter() });

// frequently used variables
const userId = '9999999000';
const sourceId = 'acb0eaf2-d1df-4c7a-9382-619b31935f2b';

// storage setup in different configurations
const mockStore = configureStore();
const storeResource = {
  feeds: [
    {
      [valuesNames.NAME]: 'BBC Health',
      [valuesNames.LANDING_PAGE_URL]: 'http://www.bbc.co.uk/news/health',
      [valuesNames.SOURCE_ID]: 'testSourceID1',
    },
    {
      [valuesNames.NAME]: 'NHS Choices',
      [valuesNames.LANDING_PAGE_URL]: 'https://www.nhs.uk/news/',
      [valuesNames.SOURCE_ID]: 'testSourceID2',
    },
  ],
};
const storeWithFormsError = mockStore(Object.assign({
  feedsDetail: {
    [valuesNames.NAME]: 'BBC Health',
    [valuesNames.LANDING_PAGE_URL]: 'http://www.bbc.co.uk/news/health',
    [valuesNames.RSS_FEED_URL]: 'http://feeds.bbci.co.uk/news/health/rss.xml?edition=uk#',
    [valuesNames.SOURCE_ID]: 'testSourceID1',
    [valuesNames.DATE_CREATED]: 1482170593395,
    [valuesNames.AUTHOR]: 'bob.smith@gmail.com',
  },
  form: {
    feedsPanelFormSelector: {
      syncErrors: {
        [valuesNames.NAME]: 'You must enter a value.',
        [valuesNames.LANDING_PAGE_URL]: 'You must enter a value.',
      },
    },
    feedsCreateFormSelector: {
      syncErrors: {
        [valuesNames.NAME]: 'You must enter a value.',
        [valuesNames.LANDING_PAGE_URL]: 'You must enter a value.',
      },
    },
  },
}, storeResource));
const storeEmpty = mockStore(Object.assign({
  feedsDetail: {},
}, storeResource));
const storeWithDetail = mockStore(Object.assign({
  feedsDetail: {
    [valuesNames.NAME]: 'BBC Health',
    [valuesNames.LANDING_PAGE_URL]: 'http://www.bbc.co.uk/news/health',
    [valuesNames.RSS_FEED_URL]: 'http://feeds.bbci.co.uk/news/health/rss.xml?edition=uk#',
    [valuesNames.SOURCE_ID]: 'testSourceID1',
    [valuesNames.DATE_CREATED]: 1482170593395,
    [valuesNames.AUTHOR]: 'bob.smith@gmail.com',
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
        pathname: `/profile/feeds`,
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
const contextCreate = generateNewContext(context, `/profile/feeds/create`);
const contextDetail = generateNewContext(context, `/profile/feeds/${sourceId}`);

// configuration of forms for testing methods
const formValuesEdit = {
  [valuesNames.NAME]: 'BBC Health',
  [valuesNames.LANDING_PAGE_URL]: 'http://www.bbc.co.uk/news/health',
  [valuesNames.RSS_FEED_URL]: 'http://feeds.bbci.co.uk/news/health/rss.xml?edition=uk#',
  [valuesNames.SOURCE_ID]: 'test',
};
const formValuesCreate = {
  [valuesNames.NAME]: 'BBC Health',
  [valuesNames.LANDING_PAGE_URL]: 'http://www.bbc.co.uk/news/health',
  [valuesNames.RSS_FEED_URL]: 'http://feeds.bbci.co.uk/news/health/rss.xml?edition=uk#',
  [valuesNames.AUTHOR]: 'bob.smith@gmail.com',
  [valuesNames.SOURCE]: 'openehr',
};
const match = {
  params: {
    userId,
  },
};

describe('Component <Feeds />', () => {
  it('should renders correctly with feedsPanel and testing Detail Panel', () => {
    const component = shallow(
      <Feeds
        store={storeWithDetail}
        match={match}
      />, { context }).dive().dive().dive()
      .dive()
      .dive()
      .dive();

    // Testing component handleDetailFeedsClick methods
    expect(component.find('PluginListHeader')).toHaveLength(1);
    expect(component.find('PluginMainPanel')).toHaveLength(1);
    expect(component.find('FeedsDetail')).toHaveLength(0);
    expect(component.find('PluginCreate')).toHaveLength(0);

    component.instance().handleDetailFeedsClick('065d85e3-3cd5-4604-bb94-5685fffb193d');
    const componentStateAfterMethod = component.state();
    component.setState({ isSecondPanel: true, isDetailPanelVisible: true, isBtnExpandVisible: true, isBtnCreateVisible: true, isCreatePanelVisible: false, openedPanel: 'feedsPanel', editedPanel: {}, expandedPanel: 'all', isLoading: false });
    const componentStateAfterSetState = component.state();

    expect(componentStateAfterMethod).toEqual(componentStateAfterSetState);
    expect(component.find('FeedsDetail')).toHaveLength(1);
    expect(component.find('PluginCreate')).toHaveLength(0);
    expect(component).toMatchSnapshot();

    // Testing component handleExpand methods
    expect(component.find('PluginListHeader')).toHaveLength(1);
    expect(component.find('PluginMainPanel')).toHaveLength(1);
    expect(component.state().openedPanel).toEqual('feedsPanel');
    expect(component.state().expandedPanel).toEqual('all');
    component.instance().handleExpand('feedsPanel', 'feedsDetail');
    expect(component.state().openedPanel).toEqual('feedsPanel');
    expect(component.state().expandedPanel).toEqual('feedsPanel');
    component.setState({ openedPanel: 'feedsPanel', expandedPanel: 'feedsPanel' });
    expect(component.find('PluginListHeader')).toHaveLength(0);
    expect(component.find('PluginMainPanel')).toHaveLength(0);
    expect(component).toMatchSnapshot();

    component.setState({ openedPanel: 'feedsPanel', expandedPanel: 'all' });

    component.instance().handleExpand('feedsPanel', 'feedsCreate');
    component.setState({ expandedPanel: 'all' });
    component.instance().handleExpand('feedsPanel', 'feedsMain');
    component.setState({ expandedPanel: 'test' });
    component.instance().handleExpand('feedsPanel', 'feedsMain');
    component.setState({ expandedPanel: 'test' });
    component.instance().handleExpand('feedsPanel', 'feedsCreate');

    // Testing component detail form methods
    expect(component.state().editedPanel).toEqual({});
    component.instance().handleEdit('feedsPanel');
    expect(component.state().editedPanel).toEqual({ feedsPanel: true });
    component.instance().handleFeedsDetailCancel('feedsPanel');
    expect(component.state().editedPanel).toEqual({ feedsPanel: false });
    component.instance().handleEdit('feedsPanel');
    component.instance().handleSaveSettingsDetailForm(formValuesEdit, 'feedsPanel');
    expect(component.state().editedPanel).toEqual({ feedsPanel: false });

    expect(component).toMatchSnapshot();
  });

  it('should renders correctly with feedsDetail and testing Create Panel', () => {
    const component = shallow(
      <Feeds
        store={storeWithDetail}
        match={match}
      />, { context }).dive().dive().dive()
      .dive()
      .dive()
      .dive();

    expect(component.find('PluginListHeader')).toHaveLength(1);
    expect(component.find('PluginMainPanel')).toHaveLength(1);
    expect(component.find('FeedsDetail')).toHaveLength(0);
    expect(component.find('PluginCreate')).toHaveLength(0);

    // Testing component create panel methods
    component.instance().handleCreate();
    const componentStateAfterMethod = component.state();
    component.setState({ isBtnCreateVisible: false, isCreatePanelVisible: true, openedPanel: 'feedsCreate', isSecondPanel: true, isDetailPanelVisible: false, isSubmit: false, isLoading: true });
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
      <Feeds
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
    expect(component.state().openedPanel).toEqual('feedsPanel');
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
    component.instance().handleHeaderCellClick({}, { name: 'landingPageUrl', sortingOrder: 'desc' });
    expect(component.state().columnNameSortBy).toEqual('landingPageUrl');
    expect(component.state().sortingOrder).toEqual('desc');

    // Testing component handleSetOffset methods
    expect(component.state().offset).toEqual(0);
    component.instance().handleSetOffset(10);
    expect(component.state().offset).toEqual(10);

    expect(component).toMatchSnapshot();
  });

  it('should renders correctly and testing context and lifecycle componentWillReceiveProps', () => {
    const component = shallow(
      <Feeds
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
      <Feeds
        store={storeWithFormsError}
        match={match}
      />, { context }).dive().dive().dive()
      .dive()
      .dive()
      .dive();

    component.instance().handleSaveSettingsDetailForm(formValuesEdit, 'feedsPanel');
    component.instance().handleSaveSettingsCreateForm(formValuesCreate);

    expect(component).toMatchSnapshot();
  });

  it('should renders correctly with empty store', () => {
    const component = shallow(
      <Feeds
        store={storeEmpty}
        match={match}
      />, { context }).dive().dive().dive()
      .dive()
      .dive()
      .dive();

    expect(component).toMatchSnapshot();
  });
});
