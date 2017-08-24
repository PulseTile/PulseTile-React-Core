import _ from 'lodash/fp';

const EMPTY_VALUE_STUB = '-';

const transformObjToArrByTemplate = arrTemplate => obj =>
  _.map(({ key, transformer = val => val }) =>
    _.cond([
      [_.isNumber, transformer],
      [_.isEmpty, _.constant(EMPTY_VALUE_STUB)],
      [_.T, transformer],
    ])(obj[key])
  )(arrTemplate)

export const getArrByTemplate = (arrTemplate, entriesList) =>
  _.map(transformObjToArrByTemplate(arrTemplate))(entriesList);
