import React from 'react';
import _ from 'lodash/fp';

import { Line } from 'react-chartjs-2';

/* istanbul ignore next */
const handleLineClick = ({ onCellClick, dataChart }) => (chartElements) => {
  const index = _.get('[0]_index', chartElements);
  if (index) onCellClick(dataChart.datasetsData.sourceId[index]);
};

const VitalsChart = props => <div className="chart-block">
  <div className="wrap-chart chart-vitals bordered">
    <Line
      data={{
        labels: props.dataChart.labels,
        datasets: [
          {
            label: 'Resp',
            backgroundColor: 'rgba(13, 141, 5, 0.4)',
            borderColor: 'rgba(13, 141, 5, 1)',
            pointBorderColor: 'rgba(13, 141, 5, 1)',
            pointBackgroundColor: 'rgba(13, 141, 5, 1)',
            data: props.dataChart.datasetsData.respirationRate,
          }, {
            label: 'SpO2',
            backgroundColor: 'rgba(219, 0, 120, 0.4)',
            borderColor: 'rgba(219, 0, 120, 1)',
            pointBorderColor: 'rgba(219, 0, 120, 1)',
            pointBackgroundColor: 'rgba(219, 0, 120, 1)',
            data: props.dataChart.datasetsData.oxygenSaturation,
          }, {
            label: 'HR',
            backgroundColor: 'rgba(70, 124, 174, 0.4)',
            borderColor: 'rgba(70, 124, 174, 1)',
            pointBorderColor: 'rgba(70, 124, 174, 1)',
            pointBackgroundColor: 'rgba(70, 124, 174, 1)',
            data: props.dataChart.datasetsData.heartRate,
          }, {
            label: 'SBP',
            backgroundColor: 'rgba(236, 109, 28, 0.4)',
            borderColor: 'rgba(236, 109, 28, 1)',
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(236, 109, 28, 1)',
            pointBackgroundColor: 'rgba(236, 109, 28, 1)',
            data: props.dataChart.datasetsData.systolicBP,
          }, {
            label: 'DBP',
            backgroundColor: 'rgba(5, 186, 195, 0.4)',
            borderColor: 'rgba(5, 186, 195, 1)',
            pointBorderColor: 'rgba(5, 186, 195, 1)',
            pointBackgroundColor: 'rgba(5, 186, 195, 1)',
            data: props.dataChart.datasetsData.diastolicBP,
          }, {
            label: 'Temp',
            backgroundColor: 'rgba(221, 43, 8, 0.4)',
            borderColor: 'rgba(221, 43, 8, 1)',
            pointBorderColor: 'rgba(221, 43, 8, 1)',
            pointBackgroundColor: 'rgba(221, 43, 8, 1)',
            data: props.dataChart.datasetsData.temperature,
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

export default VitalsChart;
