import { createAction } from 'redux-actions'

import { fetchAllUsers } from '../constants/fetch.constants'

export const fetchAllUsersStart = createAction(fetchAllUsers.FETCH_ALL_USERS_START);
export const fetchAllUsersSuccess = createAction(fetchAllUsers.FETCH_ALL_USERS_SUCCESS);
export const fetchAllUsersFailure = createAction(fetchAllUsers.FETCH_ALL_USERS_FAILURE);
