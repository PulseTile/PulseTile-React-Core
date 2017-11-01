import { getDDMMMYYYY } from '../../../utils/time-helpers.utils';

export const vaccinationsColumnsConfig = [
  { key: 'vaccinationName', title: 'Name', width: '56%' },
  { key: 'source', title: 'Source', width: '19%' },
  { key: 'dateCreated', title: 'Date', transformer: getDDMMMYYYY, width: '25%' },
  { key: 'sourceId', title: 'SourceID', width: 0, display: 'none' },
];

export const defaultColumnsSelected = {
  vaccinationName: true,
  source: true,
  dateCreated: true,
  sourceId: true,
};
