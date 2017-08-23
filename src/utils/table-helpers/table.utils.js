import _ from 'lodash/fp';

export const getArrByTemplate = (arrTemplate, entriesList, emptyValueStub = '-') =>
  _.map(entry => arrTemplate
    .map(({ name, transformer = val => val }) => {
      const value = _.get(name, entry);
      return transformer(_.isEmpty(value)
        ? emptyValueStub
        : value)
    }), entriesList)
