import _ from 'lodash/fp';

const EMPTY_VALUE_STUB = '-';

const transformObjToArrByTemplate = arrTemplate => obj =>
  _.map(({ key, transformer = _.identity }) =>
    _.cond([
      [_.isNumber, transformer],
      [_.isEmpty, () => EMPTY_VALUE_STUB],
      [_.T, transformer],
    ])(obj[key])
  )(arrTemplate)

export const getArrByTemplate = (arrTemplate, entriesList) =>
  _.map(transformObjToArrByTemplate(arrTemplate))(entriesList);
