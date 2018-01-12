import { getDDMMMYYYY } from '../../../utils/time-helpers.utils';

export const columnsConfig = [
  { key: 'id', title: '#', width: '21%' },
  { key: 'dateCreated', title: 'Date', transformer: getDDMMMYYYY, width: '25%' },
  { key: 'newsScore', title: 'NEWS Score', width: '32%' },
  { key: 'source', title: 'Source', width: '22%' },
  { key: 'sourceId', title: 'SourceID', display: 'none' },
];

export const defaultColumnsSelected = {
  id: true,
  dateCreated: true,
  newsScore: true,
  source: true,
  sourceId: true,
};
