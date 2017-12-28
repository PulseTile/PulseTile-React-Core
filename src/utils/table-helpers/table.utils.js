import _ from 'lodash/fp';

const EMPTY_VALUE_STUB = '';
const DASH = '-';

const emptyTransformer = val => val;

const transformObjToArrByTemplate = (arrTemplate, emptyFill) => obj =>
  _.map(({ key, transformer = emptyTransformer }) => {
    const isEmptyString = function (el) {
      return _.isString(el) && !el.length;
    };

    const value = _.cond([
    	[_.isNull, _.constant(emptyFill || EMPTY_VALUE_STUB)],
      [_.isUndefined, _.constant(emptyFill || EMPTY_VALUE_STUB)],
      [isEmptyString, _.constant(emptyFill || EMPTY_VALUE_STUB)],
      [_.T, transformer],
    ])(obj[key])

    return ({ name: key, value });
  }
  )(arrTemplate);

export const getArrByTemplate = (arrTemplate, entriesList, emptyFill) =>
  _.map(transformObjToArrByTemplate(arrTemplate, emptyFill))(entriesList);

export const formatNHSNumber = (number) => {
  if (!number) return '';

  const numberToString = number.toString();
  return `${numberToString.slice(0, 3)} ${numberToString.slice(3, 6)} ${numberToString.slice(6)}`;
};

export const formatYesNo = (value) => {
  return value ? 'Yes' : 'No';
};
