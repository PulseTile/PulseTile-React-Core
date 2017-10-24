import { createSelector } from 'reselect';
import _ from 'lodash/fp';

const diagnosesPanelFormSelector = _.getOr({}, 'form.diagnosesPanelFormSelector')

const patientDiagnosesSelector = createSelector(
  ({ patientsDiagnoses }) => patientsDiagnoses,
  (state, props) => _.getOr(null, 'match.params.userId', props),
  (patientsDiagnoses, userId) => {
    const allDiagnoses = patientsDiagnoses[userId];
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

export { patientDiagnosesSelector, patientDiagnosesDetailSelector, diagnosisPanelFormSelector }
