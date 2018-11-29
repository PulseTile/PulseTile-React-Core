import React from 'react';

/**
 * This component returns content of Highlighters section
 */
const Highlighters = () => {
  return (
    <div id="highlighter" className="ui-section">
      <strong className="ui-title">Highlighters</strong>
      <div className="form-group-wrapper">
        <div className="row">
          <div className="col-xs-4">
            <div className="highlighter-wrapper">
              <span className="highlighter-success"></span>
              <div className="ui-highlighter"></div>
            </div>
          </div>
          <div className="col-xs-4">
            <div className="highlighter-wrapper">
              <span className="highlighter-warning"></span>
              <div className="ui-highlighter"></div>
            </div>
          </div>
          <div className="col-xs-4">
            <div className="highlighter-wrapper">
              <span className="highlighter-danger"></span>
              <div className="ui-highlighter"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Highlighters;
