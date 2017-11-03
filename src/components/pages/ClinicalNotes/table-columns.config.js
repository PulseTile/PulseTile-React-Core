import { getDDMMMYYYY } from '../../../utils/time-helpers.utils';

export const columnsConfig = [
  { key: 'clinicalNotesType', title: 'Type', width: '23%' },
  { key: 'author', title: 'Author', width: '33%' },
  { key: 'dateCreated', title: 'Date Created', transformer: getDDMMMYYYY, width: '25%' },
  { key: 'source', title: 'Source', width: '19%' },
  { key: 'sourceId', title: 'sourceId', width: 0, display: 'none' },
];

export const defaultColumnsSelected = {
  clinicalNotesType: true,
  author: true,
  dateCreated: true,
  source: true,
  sourceId: true,
};
