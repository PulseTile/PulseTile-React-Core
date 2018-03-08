import { createSelector }  from 'reselect';

const rssFeedsSelector = createSelector(
  state => state.rssFeeds,
  rssFeeds => ({ rssFeeds })
);

export { rssFeedsSelector };