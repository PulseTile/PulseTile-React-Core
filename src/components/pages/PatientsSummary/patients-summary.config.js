import React from 'react';
import imgAllergies from '../../../assets/images/patients-summary/allergies.jpg';
import imgProblems from '../../../assets/images/patients-summary/problems.jpg';
import imgContacts from '../../../assets/images/patients-summary/contacts.jpg';
import imgMedications from '../../../assets/images/patients-summary/medications.jpg';
import imgVaccinations from '../../../assets/images/patients-summary/vaccinations.jpg';
import imgTopThreeThings from '../../../assets/images/patients-summary/top3.jpg';

export const patientsSummaryConfig = [{
    key: 'problems',
    title: 'Problems / Diagnosis',
    state: 'diagnoses',
    titleCheckboxes: 'Problems',
    nameCheckboxes: 'problems',
    imgPreview: imgProblems,
    isDefaultSelected: true,
  }, {
    key: 'contacts',
    title: 'Contacts',
    titleCheckboxes: 'Contacts',
    state: 'contacts',
    nameCheckboxes: 'contacts',
    imgPreview: imgContacts,
    isDefaultSelected: true,
  }, {
    key: 'allergies',
    title: 'Allergies',
    titleCheckboxes: 'Allergies',
    state: 'allergies',
    nameCheckboxes: 'allergies',
    imgPreview: imgAllergies,
    isDefaultSelected: true,
  }, {
    key: 'medications',
    title: 'Medications',
    titleCheckboxes: 'Medications',
    state: 'medications',
    nameCheckboxes: 'medications',
    imgPreview: imgMedications,
    isDefaultSelected: true,
  }, {
    key: 'vaccinations',
    title: 'Vaccinations',
    titleCheckboxes: 'Vaccinations',
    state: 'vaccinations',
    nameCheckboxes: 'vaccinations',
    imgPreview: imgVaccinations,
    isDefaultSelected: true,
  }, {
    key: 'topThreeThings',
    title: 'Top 3 Things',
    titleCheckboxes: 'Top 3 Things',
    state: 'topThreeThings',
    nameCheckboxes: 'topThreeThings',
    imgPreview: imgTopThreeThings,
    isDefaultSelected: true,
  },
];

export const patientsSummaryLoading = 'Loading ...';

export const defaultViewOfBoardsSelected = {
  full: true,
  preview: false,
  list: false
};
