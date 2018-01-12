import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import configureStore from 'redux-mock-store';

import MedicationsDetailForm from '../../../src/components/pages/Medications/MedicationsDetail/MedicationsDetailForm';
import { valuesNames, valuesLabels } from '../../../src/components/pages/Medications/forms.config';

Enzyme.configure({ adapter: new Adapter() });

const mockStore = configureStore();
const store = mockStore({});
const FORM_NAME = 'medicationsDetailForm';
const DATE_FORMAT = 'DD-MMM-YYYY';

const testProps = {
  detail: {
    [valuesNames.DATE_CREATED]: 1507020019000,
  },
  isSubmit: false,
};

const onShow = () => console.log('testing function onShow')

describe('Component <MedicationsDetailForm />', () => {
  it('should renders with props correctly', () => {
    const component = shallow(
      <MedicationsDetailForm
        store={store}
        isSubmit={testProps.isSubmit}
        detail={testProps.detail}
        onShow={onShow}
      />).dive().dive().dive();
    expect(component.find('Field')).toHaveLength(7);
    expect(component.find('form')).toHaveLength(1);
    expect(component.find('form').prop('name')).toEqual(FORM_NAME);

    expect(component.find('Field').at(0).props().name).toEqual(valuesNames.NAME);
    expect(component.find('Field').at(0).props().id).toEqual(valuesNames.NAME);
    expect(component.find('Field').at(0).props().label).toEqual(valuesLabels.NAME);
    expect(component.find('Field').at(0).props().props.isSubmit).toEqual(false);

    expect(component.find('Field').at(1).props().name).toEqual(valuesNames.DOSE_AMOUNT);
    expect(component.find('Field').at(1).props().id).toEqual(valuesNames.DOSE_AMOUNT);
    expect(component.find('Field').at(1).props().label).toEqual(valuesLabels.DOSE_AMOUNT);
    expect(component.find('Field').at(1).props().props.isSubmit).toEqual(false);

    expect(component.find('Field').at(2).props().name).toEqual('doseAmountVariable');
    expect(component.find('Field').at(2).props().id).toEqual('doseAmountVariable');
    expect(component.find('Field').at(2).props().label).toEqual('Variable');
    expect(component.find('Field').at(2).props().type).toEqual('checkbox');

    expect(component.find('Field').at(3).props().name).toEqual(valuesNames.DOSE_TIMING);
    expect(component.find('Field').at(3).props().label).toEqual(valuesLabels.DOSE_TIMING);
    expect(component.find('Field').at(3).props().props.className).toEqual('form-control-static');

    expect(component.find('Field').at(4).props().name).toEqual(valuesNames.DOSE_DIRECTIONS);
    expect(component.find('Field').at(4).props().id).toEqual(valuesNames.DOSE_DIRECTIONS);
    expect(component.find('Field').at(4).props().label).toEqual(valuesLabels.DOSE_DIRECTIONS);
    expect(component.find('Field').at(4).props().props.isSubmit).toEqual(false);

    expect(component.find('Field').at(5).props().name).toEqual(valuesNames.AUTHOR);
    expect(component.find('Field').at(5).props().id).toEqual(valuesNames.AUTHOR);
    expect(component.find('Field').at(5).props().label).toEqual(valuesLabels.AUTHOR);
    expect(component.find('Field').at(5).props().props.isSubmit).toEqual(false);
    expect(component.find('Field').at(5).props().props.disabled).toEqual(true);

    expect(component.find('Field').at(6).props().name).toEqual(valuesNames.DATE_CREATED);
    expect(component.find('Field').at(6).props().id).toEqual(valuesNames.DATE_CREATED);
    expect(component.find('Field').at(6).props().label).toEqual(valuesLabels.DATE_CREATED);
    expect(component.find('Field').at(6).props().props.isSubmit).toEqual(false);
    expect(component.find('Field').at(6).props().props.disabled).toEqual(true);
    expect(component.find('Field').at(6).props().props.value).toEqual(testProps.detail[valuesNames.DATE_CREATED]);
    expect(component.find('Field').at(6).props().props.format).toEqual(DATE_FORMAT);

    expect(component).toMatchSnapshot();

    component.find('.btn-inverse').simulate('click');
    expect(component).toMatchSnapshot();
  });

  it('should renders correctly when form is submitted', () => {
    const component = shallow(
      <MedicationsDetailForm
        store={store}
        isSubmit
        detail={testProps.detail}
      />).dive().dive().dive();
    expect(component.find('Field')).toHaveLength(7);
    expect(component.find('form')).toHaveLength(1);
    expect(component.find('form').prop('name')).toEqual(FORM_NAME);

    expect(component.find('Field').at(0).props().props.isSubmit).toEqual(true);
    expect(component.find('Field').at(1).props().props.isSubmit).toEqual(true);
    expect(component.find('Field').at(4).props().props.isSubmit).toEqual(true);
    expect(component.find('Field').at(5).props().props.isSubmit).toEqual(true);
    expect(component.find('Field').at(6).props().props.isSubmit).toEqual(true);

    expect(component).toMatchSnapshot();
  });
});

