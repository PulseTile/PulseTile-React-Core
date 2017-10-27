import { createSelector } from 'reselect';
import _ from 'lodash/fp';

const contactsCreateFormSelector = _.getOr({}, 'form.contactsCreateFormSelector')
const contactPanelFormSelector = _.getOr({}, 'form.contactPanelFormSelector')
const metaPanelFormSelector = _.getOr({}, 'form.metaPanelFormSelector')

const patientContactsSelector = createSelector(
  ({ patientsContacts }) => patientsContacts,
  (state, props) => _.getOr(null, 'match.params.userId', props),
  (patientsContacts, userId) => {
    const allContacts = patientsContacts[userId];
    return ({ allContacts, userId });
  }
);

const contactPanelFormStateSelector = createSelector(contactPanelFormSelector,
  contactPanelFormState => ({ contactPanelFormState }));

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

export { patientContactsSelector, contactPanelFormStateSelector, contactsCreateFormStateSelector, metaPanelFormStateSelector, patientContactsDetailSelector }
