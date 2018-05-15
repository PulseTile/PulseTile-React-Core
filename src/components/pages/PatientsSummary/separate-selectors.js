import _ from 'lodash/fp';
import { createSelector } from 'reselect';
import { patientsSummaryLoading } from './patients-summary.config';

function getContentForTable(currentArray, userId) {
    let result = {};
    if (currentArray[userId]) {
        result = _.flow(_.getOr([], [userId]), _.map(item => item), arr => _.concat(arr, ['', '', '', '']), _.take(4))(currentArray);
    } else {
        result = [{text: patientsSummaryLoading}, '', '', ''];
    }
    return { result, userId };
}

export const patientProblemsSelector = createSelector(
    ({ patientsDiagnoses }) => patientsDiagnoses,
    (state, props) => _.getOr(null, 'match.params.userId', props),
    (patientsDiagnoses, userId) => {
        let problems = {};
        if (patientsDiagnoses[userId]) {
            problems = _.flow(_.getOr([], [userId]), _.map(item => item), arr => _.concat(arr, ['', '', '', '']), _.take(4))(patientsDiagnoses);
        } else {
            problems = [{text: patientsSummaryLoading}, '', '', ''];
        }
        return { problems, userId };
    }
);

export const patientContactsSelector = createSelector(
    ({ patientsContacts }) => patientsContacts,
    (state, props) => _.getOr(null, 'match.params.userId', props),
    (patientsContacts, userId) => {
        let contacts = {};
        if (patientsContacts[userId]) {
            contacts = _.flow(_.getOr([], [userId]), _.map(item => item), arr => _.concat(arr, ['', '', '', '']), _.take(4))(patientsContacts);
        } else {
            contacts = [{text: patientsSummaryLoading}, '', '', ''];
        }
        return { contacts, userId };
    }
);

export const patientAllergiesSelector = createSelector(
    ({ patientsAllergies }) => patientsAllergies,
    (state, props) => _.getOr(null, 'match.params.userId', props),
    (patientsAllergies, userId) => {
        let allergies = {};
        if (patientsAllergies[userId]) {
            allergies = _.flow(_.getOr([], [userId]), _.map(item => item), arr => _.concat(arr, ['', '', '', '']), _.take(4))(patientsAllergies);
        } else {
            allergies = [{text: patientsSummaryLoading}, '', '', ''];
        }
        return { allergies, userId };
    }
);

export const patientMedicationsSelector = createSelector(
    ({ patientsMedications }) => patientsMedications,
    (state, props) => _.getOr(null, 'match.params.userId', props),
    (patientsMedications, userId) => {
        let medications = {};
        if (patientsMedications[userId]) {
            medications = _.flow(_.getOr([], [userId]), _.map(item => item), arr => _.concat(arr, ['', '', '', '']), _.take(4))(patientsMedications);
        } else {
            medications = [{text: patientsSummaryLoading}, '', '', ''];
        }
        return { medications, userId };
    }
);

export const patientVaccinationsSelector = createSelector(
    ({ patientsVaccinations }) => patientsVaccinations,
    (state, props) => _.getOr(null, 'match.params.userId', props),
    (patientsVaccinations, userId) => {
        let vaccinations = {};
        if (patientsVaccinations[userId]) {
            vaccinations = _.flow(_.getOr([], [userId]), _.map(item => item), arr => _.concat(arr, ['', '', '', '']), _.take(4))(patientsVaccinations);
        } else {
            vaccinations = [{text: patientsSummaryLoading}, '', '', ''];
        }
        return { vaccinations, userId };
    }
);

export const patientTopThreeThingsSelector = createSelector(
    ({ patientsTopThreeThings }) => patientsTopThreeThings,
    (state, props) => _.getOr(null, 'match.params.userId', props),
    (patientsTopThreeThings, userId) => {
        let topThreeThings = {};
        if (patientsTopThreeThings[userId]) {
            topThreeThings = _.flow(_.getOr([], [userId]), _.map(item => item), arr => _.concat(arr, ['', '', '', '']), _.take(4))(patientsTopThreeThings);
        } else {
            topThreeThings = [{text: patientsSummaryLoading}, '', '', ''];
        }
        return { topThreeThings, userId };
    }
);

