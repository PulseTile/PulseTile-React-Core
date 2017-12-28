import _ from 'lodash/fp';
import moment from 'moment';

export const modificateEventsArr = (arr) => {
  let result = _.flow(
    _.sortBy(value => value.dateTime),
    _.reverse
  )(arr);
  result = result.map((value, index) => {
    if (index % 2) {
      value.sideDateInTimeline = 'right';
    } else {
      value.sideDateInTimeline = 'left';
    }
    return value;
  });
  result = _.flow(_.groupBy((value) => {
    const dateTime = new Date(value.dateTime);
    const day = new Date(dateTime.getFullYear(), dateTime.getMonth(), dateTime.getDate());
    return day.getTime();
  }))(result);

  return result;
};

export const getMarksArray = (min, max) => {
  const marks = {};
  const rangeAmountPart = 20;

  const differrent = max - min;
  const markWeight = parseInt(differrent / rangeAmountPart);

  marks[min] =  moment(min).format('DD-MMM-YYYY');
  marks[max] =  moment(max).format('DD-MMM-YYYY');

  for (let i = 1; i < rangeAmountPart; i += 1) {
    const mark = min + markWeight * i;
    const markLabel = (i === rangeAmountPart / 2) ? moment(mark).format('DD-MMM-YYYY') : '';
    marks[mark] = { label: markLabel };
  }

  return marks;
};
