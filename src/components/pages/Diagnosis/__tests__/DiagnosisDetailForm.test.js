import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import configureStore from 'redux-mock-store';
import DiagnosisDetailForm from '../DiagnosisDetail/DiagnosisDetailForm';
import { valuesNames, valuesLabels } from '../forms.config';

Enzyme.configure({ adapter: new Adapter() });

const mockStore = configureStore();
const store = mockStore({});
const FORM_NAME = 'diagnosesPanelForm';
const NHS_PLACEHOLDER = 'https://www.nhs.co.uk/Conditions/Hay-fever/Pages';
const DATE_FORMAT = 'DD-MMM-YYYY';
const IS_NOT_VALIDATE = true;

const testProps = {
  detail: {
    dateCreated: 1507020019000,
  },
  isSubmit: false,
};

describe('Component <DiagnosisDetailForm />', () => {
  it('should renders with props correctly', () => {
    const component = shallow(
      <DiagnosisDetailForm
        store={store}
        isSubmit={testProps.isSubmit}
        detail={testProps.detail}
      />).dive().dive().dive();
    expect(component.find('Field')).toHaveLength(8);
    expect(component.find('form')).toHaveLength(1);
    expect(component.find('form').prop('name')).toEqual(FORM_NAME);

    expect(component.find('Field').at(0).props().name).toEqual(valuesNames.PROBLEM);
    expect(component.find('Field').at(0).props().id).toEqual(valuesNames.PROBLEM);
    expect(component.find('Field').at(0).props().label).toEqual(valuesLabels.PROBLEM);
    expect(component.find('Field').at(0).props().props.isSubmit).toEqual(false);

    expect(component.find('Field').at(1).props().name).toEqual(valuesNames.DATE_OF_ONSET);
    expect(component.find('Field').at(1).props().id).toEqual(valuesNames.DATE_OF_ONSET);
    expect(component.find('Field').at(1).props().label).toEqual(valuesLabels.DATE_OF_ONSET);
    expect(component.find('Field').at(1).props().props.isSubmit).toEqual(false);
    expect(component.find('Field').at(1).props().props.format).toEqual(DATE_FORMAT);

    expect(component.find('Field').at(2).props().name).toEqual(valuesNames.DESCRIPTION);
    expect(component.find('Field').at(2).props().id).toEqual(valuesNames.DESCRIPTION);
    expect(component.find('Field').at(2).props().label).toEqual(valuesLabels.DESCRIPTION);
    expect(component.find('Field').at(2).props().props.isSubmit).toEqual(false);

    expect(component.find('Field').at(3).props().placeholder).toEqual(NHS_PLACEHOLDER);
    expect(component.find('Field').at(3).props().label).toEqual(valuesLabels.NHS_WEB_PAGE_URL);
    expect(component.find('Field').at(3).props().props.isNotValidate).toEqual(IS_NOT_VALIDATE);

    expect(component.find('Field').at(4).props().name).toEqual(valuesNames.TERMINOLOGY);
    expect(component.find('Field').at(4).props().label).toEqual(valuesLabels.TERMINOLOGY);
    expect(component.find('Field').at(4).props().props.isSubmit).toEqual(false);
    expect(component.find('Field').at(4).props().props.className).toEqual('non-edit-value');

    expect(component.find('Field').at(5).props().name).toEqual(valuesNames.CODE);
    expect(component.find('Field').at(5).props().label).toEqual(valuesLabels.CODE);
    expect(component.find('Field').at(5).props().props.className).toEqual('non-edit-value');

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
    expect(component.find('Field').at(7).props().props.value).toEqual(testProps.detail.dateCreated);
    expect(component.find('Field').at(7).props().props.format).toEqual(DATE_FORMAT);

    expect(component).toMatchSnapshot();
  });

  it('should renders with props correctly with is import', () => {
    const component = shallow(
      <DiagnosisDetailForm
        store={store}
        isSubmit
        detail={{
          dateCreated: 1507020019000,
          isImport: true,
        }}
      />).dive().dive().dive();
    expect(component.find('Field')).toHaveLength(9);

    expect(component.find('Field').at(6).props().name).toEqual(valuesNames.IMPORT);
    expect(component.find('Field').at(6).props().id).toEqual(valuesNames.IMPORT);
    expect(component.find('Field').at(6).props().label).toEqual(valuesLabels.IMPORT);
    expect(component.find('Field').at(6).props().props.isSubmit).toEqual(true);
    expect(component.find('Field').at(6).props().props.disabled).toEqual(true);

    expect(component).toMatchSnapshot();
  });

  it('should renders correctly when form is submitted', () => {
    const component = shallow(
      <DiagnosisDetailForm
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
    expect(component.find('Field').at(4).props().props.isSubmit).toEqual(true);
    expect(component.find('Field').at(6).props().props.isSubmit).toEqual(true);
    expect(component.find('Field').at(7).props().props.isSubmit).toEqual(true);

    expect(component).toMatchSnapshot();
  });
});

