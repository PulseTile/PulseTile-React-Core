import React from 'react';

/**
 * This component returns content of ControlGroup section
 */
const ControlGroup = () => {
  return (
    <div id="control-group" className="ui-section">
      <strong className="ui-title">Control Group</strong>
      <div className="ui-sub-section">
        <strong className="ui-sub-title">Controls aligned to left</strong>
        <div className="wrap-control-group hide-indent-bottom">
          <div className="control-group with-indent left">
            <button className="btn btn-danger"><i className="btn-icon fa fa-ban"></i> <span className="btn-text">Button text</span></button>
            <button className="btn btn-success"><i className="btn-icon fa fa-check"></i> <span className="btn-text">Button text</span></button>
          </div>
        </div>
      </div>
      <div className="ui-sub-section">
        <strong className="ui-sub-title">Controls aligned to right</strong>
        <div className="wrap-control-group hide-indent-bottom">
          <div className="control-group with-indent right">
            <button className="btn btn-danger"><i className="btn-icon fa fa-ban"></i> <span className="btn-text">Button text</span></button>
            <button className="btn btn-success"><i className="btn-icon fa fa-check"></i> <span className="btn-text">Button text</span></button>
          </div>
        </div>
      </div>
      <div className="ui-sub-section">
        <strong className="ui-sub-title">Controls aligned to center</strong>
        <div className="wrap-control-group hide-indent-bottom">
          <div className="control-group with-indent center">
            <button className="btn btn-danger"><i className="btn-icon fa fa-ban"></i> <span className="btn-text">Button text</span></button>
            <button className="btn btn-success"><i className="btn-icon fa fa-check"></i> <span className="btn-text">Button text</span></button>
          </div>
        </div>
      </div>
      <div className="ui-sub-section">
        <strong className="ui-sub-title">Controls without indents</strong>
        <div className="wrap-control-group hide-indent-bottom">
          <div className="control-group with-indent without-side-indent left">
            <button className="btn btn-danger"><i className="btn-icon fa fa-ban"></i> <span className="btn-text">Button text</span></button>
            <button className="btn btn-success"><i className="btn-icon fa fa-check"></i> <span className="btn-text">Button text</span></button>
            <button className="btn btn-primary"><span className="btn-text">Button text</span></button>
          </div>
        </div>
      </div>
      <div className="ui-sub-section">
        <strong className="ui-sub-title">Controls with separates</strong>
        <div className="wrap-control-group">
          <div className="control-group with-indent left">
            <button className="btn btn-danger"><i className="btn-icon fa fa-ban"></i> <span className="btn-text">Button text</span></button>
            <div className="control-separate"></div>
            <button className="btn btn-success"><i className="btn-icon fa fa-check"></i> <span className="btn-text">Button text</span></button>
            <div className="control-separate"></div>
            <button className="btn btn-primary"><span className="btn-text">Button text</span></button>
          </div>
        </div>
        <div className="wrap-control-group">
          <div className="control-group with-indent left">
            <button className="btn btn-sm btn-danger"><i className="btn-icon fa fa-ban"></i> <span className="btn-text">Button text</span></button>
            <div className="control-separate control-separate-sm"></div>
            <button className="btn btn-sm btn-success"><i className="btn-icon fa fa-check"></i> <span className="btn-text">Button text</span></button>
            <div className="control-separate control-separate-sm"></div>
            <button className="btn btn-sm btn-primary"><span className="btn-text">Button text</span></button>
          </div>
        </div>
        <div className="wrap-control-group">
          <div className="control-group with-indent left">
            <button className="btn btn-smaller btn-danger"><i className="btn-icon fa fa-ban"></i> <span className="btn-text">Button text</span></button>
            <div className="control-separate control-separate-smaller"></div>
            <button className="btn btn-smaller btn-success"><i className="btn-icon fa fa-check"></i> <span className="btn-text">Button text</span></button>
            <div className="control-separate control-separate-smaller"></div>
            <button className="btn btn-smaller btn-primary"><span className="btn-text">Button text</span></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ControlGroup;
