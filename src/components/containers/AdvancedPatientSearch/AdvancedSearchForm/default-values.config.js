import { valuesNames } from './values-names.config';

export const defaultFormValues = {
  [valuesNames.SELECT_AGE]: 'range',
  [valuesNames.AGE_RANGE]: [0, 100],
  [valuesNames.DATE_OF_BIRTH]: 0,
  [valuesNames.MALE]: false,
  [valuesNames.FEMALE]: false,
};
