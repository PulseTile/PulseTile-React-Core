import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

import VitalsPopover from '../../../src/components/pages/Vitals/vitals-page-component/VitalsPopover';
import { valuesNames, valuesLabels, valuesAddons } from '../../../src/components/pages/Vitals/forms.config';

Enzyme.configure({ adapter: new Adapter() });

const testProps = {
  popoverLabels: [
    {
      place: 1,
      text: '≤ 40',
    },
    {
      place: 3,
      text: '41-50',
    },
  ],
  title: 'Test title',
  vitalStatusesType: 'success',
  detailValue: '45',
  vitalsAddon: 'bpm',
  placeholder: 'test placeholder',
  input: {
    name: valuesNames.HEART_RATE,
    value: 45,
  },
  id: valuesNames.HEART_RATE,

};
const resizeEvent = new Event('resize');
const simulateEvent = {
  target: {
    closest: {}
  },
};

describe('Component <VitalsPopover />', () => {
  it('should renders with props correctly shallow testing', () => {
    const component = shallow(
      <VitalsPopover
        title={testProps.title}
        popoverLabels={testProps.popoverLabels}
        vitalStatusesType={testProps.vitalStatusesType}
        detailValue={testProps.detailValue}
        vitalsAddon={testProps.vitalsAddon}
        placeholder={testProps.placeholder}
        input={testProps.input}
        id={testProps.id}
        showError
        isNotValidate={false}
        error="test error"
      />);

    expect(component.find('.form-control').text()).toEqual(testProps.detailValue);
    expect(component.find('.vitals-addon').text()).toEqual(testProps.vitalsAddon);
    expect(component.find('.place-1').text()).toEqual(testProps.popoverLabels[0].text);
    expect(component.find('.place-3').text()).toEqual(testProps.popoverLabels[1].text);
    expect(component.find('img').props().src).toEqual('range-vital.jpg');
    expect(component.find('.help-block').text()).toEqual('test error');
    expect(component.find('.help-block')).toHaveLength(1);
    component.instance().togglePopover();

    expect(component).toMatchSnapshot();

    component.find('.popover').simulate('click', simulateEvent);

    component.unmount();

    expect(component).toMatchSnapshot();
  });

  it('should renders with props correctly shallow testing when popoverLabels is empty and is Input', () => {
    const component = shallow(
      <VitalsPopover
        title={testProps.title}
        popoverLabels={{}}
        vitalStatusesType={testProps.vitalStatusesType}
        detailValue={testProps.detailValue}
        vitalsAddon={testProps.vitalsAddon}
        placeholder={testProps.placeholder}
        input={testProps.input}
        id={testProps.id}
        showError
        isNotValidate={false}
        error="test error"
        isInput
      />);

    expect(component.find('.success')).toHaveLength(1);
    expect(component.find('.input-group').props().id).toEqual(`popover-wrap-${testProps.id}`);
    expect(component.find('input').props().className).toEqual('form-control input-sm');
    expect(component.find('input').props().id).toEqual(valuesNames.HEART_RATE);
    expect(component.find('input').props().name).toEqual(valuesNames.HEART_RATE);
    expect(component.find('input').props().value).toEqual(45);

    expect(component).toMatchSnapshot();
  });

  it('should renders with props correctly mount testing', () => {
    const component = mount(
      <VitalsPopover
        title={testProps.title}
        popoverLabels={testProps.popoverLabels}
        vitalStatusesType={testProps.vitalStatusesType}
        detailValue={testProps.detailValue}
        vitalsAddon={testProps.vitalsAddon}
        placeholder={testProps.placeholder}
        input={testProps.input}
        id={testProps.id}
      />);

    // Testing resize event
    window.dispatchEvent(resizeEvent);

    expect(component).toMatchSnapshot();
  });
});

