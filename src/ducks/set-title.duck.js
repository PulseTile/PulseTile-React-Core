import { createAction } from 'redux-actions';

export const SET_TITLE = 'SET_TITLE';
export const SET_TITLE_SUCCESS = 'SET_TITLE_SUCCESS';

export const setTitle = createAction(SET_TITLE);
export const setTitleSuccess = createAction(SET_TITLE_SUCCESS);

const setTitleOnBrowser = (browserTitle) => {
  window.document.title = browserTitle ? browserTitle : '';
};

export const setTitleEpic = (action$, store) =>
  action$.ofType(SET_TITLE)
    .map(({ payload }) => {
      setTitleOnBrowser(payload);
      return setTitleSuccess(payload);
    });
