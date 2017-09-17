import _ from 'lodash/fp';
import { createSelector } from 'reselect';

const patientSummarySelector = createSelector(
  ({ patientsSummaries }) => patientsSummaries,
  (state, props) => _.getOr(null, 'match.params.userId', props),
  (patientsSummaries, userId) => {
    const allergies = _.flow(_.getOr([], [userId, 'allergies']), _.map('text'), arr => _.concat(arr, ['', '', '', '']), _.take(4))(patientsSummaries);
    const contacts = _.flow(_.getOr([], [userId, 'contacts']), _.map('text'), arr => _.concat(arr, ['', '', '', '']), _.take(4))(patientsSummaries);
    const problems = _.flow(_.getOr([], [userId, 'problems']), _.map('text'), arr => _.concat(arr, ['', '', '', '']), _.take(4))(patientsSummaries);
    const medications = _.flow(_.getOr([], [userId, 'medications']), _.map('text'), arr => _.concat(arr, ['', '', '', '']), _.take(4))(patientsSummaries);
    return ({ allergies, contacts, problems, medications });
  });

export default patientSummarySelector;
