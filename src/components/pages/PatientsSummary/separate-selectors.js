import _ from 'lodash/fp';
import { createSelector } from 'reselect';

const patientProblemsSelector = createSelector(
  ({ patientsDiagnoses }) => patientsDiagnoses,
  (state, props) => _.getOr(null, 'match.params.userId', props),
  (patientsDiagnoses, userId) => {
    let problems = {};
    if (patientsDiagnoses[userId]) {
      problems = patientsDiagnoses[userId];
      } else {
        problems = [{text: 'Loading ...'}, '', '', ''];
      }
      return problems;
  }
);

const patientContactsSelector = createSelector(
  ({ patientsContacts }) => patientsContacts,
  (state, props) => _.getOr(null, 'match.params.userId', props),
  (patientsContacts, userId) => {
    let contacts = {};
    if (patientsContacts[userId]) {
      contacts = patientsContacts[userId];
      } else {
        contacts = [{text: 'Loading ...'}, '', '', ''];
      }
      return contacts;
  }
);

const patientAllergiesSelector = createSelector(
  ({ patientsAllergies }) => patientsAllergies,
  (state, props) => _.getOr(null, 'match.params.userId', props),
  (patientsAllergies, userId) => {
    let allergies = {};
    if (patientsAllergies[userId]) {
      allergies = patientsAllergies[userId];
    } else {
      allergies = [{text: 'Loading ...'}, '', '', ''];
    }
    return allergies;
  }
);

const patientMedicationsSelector = createSelector(
  ({ patientsMedications }) => patientsMedications,
  (state, props) => _.getOr(null, 'match.params.userId', props),
  (patientsMedications, userId) => {
    let medications = {};
    if (patientsMedications[userId]) {
      medications = patientsMedications[userId];
    } else {
      medications = [{text: 'Loading ...'}, '', '', ''];
    }
    return medications;
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

export const summarySynopsisSelector  = createSelector(
  patientProblemsSelector,
  patientContactsSelector,
  patientAllergiesSelector,
  patientMedicationsSelector,
  patientVaccinationsSelector,
  patientTopThreeThingsSelector,
  (problems, contacts, allergies, medications, vaccinations, topThree) => {
    return {
      boards: {
        problems: problems,
        contacts: contacts,
        allergies: allergies,
        medications: medications,
        vaccinations: vaccinations,
        topThreeThings: topThree,
      }
    };
  }
);

