import _ from 'lodash/fp';
import { createSelector } from 'reselect';

const patientTopThreeThingsSelector = createSelector(
  ({ patientsTopThreeThings }) => patientsTopThreeThings,
  (state, props) => _.getOr(null, 'match.params.userId', props),
  (patientsTopThreeThings, userId) => {
    let topThreeThings = {};
    if (patientsTopThreeThings[userId]) {
      topThreeThings = patientsTopThreeThings[userId];
    } else {
      topThreeThings = [{text: 'Loading ...'}, '', '', ''];
    }
    return topThreeThings;
  }
);

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
    patientTopThreeThingsSelector,
    patientVaccinationsSelector,
    (
        topThreeThings,
        vaccinations
    ) => {
        return {
            topThreeThings: topThreeThings,
            vaccinations: vaccinations,
        };
    }
);