import React from 'react';

/**
 * This component returns content of Scrollbar section
 */
const Scrollbar = () => {
  return (
    <div id="scrollbar" className="ui-section">
      <strong className="ui-title">Scrollbar</strong>
      <div className="ui-scrollbar">
        <div className="ui-scrollbar-content"></div>
      </div>
    </div>
  );
};

export default Scrollbar;
