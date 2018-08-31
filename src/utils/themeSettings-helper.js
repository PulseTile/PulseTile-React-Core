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