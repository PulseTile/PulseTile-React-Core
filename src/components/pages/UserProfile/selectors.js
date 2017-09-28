import _ from 'lodash/fp';
import { createSelector } from 'reselect';

const appSettingsFormSelector = _.getOr({}, 'form.appSettingsFormSelector')
const personalFormSelector = _.getOr({}, 'form.personalFormSelector')
const contactFormSelector = _.getOr({}, 'form.contactFormSelector')

const formStateSelector = createSelector(appSettingsFormSelector, personalFormSelector, contactFormSelector,
  formState => ({ formState }));

export default formStateSelector;
