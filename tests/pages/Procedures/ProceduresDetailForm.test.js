import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import configureStore from 'redux-mock-store';

import ProceduresDetailForm from '../../../src/components/pages/Procedures/ProceduresDetail/ProceduresDetailForm';
import { valuesNames, valuesLabels } from '../../../src/components/pages/Procedures/forms.config';

Enzyme.configure({ adapter: new Adapter() });

const mockStore = configureStore();
const store = mockStore({});
const FORM_NAME = 'proceduresDetailForm';
const DATE_FORMAT = 'DD-MMM-YYYY';

const testProps = {
  detail: {
    dateSubmitted: 1507020019000,
  },
  isSubmit: false,
};

describe('Component <ProceduresDetailForm />', () => {
  it('should renders with props correctly', () => {
    const component = shallow(
      <ProceduresDetailForm
        store={store}
        isSubmit={testProps.isSubmit}
        detail={testProps.detail}
      />).dive().dive().dive();
    expect(component.find('Field')).toHaveLength(8);
    expect(component.find('form')).toHaveLength(1);
    expect(component.find('form').prop('name')).toEqual(FORM_NAME);

    expect(component.find('Field').at(0).props().name).toEqual(valuesNames.NAME);
    expect(component.find('Field').at(0).props().id).toEqual(valuesNames.NAME);
    expect(component.find('Field').at(0).props().label).toEqual(valuesLabels.NAME);
    expect(component.find('Field').at(0).props().props.isSubmit).toEqual(false);

    expect(component.find('Field').at(1).props().name).toEqual(valuesNames.DATE_OF_PROCEDURE);
    expect(component.find('Field').at(1).props().id).toEqual(valuesNames.DATE_OF_PROCEDURE);
    expect(component.find('Field').at(1).props().label).toEqual(valuesLabels.DATE_OF_PROCEDURE);
    expect(component.find('Field').at(1).props().props.isSubmit).toEqual(false);
    expect(component.find('Field').at(1).props().props.format).toEqual(DATE_FORMAT);

    expect(component.find('Field').at(2).props().name).toEqual(valuesNames.PERFORMER);
    expect(component.find('Field').at(2).props().id).toEqual(valuesNames.PERFORMER);
    expect(component.find('Field').at(2).props().label).toEqual(valuesLabels.PERFORMER);
    expect(component.find('Field').at(2).props().props.isSubmit).toEqual(false);

    expect(component.find('Field').at(3).props().name).toEqual(valuesNames.NOTES);
    expect(component.find('Field').at(3).props().id).toEqual(valuesNames.NOTES);
    expect(component.find('Field').at(3).props().label).toEqual(valuesLabels.NOTES);
    expect(component.find('Field').at(3).props().props.isSubmit).toEqual(false);

    expect(component.find('Field').at(4).props().name).toEqual(valuesNames.TERMINOLOGY);
    expect(component.find('Field').at(4).props().id).toEqual(valuesNames.TERMINOLOGY);
    expect(component.find('Field').at(4).props().label).toEqual(valuesLabels.TERMINOLOGY);
    expect(component.find('Field').at(4).props().props.isSubmit).toEqual(false);

    expect(component.find('Field').at(5).props().name).toEqual(valuesNames.CODE);
    expect(component.find('Field').at(5).props().id).toEqual(valuesNames.CODE);
    expect(component.find('Field').at(5).props().label).toEqual(valuesLabels.CODE);
    expect(component.find('Field').at(5).props().props.isSubmit).toEqual(false);

    expect(component.find('Field').at(6).props().name).toEqual(valuesNames.AUTHOR);
    expect(component.find('Field').at(6).props().id).toEqual(valuesNames.AUTHOR);
    expect(component.find('Field').at(6).props().label).toEqual(valuesLabels.AUTHOR);
    expect(component.find('Field').at(6).props().props.isSubmit).toEqual(false);
    expect(component.find('Field').at(6).props().props.disabled).toEqual(true);

    expect(component.find('Field').at(7).props().name).toEqual(valuesNames.DATE);
    expect(component.find('Field').at(7).props().id).toEqual(valuesNames.DATE);
    expect(component.find('Field').at(7).props().label).toEqual(valuesLabels.DATE);
    expect(component.find('Field').at(7).props().props.isSubmit).toEqual(false);
    expect(component.find('Field').at(7).props().props.disabled).toEqual(true);
    expect(component.find('Field').at(7).props().props.value).toEqual(testProps.detail.dateSubmitted);
    expect(component.find('Field').at(7).props().props.format).toEqual(DATE_FORMAT);

    expect(component).toMatchSnapshot();
  });

  it('should renders correctly when form is submitted', () => {
    const component = shallow(
      <ProceduresDetailForm
        store={store}
        isSubmit
        detail={testProps.detail}
      />).dive().dive().dive();
    expect(component.find('Field')).toHaveLength(8);
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

    expect(component).toMatchSnapshot();
  });
});

