import { createAction } from 'redux-actions';
import { themeConfigs } from '../themes.config';

export const SET_THEME = 'SET_THEME';
export const SET_THEME_SUCCESS = 'SET_THEME_SUCCESS';

export const setTheme = createAction(SET_THEME);
export const setThemeSuccess = createAction(SET_THEME_SUCCESS);

const setThemeOnBody = (theme) => {
  let themeName;

  if (themeConfigs.isLeedsPHRTheme) {
    themeName = 'themeLeedsPHR';
  } else {
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
  }

  window.document.getElementsByTagName('body')[0].classList.add(themeName);
}

export const setThemeEpic = (action$, store) =>
  action$.ofType(SET_THEME)
    .map(({ payload }) => {
      setThemeOnBody(payload);
      return setThemeSuccess(payload);
    });
