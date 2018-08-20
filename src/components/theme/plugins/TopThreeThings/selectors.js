import { createSelector } from 'reselect';
import _ from 'lodash/fp';

import { operationsOnCollection } from '../../../../utils/plugin-helpers.utils';
import { valuesNames } from './forms.config';

const topThreeThingsCreateFormSelector = _.getOr({}, 'form.topThreeThingsCreateFormSelector');
const topThreeThingsPanelFormSelector = _.getOr({}, 'form.topThreeThingsPanelFormSelector');
const metaPanelFormSelector = _.getOr({}, 'form.metaPanelFormSelector')

const topThreeThingsCreateFormStateSelector = createSelector(topThreeThingsCreateFormSelector,
    topThreeThingsCreateFormState => ({ topThreeThingsCreateFormState }));

const patientTopThreeThingsSelector = createSelector(
  ({ patientsTopThreeThings }) => patientsTopThreeThings,
  (state, props) => _.getOr(null, 'match.params.userId', props),
  (patientsTopThreeThings, userId) => {
    const allTopThreeThings = operationsOnCollection.modificateDateForTable(patientsTopThreeThings[userId], valuesNames.DATE);
    return ({ allTopThreeThings, userId });
  }
);

const metaPanelFormStateSelector = createSelector(metaPanelFormSelector,
    metaPanelFormState => ({ metaPanelFormState }));

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

export { patientTopThreeThingsSelector, patientTopThreeThingsDetailSelector, topThreeThingsCreateFormStateSelector, metaPanelFormStateSelector, topThreeThingPanelFormSelector }
