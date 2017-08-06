import React from 'react';
import PropTypes from 'prop-types';

const ChartBlock = props => <div className="chart-block">
  <div className="chart-title-group">
    <h2 className="chart-title">{props.title}</h2>
    <p className="chart-subtitle">{props.subTitle}</p>
  </div>
  <div className="wrap-chart chart-dashboard">
    <canvas id="chart-department" height="350" width="600" />
  </div>
</div>;

ChartBlock.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
}

export default ChartBlock;
