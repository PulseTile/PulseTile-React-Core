import { getDDMMMYYYY } from '../../../utils/time-helpers.utils';

export const columnsConfig = [
  { key: 'name', title: 'Name', width: '23%' },
  { key: 'doseAmount', title: 'Dose', width: '33%' },
  { key: 'dateCreated', title: 'Supply', transformer: getDDMMMYYYY, width: '25%' },
  { key: 'source', title: 'Source', width: '19%' },
  { key: 'sourceId', title: 'SourceID', display: 'none' },
];

export const defaultColumnsSelected = {
  name: true,
  doseAmount: true,
  dateCreated: true,
  source: true,
  sourceId: true,
};
