import _ from 'lodash/fp';
import { createSelector } from 'reselect';

import { getDDMMMYYYY } from '../../../../utils/time-helpers.utils';

const toolbarSelector = createSelector(
  ({ isSidebarVisible }) => isSidebarVisible,
  ({ patientsDemographics }) => patientsDemographics,
  (state, props) => _.getOr(null, 'match.params.userId', props),
  (isSidebarVisible, patientsDemographics, userId) => {
    const patientsInfo = _.getOr({}, userId, patientsDemographics);
    const { name = '', gpName = '', gpAddress = '', dateOfBirth = '', gender = '', telephone = '' } = patientsInfo;
    return ({
      patientsDemographics,
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
