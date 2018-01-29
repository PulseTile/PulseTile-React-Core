import { combineEpics } from 'redux-observable';

import { fetchPatientImagesEpic } from './ducks/fetch-patient-images.duck';
import { fetchPatientImagesDetailEpic } from './ducks/fetch-patient-images-detail.duck';
import { fetchSeriesEpic } from './ducks/fetch-all-series.duck';
import { fetchSeriesDetailEpic } from './ducks/fetch-series-detail.duck';

import patientsImages from './ducks/fetch-patient-images.duck'
import imagesDetail from './ducks/fetch-patient-images-detail.duck'
import allSeries from './ducks/fetch-all-series.duck'
import seriesDetail from './ducks/fetch-series-detail.duck'

const imagesEpic = combineEpics(fetchPatientImagesEpic, fetchPatientImagesDetailEpic, fetchSeriesEpic, fetchSeriesDetailEpic);

const imagesReducer = {
  patientsImages,
  imagesDetail,
  allSeries,
  seriesDetail,
};

export { imagesEpic, imagesReducer }
