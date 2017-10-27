import { createSelector } from 'reselect';
import _ from 'lodash/fp';

const clinicalNotesPanelFormSelector = _.getOr({}, 'form.clinicalNotesPanelFormSelector')

const patientClinicalNotesSelector = createSelector(
  ({ patientsClinicalNotes }) => patientsClinicalNotes,
  (state, props) => _.getOr(null, 'match.params.userId', props),
  (patientsClinicalNotes, userId) => {
    const allClinicalNotes = patientsClinicalNotes[userId];
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

export { patientClinicalNotesSelector, patientClinicalNotesDetailSelector, clinicalNotePanelFormSelector }
