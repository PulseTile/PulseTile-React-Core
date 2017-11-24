import _ from 'lodash/fp';

export const checkIsValidateForm = (formState) => {
  for (const key in formState.syncErrors) {
    if (formState.syncErrors[key]) {
      return false;
    }
  }
  return true;
};

export const operationsOnCollection = {
  modificate: (collection, options) => {
    if (collection && options) {
      collection.map((item) => {
        options.forEach((option) => {
          if (option.key) {
            option.keyFrom = option.key;
            option.keyTo = option.key;
          }
          item[option.keyTo] = option.fn(item[option.keyFrom]);
        });

        return item;
      });
    }
    return collection;
  },

  filter: (collection, filterBy, filterKeys) => collection.filter((item) => {
    let str = '';

    filterKeys.forEach((key) => {
      str += item[key] ? item[key].toString().toLowerCase() + ' ' : '';
    });

    return str.indexOf(filterBy.toLowerCase() || '') !== -1;
  }),

  sort: (collection, sortingByKey, sortingByOrder) => {
    const reverseIfDescOrder = _.cond([
      [_.isEqual('desc'), () => _.reverse],
      [_.stubTrue, () => v => v],
    ])(sortingByOrder);

    return _.flow(_.sortBy([item => item[sortingByKey].toString().toLowerCase()]), reverseIfDescOrder)(collection);
  },

  filterAndSort: (options) => {
    const {filterBy, sortingByKey, sortingByOrder, filterKeys} = options;
    let collection = options.collection;

    if (collection) {
      collection = operationsOnCollection.filter(collection, filterBy, filterKeys);
      collection = operationsOnCollection.sort(collection, sortingByKey, sortingByOrder);
    }

    return collection;
  }
};