import _ from 'lodash/fp';

import { nhsNumberValidation, isRequired, isDate, IS_VALID } from '../../../../utils/validation-helpers/validation.utils';
import { valuesNames } from './values-names.config';

const hasNhsNumber = values => !_.isEmpty(values[valuesNames.NHS_NUMBER]);

const hasName = values => (_.isEmpty(values[valuesNames.FORENAME]) && _.isEmpty(values[valuesNames.SURNAME]))

export const validateAdvancedSearchValues = (values) => {
  const errors = {};

  if (!hasNhsNumber(values)) {
    errors[valuesNames.NHS_NUMBER] = nhsNumberValidation(values[valuesNames.NHS_NUMBER])
  } else if (!hasName(values)) {
    errors[valuesNames.FORENAME] = isRequired(values[valuesNames.FORENAME]);
    errors[valuesNames.SURNAME] = isRequired(values[valuesNames.SURNAME]);
  }

  return errors
};
