import _ from 'lodash/fp';
import { createSelector } from 'reselect';

const appSettingsFormSelector = _.getOr({}, 'form.appSettingsFormSelector')
const personalFormSelector = _.getOr({}, 'form.personalFormSelector')

const formStateSelector = createSelector(appSettingsFormSelector, personalFormSelector,
  formState => ({ formState }));

export default formStateSelector;
