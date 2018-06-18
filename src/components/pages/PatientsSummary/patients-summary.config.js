import React from 'react';

export const patientsSummaryConfig = [
  {
    key: 'problems',
    title: 'Diagnosis',
    state: 'diagnoses',
    titleCheckboxes: 'Diagnosis',
    nameCheckboxes: 'problems',
    imgPreview: '/images/patients-summary/problems.jpg',
    isDefaultSelected: true,
  }, {
    key: 'contacts',
    title: 'Contacts',
    titleCheckboxes: 'Contacts',
    state: 'contacts',
    nameCheckboxes: 'contacts',
    imgPreview: '/images/patients-summary/contacts.jpg',
    isDefaultSelected: true,
  }, {
    key: 'allergies',
    title: 'Allergies',
    titleCheckboxes: 'Allergies',
    state: 'allergies',
    nameCheckboxes: 'allergies',
    imgPreview: '/images/patients-summary/allergies.jpg',
    isDefaultSelected: true,
  }, {
    key: 'medications',
    title: 'Medications',
    titleCheckboxes: 'Medications',
    state: 'medications',
    nameCheckboxes: 'medications',
    imgPreview: '/images/patients-summary/medications.jpg',
    isDefaultSelected: true,
  },
  // {
  //   key: 'vaccinations',
  //   title: 'Vaccinations',
  //   titleCheckboxes: 'Vaccinations',
  //   state: 'vaccinations',
  //   nameCheckboxes: 'vaccinations',
  //   imgPreview: '/images/patients-summary/vaccinations.jpg',
  //   isDefaultSelected: true,
  // },{
  //   key: 'topThreeThings',
  //   title: 'Top 3 Things',
  //   titleCheckboxes: 'Top 3 Things',
  //   state: 'topThreeThings',
  //   nameCheckboxes: 'topThreeThings',
  //   imgPreview: '/images/patients-summary/top3.jpg',
  //   isDefaultSelected: true,
  // },
];

export const patientsSummaryLoading = 'Loading ...';

export const defaultViewOfBoardsSelected = {
  full: true,
  preview: false,
  list: false,
};
