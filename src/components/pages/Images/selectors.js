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
    return ({ imageDetail, userId });
  }
);

export { patientImagesSelector, patientImagesDetailSelector }
