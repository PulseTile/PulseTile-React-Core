import _ from 'lodash/fp';
import { createSelector } from 'reselect';

const appSettingsFormSelector = _.getOr({}, 'form.appSettingsFormSelector');
const personalFormSelector = _.getOr({}, 'form.personalFormSelector');
const contactFormSelector = _.getOr({}, 'form.contactFormSelector');
const usersAccountSelector = state => state.userAccount;

const patientsInfoSelector = state => state.patientsInfo;

const formStateSelector = createSelector(appSettingsFormSelector, personalFormSelector, contactFormSelector,
  formState => ({ formState }));

const patientInfoSelector = createSelector(
  patientsInfoSelector,
  patientsInfo => ({ patientsInfo })
);

const userAccountSelector = createSelector(
  usersAccountSelector,
  user => ({ user })
);

export { formStateSelector, patientInfoSelector, userAccountSelector };
