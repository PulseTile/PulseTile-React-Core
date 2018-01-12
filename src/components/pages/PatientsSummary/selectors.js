import _ from 'lodash/fp';
import { createSelector } from 'reselect';
import { patientsSummaryConfig, patientsSummaryLoading } from './patients-summary.config';

const patientSummarySelector = createSelector(
  ({ patientsSummaries }) => patientsSummaries,
  (state, props) => _.getOr(null, 'match.params.userId', props),
  (patientsSummaries, userId) => {
    let boards = {};

    if (patientsSummaries[userId]) {
      patientsSummaryConfig.forEach((board) => {
        boards[board.key] = _.flow(_.getOr([], [userId, board.key]), _.map(item => item), arr => _.concat(arr, ['', '', '', '']), _.take(4))(patientsSummaries);
      });
    } else {
      patientsSummaryConfig.forEach((board) => {
        boards[board.key] = [patientsSummaryLoading, '', '', ''];
      });
    }

    console.log('boards', boards);
    return { boards , userId };
  });

export default patientSummarySelector;
