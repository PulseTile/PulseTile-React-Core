import React from 'react';
import { get } from 'lodash';
import { themePatientSummaryConfig } from '../../theme/config/plugins';
import {
  allergiesPrevImage,
  problemsPrevImage,
  contactsPrevImage,
  medicationsPrevImage,
} from './ImageSources';
import { themeConfigs } from '../../../themes.config';

import clipboard from './../../../assets/images/icn/clipboard.png' ;
import phone from './../../../assets/images/icn/phone.png' ;
import flower from './../../../assets/images/icn/flower.png' ;
import pill from './../../../assets/images/icn/pill.png' ;

const problemsTitle = get(themeConfigs.patientsSummaryTitles, 'diagnoses', 'Problems / Diagnosis');
const contactsTitle = get(themeConfigs.patientsSummaryTitles, 'contacts', 'Contacts');
const allergiesTitle = get(themeConfigs.patientsSummaryTitles, 'allergies', 'Allergies');
const medicationsTitle = get(themeConfigs.patientsSummaryTitles, 'medications', 'Medications');

const corePatientsSummaryConfig = [
  {
    key: 'problems',
    title: problemsTitle,
    state: 'diagnoses',
    titleCheckboxes: problemsTitle,
    nameCheckboxes: 'problems',
    imgPreview: problemsPrevImage,
    isDefaultSelected: true,
    getImg: clipboard
  }, {
    key: 'contacts',
    title: contactsTitle,
    titleCheckboxes: contactsTitle,
    state: 'contacts',
    nameCheckboxes: 'contacts',
    imgPreview: contactsPrevImage,
    isDefaultSelected: true,
    getImg: phone
  }, {
    key: 'allergies',
    title: allergiesTitle,
    titleCheckboxes: allergiesTitle,
    state: 'allergies',
    nameCheckboxes: 'allergies',
    imgPreview: allergiesPrevImage,
    isDefaultSelected: true,
    getImg: flower
  }, {
    key: 'medications',
    title: medicationsTitle,
    titleCheckboxes: medicationsTitle,
    state: 'medications',
    nameCheckboxes: 'medications',
    imgPreview: medicationsPrevImage,
    isDefaultSelected: true,
    getImg: pill
  },
];

export const patientsSummaryConfig = corePatientsSummaryConfig.concat(themePatientSummaryConfig);

export const defaultViewOfBoardsSelected = {
  full: true,
  preview: false,
  list: false,
};
