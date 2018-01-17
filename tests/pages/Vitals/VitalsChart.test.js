import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

import VitalsChart from '../../../src/components/pages/Vitals/vitals-page-component/VitalsChart';
import { valuesNames } from '../../../src/components/pages/Vitals/forms.config';

Enzyme.configure({ adapter: new Adapter() });

const onCellClick = () => {};
const dataChart = {
  datasetsData: {
    [valuesNames.DIASTOLIC_BP]: [94, 82, 64],
    [valuesNames.HEART_RATE]: [86, 92, 64],
    [valuesNames.OXYGEN_SATURATION]: [74, 42, 74],
    [valuesNames.RESPIRATION_RATE]: [94, 12, 64],
    [valuesNames.SYSTOLIC_BP]: [64, 42, 34],
    [valuesNames.TEMPERATURE]: [14, 22, 34],
    [valuesNames.SOURCE_ID]: ['c522c8a1-9a97-447b-90d9-c63a42b87c20', '2ddf5ed8-2cbd-4bd5-a868-ab8cbde9f54b', '2ddf5ed8-2cbd-4bd5-a868-ab8cbde9f54b'],
  },
  labels: ['11-Jan-18 12:49', '12-Jan-18 13:48', '16-Jan-18 16:49'],
};
const testProps = {
  onCellClick,
  dataChart,
};

describe('Component <VitalsChart />', () => {
  it('should renders with props correctly', () => {
    const component = shallow(
      <VitalsChart
        dataChart={testProps.dataChart}
        onCellClick={testProps.onCellClick}
      />);

    expect(component.find('.chart-block')).toHaveLength(1);
    expect(component.find('Line')).toHaveLength(1);

    expect(component).toMatchSnapshot();
  });
});
