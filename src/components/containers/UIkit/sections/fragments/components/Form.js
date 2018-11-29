import React from 'react';

/**
 * This component returns content of Form section
 *
 * @return {XML}
 * @constructor
 */
const Form = () => {
    return (
        <div id="form" className="ui-section">
            <strong className="ui-title">Form</strong>
            <div className="row">
                <div className="col-xs-12 col-sm-6">
                    <div className="ui-sub-section">
                        <strong className="ui-sub-title">Form for reading values</strong>
                        <div className="form-group">
                            <label for="name" className="control-label">Label for Input</label>
                            <div className="form-control-static">Input text</div>
                        </div>
                    </div>
                </div>
                <div className="col-xs-12 col-sm-6">
                    <div className="ui-sub-section">
                        <strong className="ui-sub-title">Form for writting values</strong>
                        <div className="form-group">
                            <label for="name" className="control-label">Label for Input</label>
                            <div className="input-holder">
                                <input type="text" className="form-control input-sm" value="Input text" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xs-12 col-sm-6">
                    <div className="ui-sub-section">
                        <strong className="ui-sub-title">Value entered successfully</strong>
                        <div className="form-group has-success">
                            <label for="name" className="control-label">Label for Input</label>
                            <div className="input-holder">
                                <input type="text" className="form-control input-sm" value="Input text" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xs-12 col-sm-6">
                    <div className="ui-sub-section">
                        <strong className="ui-sub-title">Value entered error</strong>
                        <div className="form-group has-error">
                            <label for="name" className="control-label">Label for Input</label>
                            <div className="input-holder">
                                <input type="text" className="form-control input-sm" value="" />
                            </div>
                            <span className="help-block animate-fade">You must enter a value.</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Form;