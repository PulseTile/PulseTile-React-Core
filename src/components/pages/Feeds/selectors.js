import { createSelector } from 'reselect';
import _ from 'lodash/fp';

import { valuesNames } from './forms.config';

const feedsPanelFormSelector = _.getOr({}, 'form.feedsPanelFormSelector');
const feedsCreateFormSelector = _.getOr({}, 'form.feedsCreateFormSelector');

const feedsSelector = createSelector(
  feeds => ({ feeds })
);

const feedsDetailSelector = createSelector(
  feedsDetail => ({ feedsDetail })
);

const feedPanelFormSelector = createSelector(feedsPanelFormSelector,
  feedFormState => ({ feedFormState }));

const feedCreateFormStateSelector = createSelector(feedsCreateFormSelector,
  feedCreateFormState => ({ feedCreateFormState }));

export { feedsSelector, feedsDetailSelector, feedPanelFormSelector, feedCreateFormStateSelector }
