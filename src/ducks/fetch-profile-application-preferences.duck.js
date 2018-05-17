import { Observable } from 'rxjs';
import { ajax } from 'rxjs/observable/dom/ajax';
import { createAction } from 'redux-actions';

import { usersUrls } from '../config/server-urls.constants'

export const FETCH_PROFILE_APP_PREFERENCES_REQUEST = 'FETCH_PROFILE_APP_PREFERENCES_REQUEST';
export const FETCH_PROFILE_APP_PREFERENCES_SUCCESS = 'FETCH_PROFILE_APP_PREFERENCES_SUCCESS';
export const FETCH_PROFILE_APP_PREFERENCES_FAILURE = 'FETCH_PROFILE_APP_PREFERENCES_FAILURE';

export const fetchProfileAppPreferencesRequest = createAction(FETCH_PROFILE_APP_PREFERENCES_REQUEST);
export const fetchProfileAppPreferencesSuccess = createAction(FETCH_PROFILE_APP_PREFERENCES_SUCCESS);
export const fetchProfileAppPreferencesFailure = createAction(FETCH_PROFILE_APP_PREFERENCES_FAILURE);

export const fetchProfileAppPreferencesEpic = (action$, store) =>
  action$.ofType(FETCH_PROFILE_APP_PREFERENCES_REQUEST)
    .mergeMap(({ payload }) =>
      ajax.post(usersUrls.PROFILE_APP_PREFERENCES, payload, {
        Cookie: store.getState().credentials.cookie,
        'Content-Type': 'application/json',
      })
        .map(({ response }) => fetchProfileAppPreferencesSuccess(response))
        .catch(error => Observable.of(fetchProfileAppPreferencesFailure(error)))
    );

export default function reducer(profileAppPreferences = {}, action) {
  switch (action.type) {
    case FETCH_PROFILE_APP_PREFERENCES_SUCCESS:
      return action.payload;
    default:
      return profileAppPreferences;
  }
}
