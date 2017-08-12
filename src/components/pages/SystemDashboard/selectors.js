import _ from 'lodash/fp';
import { createSelector } from 'reselect';

export const selectPatients = createSelector(_.get('patients'), patients => ({ patients }));
