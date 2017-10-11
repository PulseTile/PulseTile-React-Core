import _ from 'lodash/fp';
import { createAction } from 'redux-actions';

export const SET_THEME = 'SET_THEME';
export const SET_THEME_SUCCESS = 'SET_THEME_SUCCESS';

export const setTheme = createAction(SET_THEME);
export const setThemeSuccess = createAction(SET_THEME_SUCCESS);

const setThemeOnBody = (theme) => {
  let themeName;

  switch (theme) {
    case 'purple':
      themeName = 'themePurple';
      break;
    case 'gray':
      themeName = 'themeGray';
      break;
    default:
      themeName = 'themeDefault';
  }

  _.head(window.document.getElementsByTagName('body')).className = themeName;
}

export const setThemeEpic = (action$, store) =>
  action$.ofType(SET_THEME)
    .map(({ payload }) => {
      setThemeOnBody(payload);
      return setThemeSuccess(payload)
    });
