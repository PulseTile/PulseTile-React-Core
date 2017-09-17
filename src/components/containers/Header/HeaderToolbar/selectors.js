import _ from 'lodash/fp';
import { createSelector } from 'reselect';

import { getDDMMMYYYY } from '../../../../utils/time-helpers.utils';

const patientToolbarSelector = createSelector(
  ({ patientsSummaries }) => patientsSummaries,
  (state, props) => _.getOr(null, 'match.params.userId', props),
  (patientsSummaries, userId) => {
    const patientSummary = _.getOr({}, userId, patientsSummaries);
    const { name = '', gpName = '', gpAddress = '', dateOfBirth = '', gender = '', telephone = '' } = patientSummary;
    return ({
      name,
      gpName,
      gpAddress,
      gender,
      telephone, //TODO should be preformatted
      userId,
      dateOfBirth: getDDMMMYYYY(dateOfBirth) });
  });

export default patientToolbarSelector;
