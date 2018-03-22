import { createSelector } from 'reselect';
import _ from 'lodash/fp';

import { operationsOnCollection } from '../../../utils/plugin-helpers.utils';
import { valuesNames } from './forms.config';

const mdtsPanelFormSelector = _.getOr({}, 'form.mdtsPanelFormSelector');
const mdtsCreateFormSelector = _.getOr({}, 'form.mdtsCreateFormSelector');

const patientMDTsSelector = createSelector(
  ({ patientsMDTs }) => patientsMDTs,
  (state, props) => _.getOr(null, 'match.params.userId', props),
  (patientsMDTs, userId) => {
    let allMDTs = operationsOnCollection.modificateDateForTable(patientsMDTs[userId], valuesNames.DATE_OF_REQUEST);
    allMDTs = operationsOnCollection.modificateDateForTable(allMDTs, valuesNames.DATE_OF_MEETING);
    return ({ allMDTs, userId });
  }
);

const patientMDTsDetailSelector = createSelector(
  ({ mdtsDetail }) => mdtsDetail,
  (state, props) => _.getOr(null, 'match.params.userId', props),
  (mdtsDetail, userId) => {
    const mdtDetail = mdtsDetail[userId];
    return ({ mdtDetail, userId });
  }
);

const mdtPanelFormSelector = createSelector(mdtsPanelFormSelector,
  mdtFormState => ({ mdtFormState }));

const mdtCreateFormStateSelector = createSelector(mdtsCreateFormSelector,
  mdtCreateFormState => ({ mdtCreateFormState }));

export { patientMDTsSelector, patientMDTsDetailSelector, mdtPanelFormSelector, mdtCreateFormStateSelector }
