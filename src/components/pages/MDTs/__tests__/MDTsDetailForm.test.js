import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import configureStore from 'redux-mock-store';

import MDTsDetailForm from '../MDTsDetail/MDTsDetailForm';
import { valuesNames, valuesLabels } from '../forms.config';

Enzyme.configure({ adapter: new Adapter() });

const mockStore = configureStore();
const store = mockStore({});
const FORM_NAME = 'mdtsPanelForm';
const DATE_FORMAT = 'DD-MMM-YYYY';

const testProps = {
  detail: {
    [valuesNames.DATE_OF_REQUEST]: 1507020019000,
    [valuesNames.DATE_OF_MEETING]: 1507020019000,
  },
  isSubmit: false,
};

describe('Component <MDTsDetailForm />', () => {
  it('should renders with props correctly', () => {
    const component = shallow(
      <MDTsDetailForm
        store={store}
        isSubmit={testProps.isSubmit}
        detail={testProps.detail}
      />).dive().dive().dive();
    expect(component.find('Field')).toHaveLength(6);
    expect(component.find('form')).toHaveLength(1);
    expect(component.find('form').prop('name')).toEqual(FORM_NAME);

    expect(component.find('Field').at(0).props().name).toEqual(valuesNames.TEAM);
    expect(component.find('Field').at(0).props().id).toEqual(valuesNames.TEAM);
    expect(component.find('Field').at(0).props().label).toEqual(valuesLabels.TEAM);
    expect(component.find('Field').at(0).props().placeholder).toEqual('');
    expect(component.find('Field').at(0).props().props.isSubmit).toEqual(false);

    expect(component.find('Field').at(1).props().name).toEqual(valuesNames.DATE_OF_REQUEST);
    expect(component.find('Field').at(1).props().id).toEqual(valuesNames.DATE_OF_REQUEST);
    expect(component.find('Field').at(1).props().label).toEqual(valuesLabels.DATE_OF_REQUEST);
    expect(component.find('Field').at(1).props().props.value).toEqual(undefined);
    expect(component.find('Field').at(1).props().props.isSubmit).toEqual(false);
    expect(component.find('Field').at(1).props().props.format).toEqual(DATE_FORMAT);

    expect(component.find('Field').at(2).props().name).toEqual(valuesNames.DATE_OF_MEETING);
    expect(component.find('Field').at(2).props().id).toEqual(valuesNames.DATE_OF_MEETING);
    expect(component.find('Field').at(2).props().label).toEqual(valuesLabels.DATE_OF_MEETING);
    expect(component.find('Field').at(2).props().props.value).toEqual(undefined);
    expect(component.find('Field').at(2).props().props.isSubmit).toEqual(false);
    expect(component.find('Field').at(2).props().props.format).toEqual(DATE_FORMAT);

    expect(component.find('Field').at(3).props().name).toEqual(valuesNames.LINK);
    expect(component.find('Field').at(3).props().id).toEqual(valuesNames.LINK);
    expect(component.find('Field').at(3).props().label).toEqual(valuesLabels.LINK);
    expect(component.find('Field').at(3).props().placeholder).toEqual('');
    expect(component.find('Field').at(3).props().props.isSubmit).toEqual(false);

    expect(component.find('Field').at(4).props().name).toEqual(valuesNames.QUESTION);
    expect(component.find('Field').at(4).props().id).toEqual(valuesNames.QUESTION);
    expect(component.find('Field').at(4).props().label).toEqual(valuesLabels.QUESTION);
    expect(component.find('Field').at(4).props().props.isSubmit).toEqual(false);

    expect(component.find('Field').at(5).props().name).toEqual(valuesNames.NOTES);
    expect(component.find('Field').at(5).props().id).toEqual(valuesNames.NOTES);
    expect(component.find('Field').at(5).props().label).toEqual(valuesLabels.NOTES);
    expect(component.find('Field').at(5).props().props.isSubmit).toEqual(false);

    expect(component).toMatchSnapshot();
  });

  it('should renders correctly when form is submitted', () => {
    const component = shallow(
      <MDTsDetailForm
        store={store}
        isSubmit
        detail={testProps.detail}
      />).dive().dive().dive();
    expect(component.find('Field')).toHaveLength(6);
    expect(component.find('form')).toHaveLength(1);
    expect(component.find('form').prop('name')).toEqual(FORM_NAME);

    expect(component.find('Field').at(0).props().props.isSubmit).toEqual(true);
    expect(component.find('Field').at(1).props().props.isSubmit).toEqual(true);
    expect(component.find('Field').at(2).props().props.isSubmit).toEqual(true);
    expect(component.find('Field').at(3).props().props.isSubmit).toEqual(true);
    expect(component.find('Field').at(4).props().props.isSubmit).toEqual(true);
    expect(component.find('Field').at(5).props().props.isSubmit).toEqual(true);

    expect(component).toMatchSnapshot();
  });
});

