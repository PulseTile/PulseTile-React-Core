import { createSelector } from 'reselect';
import _ from 'lodash/fp';

const allergiesCreateFormSelector = _.getOr({}, 'form.allergiesCreateFormSelector')
const allergiePanelFormSelector = _.getOr({}, 'form.allergiePanelFormSelector')
const metaPanelFormSelector = _.getOr({}, 'form.metaPanelFormSelector')

const patientAllergiesSelector = createSelector(
  ({ patientsAllergies }) => patientsAllergies,
  (state, props) => _.getOr(null, 'match.params.userId', props),
  (patientsAllergies, userId) => {
    const allAllergies = patientsAllergies[userId];
    return ({ allAllergies, userId });
  }
);

const allergiePanelFormStateSelector = createSelector(allergiePanelFormSelector,
  allergiePanelFormState => ({ allergiePanelFormState }));

const allergiesCreateFormStateSelector = createSelector(allergiesCreateFormSelector,
  allergiesCreateFormState => ({ allergiesCreateFormState }));

const metaPanelFormStateSelector = createSelector(metaPanelFormSelector,
  metaPanelFormState => ({ metaPanelFormState }));

const patientAllergiesDetailSelector = createSelector(
  ({ allergiesDetail }) => allergiesDetail,
  (state, props) => _.getOr(null, 'match.params.userId', props),
  (allergiesDetail, userId) => {
    const allergieDetail = allergiesDetail[userId];
    return ({ allergieDetail, userId });
  }
);

export { patientAllergiesSelector, allergiePanelFormStateSelector, allergiesCreateFormStateSelector, metaPanelFormStateSelector, patientAllergiesDetailSelector }
