import React from 'react';
import { get } from 'lodash';
import { Line } from 'react-chartjs-2';

const dataChartLine = {
  labels: ["03-Aug-15 01:11","01:23","01:23","01:23","01:23","01:23","01:23","06:11","06:23","06:23"],
  datasets:[
    { label: "Resp", backgroundColor: "rgba(13, 141, 5, 0.4)",   borderColor:"rgba(13, 141, 5, 1)",   pointBorderColor: "rgba(13, 141, 5, 1)",   pointBackgroundColor:"rgba(13, 141, 5, 1)",   data: [25,23,23,23,23,23,23,25,23,23] },
    { label: "SpO2", backgroundColor: "rgba(219, 0, 120, 0.4)",  borderColor:"rgba(219, 0, 120, 1)",  pointBorderColor: "rgba(219, 0, 120, 1)",  pointBackgroundColor:"rgba(219, 0, 120, 1)",  data: [97,97,97,97,97,97,97,97,97,97] },
    { label: "HR",   backgroundColor: "rgba(70, 124, 174, 0.4)", borderColor:"rgba(70, 124, 174, 1)", pointBorderColor: "rgba(70, 124, 174, 1)", pointBackgroundColor:"rgba(70, 124, 174, 1)", data: [45,45,45,45,45,45,45,45,45,45] },
    { label: "SBP",  backgroundColor: "rgba(236, 109, 28, 0.4)", borderColor:"rgba(236, 109, 28, 1)", pointBorderColor: "rgba(236, 109, 28, 1)", pointBackgroundColor:"rgba(236, 109, 28, 1)", data: [90,92,92,92,92,92,92,90,92,92] },
    { label: "DBP",  backgroundColor: "rgba(5, 186, 195, 0.4)",  borderColor:"rgba(5, 186, 195, 1)",  pointBorderColor: "rgba(5, 186, 195, 1)",  pointBackgroundColor:"rgba(5, 186, 195, 1)",  data: [60,64,64,64,64,64,64,60,64,64] },
    { label: "Temp", backgroundColor: "rgba(221, 43, 8, 0.4)",   borderColor:"rgba(221, 43, 8, 1)",   pointBorderColor: "rgba(221, 43, 8, 1)",   pointBackgroundColor:"rgba(221, 43, 8, 1)",   data: [60,64,64,64,64,64,64,60,64,64] }
  ]
};

/**
 * This component returns content of LineChart section in Blocks
 */
const LineChart = () => {
  return (
    <div className="ui-sub-section">
      <strong className="ui-sub-title">Chart Lines</strong>
      <div className="wrap-chart chart-vitals bordered">
        <Line
          data={{
              labels: dataChartLine.labels,
              datasets: dataChartLine.datasets
          }}
          onElementsClick={function () {}}
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
                  }
                ],
              },
              layout: {
                padding: {
                  right: 10,
                },
              },
            }
          }
        />
      </div>
    </div>
  );
};

export default LineChart;
