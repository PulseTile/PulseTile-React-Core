export const valuesNames = {
  NAME: 'name',
  PROCEDURE_ID: 'procedureSourceId',
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

  SPECIFIC_Q1: 'specific_q1',
  SPECIFIC_Q2: 'specific_q2',
  SPECIFIC_Q3: 'specific_q3',
  SPECIFIC_Q4: 'specific_q4',
  SPECIFIC_Q5: 'specific_q5',

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

  QUESTION_1: '1. In general, would you say your health is:',
  QUESTION_2: '2. Compared to one year ago, how would you rate your health in general now?',
  QUESTION_3: '3. Does your health now limit you in vigorous activities?',
  QUESTION_4: '4. Does your health now limit you in moderate activities?',
  QUESTION_5: '5. Does your health now limit you in lifting or carrying groceries?',
};

export const questionOptions1 = [
  { value: 'at0009', title: 'Excellent' },
  { value: 'at0010', title: 'Very good' },
  { value: 'at0011', title: 'Good' },
  { value: 'at0012', title: 'Fair' },
  { value: 'at0013', title: 'Poor' },
];

export const questionOptions2 = [
  { value: 'at0015', title: 'Much better' },
  { value: 'at0016', title: 'Somewhat better' },
  { value: 'at0017', title: 'About the same' },
  { value: 'at0018', title: 'Somewhat worse' },
  { value: 'at0019', title: 'Much worse' },
];

export const questionOptions3 = [
  { value: 'at0021', title: 'Yes, limited a lot' },
  { value: 'at0022', title: 'Yes, limited a little' },
  { value: 'at0023', title: 'No, not limited at all' },
];

export const questionOptions4 = [
  { value: 'at0025', title: 'Yes, limited a lot' },
  { value: 'at0026', title: 'Yes, limited a little' },
  { value: 'at0027', title: 'No, not limited at all' },
];

export const questionOptions5 = [
  { value: 'at0030', title: 'Yes, limited a lot' },
  { value: 'at0031', title: 'Yes, limited a little' },
  { value: 'at0032', title: 'No, not limited at all' },
];

function addQuestionOptions(options, toObject) {
  options.forEach(item => {
    toObject[item.value] = item.title;
  });
};

export const qestionOptions = {};
addQuestionOptions(questionOptions1, qestionOptions);
addQuestionOptions(questionOptions2, qestionOptions);
addQuestionOptions(questionOptions3, qestionOptions);
addQuestionOptions(questionOptions4, qestionOptions);
addQuestionOptions(questionOptions5, qestionOptions);

export const marksForPromsRange = {
  0: '0',
  10: '10',
  20: '20',
  30: '30',
  40: '40',
  50: '50',
  60: '60',
  70: '70',
  80: '80',
  90: '90',
  100: '100',
};

export const typesOfRecordsOptions = [
  { value: 'procedures',   title: 'Procedures' },
  // { value: 'diagnosis',   title: 'Problems / Diagnosis' },
];
