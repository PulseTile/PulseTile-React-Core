import { createSelector } from 'reselect';
import _ from 'lodash/fp';

import { operationsOnCollection } from '../../../utils/plugin-helpers.utils';
import { valuesNames } from './forms.config';

const clinicalNotesPanelFormSelector = _.getOr({}, 'form.clinicalNotesPanelFormSelector');
const clinicalNotesCreateFormSelector = _.getOr({}, 'form.clinicalNotesCreateFormSelector');

const patientClinicalNotesSelector = createSelector(
  ({ patientsClinicalNotes }) => patientsClinicalNotes,
  (state, props) => _.getOr(null, 'match.params.userId', props),
  (patientsClinicalNotes, userId) => {
    const allClinicalNotes = operationsOnCollection.modificateDateForTable(patientsClinicalNotes[userId], valuesNames.DATE_CREATED);
    return ({ allClinicalNotes, userId });
  }
);

const patientClinicalNotesDetailSelector = createSelector(
  ({ clinicalNotesDetail }) => clinicalNotesDetail,
  (state, props) => _.getOr(null, 'match.params.userId', props),
  (clinicalNotesDetail, userId) => {
    const clinicalNoteDetail = clinicalNotesDetail[userId];
    return ({ clinicalNoteDetail, userId });
  }
);

const clinicalNotePanelFormSelector = createSelector(clinicalNotesPanelFormSelector,
  clinicalNoteFormState => ({ clinicalNoteFormState }));

const clinicalCreateFormStateSelector = createSelector(clinicalNotesCreateFormSelector,
  clinicalCreateFormState => ({ clinicalCreateFormState }));

export { patientClinicalNotesSelector, patientClinicalNotesDetailSelector, clinicalNotePanelFormSelector, clinicalCreateFormStateSelector }
