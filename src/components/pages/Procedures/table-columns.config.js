import { getDDMMMYYYY, getHHmm } from '../../../utils/time-helpers.utils';

export const columnsConfig = [
  { key: 'name', title: 'Procedure Name', width: '41%' },
  { key: 'date', title: 'Procedure Date', transformer: getDDMMMYYYY, width: '25%' },
  { key: 'time', title: 'Time', transformer: getHHmm, width: '15%' },
  { key: 'source', title: 'Source', width: '19%' },
  { key: 'sourceId', title: 'SourceID', display: 'none' },
];

export const defaultColumnsSelected = {
  name: true,
  date: true,
  time: true,
  source: true,
  sourceId: true,
};
