import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

import FeedsDetail from '../FeedsDetail/FeedsDetail';
import { valuesNames, valuesLabels } from '../forms.config';
import { getDDMMMYYYY } from '../../../../utils/time-helpers.utils';

Enzyme.configure({ adapter: new Adapter() });

const FEEDS_PANEL = 'feedsPanel';
const FEEDS_DETAIL_TITLE = 'Feed';
const FEEDS_DETAIL_EDIT_TITLE = 'Edit Feed';

const testProps = {
  onExpand: () => {},
  onEdit: () => {},
  onCancel: () => {},
  onSaveSettings: () => {},
  openedPanel: {},
  expandedPanel: 'all',
  currentPanel: 'currentPanel',
  editedPanel: 'editedPanel',
  feedFormValues: {},
};

const detail = {
  [valuesNames.NAME]: 'BBC Health',
  [valuesNames.LANDING_PAGE_URL]: 'http://www.bbc.co.uk/news/health',
  [valuesNames.RSS_FEED_URL]: 'http://feeds.bbci.co.uk/news/health/rss.xml?edition=uk#',
  [valuesNames.SOURCE_ID]: 'testSourceID1',
  [valuesNames.DATE_CREATED]: 1482170593395,
  [valuesNames.AUTHOR]: 'bob.smith@gmail.com',
};

const CONVERT_DATE = getDDMMMYYYY(detail[valuesNames.DATE_CREATED]);

describe('Component <FeedsDetail />', () => {
  it('should renders with all props correctly', () => {
    const component = shallow(
      <FeedsDetail
        detail={detail}
        onExpand={testProps.onExpand}
        onEdit={testProps.onEdit}
        onCancel={testProps.onCancel}
        onSaveSettings={testProps.onSaveSettings}
        openedPanel={testProps.openedPanel}
        expandedPanel={testProps.expandedPanel}
        currentPanel={testProps.currentPanel}
        editedPanel={testProps.editedPanel}
        feedFormValues={testProps.feedFormValues}
        isSubmit={false}
      />
    );

    expect(component).toMatchSnapshot();

    // Testing component when detail filled object, expandedPanel is all, and panel not edited
    expect(component.instance().props.detail).toEqual(detail);
    expect(component.instance().props.onExpand).toEqual(testProps.onExpand);
    expect(component.instance().props.onEdit).toEqual(testProps.onEdit);
    expect(component.instance().props.onCancel).toEqual(testProps.onCancel);
    expect(component.instance().props.onSaveSettings).toEqual(testProps.onSaveSettings);
    expect(component.instance().props.openedPanel).toEqual(testProps.openedPanel);
    expect(component.instance().props.expandedPanel).toEqual(testProps.expandedPanel);
    expect(component.instance().props.currentPanel).toEqual(testProps.currentPanel);
    expect(component.instance().props.editedPanel).toEqual(testProps.editedPanel);
    expect(component.instance().props.feedFormValues).toEqual(testProps.feedFormValues);
    expect(component.instance().props.isSubmit).toEqual(false);

    expect(component.find('.section-detail')).toHaveLength(1);
    expect(component.find('.form')).toHaveLength(1);
    expect(component.find('PluginDetailPanel')).toHaveLength(1);

    expect(component.find('PluginDetailPanel').props().currentPanel).toEqual(testProps.currentPanel);
    expect(component.find('PluginDetailPanel').props().editedPanel).toEqual(testProps.editedPanel);
    expect(component.find('PluginDetailPanel').props().isBtnShowPanel).toEqual(false);
    expect(component.find('PluginDetailPanel').props().isOpen).toEqual(testProps.editedPanel === FEEDS_PANEL);
    expect(component.find('PluginDetailPanel').props().name).toEqual(FEEDS_PANEL);
    expect(component.find('PluginDetailPanel').props().onCancel).toEqual(testProps.onCancel);
    expect(component.find('PluginDetailPanel').props().onEdit).toEqual(testProps.onEdit);
    expect(component.find('PluginDetailPanel').props().onExpand).toEqual(testProps.onExpand);
    expect(component.find('PluginDetailPanel').props().onSaveSettings).toEqual(testProps.onSaveSettings);
    expect(component.find('PluginDetailPanel').props().title).toEqual(FEEDS_DETAIL_TITLE);


    expect(component.find('.control-label').at(0).text()).toEqual(valuesLabels.NAME);
    expect(component.find('.control-label').at(1).text()).toEqual(valuesLabels.LANDING_PAGE_URL);
    expect(component.find('.control-label').at(2).text()).toEqual(valuesLabels.RSS_FEED_URL);
    expect(component.find('.control-label').at(3).text()).toEqual(valuesLabels.AUTHOR);
    expect(component.find('.control-label').at(4).text()).toEqual(valuesLabels.DATE_CREATED);

    expect(component.find('.form-control-static').at(0).text()).toEqual(detail[valuesNames.NAME]);
    expect(component.find('.form-control-static').at(1).text()).toEqual(detail[valuesNames.LANDING_PAGE_URL]);
    expect(component.find('.form-control-static').at(2).text()).toEqual(detail[valuesNames.RSS_FEED_URL]);
    expect(component.find('.form-control-static').at(3).text()).toEqual(detail[valuesNames.AUTHOR]);
    expect(component.find('.form-control-static').at(4).text()).toEqual(CONVERT_DATE);
  });

  it('should renders correctly with different state of props', () => {
    const component = shallow(
      <FeedsDetail
        expandedPanel={'all'}
        editedPanel={{ [FEEDS_PANEL]: true }}
        openedPanel={{ [FEEDS_PANEL]: true }}
      />
    );
    expect(component).toMatchSnapshot();

    // Testing component when detail filled object, expandedPanel is all, and panel is edited
    component.setProps({ detail });
    expect(component).toMatchSnapshot();

    expect(component.find('PluginDetailPanel')).toHaveLength(1);
    expect(component.find('ReduxForm')).toHaveLength(1);
    expect(component.find('PluginDetailPanel').props().title).toEqual(FEEDS_DETAIL_EDIT_TITLE);
  });
});

