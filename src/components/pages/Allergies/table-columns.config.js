import { getDDMMMYYYY } from '../../../utils/time-helpers.utils';

export const columnsConfig = [
  { key: 'cause', title: 'Cause', width: '25%' },
  { key: 'dateCreated', title: 'Date', transformer: getDDMMMYYYY, width: '55%' },
  { key: 'source', title: 'Source', width: '20%' },
  { key: 'sourceId', title: 'Source ID', width: 0, display: 'none' },
];

export const defaultColumnsSelected = {
  cause: true,
  dateCreated: true,
  source: true,
  sourceId: true,
};
