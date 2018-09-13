import { createSelector } from 'reselect';
import _ from 'lodash/fp';

import { operationsOnCollection } from '../../../utils/plugin-helpers.utils';
import { valuesNames } from './forms.config';

const medicationsCreateFormSelector = _.getOr({}, 'form.medicationsCreateFormSelector');
const medicationsDetailFormSelector = _.getOr({}, 'form.medicationsDetailFormSelector');
const medicationsPrescriptionFormSelector = _.getOr({}, 'form.medicationsPrescriptionFormSelector');

const patientMedicationsSelector = createSelector(
  ({ patientsMedications }) => patientsMedications,
  (state, props) => _.getOr(null, 'match.params.userId', props),
  (patientsMedications, userId) => {
    const allMedications = operationsOnCollection.modificateDateForTable(patientsMedications[userId], valuesNames.DATE_CREATED);
    return ({ allMedications, userId });
  }
);

const medicationsDetailFormStateSelector = createSelector(medicationsDetailFormSelector,
  medicationsDetailFormState => ({ medicationsDetailFormState }));

const medicationsCreateFormStateSelector = createSelector(medicationsCreateFormSelector,
  medicationsCreateFormState => ({ medicationsCreateFormState }));

const prescriptionPanelFormStateSelector = createSelector(medicationsPrescriptionFormSelector,
  prescriptionPanelFormState => ({ prescriptionPanelFormState }));

const patientMedicationsDetailSelector = createSelector(
  ({ medicationsDetail }) => medicationsDetail,
  (state, props) => _.getOr(null, 'match.params.userId', props),
  (medicationsDetail, userId) => {
    const medicationDetail = medicationsDetail[userId];
    return ({ medicationDetail, userId });
  }
);

export { patientMedicationsSelector, medicationsDetailFormStateSelector, medicationsCreateFormStateSelector, prescriptionPanelFormStateSelector, patientMedicationsDetailSelector }
