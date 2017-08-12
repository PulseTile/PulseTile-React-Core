import moment from 'moment';

export const getAgeYears = dateOfBirth => moment().diff(dateOfBirth, 'years');
