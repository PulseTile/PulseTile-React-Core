import { createSelector } from 'reselect';

const sidebarVisibilitySelector = ({ isSidebarVisible }) => isSidebarVisible;
const patientsSummarySelector = ({ patientsSummaries }) => patientsSummaries;

const sidebarSelector = createSelector(
  sidebarVisibilitySelector,
  isSidebarVisible => ({ isSidebarVisible })
);

const patientsSummariesSelector = createSelector(
  patientsSummarySelector,
  patientsSummaries => ({ patientsSummaries })
);

export { sidebarSelector, patientsSummariesSelector };
