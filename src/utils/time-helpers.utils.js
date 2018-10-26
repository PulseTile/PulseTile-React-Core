import moment from 'moment';

export const getUTCDate = date => moment(date).utc();

export const getAgeYears = date => moment().diff(date, 'years');

export const getDDMMMYYYY = date => (moment(date).isValid()
  ? moment(date).format('DD-MMM-YYYY')
  : date);

export const getDDMMMYYYYUnix = date => (moment(date).isValid()
  ? moment.unix(date).format('DD-MMM-YYYY')
  : date);

export const getHHmm = date => (moment(date).isValid()
  ? moment(date).format('HH:mm')
  : date);
