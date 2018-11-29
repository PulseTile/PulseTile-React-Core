import React from 'react';

const patientInfo = {
  name: 'Ivor Cox',
  dateOfBirth: '06-Jun-1944',
  telephone: '(011981) 32362',
  gender: 'Male',
  gpName: 'Goff Carolyn D.',
  gpAddress: 'Hamilton Practice, 5544 Ante Street, Hamilton, Lanarkshire, N06 5LP',
  number: '999 99 9 9000',
};

/**
 * This component returns content of PatientInfo section in Blocks
 *
 * @return {XML}
 * @constructor
 */
const PatientInfo = () => {
  return (
    <div id="patient-info" className="ui-section">
      <strong className="ui-title">Info of patient</strong>
      <div className="ui-sub-section">
        <div className="wrap-header-toolbar">
          <div className="container-fluid">
            <div className="header-toolbar">
              <button className="btn-toggle-sidebar wrap-icon">
                <i className="btn-icon fa fa-bars"></i>
                <span className="btn-text">Menu</span>
              </button>
              <div className="wrap-patient-info">
                <div className="patient-info-caption">
                  <div className="patient-info-caption-btn btn-dropdown-toggle"></div>
                  <div className="patient-info-caption-text text-truncate">{ patientInfo.name }</div>
                </div>
                <div className="patient-info">
                  <div className="patient-info-group-2">
                    <div className="column-1">
                      <div className="patient-info-item"><span className="key">D.O.B.</span> { patientInfo.dateOfBirth }</div>
                      <div className="patient-info-item"><span className="key">Phone:</span> { patientInfo.telephone }</div>
                    </div>
                    <div className="column-2">
                      <div className="patient-info-item"><span className="key">Gender:</span> { patientInfo.gender }</div>
                      <div className="patient-info-item"><span className="key">NHS No.</span> { patientInfo.number } </div>
                    </div>
                  </div>
                  <div className="patient-info-group-1">
                    <div className="patient-info-item significant hidden-xs">{ patientInfo.name }}</div>
                    <div className="patient-info-item"><span className="key">Doctor:</span> { patientInfo.gpName }</div>
                  </div>
                  <div className="patient-info-item"><span className="key">Address:</span> { patientInfo.gpAddress }</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientInfo;
