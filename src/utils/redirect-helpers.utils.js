import _ from 'lodash/fp';

import { clientUrls } from '../config/client-urls.constants';

export const redirectAccordingRole = (user) => {
  const locationHrefBeforeLogin = localStorage.getItem('locationHrefBeforeLogin');

  if (!user) return;

  // Direct different roles to different pages at login
  switch (user.role) {
    case 'IDCR': {
      if (locationHrefBeforeLogin) {
        localStorage.removeItem('locationHrefBeforeLogin');
        location.href = locationHrefBeforeLogin;
      }
      break;
    }
    case 'PHR': {
      const userSummaryUrl = `/#${clientUrls.PATIENTS}/${_.get('nhsNumber', user)}/${clientUrls.PATIENTS_SUMMARY}`;
      //Trick for PHR user login
      if (locationHrefBeforeLogin &&
         (locationHrefBeforeLogin.indexOf(user.nhsNumber) > -1 ||
          locationHrefBeforeLogin.indexOf('profile') > -1)) {

        location.href = locationHrefBeforeLogin;

      } else if ((location.href.indexOf(user.nhsNumber) === -1) &&
                (location.href.indexOf('profile') === -1)) {
        // if (locationHrefBeforeLogin) {
        //   let path = locationHrefBeforeLogin.split('#/')[1];
        //   if (path !== '' ||
        //     path !== 'charts') {
        //     ConfirmationRedirectModal.openModal(currentUser.nhsNumber);
        //   }
        // }

        return location.href = userSummaryUrl;
      }

      localStorage.removeItem('locationHrefBeforeLogin');

      break;
    }
    default: {
      location.href = `/#${clientUrls.CHARTS}`;
    }
  }

  window.document.getElementsByTagName('body')[0].classList.remove('loading');
};
