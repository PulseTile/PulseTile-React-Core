import { createSelector } from 'reselect';
import _ from 'lodash/fp';

const transfersOfCareCreateFormSelector = _.getOr({}, 'form.transfersOfCareCreateFormSelector')
const transfersOfCareDetailFormSelector = _.getOr({}, 'form.transfersOfCareDetailFormSelector')

const patientTransfersOfCareSelector = createSelector(
  ({ patientsTransfersOfCare }) => patientsTransfersOfCare,
  (state, props) => _.getOr(null, 'match.params.userId', props),
  (patientsTransfersOfCare, userId) => {
    const allTransfersOfCare = patientsTransfersOfCare[userId];
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
