import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import configureStore from 'redux-mock-store';

import RssDashboardPanel from '../RssDashboardPanel';

Enzyme.configure({ adapter: new Adapter() });

const mockStore = configureStore();

const storeWithoutThumbnail = mockStore({
  rssFeeds: {
    nytimes_com: [
      {
        title: 'Mind: Bring Back the Asylums? Critics Fear a New Wave of Abuse',
        link: 'https://www.nytimes.com/2018/03/05/health/mental-illness-asylums.html?partner=rss&emc=rss',
        pubDate: 1520289136000,
        // thumbnail: 'https://static01.nyt.com/images/2018/03/06/science/06SCI-MENTAL1/06MENTALCOVER1-moth.jpg',
      },
    ],
  },
});

const storewWithThumbnail = mockStore({
  rssFeeds: {
    nytimes_com: [
      {
        title: 'Mind: Bring Back the Asylums? Critics Fear a New Wave of Abuse',
        link: 'https://www.nytimes.com/2018/03/05/health/mental-illness-asylums.html?partner=rss&emc=rss',
        pubDate: 1520289136000,
        thumbnail: 'https://static01.nyt.com/images/2018/03/06/science/06SCI-MENTAL1/06MENTALCOVER1-moth.jpg',
      },
    ],
  },
});

const testProps = {
  goToState: () => {},
  isHasList: true,
  isHasPreview: true,
  rssFeedName: 'nytimes_com',
  rssFeedUrl: 'http://rss.nytimes.com/services/xml/rss/nyt/Health.xml',
  state: 'https://www.nytimes.com/section/health',
  title: 'NYTimes.com',
};

describe('Component <RssDashboardPanel />', () => {
  it('should renders with all props correctly', () => {
    const component = shallow(
      <RssDashboardPanel
        store={storewWithThumbnail}
        goToState={testProps.goToState}
        isHasList={testProps.isHasList}
        isHasPreview={testProps.isHasPreview}
        rssFeedUrl={testProps.rssFeedUrl}
        rssFeedName='test'
        state={testProps.state}
        title={testProps.title}
      />).dive();

    component.setProps({ indexItemForPreview: 10 });
    // expect(component.find('SimpleDashboardPanel')).toHaveLength(1);
    expect(component).toMatchSnapshot();

    component.setProps({ rssFeedName: 'nytimes_com' });
    expect(component.find('SimpleDashboardPanel')).toHaveLength(1);

    component.setProps({
      rssFeedName: 'test',
    });

    expect(component).toMatchSnapshot();

    component.setState({ rssFeedName: '' });
    component.setProps({ indexItemForPreview: 10 })
  });

  it('should renders with all props correctly', () => {
    const component = shallow(
      <RssDashboardPanel
        store={storeWithoutThumbnail}
        goToState={testProps.goToState}
        isHasList={testProps.isHasList}
        isHasPreview={testProps.isHasPreview}
        rssFeedUrl={testProps.rssFeedUrl}
        rssFeedName={testProps.rssFeedName}
        state={testProps.state}
        title={testProps.title}
      />).dive();

    component.setProps({ rssFeedName: 'test' });

    expect(component).toMatchSnapshot();
  });
});

