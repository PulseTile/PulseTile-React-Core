import { createSelector } from 'reselect';
import _ from 'lodash/fp';

import { operationsOnCollection } from '../../../utils/plugin-helpers.utils';
import { valuesNames } from './forms.config';

const patientDocumentsSelector = createSelector(
  ({ patientsDocuments }) => patientsDocuments,
  (state, props) => _.getOr(null, 'match.params.userId', props),
  (patientsDocuments, userId) => {
    const allDocuments = operationsOnCollection.modificateDateForTable(patientsDocuments[userId], valuesNames.DATE_CREATED);
    return ({ allDocuments, userId });
  }
);

const patientDocumentsDetailSelector = createSelector(
  ({ documentsDetail }) => documentsDetail,
  (state, props) => _.getOr(null, 'match.params.userId', props),
  (documentsDetail, userId) => {
    const documentDetail = documentsDetail[userId];
    return ({ documentDetail, userId });
  }
);

export { patientDocumentsSelector, patientDocumentsDetailSelector }
