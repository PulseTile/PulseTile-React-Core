import { get } from 'lodash';
import { themeConfigs } from '../themes.config';

/**
 * This functions checks is it necessary to show the button
 * (according to theme settings)
 *
 * @param {array} hiddenButtons
 * @param {string} buttonType
 * @param {boolean} defaultResult
 * @return {boolean}
 */
export function isButtonVisible(hiddenButtons, buttonType, defaultResult) {
  let result = defaultResult;
  if (-1 !== hiddenButtons.indexOf(buttonType)) {
    result = false;
  }
  return result;
}

/**
 * This functions checks is it necessary to show the panel
 * (according to theme settings)
 *
 * @param {array} hiddenPanels
 * @param {string} panelName
 * @return {boolean}
 */
export function isPanelVisible(hiddenPanels, panelName) {
  return (-1 === hiddenPanels.indexOf(panelName));
}

/**
 * This function checks that current element should be show at details panel
 *
 * @param {string} el
 * @param {array}  hideElements
 * @return {boolean}
 */
export function isShowElement(el, hideElements) {
  return (-1 === hideElements.indexOf(el));
}

/**
 * This function checks that current core plugin should be visible in current version
 *
 * @param {array}  hiddenPlugins
 * @param {string} pluginName
 * @return {boolean}
 */
export function isPluginVisible(hiddenPlugins, pluginName) {
  return (-1 === hiddenPlugins.indexOf(pluginName));
}

/**
 * This function removes core plugin url from list if this plugin shouldn't be presented in the current version
 *
 * @param {array} corePluginsPages
 * @return {array}
 */
export function getFilterPlugins(corePluginsPages) {
  const hiddenCorePlugins = get(themeConfigs, 'corePluginsToHide', []);
  for (let i = 0; i < hiddenCorePlugins.length; i++) {
    let item = hiddenCorePlugins[i];
    if (corePluginsPages[item]) {
      delete corePluginsPages[item];
    }
  }
  return corePluginsPages;
}

/**
 *
 */
function getPluginByKey(totalSummaryConfig, key) {
    let result = null;
    for (let i = 0; i < totalSummaryConfig.length; i++) {
      let item = totalSummaryConfig[i];
      let pluginName = get(item, 'state', null);
      if (pluginName === key && pluginName) {
          result = item;
          break;
      }
    }
    return result;
}

/**
 * This plugin changes order of PatientSummary blocks
 *
 * @param {array} totalSummaryConfig
 * @return {array}
 */
export function rangePlugins(totalSummaryConfig) {
  const sidebarConfigIsVisible = get(themeConfigs, 'sidebarConfigIsVisible', []);
  let result = [];
  let i = 0;
  for (let key in sidebarConfigIsVisible) {
    let item = getPluginByKey(totalSummaryConfig, key);
    if (item) {
      result[i] = item;
      i++;
    }
  }
  return result;
}

/**
 * This function returns menu item be KEY-property
 *
 * @param {array}  sidebarConfig
 * @param {string} key
 * @return {*}
 */
function getMenuItemByKey(sidebarConfig, key) {
    let result = null;
    for (let i = 0; i < sidebarConfig.length; i++) {
        let item = sidebarConfig[i];
        let pluginName = get(item, 'key', null);
        if (pluginName === key && pluginName) {
            result = item;
            break;
        }
    }
    return result;
}

/**
 * This plugin changes order of Sidebar menu items
 *
 * @param {array} sidebarConfig
 * @return {array}
 */
export function rangeSidebar(sidebarConfig) {
    const sidebarConfigIsVisible = get(themeConfigs, 'sidebarConfigIsVisible', []);
    let result = [];
    let i = 0;
    for (let key in sidebarConfigIsVisible) {
        let item = getMenuItemByKey(sidebarConfig, key);
        if (item) {
            result[i] = item;
            i++;
        }
    }
    return result;
}
