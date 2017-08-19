import _ from 'lodash/fp';

export const getArrByTemplate = (arrTemplate, entriesList, emptyValueStub = '-') =>
  _.map(entry => arrTemplate
    .map(({ name, transformer = val => val }) => transformer(
      _.getOr(emptyValueStub, name, entry))
    ), entriesList)
