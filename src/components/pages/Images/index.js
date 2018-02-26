import { combineEpics } from 'redux-observable';

import Images from './Images';
import { clientUrls } from '../../../config/client-urls.constants';

import { fetchPatientImagesEpic } from './ducks/fetch-patient-images.duck';
import { fetchPatientImagesDetailEpic } from './ducks/fetch-patient-images-detail.duck';
import { fetchSeriesEpic } from './ducks/fetch-all-series.duck';
import { fetchSeriesDetailEpic } from './ducks/fetch-series-detail.duck';

import patientsImages from './ducks/fetch-patient-images.duck';
import imagesDetail from './ducks/fetch-patient-images-detail.duck';
import allSeries from './ducks/fetch-all-series.duck';
import seriesDetail from './ducks/fetch-series-detail.duck';

const epics = combineEpics(fetchPatientImagesEpic, fetchPatientImagesDetailEpic, fetchSeriesEpic, fetchSeriesDetailEpic);

const reducers = {
  patientsImages,
  imagesDetail,
  allSeries,
  seriesDetail,
};

const sidebarConfig = { key: 'images', pathToTransition: '/images', name: 'Images', isVisible: true };

const routers = [
  { key: 'images', component: Images, path: `${clientUrls.PATIENTS}/:userId/${clientUrls.IMAGES}` },
  { key: 'imagesDetail', component: Images, path: `${clientUrls.PATIENTS}/:userId/${clientUrls.IMAGES}/:sourceId` },
];

export default {
  component: Images,
  epics, reducers, sidebarConfig, routers,
}
