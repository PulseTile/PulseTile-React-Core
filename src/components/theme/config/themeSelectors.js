import _ from 'lodash/fp';
import { createSelector } from 'reselect';

const patientVaccinationsSelector = createSelector(
  ({ patientsVaccinations }) => patientsVaccinations,
  (state, props) => _.getOr(null, 'match.params.userId', props),
  (patientsVaccinations, userId) => {
    let vaccinations = {};
    if (patientsVaccinations[userId]) {
      vaccinations = patientsVaccinations[userId];
    } else {
      vaccinations = [{text: 'Loading ...'}, '', '', ''];
    }
    return vaccinations;
  }
);

export const themeSynopsisSelector = createSelector(
    patientVaccinationsSelector,
    (
        vaccinations
    ) => {
        return {
            vaccinations: vaccinations,
        };
    }
);