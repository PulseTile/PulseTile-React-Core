import { createAction } from 'redux-actions';

export const HANDLE_ERRORS = 'HANDLE_ERRORS';

export const handleErrors = createAction(HANDLE_ERRORS);

export default function reducer(requestError = {}, action) {
  switch (action.type) {
    case HANDLE_ERRORS:
      return action;
    default:
      return requestError;
  }
}
