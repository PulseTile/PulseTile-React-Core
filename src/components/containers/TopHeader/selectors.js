import { createSelector } from 'reselect';

const userAccountSelector = createSelector(
  ({ router }) => router,
  ({ userAccount }) => userAccount,
  (router, userAccount) => ({ router, userAccount })
);

const patientsInfoSelector = state => state.patientsInfo;

const patientInfoSelector = createSelector(
  patientsInfoSelector,
  patientsInfo => ({ patientsInfo })
);

export { userAccountSelector, patientInfoSelector };
