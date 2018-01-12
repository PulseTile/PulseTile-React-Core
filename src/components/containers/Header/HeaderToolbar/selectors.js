import _ from 'lodash/fp';
import { createSelector } from 'reselect';

import { getDDMMMYYYY } from '../../../../utils/time-helpers.utils';

const toolbarSelector = createSelector(
  ({ isSidebarVisible }) => isSidebarVisible,
  ({ patientsSummaries }) => patientsSummaries,
  (state, props) => _.getOr(null, 'match.params.userId', props),

  (isSidebarVisible, patientsSummaries, userId) => {
    const patientSummary = _.getOr({}, userId, patientsSummaries);
    const { name = '', gpName = '', gpAddress = '', dateOfBirth = '', gender = '', telephone = '' } = patientSummary;
    return ({
      isSidebarVisible,
      name,
      gpName,
      gpAddress,
      gender,
      telephone, //TODO should be preformatted
      userId,
      dateOfBirth: getDDMMMYYYY(dateOfBirth) });
  });

const routerSelector = createSelector(
  ({ router }) => router,
  router => ({ router })
);

export { toolbarSelector, routerSelector };
