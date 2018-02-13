import { createSelector } from 'reselect';
import _ from 'lodash/fp';

import { operationsOnCollection } from '../../../utils/plugin-helpers.utils';
import { valuesNames } from './forms.config';

const diagnosesPanelFormSelector = _.getOr({}, 'form.diagnosesPanelFormSelector');
const diagnosesCreateFormSelector = _.getOr({}, 'form.diagnosesCreateFormSelector');

const patientDiagnosesSelector = createSelector(
  ({ patientsDiagnoses }) => patientsDiagnoses,
  (state, props) => _.getOr(null, 'match.params.userId', props),
  (patientsDiagnoses, userId) => {
    const allDiagnoses = operationsOnCollection.modificate(patientsDiagnoses[userId], [{
      key: valuesNames.DATE_OF_ONSET,
      fn: item => new Date(item).getTime(),
    }]);
    return ({ allDiagnoses, userId });
  }
);

const patientDiagnosesDetailSelector = createSelector(
  ({ diagnosesDetail }) => diagnosesDetail,
  (state, props) => _.getOr(null, 'match.params.userId', props),
  (diagnosesDetail, userId) => {
    const diagnosisDetail = diagnosesDetail[userId];
    return ({ diagnosisDetail, userId });
  }
);

const diagnosisPanelFormSelector = createSelector(diagnosesPanelFormSelector,
  diagnosisPanelFormState => ({ diagnosisPanelFormState }));

const diagnosesCreateFormStateSelector = createSelector(diagnosesCreateFormSelector,
  diagnosisCreateFormState => ({ diagnosisCreateFormState }));

export { patientDiagnosesSelector, patientDiagnosesDetailSelector, diagnosisPanelFormSelector, diagnosesCreateFormStateSelector }
