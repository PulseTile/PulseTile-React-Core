import { getDDMMMYYYY } from '../../../utils/time-helpers.utils';

export const columnsConfig = [
  { key: 'name', title: 'Name', width: '23%' },
  { key: 'description', title: 'Description', width: '33%' },
  { key: 'dateCreated', title: 'Date', transformer: getDDMMMYYYY, width: '25%' },
  { key: 'source', title: 'Source', width: '19%' },
  { key: 'sourceId', title: 'sourceId', width: 0, display: 'none' },
];

export const defaultColumnsSelected = {
  name: true,
  description: true,
  dateCreated: true,
  source: true,
  sourceId: true,
};
