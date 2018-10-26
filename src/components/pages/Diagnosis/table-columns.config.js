import { get } from 'lodash';
import { getDDMMMYYYY } from '../../../utils/time-helpers.utils';
import { themeConfigs } from '../../../themes.config';

const problemsTitle = get(themeConfigs.patientsSummaryDetailsTitles, 'diagnoses', 'Problem / Diagnosis');

export const columnsConfig = [
  { key: 'problem', title: problemsTitle, width: '56%' },
  { key: 'dateOfOnset', title: 'Date', transformer: getDDMMMYYYY, width: '25%' },
  { key: 'source', title: 'Source', width: '19%' },
  { key: 'sourceId', title: 'SourceID', width: 0, display: 'none' },
];

export const defaultColumnsSelected = {
  problem: true,
  dateOfOnset: true,
  source: true,
  sourceId: true,
};
