import { createSelector } from 'reselect';
import _ from 'lodash/fp';

const sidebarVisibilitySelector = ({ isSidebarVisible }) => isSidebarVisible;
const userAccountSelector = ({ userAccount }) => userAccount;

const sidebarAndUserSelector = createSelector(
  sidebarVisibilitySelector,
  userAccountSelector,
  (isSidebarVisible, userAccount) => ({ isSidebarVisible, userAccount })
);

const mainSelector = createSelector(
  ({ patientsSummaries }) => patientsSummaries,
  (state, props) => _.getOr(null, 'match.params.userId', props),
  (patientSummeriesParams) => {
    return ({ patientSummeriesParams })
  }
);

export { sidebarAndUserSelector, mainSelector };
