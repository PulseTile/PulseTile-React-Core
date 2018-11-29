import React from 'react';

/**
 * This component returns Labels section for COMPONENTS
 */
const Labels = () => {
  return (
    <div id="labels" className="ui-section">
      <strong className="ui-title">Labels</strong>
      <div className="form-group-wrapper">
        <div className="form-group">
          <div className="form-control-static">
            <div className="control-group-wrapper">
              <div className="control-group with-indent">
                <span className="label label-default">label default</span>
                <span className="label label-primary">label primary</span>
                <span className="label label-success">label success</span>
                <span className="label label-info">label info</span>
                <span className="label label-warning">label warning</span>
                <span className="label label-danger">label danger</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Labels;
