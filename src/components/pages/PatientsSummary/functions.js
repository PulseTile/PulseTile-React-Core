import { get } from 'lodash';
import { themeConfigs } from '../../../themes.config';

/**
 * This function returns initial panels number
 * Default number is 4: Allergies, Medications, Contacts, Problems
 *
 * @return {number}
 */
function getInitialPanelsNumber() {
  const defaultPanelsNumber = 4;
  const hiddenCorePlugins = get(themeConfigs, 'corePluginsToHide', []);
  return defaultPanelsNumber - hiddenCorePlugins.length;
}


/**
 * This function return the number of synopsis panels for none-core plugins
 *
 * @return {number}
 */
function getNonCorePanelsNumber(testStoreContent) {
  let result = 0;
  const plugins = Object.keys(testStoreContent);
  plugins.forEach(item => {
    if (item !== 'fetchFeedsRequest') {
      result++;
    }
  });
  return result;
}

/**
 * This function return the total number of synopsis panels
 *
 * @param testStoreContent
 * @return {number}
 */
export function getPanelsNumber(testStoreContent) {
  const initialNumber = getInitialPanelsNumber();
  const pluginsNumber = getNonCorePanelsNumber(testStoreContent);
  return (pluginsNumber > 0) ? (initialNumber + pluginsNumber) : initialNumber;
}
