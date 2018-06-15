export const valuesNames = {
  NUMBER: 'number',
  NUMBER_TEXT: 'numberText',
  FROM: 'from',
  TO: 'to',
  DATE_TIME: 'transferDateTime',
  RECORDS: 'records',
  REASON: 'reasonForContact',
  CLINICAL: 'clinicalSummary',
  TYPE: 'type',

  DATE_CREATED: 'dateCreated',
  AUTHOR: 'author',
  SOURCE: 'source',
  SOURCE_ID: 'sourceId',
};

export const valuesLabels = {
  NUMBER: 'Transfer Number',
  FROM: 'From (Site / Org)',
  TO: 'To (Site / Org)',
  DATE_TIME: 'Date of Transfer',
  RECORDS: 'Records',
  REASON: 'Reason for contact',
  CLINICAL: 'Clinical Summary',
  TYPE: 'Type',

  DATE_CREATED: 'Date',
  AUTHOR: 'Author',
  SOURCE: 'Source',
  SOURCE_ID: 'Source ID',
};

export const citiesOptions = [
  { value: 'Worcester Trust',     title: 'Worcester Trust' },
  { value: 'Kings Hospital',      title: 'Kings Hospital' },
  { value: 'Oxford NHS Trust',    title: 'Oxford NHS Trust' },
  { value: 'St James\' Hospital', title: 'St James\' Hospital' },
];

export const typesOfRecordsOptions = [
  { value: 'diagnosis',   title: 'Diagnosis' },
  { value: 'medications', title: 'Medications' },
  { value: 'referrals',   title: 'Referrals' },
  { value: 'events',      title: 'Events' },
  { value: 'vitals',      title: 'Vitals' },
];
