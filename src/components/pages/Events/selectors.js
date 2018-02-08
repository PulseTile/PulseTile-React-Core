import { createSelector } from 'reselect';
import _ from 'lodash/fp';

const eventsCreateFormSelector = _.getOr({}, 'form.eventsCreateFormSelector')
const eventsDetailFormSelector = _.getOr({}, 'form.eventsDetailFormSelector')
const userAccountSelector = ({ userAccount }) => userAccount;

const patientEventsSelector = createSelector(
  ({ patientsEvents }) => patientsEvents,
  (state, props) => _.getOr(null, 'match.params.userId', props),
  (patientsEvents, userId) => {
    const allEvents = patientsEvents[userId];
    return ({ allEvents, userId });
  }
);

const eventsDetailFormStateSelector = createSelector(eventsDetailFormSelector,
  eventsDetailFormState => ({ eventsDetailFormState }));

const eventsCreateFormStateSelector = createSelector(eventsCreateFormSelector,
  eventsCreateFormState => ({ eventsCreateFormState }));

const patientEventsDetailSelector = createSelector(
  ({ eventsDetail }) => eventsDetail,
  (state, props) => _.getOr(null, 'match.params.userId', props),
  (eventsDetail, userId) => {
    const eventDetail = eventsDetail[userId];
    return ({ eventDetail, userId });
  }
);

const userSelector = createSelector(
  userAccountSelector,
  userAccount => ({ userAccount })
);

export { patientEventsSelector, eventsDetailFormStateSelector, eventsCreateFormStateSelector, patientEventsDetailSelector, userSelector }
