import _ from 'lodash/fp';
import { Observable } from 'rxjs';
import { createAction } from 'redux-actions';

import { fetchInitialiseRequest, FETCH_INITIALISE_SUCCESS } from './fetch-initialise.duck'
import { fetchUserAccountRequest, FETCH_USER_ACCOUNT_SUCCESS } from './fetch-user-account.duck'
import { redirectToLogin } from './login-status.duck'
import { clientUrls } from '../config/client-urls.constants';

export const INITIALISE_START = 'INITIALISE_START';
export const INITIALISE_SUCCESS = 'INITIALISE_SUCCESS';
export const INITIALISE_FAILURE = 'INITIALISE_FAILURE';

export const initialiseStart = createAction(INITIALISE_START);
export const initialiseSuccess = createAction(INITIALISE_SUCCESS);
export const initialiseFailure = createAction(INITIALISE_FAILURE);

const redirectAccordingRole = (user) => {
  if (_.flow(_.get('role'), _.eq('PHR'))(user)) {
    const userSummaryUrl = `#${clientUrls.PATIENTS}/${_.get('nhsNumber', user)}/${clientUrls.PATIENTS_SUMMARY}`;
    return location.hash = userSummaryUrl;
  }

  return location.hash = `#${clientUrls.CHARTS}`;
};

//TODO should be refactored to actual sequence, not parallel listening
export const initialiseEpic = (action$, store) => Observable.merge(
  action$
    .ofType(INITIALISE_START)
    .map(fetchInitialiseRequest),
  action$
    .ofType(FETCH_INITIALISE_SUCCESS)
    .map((action) => {
      if (_.flow(_.get('payload.redirectTo'), _.eq('auth0'))(action)) return redirectToLogin(action.payload);
      return fetchUserAccountRequest(action)
    }),
  action$
    .ofType(FETCH_USER_ACCOUNT_SUCCESS)
    .map((action) => {
      redirectAccordingRole(action.payload);
      return initialiseSuccess(action.payload);
    })
);
