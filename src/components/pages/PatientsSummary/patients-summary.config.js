import React from 'react';

export const patientsSummaryConfig = [{
    key: 'problems',
    title: 'Problems',
    state: 'diagnoses',
    nameCheckboxes: 'problems',
    isDefaultSelected: true,
 }, {
    key: 'contacts',
    title: 'Contacts',
    state: 'contacts',
    nameCheckboxes: 'contacts',
    isDefaultSelected: true,
 }, {
    key: 'allergies',
    title: 'Allergies',
    state: 'allergies',
    nameCheckboxes: 'allergies',
    isDefaultSelected: true,
 }, {
    key: 'medications',
    title: 'Medications',
    state: 'medications',
    nameCheckboxes: 'medications',
    isDefaultSelected: true,
  },
];

export const patientsSummaryLoading = 'Loading ...';
