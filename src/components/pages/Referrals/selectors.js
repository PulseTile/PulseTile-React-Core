import { createSelector } from 'reselect';
import _ from 'lodash/fp';

import { operationsOnCollection } from '../../../utils/plugin-helpers.utils';
import { valuesNames } from './forms.config';

const referralsCreateFormSelector = _.getOr({}, 'form.referralsCreateFormSelector');
const referralsDetailFormSelector = _.getOr({}, 'form.referralsDetailFormSelector');
const metaPanelFormSelector = _.getOr({}, 'form.metaPanelFormSelector');

const patientReferralsSelector = createSelector(
  ({ patientsReferrals }) => patientsReferrals,
  (state, props) => _.getOr(null, 'match.params.userId', props),
  (patientsReferrals, userId) => {
    const allReferrals = operationsOnCollection.modificate(patientsReferrals[userId], [{
      key: valuesNames.DATE,
      fn: item => new Date(item).getTime(),
    }]);
    return ({ allReferrals, userId });
  }
);

const referralsDetailFormStateSelector = createSelector(referralsDetailFormSelector,
  referralsDetailFormState => ({ referralsDetailFormState }));

const referralsCreateFormStateSelector = createSelector(referralsCreateFormSelector,
  referralsCreateFormState => ({ referralsCreateFormState }));

const metaPanelFormStateSelector = createSelector(metaPanelFormSelector,
  metaPanelFormState => ({ metaPanelFormState }));

const patientReferralsDetailSelector = createSelector(
  ({ referralsDetail }) => referralsDetail,
  (state, props) => _.getOr(null, 'match.params.userId', props),
  (referralsDetail, userId) => {
    const referralDetail = referralsDetail[userId];
    return ({ referralDetail, userId });
  }
);

export { patientReferralsSelector, referralsDetailFormStateSelector, referralsCreateFormStateSelector, metaPanelFormStateSelector, patientReferralsDetailSelector }
