import { createSelector } from 'reselect';
import _ from 'lodash/fp';

const clinicalStatementsCreateFormSelector = _.getOr({}, 'form.clinicalStatementsCreateFormSelector')

const patientClinicalStatementsSelector = createSelector(
  ({ patientsClinicalStatements }) => patientsClinicalStatements,
  (state, props) => _.getOr(null, 'match.params.userId', props),
  (patientsClinicalStatements, userId) => {
    const allClinicalStatements = patientsClinicalStatements[userId];
    return ({ allClinicalStatements, userId });
  }
);

const clinicalStatementsCreateFormStateSelector = createSelector(clinicalStatementsCreateFormSelector,
  clinicalStatementsCreateFormState => ({ clinicalStatementsCreateFormState }));

const patientClinicalStatementsDetailSelector = createSelector(
  ({ clinicalStatementsDetail }) => clinicalStatementsDetail,
  (state, props) => _.getOr(null, 'match.params.userId', props),
  (clinicalStatementsDetail, userId) => {
    const clinicalStatementDetail = clinicalStatementsDetail[userId];
    return ({ clinicalStatementDetail, userId });
  }
);

export { patientClinicalStatementsSelector, clinicalStatementsCreateFormStateSelector, patientClinicalStatementsDetailSelector }
