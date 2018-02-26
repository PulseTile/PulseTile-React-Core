import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import configureStore from 'redux-mock-store';

import MedicationsPrescriptionForm from '../MedicationsDetail/MedicationsPrescriptionForm';
import { valuesNames, valuesLabels, routeOptions } from '../forms.config';

Enzyme.configure({ adapter: new Adapter() });

const mockStore = configureStore();
const store = mockStore({});
const FORM_NAME = 'prescriptionForm';
const DATE_FORMAT = 'DD-MMM-YYYY';

const prescriptionFormValue = {
  doseAmount: 'testDoseAmount',
  doseInterval: 'testDoseInterval',
  doseQuantity: 'testDoseQuantity',
  finishCancelled: true,
  name: 'testName',
  route: 'testRoute',
  start: 1513687817988,
};

const testProps = {
  detail: {
    [valuesNames.DATE_CREATED]: 1507020019000,
  },
  isSubmit: false,
};

const onShow = () => console.log('testing function onShow');
const toggleHourlySchedule = () => console.log('testing function toggleHourlySchedule');

describe('Component <MedicationsPrescriptionForm />', () => {
  it('should renders with props correctly', () => {
    const component = shallow(
      <MedicationsPrescriptionForm
        store={store}
        isSubmit={testProps.isSubmit}
        detail={testProps.detail}
        onShow={onShow}
        toggleHourlySchedule={toggleHourlySchedule}
        isOpenHourlySchedule
      />).dive().dive().dive();
    expect(component.find('Field')).toHaveLength(11);
    expect(component.find('form')).toHaveLength(1);
    expect(component.find('form').prop('name')).toEqual(FORM_NAME);

    expect(component.find('Field').at(0).props().name).toEqual(valuesNames.NAME);
    expect(component.find('Field').at(0).props().label).toEqual(valuesLabels.NAME);
    expect(component.find('Field').at(0).props().props.className).toEqual('form-control-static');

    expect(component.find('Field').at(1).props().name).toEqual(valuesNames.DOSE_AMOUNT);
    expect(component.find('Field').at(1).props().label).toEqual(valuesLabels.DOSE_AMOUNT);
    expect(component.find('Field').at(1).props().props.className).toEqual('form-control-static');

    expect(component.find('Field').at(2).props().name).toEqual(valuesNames.DOSE_INTERVAL);
    expect(component.find('Field').at(2).props().id).toEqual('doseIntervalMorning');
    expect(component.find('Field').at(2).props().label).toEqual('Morning');
    expect(component.find('Field').at(2).props().value).toEqual('morning');
    expect(component.find('Field').at(2).props().type).toEqual('radio');

    expect(component.find('Field').at(3).props().name).toEqual(valuesNames.DOSE_INTERVAL);
    expect(component.find('Field').at(3).props().id).toEqual('doseIntervalEvening');
    expect(component.find('Field').at(3).props().label).toEqual('Evening');
    expect(component.find('Field').at(3).props().value).toEqual('evening');
    expect(component.find('Field').at(3).props().type).toEqual('radio');

    expect(component.find('Field').at(4).props().name).toEqual(valuesNames.DOSE_INTERVAL);
    expect(component.find('Field').at(4).props().id).toEqual('doseIntervalSpecific');
    expect(component.find('Field').at(4).props().label).toEqual('Specific');
    expect(component.find('Field').at(4).props().value).toEqual('specific');
    expect(component.find('Field').at(4).props().type).toEqual('radio');

    expect(component.find('Field').at(5).props().name).toEqual(valuesNames.DOSE_QUANTITY);
    expect(component.find('Field').at(5).props().id).toEqual('doseQuantity1x');
    expect(component.find('Field').at(5).props().label).toEqual('1X');
    expect(component.find('Field').at(5).props().value).toEqual('1x');
    expect(component.find('Field').at(5).props().type).toEqual('radio');

    expect(component.find('Field').at(6).props().name).toEqual(valuesNames.DOSE_QUANTITY);
    expect(component.find('Field').at(6).props().id).toEqual('doseQuantity2x');
    expect(component.find('Field').at(6).props().label).toEqual('2X');
    expect(component.find('Field').at(6).props().value).toEqual('2x');
    expect(component.find('Field').at(6).props().type).toEqual('radio');

    expect(component.find('Field').at(7).props().name).toEqual(valuesNames.DOSE_QUANTITY);
    expect(component.find('Field').at(7).props().id).toEqual('doseQuantity3x');
    expect(component.find('Field').at(7).props().label).toEqual('3X');
    expect(component.find('Field').at(7).props().value).toEqual('3x');
    expect(component.find('Field').at(7).props().type).toEqual('radio');

    expect(component.find('Field').at(8).props().name).toEqual(valuesNames.DOSE_QUANTITY);
    expect(component.find('Field').at(8).props().id).toEqual('doseQuantity4x');
    expect(component.find('Field').at(8).props().label).toEqual('4X');
    expect(component.find('Field').at(8).props().value).toEqual('4x');
    expect(component.find('Field').at(8).props().type).toEqual('radio');

    expect(component.find('Field').at(9).props().name).toEqual(valuesNames.DOSE_QUANTITY);
    expect(component.find('Field').at(9).props().id).toEqual('doseQuantityOther');
    expect(component.find('Field').at(9).props().label).toEqual('Other');
    expect(component.find('Field').at(9).props().value).toEqual('other');
    expect(component.find('Field').at(9).props().type).toEqual('radio');

    expect(component.find('Field').at(10).props().name).toEqual(valuesNames.ROUTE);
    expect(component.find('Field').at(10).props().id).toEqual(valuesNames.ROUTE);
    expect(component.find('Field').at(10).props().label).toEqual(valuesLabels.ROUTE);
    expect(component.find('Field').at(10).props().options).toEqual(routeOptions);
    expect(component.find('Field').at(10).props().props.isSubmit).toEqual(false);
    expect(component.find('Field').at(10).props().props.placeholder).toEqual('-- Route --');

    expect(component).toMatchSnapshot();

    component.setState({ prescriptionFormValue });

    expect(component.find('Field').at(11).props().name).toEqual(valuesNames.CURRENT_DATE);
    expect(component.find('Field').at(11).props().id).toEqual(valuesNames.CURRENT_DATE);
    expect(component.find('Field').at(11).props().label).toEqual(valuesLabels.CURRENT_DATE);
    expect(component.find('Field').at(11).props().props.format).toEqual(DATE_FORMAT);
    expect(component.find('Field').at(11).props().props.isSubmit).toEqual(false);

    expect(component.find('Field').at(12).props().name).toEqual(valuesNames.FINISH_CANCELLED);
    expect(component.find('Field').at(12).props().id).toEqual(valuesNames.FINISH_CANCELLED);
    expect(component.find('Field').at(12).props().label).toEqual(valuesLabels.FINISH_CANCELLED);
    expect(component.find('Field').at(12).props().type).toEqual('checkbox');

    component.find('.btn-schedule').simulate('click');
    expect(component).toMatchSnapshot();

    component.setState({ prescriptionFormValue: { finishCancelled: false, doseInterval: 'testDoseInterval', doseQuantity: 'testDoseQuantity' } });

    expect(component.find('Field').at(13).props().name).toEqual(valuesNames.FINISH_DATE);
    expect(component.find('Field').at(13).props().id).toEqual(valuesNames.FINISH_DATE);
    expect(component.find('Field').at(13).props().label).toEqual(valuesLabels.FINISH_DATE);
    expect(component.find('Field').at(13).props().props.isSubmit).toEqual(false);
    expect(component.find('Field').at(13).props().props.format).toEqual(DATE_FORMAT);

    expect(component).toMatchSnapshot();

    component.find('.btn-schedule').simulate('click');
    expect(component).toMatchSnapshot();
  });

  it('should renders correctly when isOpenHourlySchedule false', () => {
    const component = shallow(
      <MedicationsPrescriptionForm
        store={store}
        isSubmit
        detail={testProps.detail}
        onShow={onShow}
        toggleHourlySchedule={toggleHourlySchedule}
        isOpenHourlySchedule={false}
      />).dive().dive().dive();

    expect(component).toMatchSnapshot();
  });
});

