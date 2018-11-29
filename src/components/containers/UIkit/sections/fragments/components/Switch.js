import React from 'react';

/**
 * This component returns content of Switch section
 */
const Switch = () => {
  return (
    <div id="switch" className="ui-section">
      <strong className="ui-title">Switch</strong>
      <div className="form-group-wrapper">
        <div className="row">
          <div className="col-xs-12 col-sm-6">
            <div className="form-group">
              <label className="control-label">Enabled</label>
              <div className="input-holder">
                <div className="switch-group">
                  <label className="switch">
                    <input type="radio" name="switch1" value="1" checked />
                    <div className="slider">
                      <span className="text text-check-true">Yes</span>
                      <span className="text text-check-false">No</span>
                    </div>
                  </label>
                  <label className="switch">
                    <input type="radio" name="switch1" value="2" />
                    <div className="slider">
                      <span className="text text-check-true">Yes</span>
                      <span className="text text-check-false">No</span>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xs-12 col-sm-6">
            <div className="form-group">
              <label className="control-label">Disabled</label>
                <div className="input-holder">
                  <div className="switch-group">
                    <label className="switch">
                      <input type="radio" name="switch2" value="1" checked disabled />
                      <div className="slider disabled">
                        <span className="text text-check-true">Yes</span>
                        <span className="text text-check-false">No</span>
                      </div>
                    </label>
                    <label className="switch">
                      <input type="radio" name="switch2" value="2" disabled />
                      <div className="slider disabled">
                        <span className="text text-check-true">Yes</span>
                        <span className="text text-check-false">No</span>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Switch;
