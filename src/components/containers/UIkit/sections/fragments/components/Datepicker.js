import React from 'react';
import DateInput from '../../../../../form-fields/DateInput';

/**
 * This component returns Datepicker section for COMPONENTS
 */
const Datepicker = () => {
    return (
        <div id="datepicker" className="ui-section">
            <strong className="ui-title">Date Picker</strong>
            <div className="form-group-wrapper">
                <div className="row">
                    <div className="col-xs-12 col-sm-6">
                        <div className="form-group form-group-sm">
                            <DateInput
                                label='Select Data'
                                input={{value: 1490227200000}}
                                meta={{
                                    active: true,
                                    error: ''
                                }}
                            />
                        </div>
                    </div>
                    <div className="col-xs-12 col-sm-6">
                        <div className="form-group form-group-sm">
                            <DateInput
                                label='Select Data'
                                input={{value: 1490227200000, disabled: true}}
                                meta={{
                                    active: true,
                                    error: ''
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Datepicker;
