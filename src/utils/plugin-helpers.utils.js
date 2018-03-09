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
  modsSorting: {
    NUMBER: 'number',
    DATE: 'date',
    REPLACEMENT: 'replacement',
  },

  modificate: (collection, options) => {
    if (collection && options) {
      collection.map((item, index) => {
        options.forEach((option) => {
          if (option.key) {
            option.keyFrom = option.key;
            option.keyTo = option.key;
          }
          item[option.keyTo] = option.fn(item[option.keyFrom], index);
        });

        return item;
      });
    }
    return collection;
  },

  filter: (collection, filterBy, filterKeys) => collection.filter((item) => {
    let str = '';

    filterKeys.forEach((key) => {
      str += item[key] ? `${item[key].toString().toLowerCase()} ` : '';
    });

    return str.indexOf(filterBy.toLowerCase() || '') !== -1;
  }),

  sort: (collection, sortingByKey, sortingByOrder, modeSorting) => {
    const reverseIfDescOrder = _.cond([
      [_.isEqual('desc'), () => _.reverse],
      [_.stubTrue, () => v => v],
    ])(sortingByOrder);

    return _.flow(_.sortBy([(item) => {
      let key = sortingByKey;

      if (modeSorting) {
        if (modeSorting[operationsOnCollection.modsSorting.REPLACEMENT]) {
          modeSorting[operationsOnCollection.modsSorting.REPLACEMENT].forEach((item) => {
            if (key === item.instead) {
              key = item.to;
            }
          });
        }
        if (modeSorting[operationsOnCollection.modsSorting.NUMBER] &&
            modeSorting[operationsOnCollection.modsSorting.NUMBER].indexOf(key) !== -1) {
          if (!_.isNaN(+item[key])) {
            return +item[key];
          }
        }
        if (modeSorting[operationsOnCollection.modsSorting.DATE] &&
          modeSorting[operationsOnCollection.modsSorting.DATE].indexOf(key) !== -1) {
          return new Date(item[key]).getTime();
        }
      }

      return item[key] ? item[key].toString().toLowerCase() : null;
    }]), reverseIfDescOrder)(collection);
  },

  filterAndSort: (options) => {
    const { filterBy, sortingByKey, sortingByOrder, filterKeys, modeSorting } = options;
    let collection = options.collection;

    if (collection) {
      collection = operationsOnCollection.filter(collection, filterBy, filterKeys);
      collection = operationsOnCollection.sort(collection, sortingByKey, sortingByOrder, modeSorting);
    }

    return collection;
  },

  toString: (collection, ...ignoreKeys) => {
    collection.map((itemCollection) => {
      return operationsOnCollection.propsToString(itemCollection, ...ignoreKeys);
    });
  },

  propsToString: (obj, ...ignoreKeys) => {
    for (const key in obj) {
      if (obj.hasOwnProperty(key) &&
          ignoreKeys.indexOf(key) === -1 &&
          _.isNumber(obj[key])) {
        obj[key] = obj[key].toString();
      }
    }
  },

  formatDateForCharts: (date) => {
    const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

    let dd = date.getDate();
    if (dd < 10) dd = `0${dd}`;

    const mm = month[date.getMonth()];

    let yy = date.getFullYear() % 100;
    if (yy < 10) yy = `0${yy}`;

    let hh = date.getHours();
    if (hh < 10) hh = `0${hh}`;

    let min = date.getMinutes();
    if (min < 10) min = `0${min}`;

    return {
      date: `${dd}-${mm}-${yy}`,
      time: `${hh}:${min}`,
    };
  },

  getDateLabels: (collection, key) => {
    let tempDate;
    let lastDate = '';
    const labels = [];

    if (!_.isEmpty(collection)) {
      collection.forEach((item) => {
        tempDate = operationsOnCollection.formatDateForCharts(new Date(+item[key]));

        if (lastDate === tempDate.date) {
          labels.push(tempDate.time);
        } else {
          lastDate = tempDate.date;
          labels.push(`${tempDate.date} ${tempDate.time}`);
        }
      });
    }

    return labels;
  },
};

export const hasClass = (element, cls) => {
  if (element !== null) return (` ${element.className} `).indexOf(` ${cls} `) > -1;
};

export const hasTokenInResponse = (response) => {
  let token;
  response.map((item) => {
    if (item.token) {
      token = item.token;
    }
  });

  return token;
};
