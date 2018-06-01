import { createSelector } from 'reselect';
import _ from 'lodash/fp';

import { operationsOnCollection } from '../../../utils/plugin-helpers.utils';
import { valuesNames } from './forms.config';

const drawingsCreateFormSelector = _.getOr({}, 'form.drawingsCreateFormSelector');
const drawingsDetailFormSelector = _.getOr({}, 'form.drawingsDetailFormSelector');
const drawingsFormSelector = _.getOr({}, 'form.drawingsFormSelector');

const patientDrawingsSelector = createSelector(
  ({ patientsDrawings }) => patientsDrawings,
  (state, props) => _.getOr(null, 'match.params.userId', props),
  (patientsDrawings, userId) => {
    const allDrawings = operationsOnCollection.modificateDateForTable(patientsDrawings[userId], valuesNames.DATE_CREATED);
    return ({ allDrawings, userId });
  }
);

const drawingsDetailFormStateSelector = createSelector(drawingsDetailFormSelector,
  drawingsDetailFormState => ({ drawingsDetailFormState }));

const drawingsCreateFormStateSelector = createSelector(drawingsCreateFormSelector,
  drawingsCreateFormState => ({ drawingsCreateFormState }));

const drawingsFormStateSelector = createSelector(drawingsFormSelector,
  drawingsFormState => ({ drawingsFormState }));

const patientDrawingsDetailSelector = createSelector(
  ({ drawingsDetail }) => drawingsDetail,
  (state, props) => _.getOr(null, 'match.params.userId', props),
  (drawingsDetail, userId) => {
    const drawingDetail = drawingsDetail[userId];
    return ({ drawingDetail, userId });
  }
);

export { patientDrawingsSelector, drawingsDetailFormStateSelector, drawingsCreateFormStateSelector, drawingsFormStateSelector, patientDrawingsDetailSelector }
