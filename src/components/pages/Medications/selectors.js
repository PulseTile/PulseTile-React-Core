import { createSelector } from 'reselect';
import _ from 'lodash/fp';

const medicationsCreateFormSelector = _.getOr({}, 'form.medicationsCreateFormSelector')
const medicationsDetailFormSelector = _.getOr({}, 'form.medicationsDetailFormSelector')
const metaPanelFormSelector = _.getOr({}, 'form.metaPanelFormSelector')

const patientMedicationsSelector = createSelector(
  ({ patientsMedications }) => patientsMedications,
  (state, props) => _.getOr(null, 'match.params.userId', props),
  (patientsMedications, userId) => {
    const allMedications = patientsMedications[userId];
    return ({ allMedications, userId });
  }
);

const medicationsDetailFormStateSelector = createSelector(medicationsDetailFormSelector,
  medicationsDetailFormState => ({ medicationsDetailFormState }));

const medicationsCreateFormStateSelector = createSelector(medicationsCreateFormSelector,
  medicationsCreateFormState => ({ medicationsCreateFormState }));

const metaPanelFormStateSelector = createSelector(metaPanelFormSelector,
  metaPanelFormState => ({ metaPanelFormState }));

const patientMedicationsDetailSelector = createSelector(
  ({ medicationsDetail }) => medicationsDetail,
  (state, props) => _.getOr(null, 'match.params.userId', props),
  (medicationsDetail, userId) => {
    const medicationDetail = medicationsDetail[userId];
    return ({ medicationDetail, userId });
  }
);

export { patientMedicationsSelector, medicationsDetailFormStateSelector, medicationsCreateFormStateSelector, metaPanelFormStateSelector, patientMedicationsDetailSelector }
