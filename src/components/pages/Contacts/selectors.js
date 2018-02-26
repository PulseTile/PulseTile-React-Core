import { createSelector } from 'reselect';
import _ from 'lodash/fp';

import { operationsOnCollection } from '../../../utils/plugin-helpers.utils';
import { valuesNames } from './forms.config';

const contactsCreateFormSelector = _.getOr({}, 'form.contactsCreateFormSelector');
const contactsDetailFormSelector = _.getOr({}, 'form.contactsDetailFormSelector');
const metaPanelFormSelector = _.getOr({}, 'form.metaPanelFormSelector');

const patientContactsSelector = createSelector(
  ({ patientsContacts }) => patientsContacts,
  (state, props) => _.getOr(null, 'match.params.userId', props),
  (patientsContacts, userId) => {
    const allContacts = operationsOnCollection.modificate(patientsContacts[userId], [{
      key: valuesNames.NEXT_OF_KIN,
      fn: el => (el || false),
    }]);
    return ({ allContacts, userId });
  }
);

const contactsDetailFormStateSelector = createSelector(contactsDetailFormSelector,
  contactsDetailFormState => ({ contactsDetailFormState }));

const contactsCreateFormStateSelector = createSelector(contactsCreateFormSelector,
  contactsCreateFormState => ({ contactsCreateFormState }));

const metaPanelFormStateSelector = createSelector(metaPanelFormSelector,
  metaPanelFormState => ({ metaPanelFormState }));

const patientContactsDetailSelector = createSelector(
  ({ contactsDetail }) => contactsDetail,
  (state, props) => _.getOr(null, 'match.params.userId', props),
  (contactsDetail, userId) => {
    const contactDetail = contactsDetail[userId];
    return ({ contactDetail, userId });
  }
);

export { patientContactsSelector, contactsDetailFormStateSelector, contactsCreateFormStateSelector, metaPanelFormStateSelector, patientContactsDetailSelector }
