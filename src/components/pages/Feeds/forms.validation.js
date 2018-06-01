import { valuesNames } from './forms.config';

const validateForm = (values) => {
  const errors = {};
  errors[valuesNames.NAME] = !values[valuesNames.NAME] ? 'You must enter a value.' : null;
  errors[valuesNames.LANDING_PAGE_URL] = !values[valuesNames.LANDING_PAGE_URL] ? 'You must enter a value.' : null;
  errors[valuesNames.RSS_FEED_URL] = !values[valuesNames.RSS_FEED_URL] ? 'You must enter a value.' : null;
  return errors
};

export { validateForm }
