import { getDDMMMYYYY } from '../../../utils/time-helpers.utils';

export const columnsConfig = [
  { key: 'name', title: 'Order Name', width: '56%' },
  { key: 'orderDate', title: 'Date Created', transformer: getDDMMMYYYY, width: '25%' },
  { key: 'source', title: 'Source', width: '19%' },
  { key: 'sourceId', title: 'sourceId', width: 0, display: 'none' },
];

export const defaultColumnsSelected = {
  name: true,
  orderDate: true,
  source: true,
  sourceId: true,
};
