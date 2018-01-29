import _ from 'lodash/fp';

import { valuesNames } from './forms.config';

export const validateForm = (values) => {
  const errors = {};
  const isAgeRangeSelected = _.flow(_.get(valuesNames.SELECT_AGE), _.eq('range'))(values);

  errors[valuesNames.SEARCH_TYPE] = !values[valuesNames.SEARCH_TYPE] ? 'You must enter a value.' : null;
  errors[valuesNames.QUERY_TEXT] = !values[valuesNames.QUERY_TEXT] ? 'You must enter a value.' : null;
  if (!isAgeRangeSelected) errors[valuesNames.DATE_OF_BIRTH] = !values[valuesNames.DATE_OF_BIRTH] ? 'You must enter a value.' : null;

  return errors
};
