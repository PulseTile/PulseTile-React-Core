import { createSelector } from 'reselect';
import _ from 'lodash/fp';

const vitalsCreateFormSelector = _.getOr({}, 'form.vitalsCreateFormSelector')
const vitalsDetailFormSelector = _.getOr({}, 'form.vitalsDetailFormSelector')

const patientVitalsSelector = createSelector(
  ({ patientsVitals }) => patientsVitals,
  (state, props) => _.getOr(null, 'match.params.userId', props),
  (patientsVitals, userId) => {
    const allVitals = patientsVitals[userId];
    return ({ allVitals, userId });
  }
);

const vitalsDetailFormStateSelector = createSelector(vitalsDetailFormSelector,
  vitalsDetailFormState => ({ vitalsDetailFormState }));

const vitalsCreateFormStateSelector = createSelector(vitalsCreateFormSelector,
  vitalsCreateFormState => ({ vitalsCreateFormState }));

const patientVitalsDetailSelector = createSelector(
  ({ vitalsDetail }) => vitalsDetail,
  (state, props) => _.getOr(null, 'match.params.userId', props),
  (vitalsDetail, userId) => {
    const vitalDetail = vitalsDetail[userId];
    return ({ vitalDetail, userId });
  }
);

export { patientVitalsSelector, vitalsDetailFormStateSelector, vitalsCreateFormStateSelector, patientVitalsDetailSelector }
