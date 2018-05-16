import _ from 'lodash/fp';
import { createSelector } from 'reselect';
import { patientsSummaryLoading } from './patients-summary.config';

export const patientProblemsSelector = createSelector(
    ({ patientsDiagnoses }) => patientsDiagnoses,
    (state, props) => _.getOr(null, 'match.params.userId', props),
    (patientsDiagnoses, userId) => {
        let problems = {};
        if (patientsDiagnoses[userId]) {
            problems = patientsDiagnoses[userId];
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
            contacts = patientsContacts[userId];
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
            allergies = patientsAllergies[userId];
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
            medications = patientsMedications[userId];
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
            vaccinations = patientsVaccinations[userId];
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
            topThreeThings = patientsTopThreeThings[userId];
        } else {
            topThreeThings = [{text: patientsSummaryLoading}, '', '', ''];
        }
        return { topThreeThings, userId };
    }
);

