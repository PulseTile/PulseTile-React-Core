import { createSelector } from 'reselect';
import _ from 'lodash/fp';

import { operationsOnCollection } from '../../../utils/plugin-helpers.utils';
import { valuesNames } from './forms.config';

const ordersPanelFormSelector = _.getOr({}, 'form.ordersPanelFormSelector');
const ordersCreateFormSelector = _.getOr({}, 'form.ordersCreateFormSelector');

const patientOrdersSelector = createSelector(
  ({ patientsOrders }) => patientsOrders,
  (state, props) => _.getOr(null, 'match.params.userId', props),
  (patientsOrders, userId) => {
    const allOrders = operationsOnCollection.modificateDateForTable(patientsOrders[userId], valuesNames.ORDER_DATE);
    return ({ allOrders, userId });
  }
);

const patientOrdersDetailSelector = createSelector(
  ({ ordersDetail }) => ordersDetail,
  (state, props) => _.getOr(null, 'match.params.userId', props),
  (ordersDetail, userId) => {
    const orderDetail = ordersDetail[userId];
    return ({ orderDetail, userId });
  }
);

const orderPanelFormSelector = createSelector(ordersPanelFormSelector,
  orderFormState => ({ orderFormState }));

const ordersCreateFormStateSelector = createSelector(ordersCreateFormSelector,
  ordersCreateFormState => ({ ordersCreateFormState }));

const listOrdersSelector = state => state.listOrders;

const listOrderSelector = createSelector(
  listOrdersSelector,
  listOrders => ({ listOrders })
);

export { patientOrdersSelector, patientOrdersDetailSelector, orderPanelFormSelector, ordersCreateFormStateSelector, listOrderSelector }
