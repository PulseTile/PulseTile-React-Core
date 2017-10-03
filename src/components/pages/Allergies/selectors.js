import { createSelector } from 'reselect';
import _ from 'lodash/fp';

const allergiesCreateFormSelector = _.getOr({}, 'form.allergiesCreateFormSelector');

const patientAllergiesSelector = createSelector(
  ({ patientsAllergies }) => patientsAllergies,
  (state, props) => _.getOr(null, 'match.params.userId', props),
  (patientsAllergies, userId) => {
    const allAllergies = patientsAllergies[userId];
    return ({ allAllergies, userId});
  }
);

const formStateSelector = createSelector(allergiesCreateFormSelector,
  formState => ({ formState }));

const patientAllergiesDetailSelector = createSelector(
  ({ allergiesDetail }) => allergiesDetail,
  (state, props) => _.getOr(null, 'match.params.userId', props),
  (allergiesDetail, userId) => {
    const allergieDetail = allergiesDetail[userId];
    return ({ allergieDetail, userId});
  }
);

export { patientAllergiesSelector, formStateSelector, patientAllergiesDetailSelector }
