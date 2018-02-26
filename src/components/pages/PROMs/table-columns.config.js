import { getDDMMMYYYY } from '../../../utils/time-helpers.utils';

export const columnsConfig = [
  { key: 'name', title: 'Name of PROM', width: '25%' },
  { key: 'score', title: 'Score', width: '28%' },
  { key: 'dateCreated', title: 'Date', width: '28%', transformer: getDDMMMYYYY },
  { key: 'source', title: 'Source', width: '19%' },
  { key: 'sourceId', title: 'sourceId', width: 0, display: 'none' },
];

export const defaultColumnsSelected = {
  name: true,
  score: true,
  dateCreated: true,
  source: true,
  sourceId: true,
};
