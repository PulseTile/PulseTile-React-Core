import { createSelector } from 'reselect';
import _ from 'lodash/fp';

const patientImagesSelector = createSelector(
  ({ patientsImages }) => patientsImages,
  (state, props) => _.getOr(null, 'match.params.userId', props),
  (patientsImages, userId) => {
    const allImages = patientsImages[userId];
    if (!_.isEmpty(allImages)) {
      allImages.map(item => item.sourceId = item.studyId);
    }

    return ({ allImages, userId });
  }
);

const patientImagesDetailSelector = createSelector(
  ({ imagesDetail }) => imagesDetail,
  (state, props) => _.getOr(null, 'match.params.userId', props),
  (imagesDetail, userId) => {
    const imageDetail = imagesDetail[userId];
    // const instanceIds = imageDetail.instanceIds;
    return ({ imageDetail, userId });
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

export { patientImagesSelector, patientImagesDetailSelector, seriesDetailAndInstanceIdsSelector }
