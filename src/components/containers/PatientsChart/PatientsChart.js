import React from 'react';

const ChartBlock = props => <div className="chart-block">
  <div className="chart-title-group">
    <h2 className="chart-title">Patients By Setting</h2>
    <p className="chart-subtitle">This is a brief description of patients by setting.</p>
  </div>
  <div className="wrap-chart chart-dashboard">
    <canvas id="chart-department" height="350" width="600" />
  </div>
</div>;

export default ChartBlock;
