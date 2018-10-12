import _ from 'lodash/fp';
import { getDDMMMYYYY } from '../../../utils/time-helpers.utils';

export function changeArraysForTable(arr, name, date) {
  return arr.map((el, index) => {
    el.tableName = el[name];
    el.date = getDDMMMYYYY(el[date]);
    return {
      record: el,
      title: el[name],
      value: index,
    }
  });
}

export function setDiagnosisRecords(data) {
  return changeArraysForTable(data, 'problem', 'dateOfOnset');
}

export function setMedicationsRecords(data) {
  return changeArraysForTable(data, 'name', 'dateCreated');
}
