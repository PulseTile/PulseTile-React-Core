import React from 'react';
import { nonCorePagesUrls } from '../config/nonCorePagesUrls';

/**
 * This function checks is current URL correspond to non-core page
 *
 * @param {string} pathname
 * @return {boolean}
 */
export function isPageNonCore(pathname) {
  let result = false;
  for (let i = 0, n = nonCorePagesUrls.length; i < n; i++) {
    let item = nonCorePagesUrls[i];
    if (item.pathname === pathname) {
      result = true;
      break;
    }
  }
  return result;
}

/**
 * This function returns main component of non-core page
 *
 * @param {string} pathname
 * @return {XML}
 */
export function getNonCorePage(pathname) {
  let result = null;
  for (let i = 0, n = nonCorePagesUrls.length; i < n; i++) {
    let item = nonCorePagesUrls[i];
    if (item.pathname === pathname) {
      result = item.component;
      break;
    }
  }
  return result;
}