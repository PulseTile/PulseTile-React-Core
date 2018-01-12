import { getDDMMMYYYY } from '../../../utils/time-helpers.utils';

export const columnsConfig = [
  { key: 'dateOfRequest', title: 'Date of Request', width: '25%', transformer: getDDMMMYYYY },
  { key: 'serviceTeam', title: 'Service / Team', width: '28%' },
  { key: 'dateOfMeeting', title: 'Date of Meeting', width: '28%', transformer: getDDMMMYYYY },
  { key: 'source', title: 'Source', width: '19%' },
  { key: 'sourceId', title: 'sourceId', width: 0, display: 'none' },
];

export const defaultColumnsSelected = {
  dateOfRequest: true,
  serviceTeam: true,
  dateOfMeeting: true,
  source: true,
  sourceId: true,
};
