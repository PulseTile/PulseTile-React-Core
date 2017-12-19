import React from 'react';

export const patientsSummaryConfig = [
  { key: 'problems', title: 'Problems' },
  { key: 'contacts', title: 'Contacts' },
  { key: 'allergies', title: 'Allergies' },
  { key: 'medications', title: 'Medications' },
  { key: 'vaccinations', title: 'Vaccinations' },
];

export const defaultCategorySelected = {
  problems: true,
  contacts: true,
  allergies: true,
  medications: true,
  vaccinations: true,
};

export const defaultViewOfBoardsSelected = {
  full: true,
  preview: false,
  list: false
};