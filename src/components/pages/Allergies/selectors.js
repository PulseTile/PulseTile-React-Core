import { createSelector } from 'reselect';
import _ from 'lodash/fp';

const allergiesCreateFormSelector = _.getOr({}, 'form.allergiesCreateFormSelector');

const patientAllergiesSelector = createSelector(
  allergiesCreateFormSelector,
  formState => ({ formState }),
  ({ patientsAllergies }) => patientsAllergies,
  (state, props) => _.getOr(null, 'match.params.userId', props),
  (patientsAllergies, userId) => {
    const allAllergies = patientsAllergies[userId];
    return ({ allAllergies });
  }
);

export default patientAllergiesSelector;
