import _ from 'lodash/fp';
import { Observable } from 'rxjs';
import { ajax } from 'rxjs/observable/dom/ajax';
import { createAction } from 'redux-actions';
import { getRssFeedsListFromXML } from '../utils/rss-helpers';
import { handleErrors } from './handle-errors.duck';

export const FETCH_GET_RSS_FEEDS_REQUEST = 'FETCH_GET_RSS_FEEDS_REQUEST';
export const FETCH_GET_RSS_FEEDS_SUCCESS = 'FETCH_GET_RSS_FEEDS_SUCCESS';
export const FETCH_GET_RSS_FEEDS_FAILURE = 'FETCH_GET_RSS_FEEDS_FAILURE';

export const fetchGetRssFeedsRequest = createAction(FETCH_GET_RSS_FEEDS_REQUEST);
export const fetchGetRssFeedsSuccess = createAction(FETCH_GET_RSS_FEEDS_SUCCESS);
export const fetchGetRssFeedsFailure = createAction(FETCH_GET_RSS_FEEDS_FAILURE);

export const fetchGetRssFeedsEpic = (action$, store) =>
  action$.ofType(FETCH_GET_RSS_FEEDS_REQUEST)
    .mergeMap(({ payload }) =>
      ajax({
        url: 'https://www.leeds-live.co.uk/best-in-leeds/whats-on-news/?service=rss',
        // responseType: 'application/rss+xml'
        responseType: 'text/xml'
      })
        .map(response => response.xhr.responseXML)
        .map(xmlDocument => fetchGetRssFeedsSuccess({
          feedsName: payload.userId,
          feeds: getRssFeedsListFromXML(xmlDocument),
        }))
      // .catch(error => Observable.of(handleErrors(error)))
    );


export default function reducer(rssFeeds = {}, action) {
  switch (action.type) {
    case FETCH_GET_RSS_FEEDS_SUCCESS:
      return _.set(action.payload.feedsName, action.payload.feeds, rssFeeds);
    default:
      return rssFeeds;
  }
}
