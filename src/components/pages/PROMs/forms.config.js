export const valuesNames = {
  NAME: 'name',
  SCORE: 'score',
  DATE_CREATED: 'dateCreated',
  SOURCE: 'source',
  SOURCE_ID: 'sourceId',
  AUTHOR: 'author',

  RECORDS: 'records',
  RECORDS_NAME: 'name',
  RECORDS_TYPE: 'typeTitle',
  RECORDS_DATE: 'date',
  RECORDS_SOURCE: 'source',

  SPECIFIC_Q1: 'specific_Q1',
  SPECIFIC_Q2: 'specific_Q2',
  SPECIFIC_Q3: 'specific_Q3',
  SPECIFIC_Q4: 'specific_Q4',

};

export const valuesLabels = {
  NAME: 'Name of PROM',
  SCORE: 'Score',
  DATE_CREATED: 'Date',
  SOURCE: 'Source',
  SOURCE_ID: 'Source ID',
  AUTHOR: 'Author',

  RECORDS: 'Records',
  RECORDS_NAME: 'Name',
  RECORDS_TYPE: 'Type',
  RECORDS_DATE: 'Date',
  RECORDS_SOURCE: 'Source',
  RECORDS_NOT_EXIST: 'No records added',

  QUESTION_PAIN: 'Q1 Pain',
  QUESTION_LIMITATIONS: 'Q2 Activity limitations / support',
  QUESTION_WALKING: 'Q3 Walking',
  QUESTION_WALKING_SURFACES: 'Q4 Walking Surfaces',
};

export const questionPainOptions = [
  { value: 'No Pain', title: 'No Pain' },
  { value: 'Mild', title: 'Mild' },
  { value: 'Moderate', title: 'Moderate' },
  { value: 'Severe', title: 'Severe' },
];

export const questionLimitationsOptions = [
  { value: 'No limitations', title: 'No limitations' },
  { value: 'Occasional limitations', title: 'Occasional limitations' },
  { value: 'Moderate limitations', title: 'Moderate limitations' },
  { value: 'Severe limitations', title: 'Severe limitations' },
];

export const questionWalkingOptions = [
  { value: 'Around the house', title: 'Around the house' },
  { value: 'Less than 1 block', title: 'Less than 1 block' },
  { value: 'Less than 1 mile', title: 'Less than 1 mile' },
  { value: 'More than 1 mile', title: 'More than 1 mile' },
];

export const questionWalkingSurfacesOptions = [
  { value: 'No difficulty', title: 'No difficulty' },
  { value: 'Some difficulty', title: 'Some difficulty' },
  { value: 'Severe difficulty', title: 'Severe difficulty' },
];

export const marksForPromsRange = {
  0: '0',
  1: '1',
  2: '2',
  3: '3',
  4: '4',
  5: '5',
  6: '6',
  7: '7',
  8: '8',
  9: '9',
  10: '10',
};

export const typesOfRecordsOptions = [
  { value: 'procedures',   title: 'Procedures' },
  { value: 'diagnosis',   title: 'Problems / Diagnosis' },
];
