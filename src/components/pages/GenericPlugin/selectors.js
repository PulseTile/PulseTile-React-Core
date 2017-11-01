import { createSelector } from 'reselect';
import _ from 'lodash/fp';

const genericPluginsDetailFormSelector = _.getOr({}, 'form.genericPluginsDetailFormSelector');
const genericPluginsCreateFormSelector = _.getOr({}, 'form.genericPluginsCreateFormSelector');

const patientGenericPluginSelector = createSelector(
  ({ patientsGenericPlugin }) => patientsGenericPlugin,
  (state, props) => _.getOr(null, 'match.params.userId', props),
  (patientsGenericPlugin, userId) => {
    const allGenericPlugin = patientsGenericPlugin[userId];
    return ({ allGenericPlugin, userId });
  }
);

const patientGenericPluginDetailSelector = createSelector(
  ({ genericPluginsDetail }) => genericPluginsDetail,
  (state, props) => _.getOr(null, 'match.params.userId', props),
  (genericPluginsDetail, userId) => {
    const genericPluginDetail = genericPluginsDetail[userId];
    return ({ genericPluginDetail, userId });
  }
);

const genericPluginDetailFormSelector = createSelector(genericPluginsDetailFormSelector,
  genericPluginFormState => ({ genericPluginFormState }));

const genericPluginCreateFormStateSelector = createSelector(genericPluginsCreateFormSelector,
  genericCreateFormState => ({ genericCreateFormState }));

export { patientGenericPluginSelector, patientGenericPluginDetailSelector, genericPluginDetailFormSelector, genericPluginCreateFormStateSelector }
