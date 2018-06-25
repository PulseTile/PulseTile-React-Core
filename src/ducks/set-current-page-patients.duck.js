import { Observable } from 'rxjs';
import { createAction } from 'redux-actions';

export const SET_CURRENT_PAGE_PATIENTS_START = 'SET_CURRENT_PAGE_PATIENTS_START';
export const SET_CURRENT_PAGE_PATIENTS_SUCCESS = 'SET_CURRENT_PAGE_PATIENTS_SUCCESS';
export const SET_CURRENT_PAGE_PATIENTS_FAILURE = 'SET_CURRENT_PAGE_PATIENTS_FAILURE';

export const setCurrentPagePatientsStart = createAction(SET_CURRENT_PAGE_PATIENTS_START);
export const setCurrentPagePatientsSuccess = createAction(SET_CURRENT_PAGE_PATIENTS_SUCCESS);
export const setCurrentPagePatientsFailure = createAction(SET_CURRENT_PAGE_PATIENTS_FAILURE);

export const setCurrentPagePatientsEpic = (action$, store) =>
  action$.ofType(SET_CURRENT_PAGE_PATIENTS_START)
    .map(action => setCurrentPagePatientsSuccess(action.payload))
    .catch(error => Observable.of(setCurrentPagePatientsFailure(error)))

export default function reducer(currentPagePatients = {}, action) {
  switch (action.type) {
    case SET_CURRENT_PAGE_PATIENTS_SUCCESS:
      return action.payload;
    default:
      return currentPagePatients;
  }
}
