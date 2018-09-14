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

  marks[min] = moment(min).format('DD-MMM-YYYY');
  marks[max] = moment(max).format('DD-MMM-YYYY');

  for (let i = 1; i < rangeAmountPart; i += 1) {
    const mark = min + markWeight * i;
    const markLabel = (i === rangeAmountPart / 2) ? moment(mark).format('DD-MMM-YYYY') : '';
    marks[mark] = { label: markLabel };
  }

  return marks;
};


export const getCookie = (name) => {
  const nameEQ = `${name}=`;
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

export const popupCenter = (w, h) => {
  const dualScreenLeft = (window.screenLeft !== undefined) ? window.screenLeft : screen.left;
  const dualScreenTop = (window.screenTop !== undefined) ? window.screenTop : screen.top;

  const width = (window.innerWidth ? window.innerWidth : document.documentElement.clientWidth) ? document.documentElement.clientWidth : screen.width;
  const height = (window.innerHeight ? window.innerHeight : document.documentElement.clientHeight) ? document.documentElement.clientHeight : screen.height;

  const left = ((width / 2) - (w / 2)) + dualScreenLeft;
  const top = ((height / 2) - (h / 2)) + dualScreenTop;
  return `width=${w}, height=${h}, top=${top}, left=${left}`;
};

export const openPopup = (id) => {
  window.windowObjectReference = window.windowObjectReference || null;
  const center = popupCenter(972, 734);
  const options = `${center},resizable=yes,scrollbars=yes,status=yes,minimizable=yes,location=no`;
  if (window.windowObjectReference == null || window.windowObjectReference.closed) {
    window.windowObjectReference = window.open(`${window.location.origin}/videochat/videochat.html?appointmentId=${id}`,
      'Video Chat', options);
    window.windowObjectReference.focus();
  } else {
    window.windowObjectReference.focus();
  }
};
