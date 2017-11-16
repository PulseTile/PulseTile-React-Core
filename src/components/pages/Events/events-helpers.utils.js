import _ from 'lodash/fp';

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
