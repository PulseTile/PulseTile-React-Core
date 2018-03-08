import React, {PureComponent} from 'react';
import _ from 'lodash/fp';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import SimpleDashboardPanel from './SimpleDashboardPanel';
import { rssFeedsSelector } from '../../../selectors/rss-feeds';
import { fetchGetRssFeedsRequest } from '../../../ducks/fetch-get-rss-feeds.duck';
import { patientsSummaryLoading } from './patients-summary.config';
import imgRss from '../../../assets/images/patients-summary/rss.jpg';

const mapDispatchToProps = dispatch => ({ actions: bindActionCreators({ fetchGetRssFeedsRequest }, dispatch) });

@connect(rssFeedsSelector, mapDispatchToProps)
export default class RssDashboardPanel extends PureComponent {
  static propTypes = {
    title: PropTypes.string.isRequired,
    rssFeedName: PropTypes.string.isRequired,
    rssFeedUrl: PropTypes.string.isRequired,
  };

  state = {
    indexItemForPreview: 0,
  };

  componentDidMount() {
    const { rssFeeds, rssFeedUrl, rssFeedName, actions } = this.props;
    if (rssFeedName && !rssFeeds[rssFeedName]) {
      actions['fetchGetRssFeedsRequest']({ rssFeedName, rssFeedUrl })
    }

    // const indexItemForPreview = getRandomInt(0, 3);
    // this.setState({indexItemForPreview});
  }

  getRssItems = rssFeeds => {
    const { rssFeedName } = this.props;
    const rssList = rssFeeds[rssFeedName];

    if (!rssList) {
      return [{ text: patientsSummaryLoading }, '', '', ''];
    }

    return _.flow(
      arr => _.concat(arr, ['', '', '', '']),
      _.take(4),
      _.map(el => ({
        text: el.title,
        link: el.link,
        thumbnail: el.thumbnail,
      }))
    )(rssList);
  };

  render() {
    const { rssFeeds, title, state, goToState, isHasPreview, isHasList, rssFeedName } = this.props;
    const { indexItemForPreview } = this.state;

    const items = this.getRssItems(rssFeeds);

    let srcPrevirew;
    if (!rssFeeds[rssFeedName]) {
      srcPrevirew = imgRss;
    } else {
      srcPrevirew = items[indexItemForPreview].thumbnail ? items[indexItemForPreview].thumbnail : imgRss;
    }


    return (
      <SimpleDashboardPanel
        title={title}
        state={state}
        goToState={goToState}
        isHasPreview={isHasPreview}
        isHasList={isHasList}
        items={items}
        srcPrevirew={srcPrevirew}
      />
    )
  }
}
