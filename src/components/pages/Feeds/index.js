import { combineEpics } from 'redux-observable';

import Feeds from './Feeds';
import UserProfile from '../UserProfile/UserProfile';
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
  { key: 'feeds', component: UserProfile, path: `${clientUrls.USER_PROFILE}`, withoutHeaderToolbar: true },
  { key: 'feedsCreate', component: UserProfile, path: `${clientUrls.USER_PROFILE}`, withoutHeaderToolbar: true },
  { key: 'feedsDetail', component: UserProfile, path: `${clientUrls.USER_PROFILE}`, withoutHeaderToolbar: true },
];

export default {
  component: Feeds,
  epics, reducers, routers,
}

