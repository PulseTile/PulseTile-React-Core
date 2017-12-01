import { combineEpics } from 'redux-observable';

import { fetchPatientOrdersEpic } from './ducks/fetch-patient-orders.duck';
import { fetchPatientOrdersDetailEpic } from './ducks/fetch-patient-orders-detail.duck';
import { fetchPatientOrdersCreateEpic } from './ducks/fetch-patient-orders-create.duck';
import { fetchListOrdersEpic } from './ducks/fetch-list-orders.duck';

import patientsOrders from './ducks/fetch-patient-orders.duck'
import ordersDetail from './ducks/fetch-patient-orders-detail.duck'
import ordersCreate from './ducks/fetch-patient-orders-create.duck'
import listOrders from './ducks/fetch-list-orders.duck'

const ordersEpic = combineEpics(fetchPatientOrdersEpic, fetchPatientOrdersDetailEpic, fetchPatientOrdersCreateEpic, fetchListOrdersEpic);

const ordersReducer = {
  patientsOrders,
  ordersDetail,
  ordersCreate,
  listOrders,
};

export { ordersEpic, ordersReducer }
