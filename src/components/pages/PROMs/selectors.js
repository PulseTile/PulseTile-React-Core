import { createSelector } from 'reselect';
import _ from 'lodash/fp';

import { operationsOnCollection } from '../../../utils/plugin-helpers.utils';
import { valuesNames } from './forms.config';

const promsCreateFormSelector = _.getOr({}, 'form.promsCreateFormSelector');
const promsDetailFormSelector = _.getOr({}, 'form.promsDetailFormSelector');

const patientPromsSelector = createSelector(
  ({ patientsProms }) => patientsProms,
  (state, props) => _.getOr(null, 'match.params.userId', props),
  (patientsProms, userId) => {
    const allProms = operationsOnCollection.modificateDateForTable(patientsProms[userId], valuesNames.DATE_CREATED);
    return ({ allProms, userId });
  }
);

const promsDetailFormStateSelector = createSelector(promsDetailFormSelector,
  promsDetailFormState => ({ promsDetailFormState }));

const promsCreateFormStateSelector = createSelector(promsCreateFormSelector,
  promsCreateFormState => ({ promsCreateFormState }));

const patientPromsDetailSelector = createSelector(
  ({ promsDetail }) => promsDetail,
  (state, props) => _.getOr(null, 'match.params.userId', props),
  (promsDetail, userId) => {
    const promDetail = promsDetail[userId];
    return ({ promDetail, userId });
  }
);

export { patientPromsSelector, promsDetailFormStateSelector, promsCreateFormStateSelector, patientPromsDetailSelector }
