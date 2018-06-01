import { createSelector } from 'reselect';
import _ from 'lodash/fp';

import { operationsOnCollection } from '../../../utils/plugin-helpers.utils';
import { valuesNames } from './forms.config';

const patientImagesSelector = createSelector(
  ({ patientsImages }) => patientsImages,
  (state, props) => _.getOr(null, 'match.params.userId', props),
  (patientsImages, userId) => {
    const allImages = operationsOnCollection.modificateDateForTable(patientsImages[userId], valuesNames.DATE_RECORDED);
    if (!_.isEmpty(allImages)) {
      allImages.map(item => item.sourceId = item.studyId);
    }

    return ({ allImages, userId });
  }
);

const seriesDetailAndInstanceIdsSelector = createSelector(
  ({ seriesDetail }) => seriesDetail,
  (state, props) => _.getOr(null, 'match.params.userId', props),
  (seriesDetail, userId) => {
    const serieDetail = seriesDetail[userId];
    const instanceIds = [];
    if (!_.isEmpty(seriesDetail)) {
      for (const key in seriesDetail[userId].instanceIds) {
        instanceIds.push(seriesDetail[userId].instanceIds[key])
      }
    }
    return ({ serieDetail, userId, instanceIds });
  }
);

const allSeriesSelector = createSelector(
  ({ allSeries }) => allSeries,
  (state, props) => _.getOr(null, 'match.params.userId', props),
  (allSeries, userId) => {
    const allSerie = allSeries[userId];
    return ({ allSerie, userId });
  }
);

export { patientImagesSelector, seriesDetailAndInstanceIdsSelector, allSeriesSelector }
