import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash/fp';

import { Bar } from 'react-chartjs-2';

const PatientsChart = props => <div className="chart-block">
  <div className="chart-title-group">
    <h2 className="chart-title">{props.title}</h2>
    <p className="chart-subtitle">{props.subTitle}</p>
  </div>
  <div className="wrap-chart chart-dashboard">
    <Bar
      data={{
        labels: props.labels,
        datasets: [{ data: props.patients.map(_.size) }],
      }}
      width={600}
      height={350}
      options={{
        capBezierPoints: false,
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false,
        },
        elements: {
          rectangle: {
            borderColor: props.borderColor,
            backgroundColor: props.backgroundColor,
            borderWidth: 1,
          },
        },
        tooltips: {
          enabled: true,
          mode: 'label',
          titleMarginBottom: 15,
          bodySpacing: 10,
          xPadding: 10,
          yPadding: 10,
          callbacks: {
            label(tooltipItem) {
              return `  Patients : ${tooltipItem.yLabel}`;
            },
          },
        },
        scales: {
          xAxes: [{
            stacked: true,
          }],
          yAxes: [{
            stacked: true,
          }],
        },
      }}
    />
  </div>
</div>;

PatientsChart.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
  patients: PropTypes.arrayOf(PropTypes.array).isRequired,
  labels: PropTypes.arrayOf(PropTypes.string).isRequired,
  borderColor: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string.isRequired,
};

export default PatientsChart;
