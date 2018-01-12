import { createSelector } from 'reselect';
import _ from 'lodash/fp';

const personalNotesPanelFormSelector = _.getOr({}, 'form.personalNotesPanelFormSelector');
const personalNotesCreateFormSelector = _.getOr({}, 'form.personalNotesCreateFormSelector');

const patientPersonalNotesSelector = createSelector(
  ({ patientsPersonalNotes }) => patientsPersonalNotes,
  (state, props) => _.getOr(null, 'match.params.userId', props),
  (patientsPersonalNotes, userId) => {
    const allPersonalNotes = patientsPersonalNotes[userId];
    return ({ allPersonalNotes, userId });
  }
);

const patientPersonalNotesDetailSelector = createSelector(
  ({ personalNotesDetail }) => personalNotesDetail,
  (state, props) => _.getOr(null, 'match.params.userId', props),
  (personalNotesDetail, userId) => {
    const personalNoteDetail = personalNotesDetail[userId];
    return ({ personalNoteDetail, userId });
  }
);

const personalNotePanelFormSelector = createSelector(personalNotesPanelFormSelector,
  personalNoteFormState => ({ personalNoteFormState }));

const personalCreateFormStateSelector = createSelector(personalNotesCreateFormSelector,
  personalCreateFormState => ({ personalCreateFormState }));

export { patientPersonalNotesSelector, patientPersonalNotesDetailSelector, personalNotePanelFormSelector, personalCreateFormStateSelector }
