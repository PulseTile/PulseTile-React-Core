import React from 'react';

/**
 * This component returns content of ThemeColors section
 */
const ThemeColors = () => {
  return (
    <div id="palette-color" className="ui-section">
      <strong className="ui-title">Color Palette for Themes</strong>
      <div className="form-group-wrapper">
        <div className="row">
          <div className="col-xs-6 col-sm-4">
            <div className="form-group">
              <div className="palette-color">
                <span className="palette-color-icon" style={{ background: 'rgb(13, 103, 47)' }}></span>
                <span className="palette-color-name ng-binding">Green Theme</span>
              </div>
            </div>
          </div>
          <div className="col-xs-6 col-sm-4">
            <div className="form-group">
              <div className="palette-color">
                <span className="palette-color-icon" style={{ background: 'red' }}></span>
                <span className="palette-color-name ng-binding">Red Theme</span>
              </div>
            </div>
          </div>
          <div className="col-xs-6 col-sm-4">
            <div className="form-group">
              <div className="palette-color">
                <span className="palette-color-icon" style={{ background: 'blue' }}></span>
                <span className="palette-color-name ng-binding">Blue Theme</span>
              </div>
            </div>
          </div>
          <div className="col-xs-6 col-sm-4">
            <div className="form-group">
              <div className="palette-color">
                <span className="palette-color-icon" style={{ background: 'brown' }}></span>
                <span className="palette-color-name ng-binding">Brown Theme</span>
              </div>
            </div>
          </div>
          <div className="col-xs-6 col-sm-4">
            <div className="form-group">
              <div className="palette-color">
                <span className="palette-color-icon" style={{ background: 'yellow' }}></span>
                <span className="palette-color-name ng-binding">Yellow Theme</span>
              </div>
            </div>
          </div>
          <div className="col-xs-6 col-sm-4">
            <div className="form-group">
              <div className="palette-color">
                <span className="palette-color-icon" style={{ background: 'pink' }}></span>
                <span className="palette-color-name ng-binding">Pink Theme</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeColors;
