import { combineEpics } from 'redux-observable';

import Feeds from './Feeds';
import { clientUrls } from '../../../config/client-urls.constants';

import { fetchFeedsEpic } from './ducks/fetch-feeds.duck';
import { fetchFeedsUpdateEpic } from './ducks/fetch-feeds.duck';
import { fetchFeedsDetailEpic } from './ducks/fetch-feeds-detail.duck';
import { fetchFeedsDetailEditEpic } from './ducks/fetch-feeds-detail-edit.duck';
import { fetchFeedsCreateEpic } from './ducks/fetch-feeds-create.duck';

import feeds from './ducks/fetch-feeds.duck';
import feedsDetail from './ducks/fetch-feeds-detail.duck';
import feedsDetailEdit from './ducks/fetch-feeds-detail-edit.duck';
import feedsCreate from './ducks/fetch-feeds-create.duck';

const epics = combineEpics(fetchFeedsEpic, fetchFeedsDetailEpic, fetchFeedsDetailEditEpic, fetchFeedsCreateEpic, fetchFeedsUpdateEpic);

const reducers = {
  feeds,
  feedsDetail,
  feedsDetailEdit,
  feedsCreate,
};

const routers = [
  { key: 'feeds', component: Feeds, path: `${clientUrls.USER_PROFILE}/${clientUrls.FEEDS}`, withoutHeaderToolbar: true },
  { key: 'feedsCreate', component: Feeds, path: `${clientUrls.USER_PROFILE}/${clientUrls.FEEDS}/create`, withoutHeaderToolbar: true },
  { key: 'feedsDetail', component: Feeds, path: `${clientUrls.USER_PROFILE}/${clientUrls.FEEDS}/:sourceId`, withoutHeaderToolbar: true },
];

export default {
  component: Feeds,
  epics, reducers, routers,
}

