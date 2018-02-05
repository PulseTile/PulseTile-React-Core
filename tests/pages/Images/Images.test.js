import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import configureStore from 'redux-mock-store';

import Images from '../../../src/components/pages/Images/Images';
import { valuesNames } from '../../../src/components/pages/Images/forms.config';

Enzyme.configure({ adapter: new Adapter() });

// frequently used variables
const userId = '9999999000';
const sourceId = 'acb0eaf2-d1df-4c7a-9382-619b31935f2b';

// storage setup in different configurations
const mockStore = configureStore();
const storeResource = {
  patientsImages: {
    '9999999000': [
      {
        [valuesNames.STUDY_ID]: '55a9fcd2-e8197ca2-1af7a8e2-0e1ab147-841c65ba',
        [valuesNames.SOURCE]: 'orthanc',
        [valuesNames.STUDY_DESCRIPTION]: 'RT ANKLE',
        [valuesNames.DATE_RECORDED]: 736124400000,
        [valuesNames.STUDY_ID]: '55a9fcd2-e8197ca2-1af7a8e2-0e1ab147-841c65ba',
        dateRecordedConvert: '30-Apr-1993',
      },
    ],
  },
};
const storeEmpty = mockStore(Object.assign({
  seriesDetail: {
    '9999999000': {},
  },
  allSeries: {
    '9999999000': {},
  },
}, storeResource));
const storeWithDetail = mockStore(Object.assign({
  seriesDetail: {
    '9999999000': {
      [valuesNames.SOURCE]: 'orthanc',
      [valuesNames.SOURCE_ID]: '00d87cf2-13d39285-50905549-3faf78a7-59656dd3',
      [valuesNames.MODALITY]: 'CT',
      [valuesNames.SERIES_DATE]: 736124400000,
      [valuesNames.SERIES_TIME]: 37644000,
      [valuesNames.STATION_NAME]: 'CT01OC0',
      [valuesNames.OPERATORS_NAME]: 'Anonymized',
      [valuesNames.SERIES_NUMBER]: '365',
      instanceIds: [
        'd1d4875a-2a8267c2-2ee4f8f0-3d9e917e-9a141930',
      ],
      [valuesNames.PROTOCOL_NAME]: 'test',
    },
  },
  allSeries: {
    '9999999000': {
      [valuesNames.STUDY_ID]: '55a9fcd2-e8197ca2-1af7a8e2-0e1ab147-841c65ba',
      [valuesNames.SOURCE]: 'orthanc',
      seriesIds: [
        '9927f4d0-7ba0f736-ad0cd3a0-8cd74dba-5a23637e',
      ],
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
        pathname: `/patients/${userId}/images`,
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
const contextDetail = generateNewContext(context, `/patients/${userId}/images/${sourceId}`);

const match = {
  params: {
    userId,
  },
};

describe('Component <Images />', () => {
  it('should renders correctly with seriesDetail and testing Detail Panel', () => {
    const component = shallow(
      <Images
        store={storeWithDetail}
        match={match}
      />, { context }).dive().dive().dive()
      .dive()
      .dive();

    // Testing component handleDetailImagesClick methods
    expect(component.find('PluginListHeader')).toHaveLength(1);
    expect(component.find('PluginMainPanel')).toHaveLength(1);
    expect(component.find('ImagesDetail')).toHaveLength(0);

    component.instance().handleDetailImagesClick('065d85e3-3cd5-4604-bb94-5685fffb193d');
    const componentStateAfterMethod = component.state();
    component.setState({ isSecondPanel: true, isDetailPanelVisible: true, isBtnExpandVisible: true, openedPanel: 'imagesPanel', editedPanel: {}, expandedPanel: 'all', isLoading: true });
    const componentStateAfterSetState = component.state();

    expect(componentStateAfterMethod).toEqual(componentStateAfterSetState);
    expect(component.find('ImagesDetail')).toHaveLength(1);
    expect(component).toMatchSnapshot();

    // Testing component handleShow methods
    expect(component.state().openedPanel).toEqual('imagesPanel');
    component.instance().handleShow('imagesDetailPanel');
    expect(component.state().openedPanel).toEqual('imagesDetailPanel');
    component.instance().handleShow('imagesPanel');
    expect(component.state().openedPanel).toEqual('imagesPanel');

    // Testing component handleExpand methods
    expect(component.find('PluginListHeader')).toHaveLength(1);
    expect(component.find('PluginMainPanel')).toHaveLength(1);
    expect(component.state().openedPanel).toEqual('imagesPanel');
    expect(component.state().expandedPanel).toEqual('all');
    component.instance().handleExpand('imagesPanel', 'imagesDetail');
    expect(component.state().openedPanel).toEqual('imagesPanel');
    expect(component.state().expandedPanel).toEqual('imagesPanel');
    component.setState({ openedPanel: 'imagesPanel', expandedPanel: 'imagesPanel' });
    expect(component.find('PluginListHeader')).toHaveLength(0);
    expect(component.find('PluginMainPanel')).toHaveLength(0);
    expect(component).toMatchSnapshot();

    component.setState({ openedPanel: 'imagesPanel', expandedPanel: 'all' });

    component.setState({ expandedPanel: 'all' });
    component.instance().handleExpand('imagesPanel', 'imagesMain');
    component.setState({ expandedPanel: 'test' });
    component.instance().handleExpand('imagesPanel', 'imagesMain');
    component.setState({ expandedPanel: 'test' });
    component.instance().handleExpand('imagesPanel', 'imagesTest');


    // Testing component detail form methods
    expect(component.state().editedPanel).toEqual({});

    expect(component).toMatchSnapshot();
  });

  it('should renders correctly and testing another methods', () => {
    const component = shallow(
      <Images
        store={storeWithDetail}
        match={match}
      />, { context }).dive().dive().dive()
      .dive()
      .dive();

    // Testing component handleFilterChange methods
    expect(component.state().nameShouldInclude).toEqual('');
    component.instance().handleFilterChange({ target: { value: 'test' } });
    expect(component.state().nameShouldInclude).toEqual('test');
    component.instance().handleFilterChange({ target: { value: '' } });
    expect(component.state().nameShouldInclude).toEqual('');

    // Testing component handleHeaderCellClick methods
    expect(component.state().columnNameSortBy).toEqual('studyDescription');
    expect(component.state().sortingOrder).toEqual('asc');
    component.instance().handleHeaderCellClick({}, { name: 'dateRecorded', sortingOrder: 'desc' });
    expect(component.state().columnNameSortBy).toEqual('dateRecorded');
    expect(component.state().sortingOrder).toEqual('desc');

    // Testing component handleSetOffset methods
    expect(component.state().offset).toEqual(0);
    component.instance().handleSetOffset(10);
    expect(component.state().offset).toEqual(10);

    expect(component).toMatchSnapshot();
  });

  it('should renders correctly and testing context and lifecycle componentWillReceiveProps', () => {
    const component = shallow(
      <Images
        store={storeWithDetail}
        match={match}
      />, { context }).dive().dive().dive()
      .dive()
      .dive();

    component.setProps({ test: 'testing context' });
    component.setContext(contextDetail);
    component.setProps({ test: 'testing edit context' });

    expect(component).toMatchSnapshot();
  });

  it('should renders correctly with empty store', () => {
    const component = shallow(
      <Images
        store={storeEmpty}
        match={match}
      />, { context }).dive().dive().dive()
      .dive()
      .dive();

    expect(component).toMatchSnapshot();
  });
});
