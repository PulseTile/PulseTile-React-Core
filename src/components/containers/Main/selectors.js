import { createSelector } from 'reselect';
import _ from 'lodash/fp';

const sidebarVisibilitySelector = ({ isSidebarVisible }) => isSidebarVisible;
const userAccountSelector = ({ userAccount }) => userAccount;
const initialiseDataSelector = ({ initialiseData }) => initialiseData;

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

const initialiseSelector = createSelector(
  initialiseDataSelector,
  initialiseData => ({ initialiseData })
);

export { sidebarAndUserSelector, mainSelector, initialiseSelector };
