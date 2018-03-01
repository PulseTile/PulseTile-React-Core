import { valuesNames } from '../forms.config';

export const defaultFormValues = {
  [valuesNames.AUTHOR]: 'bob.smith@gmail.com',
  [valuesNames.SOURCE_ID]: '',
  [valuesNames.ISIMPORT]: false,
  [valuesNames.ORIGINAL_SOURCE]: '',
  [valuesNames.ORIGINAL_COMPOSITION]: '',
  [valuesNames.MEDICATION_CODE]: 173134014,
  [valuesNames.MEDICATION_TERMINOLOGY]: 'SNOMED-CT',
};
