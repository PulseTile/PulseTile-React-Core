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
  RECORDS_NOT_EXIST: 'No records added',
  RECORDS_NAME: 'Records',
  RECORDS_TYPE: 'Records',
  RECORDS_DATE: 'Records',
  RECORDS_SOURCE: 'Records',
  REASON: 'Reason for contact',
  CLINICAL: 'Clinical Summary',
  TYPE: 'Type',

  DATE: 'Date of Transfer',
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

export const typesOptions = [
  { value: 'diagnosis',   title: 'Problems / Diagnosis' },
  { value: 'medications', title: 'Medications' },
  { value: 'referrals',   title: 'Referrals' },
  { value: 'events',      title: 'Events' },
  { value: 'vitals',      title: 'Vitals' },
];

export const relationshipTypeOptions = [
  { value: 'at0036', title: 'Informal carer' },
  { value: 'at0037', title: 'Main informal carer' },
  { value: 'at0038', title: 'Formal care worker' },
  { value: 'at0039', title: 'Key formal care worker' },
];

const config = {
  diagnosis: {
    title: 'Problems / Diagnosis',
    // actionsFuncAll: diagnosesActions.all,
    // actionsFuncOne: diagnosesActions.get,
    records: null
  },
  medications: {
    title: 'Medications',
    // actionsFuncAll: medicationsActions.all,
    // actionsFuncOne: medicationsActions.get,
    records: null
  },
  referrals: {
    title: 'Referrals',
    // actionsFuncAll: referralsActions.all,
    // actionsFuncOne: referralsActions.get,
    records: null
  },
  events: {
    title: 'Events',
    // actionsFuncAll: eventsActions.all,
    // actionsFuncOne: eventsActions.get,
    records: null
  },
  vitals: {
    title: 'Vitals',
    // actionsFuncAll: vitalsActions.all,
    // actionsFuncOne: vitalsActions.get,
    records: null
  }
};