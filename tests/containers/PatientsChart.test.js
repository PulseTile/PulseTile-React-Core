import React from 'react';
import Enzyme, { mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

import PatientsChart from '../../src/components/containers/PatientsChart/PatientsChart';

Enzyme.configure({ adapter: new Adapter() });

const labels = [
  {
    name: 'Comunity Care',
    prefix: 'department',
    prefixLabel: 'Setting',
  },
  {
    name: 'Test',
    prefix: 'test',
    prefixLabel: 'test',
  },
];
const patients = [
  [
    {
      test: 'test1',
    },
    {
      test: 'test2',
    },
    {
      test: 'test3',
    },
    {
      test: 'test4',
    },
  ],
  [
    {
      test: 'test1',
    },
    {
      test: 'test2',
    },
  ],
  [
    {
      test: 'test1',
    },
    {
      test: 'test2',
    },
    {
      test: 'test3',
    },
  ],
]
const title = 'title test';
const subTitle = 'sub title test';

describe('Component <PatientsChart />', () => {
  it('should renders with props correctly', () => {
    const patientsChart = mount(
      <PatientsChart
        title={title}
        subTitle={subTitle}
        borderColor="rgba(36, 161, 116,1)"
        backgroundColor="rgba(36, 161, 116,0.3)"
        isChartsDataReceived
        labels={labels}
        patients={patients}
      />);

    const titleProps = patientsChart.props().title;
    const subTitleProps = patientsChart.props().subTitle;
    const isChartsDataReceived = patientsChart.props().isChartsDataReceived;

    expect(titleProps).toEqual(title);
    expect(subTitleProps).toEqual(subTitle);
    expect(isChartsDataReceived).toEqual(true);
    expect(patientsChart.props().labels).toHaveLength(2);
    expect(patientsChart.contains('title test')).toBe(true);
    expect(patientsChart).toMatchSnapshot();
  });
  it('should renders with props correctly', () => {
    const patientsChart = render(
      <PatientsChart
        title="title test"
        subTitle="sub title test"
        borderColor="rgba(36, 161, 116,1)"
        backgroundColor="rgba(36, 161, 116,0.3)"
        isChartsDataReceived
        labels={labels}
        patients={patients}
      />);
    expect(patientsChart).toMatchSnapshot();
  });
});
