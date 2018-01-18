export const valuesNames = {
  NUMBER: 'number',
  FROM: 'from',
  TO: 'to',
  DATE_TIME: 'transferDateTime',
  RECORDS: 'records',
  RECORDS_NAME: 'name',
  RECORDS_TYPE: 'typeTitle',
  RECORDS_DATE: 'date',
  RECORDS_SOURCE: 'source',
  REASON: 'reasonForContact',
  CLINICAL: 'clinicalSummary',

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
  RECORDS_NOT_EXIST: 'No records added',
  RECORDS_NAME: 'Records',
  RECORDS_TYPE: 'Records',
  RECORDS_DATE: 'Records',
  RECORDS_SOURCE: 'Records',
  REASON: 'Reason for contact',
  CLINICAL: 'Clinical Summary',

  DATE: 'Date',
  AUTHOR: 'Author',
  SOURCE: 'Source',
  SOURCE_ID: 'Source ID',
};

export const relationshipOptions = [
  { value: 'Husband', title: 'Husband' },
  { value: 'Wife', title: 'Wife' },
  { value: 'Father', title: 'Father' },
  { value: 'Alone', title: 'Alone' },
  { value: 'Mother', title: 'Mother' },
  { value: 'Daughter', title: 'Daughter' },
  { value: 'Son', title: 'Son' },
  { value: 'Brother', title: 'Brother' },
  { value: 'Sister', title: 'Sister' },
  { value: 'Friend', title: 'Friend' },
  { value: 'Family friend', title: 'Family friend' },
  { value: 'Neighbour', title: 'Neighbour' },
  { value: 'District Nurse', title: 'District Nurse' },
  { value: 'Primary Care Worker', title: 'Primary Care Worker' },
  { value: 'Allocated social worker', title: 'Allocated social worker' },
  { value: 'Care C-ordinator', title: 'Care C-ordinator' },
];

export const relationshipTypeOptions = [
  { value: 'at0036', title: 'Informal carer' },
  { value: 'at0037', title: 'Main informal carer' },
  { value: 'at0038', title: 'Formal care worker' },
  { value: 'at0039', title: 'Key formal care worker' },
];
