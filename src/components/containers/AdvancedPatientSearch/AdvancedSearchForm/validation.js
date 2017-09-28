import _ from 'lodash/fp';

import { nhsNumberValidation, isRequired, isDate, IS_VALID } from '../../../../utils/validation-helpers/validation.utils';
import { valuesNames } from './values-names.config';

export const validateAdvancedSearchValues = (values) => {
  const errors = {};

  const hasNhsNumber = !_.isEmpty(values[valuesNames.NHS_NUMBER]);
  const hasName = !(_.isEmpty(values[valuesNames.FORENAME]) && _.isEmpty(values[valuesNames.SURNAME]));
  const isAgeRangeSelected = _.flow(_.get(valuesNames.SELECT_AGE), _.eq('range'))(values);
  const isNhsNumberValid = _.isEmpty(nhsNumberValidation(values[valuesNames.NHS_NUMBER]));

  if (!hasName) {
    errors[valuesNames.NHS_NUMBER] = nhsNumberValidation(values[valuesNames.NHS_NUMBER]);
  } else if (!hasNhsNumber || !isNhsNumberValid) {
    errors[valuesNames.FORENAME] = isRequired(values[valuesNames.FORENAME]);
    errors[valuesNames.SURNAME] = isRequired(values[valuesNames.SURNAME]);
    if (!isAgeRangeSelected) errors[valuesNames.DATE_OF_BIRTH] = isRequired(values[valuesNames.DATE_OF_BIRTH]);
  }

  return errors
};
