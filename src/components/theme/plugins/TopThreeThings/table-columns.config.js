import { getDDMMMYYYY } from '../../../../utils/time-helpers.utils';

export const columnsConfig = [
  { key: 'dateCreated', title: 'Date Time (latest)', transformer: getDDMMMYYYY, width: '35%' },
  { key: 'name1', title: 'Issue #1', width: '15%' },
  { key: 'name2', title: 'Issue #2', width: '15%' },
  { key: 'name3', title: 'Issue #3', width: '15%' },
  { key: 'source', title: 'Source', width: '20%' },
  { key: 'sourceId', title: 'sourceId', width: 0, display: 'none' },
];

export const defaultColumnsSelected = {
  dateCreated: true,
  name1: true,
  name2: true,
  name3: true,
  source: true,
  sourceId: true,
};
