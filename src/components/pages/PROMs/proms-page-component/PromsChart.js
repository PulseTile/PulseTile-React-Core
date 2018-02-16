import React from 'react';
import _ from 'lodash/fp';

import { Line } from 'react-chartjs-2';

/* istanbul ignore next */
const handleLineClick = ({ onCellClick, dataChart }) => (chartElements) => {
  const index = _.get('[0]_index', chartElements);
  if (index) onCellClick(dataChart.datasetsData.sourceId[index]);
};

const PromsChart = props => <div className="chart-block">
  <div className="wrap-chart chart-vitals bordered">
    <Line
      data={{
        labels: props.dataChart.labels,
        datasets: [
          {
            label: 'PROM Score',
            backgroundColor: 'rgba(44, 161, 237, 0.4)',
            borderColor: 'rgba(44, 161, 237, 1)',
            pointBorderColor: 'rgba(44, 161, 237, 1)',
            pointBackgroundColor: 'rgba(44, 161, 237, 1)',
            data: props.dataChart.datasetsData.score,
          },
        ],
      }}
      onElementsClick={handleLineClick(props)}
      width={600}
      height={441}
      options={{
        capBezierPoints: false,
        responsive: true,
        maintainAspectRatio: false,
        elements: {
          line: {
            fill: false,
            lineTension: 0,
            borderCapStyle: 'butt',
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderWidth: 5,
            pointRadius: 1,
            pointHoverBorderWidth: 8,
            pointHoverRadius: 1,
            pointHitRadius: 8,
            spanGaps: true,
          },
        },
        tooltips: {
          mode: 'label',
          titleMarginBottom: 15,
          bodySpacing: 10,
          xPadding: 10,
          yPadding: 10,
          caretSize: 0,
          callbacks: {
            label(tooltipItem, data) {
              /* istanbul ignore next */
              return `  ${data.datasets[tooltipItem.datasetIndex].label} : ${tooltipItem.yLabel}`;
            },
          },
        },
        scales: {
          xAxes: [{
            ticks: {
              maxRotation: 90,
              minRotation: 90,
            },
          }],
        },
        layout: {
          padding: {
            right: 10,
          },
        },
      }}
    />
  </div>
</div>;

export default PromsChart;
