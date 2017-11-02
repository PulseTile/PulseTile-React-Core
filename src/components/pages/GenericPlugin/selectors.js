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
  ({ genericPluginDetail }) => genericPluginDetail,
  (state, props) => _.getOr(null, 'match.params.userId', props),
  (genericPluginDetail, userId) => {
    const genericPluginDetailOfUser = genericPluginDetail[userId];
    return ({ genericPluginDetail: genericPluginDetailOfUser, userId });
  }
);

const genericPluginDetailFormSelector = createSelector(genericPluginsDetailFormSelector,
  genericPluginFormState => ({ genericPluginFormState }));

const genericPluginCreateFormStateSelector = createSelector(genericPluginsCreateFormSelector,
  genericPluginCreateFormState => ({ genericPluginCreateFormState }));

export { patientGenericPluginSelector, patientGenericPluginDetailSelector, genericPluginDetailFormSelector, genericPluginCreateFormStateSelector }
