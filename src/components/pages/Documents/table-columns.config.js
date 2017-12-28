import { getDDMMMYYYY } from '../../../utils/time-helpers.utils';


export const columnsConfig = [
  { key: 'documentType', title: 'Name', width: '56%' },
  { key: 'dateCreated', title: 'Date', transformer: getDDMMMYYYY, width: '25%' },
  { key: 'source', title: 'Source', width: '19%' },
  { key: 'sourceId', title: 'SourceID', display: 'none' },
];

export const defaultColumnsSelected = {
  documentType: true,
  dateCreated: true,
  source: true,
  sourceId: true,
};
