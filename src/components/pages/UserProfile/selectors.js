import _ from 'lodash/fp';
import { createSelector } from 'reselect';

const appSettingsFormSelector = _.getOr({}, 'form.appSettingsFormSelector')

const formStateSelector = createSelector(appSettingsFormSelector,
  formState => ({ formState }));

export default formStateSelector;
