export const valuesNames = {
  SELECT_AGE: 'selectAgeField',
  DATE_OF_BIRTH: 'dateOfBirth',
  AGE_RANGE: 'ageRange',
  MALE: 'sexMale',
  FEMALE: 'sexFemale',
  SEARCH_TYPE: 'type',
  QUERY_CONTAINS: 'queryContains',
  QUERY_TEXT: 'queryText',
  MIN_VALUE: 'minValue',
  MAX_VALUE: 'maxValue',
};

export const valuesLabels = {
  SELECT_AGE: 'Select Age Params',
  DATE_OF_BIRTH: 'Date of Birth',
  AGE_RANGE: 'Age Range',
  GENDER: 'Gender',
  SEARCH_TYPE: 'Search Type',
  QUERY_CONTAINS: 'Search Query',
};

export const optionsForAgeField = [{
  value: 'birthday',
  title: 'Date of Birth',
}, {
  value: 'range',
  title: 'Age Range',
}];

export const optionsForSearchType = [
  { title: 'Allergies', value: 'allergies' },
  { title: 'Problems / Diagnosis', value: 'diagnosis' },
  { title: 'Procedures', value: 'procedures' },
  { title: 'Medications', value: 'medications' },
];

export const optionsForSearchQuery = [
  { title: 'contains', value: true },
];

