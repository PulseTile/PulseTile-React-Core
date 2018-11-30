import React from 'react';
import { getNonCorePage } from './functions';

/**
 * This component is used to render non-core pages
 * In Core it returns null
 */
const NonCorePage = ({ pathname }) => {
  const Page = getNonCorePage(pathname);
  return (
    <Page />
  );
};

export default NonCorePage;
