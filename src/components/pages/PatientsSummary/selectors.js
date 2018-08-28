import _ from 'lodash/fp';
import { createSelector } from 'reselect';
import { themeSynopsisSelector } from '../../theme/config/themeSelectors';

function getCommonSelector(patientProblemsSelector, patientContactsSelector, patientAllergiesSelector, patientMedicationsSelector, themeSynopsisSelector) {
  let result = createSelector(
      patientProblemsSelector,
      patientContactsSelector,
      patientAllergiesSelector,
      patientMedicationsSelector,
      (
        problems,
        contacts,
        allergies,
        medications,
      ) => {
        return {
          boards: {
            problems: problems,
            contacts: contacts,
            allergies: allergies,
            medications: medications,
          },
        };
      }
    );
    if (themeSynopsisSelector) {
      result = createSelector(
        patientProblemsSelector,
        patientContactsSelector,
        patientAllergiesSelector,
        patientMedicationsSelector,
        themeSynopsisSelector,
        (
          problems,
          contacts,
          allergies,
          medications,
          theme,
        ) => {
          const coreResult = {
            problems: problems,
            contacts: contacts,
            allergies: allergies,
            medications: medications,
          };
          const themeResult = theme;
          const totalResult = Object.assign(coreResult, themeResult);
          return {
            boards: totalResult,
            };
          }
        );
    }
    return result;
}

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

export const summarySynopsisSelector = getCommonSelector(
  patientProblemsSelector,
  patientContactsSelector,
  patientAllergiesSelector,
  patientMedicationsSelector,
  themeSynopsisSelector
);
