import { getDDMMMYYYY } from '../../../utils/time-helpers.utils';


export const columnsConfig = [
  { key: 'testName', title: 'Test Name', width: '30%' },
  { key: 'sampleTaken', title: 'Sample Taken', transformer: getDDMMMYYYY, width: '26%' },
  { key: 'dateCreated', title: 'Date Created', transformer: getDDMMMYYYY, width: '25%' },
  { key: 'source', title: 'Source', width: '19%' },
  { key: 'sourceId', title: 'SourceID', display: 'none' },
];

export const defaultColumnsSelected = {
  testName: true,
  sampleTaken: true,
  dateCreated: true,
  source: true,
  sourceId: true,
};
