import React from 'react';
import VitalsPopover from './VitalsPopover';

const respirationRateLabels = [
  { place: 1, text: '≤ 8' },
  { place: 3, text: '9-11' },
  { place: 4, text: '12-20' },
  { place: 5, text: '21-24' },
  { place: 7, text: '≥ 25' },
];

const heartRateLabels = [
  { place: 1, text: '≤ 40' },
  { place: 3, text: '41-50' },
  { place: 4, text: '51-90' },
  { place: 5, text: '91-110' },
  { place: 6, text: '111-130' },
  { place: 7, text: '≥ 131' },
];

/**
 * This component returns content of Vitals section in Blocks
 */
const Vitals = () => {
  return (
    <div id="vitals-popover" className="ui-section">
      <strong className="ui-title">Vitals - News Input and Popover </strong>
      <div className="ui-sub-section">
        <div className="vitals-group-wrapper">
          <div className="row">
            <div className="col-xs-12 col-sm-6">
              <div className="vitals-group highlighter-wrapper">
                <span className="highlighter-warning"></span>
                <label className="vitals-label">Respiration Rate</label>
                <VitalsPopover
                  title='Respiration Rate'
                  popoverLabels={respirationRateLabels}
                  vitalStatusesType='warning'
                  detailValue='23'
                  vitalsAddon='resps/min'
                  id='respirationRate'
                />
              </div>
            </div>
            <div className="col-xs-12 col-sm-6">
              <div className="vitals-group highlighter-wrapper">
                <span className="highlighter-success"></span>
                <label className="vitals-label">Heart Rate</label>
                <VitalsPopover
                  title='Heart Rate'
                  popoverLabels={heartRateLabels}
                  vitalStatusesType='success'
                  detailValue='45'
                  vitalsAddon='bpm'
                  id='heartRate'
                />
              </div>
            </div>
            <div className="col-xs-12 col-sm-6">
              <div className="vitals-group highlighter-wrapper">
                <span className="highlighter-danger"></span>
                <label className="vitals-label">NEWS Score</label>
                <div className="input-holder vitals-holder danger">
                  <div className="form-control input-sm">12</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vitals;

