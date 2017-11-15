import { createSelector } from 'reselect';
import _ from 'lodash/fp';


const patientEventsSelector = createSelector(
  ({ patientsEvents }) => patientsEvents,
  (state, props) => _.getOr(null, 'match.params.userId', props),
  (patientsEvents, userId) => {
    const allEvents = patientsEvents[userId];
    return ({ allEvents, userId });
  }
);

export { patientEventsSelector }
