import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

import VitalsInput from '../../../src/components/pages/Vitals/vitals-page-component/VitalsInput';
import { valuesNames } from '../../../src/components/pages/Vitals/forms.config';

Enzyme.configure({ adapter: new Adapter() });

const testProps = {
  addonName: 'test addon',
  label: 'Test label',
  placeholder: 'Test placeholder',
  input: { name: 'respirationRate', value: '' },
  meta: {
    active: false,
    error: false,
    touched: false,
  },
  id: 'test-id',
  getHighlighterClass: () => {},
  popoverLabels: 'testPopoverLabels',
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
      point: 1,
      type: 'success',
    },
    [valuesNames.SYSTOLIC_BP]: {
      point: 0,
    },
    [valuesNames.TEMPERATURE]: {
      point: 0,
    },
  },
  detail: {
    [valuesNames.RESPIRATION_RATE]: '12.0',
    [valuesNames.OXYGEN_SUPPLEMENTAL]: 'true',
    [valuesNames.HEART_RATE]: '45.0',
    [valuesNames.TEMPERATURE]: '37.0',
    [valuesNames.LEVEL_OF_CONSCIOUSNESS]: 'Alert',
    [valuesNames.SYSTOLIC_BP]: '112.0',
    [valuesNames.DIASTOLIC_BP]: '64.0',
    [valuesNames.OXYGEN_SATURATION]: '97.0',
    [valuesNames.NEWS_SCORE]: 3,
    [valuesNames.AUTHOR]: 'Dr Tony Shannon',
    [valuesNames.DATE_CREATED]: 1515682407000,
    [valuesNames.SOURCE]: 'ethercis',
    [valuesNames.SOURCE_ID]: '27ee5e25-4c32-46d2-b45a-f74149d72030',
  },
};
const popoverLabelsWithInputName = {
  [valuesNames.RESPIRATION_RATE]: [
    {
      place: 1,
      text: '≤ 8',
    },
    {
      place: 3,
      text: '9-11',
    },
  ],
};

describe('Component <VitalsInput />', () => {
  it('should renders with all props correctly', () => {
    const component = shallow(
      <VitalsInput
        id={testProps.id}
        label={testProps.label}
        input={testProps.input}
        meta={testProps.meta}
        placeholder={testProps.placeholder}
        getHighlighterClass={testProps.getHighlighterClass}
        popoverLabels={testProps.popoverLabels}
        vitalStatuses={testProps.vitalStatuses}
        detail={testProps.detail}
        isSubmit={false}
        isNotValidate={false}
        disabled={false}
      />);

    expect(component.find('VitalsPopover')).toHaveLength(1);
    expect(component.find('input')).toHaveLength(0);
    expect(component.find('label')).toHaveLength(1);
    expect(component.find('label').text()).toEqual(testProps.label);

    expect(component.find('VitalsPopover').props().detailValue).toEqual(testProps.detail[valuesNames.RESPIRATION_RATE]);
    expect(component.find('VitalsPopover').props().disabled).toEqual(false);
    expect(component.find('VitalsPopover').props().error).toEqual(false);
    expect(component.find('VitalsPopover').props().id).toEqual(testProps.id);
    expect(component.find('VitalsPopover').props().input.name).toEqual(valuesNames.RESPIRATION_RATE);
    expect(component.find('VitalsPopover').props().isNotValidate).toEqual(false);
    expect(component.find('VitalsPopover').props().placeholder).toEqual(testProps.placeholder);
    expect(component.find('VitalsPopover').props().popoverLabels).toEqual([]);
    expect(component.find('VitalsPopover').props().showError).toEqual(false);
    expect(component.find('VitalsPopover').props().title).toEqual(testProps.label);

    expect(component).toMatchSnapshot();
  });

  it('should renders with all props correctly when showError', () => {
    const component = shallow(
      <VitalsInput
        id={testProps.id}
        label={testProps.label}
        input={testProps.input}
        meta={{ active: false, error: true }}
        placeholder={testProps.placeholder}
        getHighlighterClass={testProps.getHighlighterClass}
        popoverLabels={popoverLabelsWithInputName}
        vitalStatuses={{}}
        detail={testProps.detail}
        isSubmit={true}
        isNotValidate={false}
        disabled={false}
      />);

    expect(component.find('VitalsPopover')).toHaveLength(1);
    expect(component.find('input')).toHaveLength(0);
    expect(component.find('label')).toHaveLength(1);
    expect(component.find('label').text()).toEqual(testProps.label);
    expect(component.find('.has-error')).toHaveLength(1);
    expect(component.find('.vitals-group').props().className).toEqual('vitals-group highlighter-wrapper has-error');

    expect(component).toMatchSnapshot();
  });

  it('should renders with all props correctly when not showError', () => {
    const component = shallow(
      <VitalsInput
        id={testProps.id}
        label={testProps.label}
        input={testProps.input}
        meta={{ active: false, error: false }}
        placeholder={testProps.placeholder}
        getHighlighterClass={testProps.getHighlighterClass}
        popoverLabels={popoverLabelsWithInputName}
        vitalStatuses={{}}
        detail={testProps.detail}
        isSubmit={false}
        isNotValidate={false}
        disabled={false}
      />);

    expect(component.state().isChanged).toEqual(false);
    component.setProps({ meta: { dirty: true }});
    expect(component.state().isChanged).toEqual(true);

    expect(component.find('VitalsPopover')).toHaveLength(1);
    expect(component.find('input')).toHaveLength(0);
    expect(component.find('label')).toHaveLength(1);
    expect(component.find('label').text()).toEqual(testProps.label);
    expect(component.find('.has-success')).toHaveLength(1);
    expect(component.find('.vitals-group').props().className).toEqual('vitals-group highlighter-wrapper has-success');

    expect(component).toMatchSnapshot();

    component.setProps({ meta: { dirty: false }});
  });


  it('should renders with all props correctly testing without popover', () => {
    const component = shallow(
      <VitalsInput
        id={testProps.id}
        label={testProps.label}
        input={testProps.input}
        meta={testProps.meta}
        placeholder={testProps.placeholder}
        getHighlighterClass={testProps.getHighlighterClass}
        popoverLabels={testProps.popoverLabels}
        vitalStatuses={testProps.vitalStatuses}
        detail={testProps.detail}
        isSubmit={false}
        isNotValidate={false}
        disabled={false}
        withoutPopover
      />);

    expect(component.find('VitalsPopover')).toHaveLength(0);
    expect(component.find('input')).toHaveLength(1);
    expect(component.find('label')).toHaveLength(1);
    expect(component.find('label').text()).toEqual(testProps.label);
    expect(component.find('.input-holder').props().className).toEqual('input-holder vitals-holder success');
    expect(component.find('.success')).toHaveLength(1);
    expect(component.find('input').props().disabled).toEqual(false);
    expect(component.find('input').props().id).toEqual(testProps.id);
    expect(component.find('input').props().name).toEqual(valuesNames.RESPIRATION_RATE);
    expect(component.find('input').props().placeholder).toEqual(testProps.placeholder);

    expect(component).toMatchSnapshot();
  });
});
