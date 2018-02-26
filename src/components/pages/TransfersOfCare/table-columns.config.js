import {getDDMMMYYYY} from "../../../utils/time-helpers.utils";

export const columnsConfig = [
  { key: 'numberText', title: 'Transfer', width: '18%' },
  { key: 'from', title: 'From (Site / Org)', width: '22%' },
  { key: 'to', title: 'To (Site / Org)', width: '22%' },
  { key: 'transferDateTime', title: 'Date / Time', width: '19%', transformer: getDDMMMYYYY },
  { key: 'source', title: 'Source', width: '19%' },
  { key: 'sourceId', title: 'SourceID', display: 'none' },
];

export const defaultColumnsSelected = {
  numberText: true,
  from: true,
  to: true,
  transferDateTime: true,
  source: true,
  sourceId: true,
};
