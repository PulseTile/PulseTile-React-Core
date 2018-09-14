import { getDDMMMYYYY } from '../../../utils/time-helpers.utils';

export const columnsConfig = [
  { key: 'dateOfReferral', title: 'Date of Referral', transformer: getDDMMMYYYY, width: '25%' },
  { key: 'referralFrom', title: 'Referral From', width: '28%' },
  { key: 'referralTo', title: 'Referral To', width: '28%' },
  { key: 'source', title: 'Source', width: '19%' },
  { key: 'sourceId', title: 'SourceID', display: 'none' },
];

export const defaultColumnsSelected = {
  dateOfReferral: true,
  referralFrom: true,
  referralTo: true,
  source: true,
  sourceId: true,
};
