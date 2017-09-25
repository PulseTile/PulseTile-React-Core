import _ from 'lodash/fp';
import moment from 'moment';

export const IS_VALID = undefined;
export const NHS_MIN_LENGTH = 10;
export const NHS_MAX_LENGTH = 10;

export const nhsNumberValidation = _.cond([
  [_.isEmpty, _.constant('*Required')],
  [_.flow(_.size, v => _.lt(v, NHS_MIN_LENGTH)), _.constant('*NHS Number too short')],
  [_.flow(_.size, v=> _.gt(v, NHS_MAX_LENGTH)), _.constant('*NHS Number too long')],
  [_.T, _.constant(IS_VALID)],
]);

export const isRequired = _.cond([
  [_.isEmpty, _.constant('*Required')],
  [_.T, _.constant(IS_VALID)],
]);

export const isDate = _.cond([
  [_.isEmpty, _.constant(IS_VALID)],
  [date => !moment(date).isValid(), _.constant('You must enter valid date')],
  [_.T, _.constant(IS_VALID)],
]);
