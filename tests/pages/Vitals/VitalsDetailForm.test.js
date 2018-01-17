import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import configureStore from 'redux-mock-store';
import moment from 'moment';

import VitalsDetailForm from '../../../src/components/pages/Vitals/VitalsDetail/VitalsDetailForm';
import { valuesNames, valuesLabels, valuesAddons } from '../../../src/components/pages/Vitals/forms.config';

Enzyme.configure({ adapter: new Adapter() });

const mockStore = configureStore();
const storeResource = {};
const store = mockStore(storeResource);
const DATE_TO_USE = new Date('2017');
const DATE_TO_USE_TIME = DATE_TO_USE.getTime();
global.Date = jest.fn(() => DATE_TO_USE);

const FORM_NAME = 'vitalsDetailForm';
const DATE_FORMAT = 'DD-MMM-YYYY';

const testProps = {
  getHighlighterClass: () => {},
  vitalStatuses: {
    [valuesNames.HEART_RATE]: {
      point: 1,
      type: 'success',
    },
    [valuesNames.LEVEL_OF_CONSCIOUSNESS]: {
      point: 0,
    },
    [valuesNames.NEWS_SCORE]: {
      point: undefined,
      type: 'success',
    },
    [valuesNames.OXYGEN_SATURATION]: {
      point: 0,
    },
    [valuesNames.OXYGEN_SUPPLEMENTAL]: {
      point: 2,
      type: 'warning',
    },
    [valuesNames.RESPIRATION_RATE]: {
      point: 0,
    },
    [valuesNames.SYSTOLIC_BP]: {
      point: 0,
    },
    [valuesNames.TEMPERATURE]: {
      point: 0,
    },
  },
  popoverLabels: 'testPopoverLabels',
  detail: {
    [valuesNames.LEVEL_OF_CONSCIOUSNESS]: 'testValue',
  },
};
const DATE_CREATED = moment(DATE_TO_USE_TIME).format(DATE_FORMAT);

describe('Component <VitalsDetailForm />', () => {
  it('should renders with props correctly', () => {
    const component = shallow(
      <VitalsDetailForm
        store={store}
        detail={testProps.detail}
        isSubmit={false}
        getHighlighterClass={testProps.getHighlighterClass}
        vitalStatuses={testProps.vitalStatuses}
        popoverLabels={testProps.popoverLabels}
      />).dive().dive().dive();
    expect(component.find('Field')).toHaveLength(13);
    expect(component.find('form')).toHaveLength(1);
    expect(component.find('form').prop('name')).toEqual(FORM_NAME);

    expect(component.find('Field').at(0).props().name).toEqual(valuesNames.RESPIRATION_RATE);
    expect(component.find('Field').at(0).props().id).toEqual(valuesNames.RESPIRATION_RATE);
    expect(component.find('Field').at(0).props().label).toEqual(valuesLabels.RESPIRATION_RATE);
    expect(component.find('Field').at(0).props().addonName).toEqual(valuesAddons.RESPIRATION_RATE);
    expect(component.find('Field').at(0).props().vitalStatuses).toEqual(testProps.vitalStatuses);
    expect(component.find('Field').at(0).props().popoverLabels).toEqual(testProps.popoverLabels);
    expect(component.find('Field').at(0).props().detail).toEqual(testProps.detail);
    expect(component.find('Field').at(0).props().props.isSubmit).toEqual(false);
    expect(component.find('Field').at(0).props().isInput).toEqual(true);

    expect(component.find('Field').at(1).props().name).toEqual(valuesNames.OXYGEN_SATURATION);
    expect(component.find('Field').at(1).props().id).toEqual(valuesNames.OXYGEN_SATURATION);
    expect(component.find('Field').at(1).props().label).toEqual(valuesLabels.OXYGEN_SATURATION);
    expect(component.find('Field').at(1).props().addonName).toEqual(valuesAddons.OXYGEN_SATURATION);
    expect(component.find('Field').at(1).props().vitalStatuses).toEqual(testProps.vitalStatuses);
    expect(component.find('Field').at(1).props().popoverLabels).toEqual(testProps.popoverLabels);
    expect(component.find('Field').at(1).props().detail).toEqual(testProps.detail);
    expect(component.find('Field').at(1).props().props.isSubmit).toEqual(false);
    expect(component.find('Field').at(1).props().isInput).toEqual(true);

    expect(component.find('Field').at(2).props().name).toEqual(valuesNames.OXYGEN_SUPPLEMENTAL);
    expect(component.find('Field').at(2).props().id).toEqual(valuesNames.OXYGEN_SUPPLEMENTAL);
    expect(component.find('Field').at(2).props().type).toEqual('checkbox');
    expect(component.find('Field').at(2).props().editOrCreate).toEqual(true);
    expect(component.find('.vitals-label').at(0).text()).toEqual(valuesLabels.OXYGEN_SUPPLEMENTAL);
    expect(component.find('Field').at(2).props().props.isSubmit).toEqual(false);

    expect(component.find('Field').at(3).props().name).toEqual(valuesNames.HEART_RATE);
    expect(component.find('Field').at(3).props().id).toEqual(valuesNames.HEART_RATE);
    expect(component.find('Field').at(3).props().label).toEqual(valuesLabels.HEART_RATE);
    expect(component.find('Field').at(3).props().addonName).toEqual(valuesAddons.HEART_RATE);
    expect(component.find('Field').at(3).props().vitalStatuses).toEqual(testProps.vitalStatuses);
    expect(component.find('Field').at(3).props().popoverLabels).toEqual(testProps.popoverLabels);
    expect(component.find('Field').at(3).props().detail).toEqual(testProps.detail);
    expect(component.find('Field').at(3).props().props.isSubmit).toEqual(false);
    expect(component.find('Field').at(3).props().isInput).toEqual(true);

    expect(component.find('Field').at(4).props().name).toEqual(valuesNames.SYSTOLIC_BP);
    expect(component.find('Field').at(4).props().id).toEqual(valuesNames.SYSTOLIC_BP);
    expect(component.find('Field').at(4).props().label).toEqual(valuesLabels.SYSTOLIC_BP);
    expect(component.find('Field').at(4).props().addonName).toEqual(valuesAddons.SYSTOLIC_BP);
    expect(component.find('Field').at(4).props().vitalStatuses).toEqual(testProps.vitalStatuses);
    expect(component.find('Field').at(4).props().popoverLabels).toEqual(testProps.popoverLabels);
    expect(component.find('Field').at(4).props().detail).toEqual(testProps.detail);
    expect(component.find('Field').at(4).props().props.isSubmit).toEqual(false);
    expect(component.find('Field').at(4).props().isInput).toEqual(true);

    expect(component.find('Field').at(5).props().name).toEqual(valuesNames.DIASTOLIC_BP);
    expect(component.find('Field').at(5).props().id).toEqual(valuesNames.DIASTOLIC_BP);
    expect(component.find('Field').at(5).props().label).toEqual(valuesLabels.DIASTOLIC_BP);
    expect(component.find('Field').at(5).props().addonName).toEqual(valuesAddons.DIASTOLIC_BP);
    expect(component.find('Field').at(5).props().vitalStatuses).toEqual(testProps.vitalStatuses);
    expect(component.find('Field').at(5).props().popoverLabels).toEqual(testProps.popoverLabels);
    expect(component.find('Field').at(5).props().detail).toEqual(testProps.detail);
    expect(component.find('Field').at(5).props().props.isSubmit).toEqual(false);
    expect(component.find('Field').at(5).props().isInput).toEqual(true);

    expect(component.find('Field').at(6).props().name).toEqual(valuesNames.LEVEL_OF_CONSCIOUSNESS);
    expect(component.find('Field').at(6).props().id).toEqual(`${valuesNames.LEVEL_OF_CONSCIOUSNESS}A`);
    expect(component.find('Field').at(6).props().type).toEqual('radio');
    expect(component.find('Field').at(6).props().editOrCreate).toEqual(true);
    expect(component.find('Field').at(6).props().value).toEqual('Alert');
    expect(component.find('Field').at(6).props().text).toEqual('A');
    expect(component.find('Field').at(6).props().transitionValue).toEqual(testProps.detail[valuesNames.LEVEL_OF_CONSCIOUSNESS]);
    expect(component.find('.vitals-label').at(1).text()).toEqual(valuesLabels.LEVEL_OF_CONSCIOUSNESS);
    expect(component.find('Field').at(6).props().props.isSubmit).toEqual(false);

    expect(component.find('Field').at(7).props().name).toEqual(valuesNames.LEVEL_OF_CONSCIOUSNESS);
    expect(component.find('Field').at(7).props().id).toEqual(`${valuesNames.LEVEL_OF_CONSCIOUSNESS}V`);
    expect(component.find('Field').at(7).props().type).toEqual('radio');
    expect(component.find('Field').at(7).props().editOrCreate).toEqual(true);
    expect(component.find('Field').at(7).props().value).toEqual('Verbal');
    expect(component.find('Field').at(7).props().text).toEqual('V');
    expect(component.find('Field').at(7).props().transitionValue).toEqual(testProps.detail[valuesNames.LEVEL_OF_CONSCIOUSNESS]);
    expect(component.find('Field').at(7).props().props.isSubmit).toEqual(false);

    expect(component.find('Field').at(8).props().name).toEqual(valuesNames.LEVEL_OF_CONSCIOUSNESS);
    expect(component.find('Field').at(8).props().id).toEqual(`${valuesNames.LEVEL_OF_CONSCIOUSNESS}P`);
    expect(component.find('Field').at(8).props().type).toEqual('radio');
    expect(component.find('Field').at(8).props().editOrCreate).toEqual(true);
    expect(component.find('Field').at(8).props().value).toEqual('Pain');
    expect(component.find('Field').at(8).props().text).toEqual('P');
    expect(component.find('Field').at(8).props().transitionValue).toEqual(testProps.detail[valuesNames.LEVEL_OF_CONSCIOUSNESS]);
    expect(component.find('Field').at(8).props().props.isSubmit).toEqual(false);

    expect(component.find('Field').at(9).props().name).toEqual(valuesNames.LEVEL_OF_CONSCIOUSNESS);
    expect(component.find('Field').at(9).props().id).toEqual(`${valuesNames.LEVEL_OF_CONSCIOUSNESS}U`);
    expect(component.find('Field').at(9).props().type).toEqual('radio');
    expect(component.find('Field').at(9).props().editOrCreate).toEqual(true);
    expect(component.find('Field').at(9).props().value).toEqual('Unresponsive');
    expect(component.find('Field').at(9).props().text).toEqual('U');
    expect(component.find('Field').at(9).props().transitionValue).toEqual(testProps.detail[valuesNames.LEVEL_OF_CONSCIOUSNESS]);
    expect(component.find('Field').at(9).props().props.isSubmit).toEqual(false);

    expect(component.find('Field').at(10).props().name).toEqual(valuesNames.TEMPERATURE);
    expect(component.find('Field').at(10).props().id).toEqual(valuesNames.TEMPERATURE);
    expect(component.find('Field').at(10).props().label).toEqual(valuesLabels.TEMPERATURE);
    expect(component.find('Field').at(10).props().addonName).toEqual(valuesAddons.TEMPERATURE);
    expect(component.find('Field').at(10).props().vitalStatuses).toEqual(testProps.vitalStatuses);
    expect(component.find('Field').at(10).props().popoverLabels).toEqual(testProps.popoverLabels);
    expect(component.find('Field').at(10).props().detail).toEqual(testProps.detail);
    expect(component.find('Field').at(10).props().props.isSubmit).toEqual(false);
    expect(component.find('Field').at(10).props().isInput).toEqual(true);

    expect(component.find('Field').at(11).props().name).toEqual(valuesNames.AUTHOR);
    expect(component.find('Field').at(11).props().id).toEqual(valuesNames.AUTHOR);
    expect(component.find('Field').at(11).props().label).toEqual(valuesLabels.AUTHOR);
    expect(component.find('Field').at(11).props().props.isSubmit).toEqual(false);
    expect(component.find('Field').at(11).props().props.disabled).toEqual(true);

    expect(component.find('Field').at(12).props().name).toEqual(valuesNames.DATE_CREATED);
    expect(component.find('Field').at(12).props().id).toEqual(valuesNames.DATE_CREATED);
    expect(component.find('Field').at(12).props().label).toEqual(valuesLabels.DATE_CREATED);
    expect(component.find('Field').at(12).props().props.isSubmit).toEqual(false);
    expect(component.find('Field').at(12).props().props.disabled).toEqual(true);
    expect(component.find('Field').at(12).props().props.format).toEqual(DATE_FORMAT);
    expect(component.find('Field').at(12).props().props.value).toEqual(DATE_CREATED);

    expect(component.find('.vitals-label').at(2).text()).toEqual(valuesLabels.NEWS_SCORE);
    expect(component.find('.form-control').at(0).props().id).toEqual(valuesNames.NEWS_SCORE);
    expect(component.find('.form-control').at(0).props().name).toEqual(valuesNames.NEWS_SCORE);
    expect(component.find('.form-control').at(0).props().type).toEqual('text');
    expect(component.find('.form-control').at(0).props().disabled).toEqual(true);

    expect(component).toMatchSnapshot();
  });

  it('should renders correctly when form is submitted', () => {
    const component = shallow(
      <VitalsDetailForm
        store={store}
        detail={testProps.detail}
        isSubmit
        getHighlighterClass={testProps.getHighlighterClass}
        vitalStatuses={testProps.vitalStatuses}
        popoverLabels={testProps.popoverLabels}
      />).dive().dive().dive();
    expect(component.find('Field')).toHaveLength(13);
    expect(component.find('form')).toHaveLength(1);
    expect(component.find('form').prop('name')).toEqual(FORM_NAME);

    expect(component.find('Field').at(0).props().props.isSubmit).toEqual(true);
    expect(component.find('Field').at(1).props().props.isSubmit).toEqual(true);
    expect(component.find('Field').at(2).props().props.isSubmit).toEqual(true);
    expect(component.find('Field').at(3).props().props.isSubmit).toEqual(true);
    expect(component.find('Field').at(4).props().props.isSubmit).toEqual(true);
    expect(component.find('Field').at(5).props().props.isSubmit).toEqual(true);
    expect(component.find('Field').at(6).props().props.isSubmit).toEqual(true);
    expect(component.find('Field').at(7).props().props.isSubmit).toEqual(true);
    expect(component.find('Field').at(8).props().props.isSubmit).toEqual(true);
    expect(component.find('Field').at(9).props().props.isSubmit).toEqual(true);
    expect(component.find('Field').at(10).props().props.isSubmit).toEqual(true);
    expect(component.find('Field').at(11).props().props.isSubmit).toEqual(true);
    expect(component.find('Field').at(12).props().props.isSubmit).toEqual(true);

    expect(component).toMatchSnapshot();
  });
});

