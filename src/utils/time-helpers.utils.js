import moment from 'moment';

export const getUTCDate = dateOfBirth => moment(dateOfBirth).utc()

export const getAgeYears = dateOfBirth => moment().diff(dateOfBirth, 'years');

export const getDDMMMYYYY = dateOfBirth => (moment(dateOfBirth).isValid()
  ? moment(dateOfBirth).format('DD-MMM-YYYY')
  : dateOfBirth);
