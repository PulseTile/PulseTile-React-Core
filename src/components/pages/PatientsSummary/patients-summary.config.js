import React from 'react';
import { themePatientSummaryConfig } from '../../theme/config/plugins';
import {
  allergiesPrevImage,
  problemsPrevImage,
  contactsPrevImage,
  medicationsPrevImage,
} from './ImageSources';

const corePatientsSummaryConfig = [
  {
    key: 'problems',
    title: 'Diagnosis',
    state: 'diagnoses',
    titleCheckboxes: 'Diagnosis',
    nameCheckboxes: 'problems',
    imgPreview: problemsPrevImage,
    isDefaultSelected: true,
  }, {
    key: 'contacts',
    title: 'Contacts',
    titleCheckboxes: 'Contacts',
    state: 'contacts',
    nameCheckboxes: 'contacts',
    imgPreview: contactsPrevImage,
    isDefaultSelected: true,
  }, {
    key: 'allergies',
    title: 'Allergies',
    titleCheckboxes: 'Allergies',
    state: 'allergies',
    nameCheckboxes: 'allergies',
    imgPreview: allergiesPrevImage,
    isDefaultSelected: true,
  }, {
    key: 'medications',
    title: 'Medications',
    titleCheckboxes: 'Medications',
    state: 'medications',
    nameCheckboxes: 'medications',
    imgPreview: medicationsPrevImage,
    isDefaultSelected: true,
  },
];

export const patientsSummaryConfig = corePatientsSummaryConfig.concat(themePatientSummaryConfig);

export const patientsSummaryLoading = 'Loading ...';

export const defaultViewOfBoardsSelected = {
  full: true,
  preview: false,
  list: false,
};
