import _ from 'lodash/fp';
import { createAction } from 'redux-actions';

export const SET_LOGO = 'SET_LOGO';
export const SET_LOGO_SUCCESS = 'SET_LOGO_SUCCESS';

export const setLogo = createAction(SET_LOGO);
export const setLogoSuccess = createAction(SET_LOGO_SUCCESS);

const setLogoOnImage = (logo) => {
  const image = window.document.getElementsByClassName('logo-img');
  _.head(image).src = logo;
};

export const setLogoEpic = (action$, store) =>
  action$.ofType(SET_LOGO)
    .map(({ payload }) => {
      setLogoOnImage(payload);
      return setLogoSuccess(payload)
    });
