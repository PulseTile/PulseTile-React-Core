import { createSelector } from 'reselect';
import _ from 'lodash/fp';

const clinicalStatementsCreateFormSelector = _.getOr({}, 'form.clinicalStatementsCreateFormSelector');

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

const patientClinicalStatementsTagsSelector = createSelector(
	({ patientsClinicalStatementsTags }) => patientsClinicalStatementsTags,
	(state, props) => _.getOr(null, 'match.params.userId', props),
	(patientsClinicalStatementsTags, userId) => {
		const clinicalStatementsTags = patientsClinicalStatementsTags[userId];
		return ({ clinicalStatementsTags, userId });
	}
);

const patientClinicalStatementsQuerySelector = createSelector(
	({ patientsClinicalStatementsQuery }) => patientsClinicalStatementsQuery,
	(state, props) => _.getOr(null, 'match.params.userId', props),
	(patientsClinicalStatementsQuery, userId) => {
		const clinicalStatementsQuery = patientsClinicalStatementsQuery;
		return ({ clinicalStatementsQuery, userId });
	}
);

export {
	patientClinicalStatementsSelector,
	clinicalStatementsCreateFormStateSelector,
	patientClinicalStatementsDetailSelector,
	patientClinicalStatementsTagsSelector,
	patientClinicalStatementsQuerySelector
}
