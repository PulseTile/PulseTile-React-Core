import { getDDMMMYYYY } from '../../../utils/time-helpers.utils';

export const columnsConfig = [
  { key: 'name', title: 'Event Name', width: '50%' },
  { key: 'type', title: 'Event Type', width: '25%' },
  { key: 'dateTime', title: 'Date', transformer: getDDMMMYYYY, width: '25%' },
  { key: 'sourceId', title: 'SourceID', display: 'none' },
];

export const defaultColumnsSelected = {
  name: true,
  type: true,
  dateTime: true,
  sourceId: true,
};
