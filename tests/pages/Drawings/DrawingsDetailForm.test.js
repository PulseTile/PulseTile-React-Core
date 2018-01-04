import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import configureStore from 'redux-mock-store';

import DrawingsDetailForm from '../../../src/components/pages/Drawings/DrawingsDetail/DrawingsDetailForm';
import { valuesNames, valuesLabels } from '../../../src/components/pages/Drawings/forms.config';

Enzyme.configure({ adapter: new Adapter() });

const mockStore = configureStore();
const store = mockStore({});
const FORM_NAME = 'drawingsDetailForm';
const DATE_FORMAT = 'DD-MMM-YYYY';

const testProps = {
  detail: {
    dateCreated: 1507020019000,
  },
  isSubmit: false,
};

describe('Component <DrawingsDetailForm />', () => {
  it('should renders with props correctly', () => {
    const component = shallow(
      <DrawingsDetailForm
        store={store}
        isSubmit={testProps.isSubmit}
        detail={testProps.detail}
      />).dive().dive().dive();
    expect(component.find('Field')).toHaveLength(3);
    expect(component.find('form')).toHaveLength(1);
    expect(component.find('form').prop('name')).toEqual(FORM_NAME);

    expect(component.find('Field').at(0).props().name).toEqual(valuesNames.NAME);
    expect(component.find('Field').at(0).props().id).toEqual(valuesNames.NAME);
    expect(component.find('Field').at(0).props().label).toEqual(valuesLabels.NAME);
    expect(component.find('Field').at(0).props().props.isSubmit).toEqual(false);

    expect(component.find('Field').at(1).props().name).toEqual(valuesNames.AUTHOR);
    expect(component.find('Field').at(1).props().id).toEqual(valuesNames.AUTHOR);
    expect(component.find('Field').at(1).props().label).toEqual(valuesLabels.AUTHOR);
    expect(component.find('Field').at(1).props().props.isSubmit).toEqual(false);
    expect(component.find('Field').at(1).props().props.disabled).toEqual(true);

    expect(component.find('Field').at(2).props().name).toEqual(valuesNames.DATE_CREATED);
    expect(component.find('Field').at(2).props().id).toEqual(valuesNames.DATE_CREATED);
    expect(component.find('Field').at(2).props().label).toEqual(valuesLabels.DATE_CREATED);
    expect(component.find('Field').at(2).props().props.isSubmit).toEqual(false);
    expect(component.find('Field').at(2).props().props.disabled).toEqual(true);
    expect(component.find('Field').at(2).props().props.value).toEqual(testProps.detail[valuesNames.DATE_CREATED]);
    expect(component.find('Field').at(2).props().props.format).toEqual(DATE_FORMAT);

    expect(component).toMatchSnapshot();
  });

  it('should renders correctly when form is submitted', () => {
    const component = shallow(
      <DrawingsDetailForm
        store={store}
        isSubmit
        detail={testProps.detail}
      />).dive().dive().dive();
    expect(component.find('Field')).toHaveLength(3);
    expect(component.find('form')).toHaveLength(1);
    expect(component.find('form').prop('name')).toEqual(FORM_NAME);

    expect(component.find('Field').at(0).props().props.isSubmit).toEqual(true);
    expect(component.find('Field').at(1).props().props.isSubmit).toEqual(true);
    expect(component.find('Field').at(2).props().props.isSubmit).toEqual(true);

    expect(component).toMatchSnapshot();
  });
});

