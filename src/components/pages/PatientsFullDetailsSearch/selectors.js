import _ from 'lodash/fp';
import qs from 'qs';
import { createSelector } from 'reselect';

const getAdvancedSearchPatient = _.cond([
  [_.flow(_.head, _.negate(_.isEmpty)), patient => patient],
  [_.T, _.stubArray],
]);

const getBasicSearchPatient = _.cond([
  [_.flow(_.get('patientDetails'), _.isArray), _.flow(_.get('patientDetails'), _.map(patient => Object.assign({}, patient, { id: patient.sourceId })))],
  [_.T, _.stubArray],
]);

const allPatientsSelector = ({ basicSearchPatient, advancedSearchPatient }, { location: { search } }) => {
  const { queryType } = qs.parse(search.replace('?', ''));

  if (queryType === 'advanced') return getAdvancedSearchPatient(advancedSearchPatient);
  return getBasicSearchPatient(basicSearchPatient);
};

const patientsCountsSelector = ({ patientsCounts }) => patientsCounts;

const panelTitleSelector = (state, { location: { search } }) => {
  const { queryType, searchString } = qs.parse(search.replace('?', ''));
  if (queryType === 'advanced') return 'Search Result';
  return `${queryType} ${searchString}`
};

const patientsSelector = createSelector(
  allPatientsSelector,
  patientsCountsSelector,
  panelTitleSelector,
  (allPatients, patientsCounts, panelTitle) => {
    const getPatientCounts = id =>_.getOr({}, [id, 0], patientsCounts); //TODO maybe patient counts can be not only [{}] but [{}, ..., {}]
    const allPatientsWithCounts = _.map(({ id, ...restPatient }) => ({ id, ...restPatient, ...getPatientCounts(id) }), allPatients);
    return ({ allPatients, patientsCounts, allPatientsWithCounts, panelTitle });
  }
);

export default patientsSelector;
