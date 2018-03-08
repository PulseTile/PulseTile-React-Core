import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import configureStore from 'redux-mock-store';

import AllergyDetailMainForm from '../AllergiesDetail/AllergyDetailMainForm';
import { valuesNames, valuesLabels } from '../forms.config';

Enzyme.configure({ adapter: new Adapter() });

const mockStore = configureStore();
const store = mockStore({});
const FORM_NAME = 'allergiePanelForm';

const testProps = {
  detail: {
    dateCreated: 1507020019000,
  },
  isSubmit: false,
};

describe('Component <AllergyDetailMainForm />', () => {
  it('should renders with props correctly', () => {
    const component = shallow(
      <AllergyDetailMainForm
        store={store}
        isSubmit={testProps.isSubmit}
        detail={testProps.detail}
      />).dive().dive().dive();
    expect(component.find('Field')).toHaveLength(4);
    expect(component.find('form')).toHaveLength(1);
    expect(component.find('form').prop('name')).toEqual(FORM_NAME);

    expect(component.find('Field').at(0).props().name).toEqual(valuesNames.CAUSE);
    expect(component.find('Field').at(0).props().label).toEqual(valuesLabels.CAUSE);
    expect(component.find('Field').at(0).props().props.isSubmit).toEqual(false);

    expect(component.find('Field').at(1).props().name).toEqual(valuesNames.REACTION);
    expect(component.find('Field').at(1).props().label).toEqual(valuesLabels.REACTION);
    expect(component.find('Field').at(1).props().props.isSubmit).toEqual(false);

    expect(component.find('Field').at(2).props().name).toEqual(valuesNames.AUTHOR);
    expect(component.find('Field').at(2).props().label).toEqual(valuesLabels.AUTHOR);
    expect(component.find('Field').at(2).props().props.disabled).toEqual(true);

    expect(component.find('Field').at(3).props().name).toEqual(valuesNames.DATE);
    expect(component.find('Field').at(3).props().label).toEqual(valuesLabels.DATE);
    expect(component.find('Field').at(3).props().props.disabled).toEqual(true);
    expect(component.find('Field').at(3).props().props.value).toEqual(testProps.detail.dateCreated);
    expect(component.find('Field').at(3).props().props.format).toEqual('DD-MMM-YYYY');

    expect(component).toMatchSnapshot();
  });

  it('should renders with props correctly with is import', () => {
    const component = shallow(
      <AllergyDetailMainForm
        store={store}
        isSubmit
        detail={{
          dateCreated: 1507020019000,
          isImport: true,
        }}
      />).dive().dive().dive();
    expect(component.find('Field')).toHaveLength(5);

    expect(component.find('Field').at(2).props().name).toEqual(valuesNames.IMPORT);
    expect(component.find('Field').at(2).props().id).toEqual(valuesNames.IMPORT);
    expect(component.find('Field').at(2).props().label).toEqual(valuesLabels.IMPORT);
    expect(component.find('Field').at(2).props().props.isSubmit).toEqual(true);
    expect(component.find('Field').at(2).props().props.disabled).toEqual(true);

    expect(component).toMatchSnapshot();
  });

  it('should renders correctly when form is submitted', () => {
    const component = shallow(
      <AllergyDetailMainForm
        store={store}
        isSubmit
        detail={testProps.detail}
      />).dive().dive().dive();
    expect(component.find('Field')).toHaveLength(4);
    expect(component.find('form')).toHaveLength(1);
    expect(component.find('form').prop('name')).toEqual(FORM_NAME);

    expect(component.find('Field').at(0).props().props.isSubmit).toEqual(true);
    expect(component.find('Field').at(1).props().props.isSubmit).toEqual(true);

    expect(component).toMatchSnapshot();
  });
});

