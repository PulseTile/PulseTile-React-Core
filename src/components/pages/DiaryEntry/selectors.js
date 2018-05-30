import { createSelector } from 'reselect';
import _ from 'lodash/fp';

import { operationsOnCollection } from '../../../utils/plugin-helpers.utils';
import { valuesNames } from './forms.config';

const diaryEntriesDetailFormSelector = _.getOr({}, 'form.diaryEntriesDetailFormSelector');
const diaryEntriesCreateFormSelector = _.getOr({}, 'form.diaryEntriesCreateFormSelector');

const patientDiaryEntrySelector = createSelector(
  ({ patientsDiaryEntry }) => patientsDiaryEntry,
  (state, props) => _.getOr(null, 'match.params.userId', props),
  (patientsDiaryEntry, userId) => {
    const allDiaryEntry = operationsOnCollection.modificate(patientsDiaryEntry[userId], [{
      key: valuesNames.DATE_CREATED,
      fn: item => new Date(item).getTime(),
    }]);
    return ({ allDiaryEntry, userId });
  }
);

const patientDiaryEntryDetailSelector = createSelector(
  ({ diaryEntryDetail }) => diaryEntryDetail,
  (state, props) => _.getOr(null, 'match.params.userId', props),
  (diaryEntryDetail, userId) => {
    const diaryEntryDetailOfUser = diaryEntryDetail[userId];
    return ({ diaryEntryDetail: diaryEntryDetailOfUser, userId });
  }
);

const diaryEntryDetailFormSelector = createSelector(diaryEntriesDetailFormSelector,
  diaryEntryFormState => ({ diaryEntryFormState }));

const diaryEntryCreateFormStateSelector = createSelector(diaryEntriesCreateFormSelector,
  diaryEntryCreateFormState => ({ diaryEntryCreateFormState }));

export { patientDiaryEntrySelector, patientDiaryEntryDetailSelector, diaryEntryDetailFormSelector, diaryEntryCreateFormStateSelector }
