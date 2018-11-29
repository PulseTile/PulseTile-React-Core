import React from 'react';

/**
 * This component returns content of Breadcrumbs block of UIkit page
 *
 * @return {XML}
 * @constructor
 */
const Breadcrumbs = () => {
  return (
    <div id="breadcrumbs" className="ui-section">
      <strong className="ui-title">Breadcrumbs</strong>
      <div className="ui-sub-section">
        <div className="wrap-breadcrumbs">
          <div className="container-fluid">
            <div className="breadcrumbs">
              <a className="breadcrumb-link">Patient Listings</a>
              <span className="breadcrumb-separate"></span>
              <a className="breadcrumb-link">Patient Summary</a>
              <span className="breadcrumb-separate"></span>
              <span className="breadcrumb-link active">Medications</span>
            </div>
          </div>
        </div>
       </div>
    </div>
  );
};

export default Breadcrumbs;
