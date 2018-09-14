import { getDDMMMYYYY } from '../../../utils/time-helpers.utils';

export const columnsConfig = [
  { key: 'studyDescription', title: 'Name', width: '56%' },
  { key: 'dateRecorded', title: 'Date', transformer: getDDMMMYYYY, width: '25%' },
  { key: 'source', title: 'Source', width: '19%' },
  { key: 'sourceId', title: 'sourceId', width: 0, display: 'none' },
];

export const defaultColumnsSelected = {
  studyDescription: true,
  dateRecorded: true,
  source: true,
  sourceId: true,
};
