import _ from 'lodash/fp';

import { nhsNumberValidation, isRequired, isDate, IS_VALID } from '../../../../utils/validation-helpers/validation.utils';
import { valuesNames } from './values-names.config';

const hasNhsNumber = values => (_.isEmpty(values[valuesNames.NHS_NUMBER])
  ? '*Required'
  : IS_VALID);

const hasName = values => (_.isEmpty(values[valuesNames.FORENAME]) && _.isEmpty(values[valuesNames.SURNAME])
  ? '*Required'
  : IS_VALID);

export const validateAdvancedSearchValues = (values) => {
  const errors = {}

  errors[valuesNames.NHS_NUMBER] = nhsNumberValidation(values[valuesNames.NHS_NUMBER]) || hasName(values);
  errors[valuesNames.FORENAME] = isRequired(values[valuesNames.FORENAME]) || hasNhsNumber(values);
  errors[valuesNames.SURNAME] = isRequired(values[valuesNames.SURNAME]) || hasNhsNumber(values);

  console.log(values);
  return errors
};
