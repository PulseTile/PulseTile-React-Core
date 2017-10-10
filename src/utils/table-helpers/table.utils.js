import _ from 'lodash/fp';

const EMPTY_VALUE_STUB = '-';

const emptyTransformer = val => val;

const transformObjToArrByTemplate = arrTemplate => obj =>
  _.map(({ key, transformer = emptyTransformer }) => {
    const value = _.cond([
      [_.isNumber, transformer],
      [_.isEmpty, _.constant(EMPTY_VALUE_STUB)],
      [_.T, transformer],
    ])(obj[key])

    return ({ name: key, value });
  }
  )(arrTemplate);

export const getArrByTemplate = (arrTemplate, entriesList) =>
  _.map(transformObjToArrByTemplate(arrTemplate))(entriesList);

export const formatNHSNumber = number => `${number.slice(0, 3)} ${number.slice(3, 6)} ${number.slice(6)}`;
