import { getDDMMMYYYY } from '../../../utils/time-helpers.utils';

export const columnsConfig = [
  { key: 'name', title: 'Name', width: '56%' },
  { key: 'dateCreated', title: 'Date / Time', transformer: getDDMMMYYYY, width: '25%' },
  { key: 'source', title: 'Source', width: '19%' },
  { key: 'sourceId', title: 'SourceID', display: 'none' },
];

export const defaultColumnsSelected = {
  name: true,
  dateCreated: true,
  source: true,
  sourceId: true,
};
