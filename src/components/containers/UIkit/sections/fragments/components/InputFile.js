import React from 'react';

/**
 * This component returns content of InputFile section
 */
const InputFile = () => {
  return (
    <div id="input-file" className="ui-section">
      <strong className="ui-title">Input File</strong>
      <div className="form-group-wrapper">
        <div className="row">
          <div className="col-xs-12 col-sm-6">
            <div className="form-group">
              <label className="control-label">Application File</label>
              <div className="input-holder">
                <div className="wrap-fcustomfile">
                  <div className="fcustomfile-control">
                    <label for="logoPath" className="btn btn-success btn-inverse btn-normal-icon">
                      <input accept="image/jpeg,image/png,image/gif" type="file" name="logoPath" id="logoPath" />
                      <i className="fa fa-plus"></i> <span>Upload file</span>
                    </label>
                  </div>
                  <div className="fcustomfile-text"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputFile;