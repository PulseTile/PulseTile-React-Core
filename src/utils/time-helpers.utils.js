import moment from 'moment';

export const getAgeYears = dateOfBirth => moment().diff(dateOfBirth, 'years');
export const getDDMMMYYYY = dateOfBirth => (moment(dateOfBirth).isValid()
  ? moment(dateOfBirth).format('DD-MMM-YYYY')
  : dateOfBirth);
