import { createSelector } from 'reselect';
import _ from 'lodash/fp';

import { operationsOnCollection } from '../../../utils/plugin-helpers.utils';
import { valuesNames } from './forms.config';

const transfersOfCareCreateFormSelector = _.getOr({}, 'form.transfersOfCareCreateFormSelector');
const transfersOfCareDetailFormSelector = _.getOr({}, 'form.transfersOfCareDetailFormSelector');

const patientTransfersOfCareSelector = createSelector(
  ({ patientsTransfersOfCare }) => patientsTransfersOfCare,
  (state, props) => _.getOr(null, 'match.params.userId', props),
  (patientsTransfersOfCare, userId) => {
    const allTransfersOfCare = operationsOnCollection.modificate(patientsTransfersOfCare[userId], [{
      key: valuesNames.DATE_TIME,
      fn: item => new Date(item).getTime(),
    }, {
      key: valuesNames.NUMBER_TEXT,
      fn: (el, index) => `Transfer #${index + 1}`,
    }, {
      key: valuesNames.NUMBER,
      fn: (el, index) => index + 1,
    }]);
    return ({ allTransfersOfCare, userId });
  }
);

const transfersOfCareDetailFormStateSelector = createSelector(transfersOfCareDetailFormSelector,
  transfersOfCareDetailFormState => ({ transfersOfCareDetailFormState }));

const transfersOfCareCreateFormStateSelector = createSelector(transfersOfCareCreateFormSelector,
  transfersOfCareCreateFormState => ({ transfersOfCareCreateFormState }));

const patientTransfersOfCareDetailSelector = createSelector(
  ({ transfersOfCareDetail }) => transfersOfCareDetail,
  (state, props) => _.getOr(null, 'match.params.userId', props),
  (transfersOfCareDetail, userId) => {
    const transferOfCareDetail = transfersOfCareDetail[userId];
    return ({ transferOfCareDetail, userId });
  }
);

export { patientTransfersOfCareSelector, transfersOfCareDetailFormStateSelector, transfersOfCareCreateFormStateSelector, patientTransfersOfCareDetailSelector }
