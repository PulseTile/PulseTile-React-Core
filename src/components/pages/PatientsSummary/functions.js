import { get } from 'lodash';
import { themeConfigs } from '../../../themes.config';

/**
 * This function returns initial panels number
 * Default number is 4: Allergies, Medications, Contacts, Problems
 *
 * @return {number}
 */
export function getInitialPanelsNumber() {
    const defaultPanelsNumber = 4;
    const hiddenCorePlugins = get(themeConfigs, 'corePluginsToHide', []);
    return defaultPanelsNumber - hiddenCorePlugins.length;
}

/**
 *
 * @param testStoreContent
 * @return {*}
 */
export function getPanelsNumber(testStoreContent) {
    const initialNumber = getInitialPanelsNumber();
    const pluginsNumber = Object.keys(testStoreContent).length;
    return (pluginsNumber > 0) ? (initialNumber + pluginsNumber) : initialNumber;
}
