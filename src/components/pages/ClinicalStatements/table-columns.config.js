import { getDDMMMYYYY } from '../../../utils/time-helpers.utils';


export const columnsConfig = [
  { key: 'type', title: 'Type', width: '30%' },
  { key: 'dateCreated', title: 'Date Created', transformer: getDDMMMYYYY, width: '30%' },
  { key: 'author', title: 'Author', width: '20%' },
  { key: 'source', title: 'Source', width: '20%' },
  { key: 'sourceId', title: 'SourceID', display: 'none' },
];


export const defaultColumnsSelected = {
  type: true,
  dateCreated: true,
  author: true,
  source: true,
  sourceId: true,
};
