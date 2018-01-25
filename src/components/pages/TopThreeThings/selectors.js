import { createSelector } from 'reselect';
import _ from 'lodash/fp';

const topThreeThingsPanelFormSelector = _.getOr({}, 'form.topThreeThingsPanelFormSelector');

const patientTopThreeThingsSelector = createSelector(
  ({ patientsTopThreeThings }) => patientsTopThreeThings,
  (state, props) => _.getOr(null, 'match.params.userId', props),
  (patientsTopThreeThings, userId) => {
    const allTopThreeThings = patientsTopThreeThings[userId];
    return ({ allTopThreeThings, userId });
  }
);

const patientTopThreeThingsDetailSelector = createSelector(
  ({ topThreeThingsDetail }) => topThreeThingsDetail,
  (state, props) => _.getOr(null, 'match.params.userId', props),
  (topThreeThingsDetail, userId) => {
    const topThreeThingDetail = topThreeThingsDetail[userId];
    return ({ topThreeThingDetail, userId });
  }
);

const topThreeThingPanelFormSelector = createSelector(topThreeThingsPanelFormSelector,
  topThreeThingFormState => ({ topThreeThingFormState }));

export { patientTopThreeThingsSelector, patientTopThreeThingsDetailSelector, topThreeThingPanelFormSelector }
