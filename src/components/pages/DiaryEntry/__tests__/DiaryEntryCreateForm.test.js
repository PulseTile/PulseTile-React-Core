import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import configureStore from 'redux-mock-store';
import { SpeechRecognitionMock } from 'speech-recognition-mock';

import DiaryEntryCreateForm from '../DiaryEntryCreate/DiaryEntryCreateForm';
import { valuesNames, valuesLabels } from '../forms.config';

Enzyme.configure({adapter: new Adapter()});

const mockStore = configureStore();
const store = mockStore({});
const DATE_TO_USE = new Date('2017');
const DATE_TO_USE_TIME = DATE_TO_USE.getTime();
global.Date = jest.fn(() => DATE_TO_USE);

const FORM_NAME = 'diaryEntriesCreateForm';
const DATE_FORMAT = 'DD-MMM-YYYY';

const testProps = {
  notes: '',
  isSubmit: false,
};

describe('Component <DiaryEntryCreateForm />', () => {
  it('should renders with props correctly', () => {
    const component = shallow(
      <DiaryEntryCreateForm
        store={store}
        isSubmit={testProps.isSubmit}
      />).dive().dive().dive().dive();

    expect(component.find('div.row-expand')).toHaveLength(3);

    expect(component.find('Field')).toHaveLength(3);
    expect(component.find('form')).toHaveLength(1);
    expect(component.find('form').prop('name')).toEqual(FORM_NAME);

    expect(component.find('Field').at(0).props().name).toEqual(valuesNames.TYPE);
    expect(component.find('Field').at(0).props().id).toEqual(valuesNames.TYPE);
    expect(component.find('Field').at(0).props().label).toEqual(valuesLabels.TYPE);
    expect(component.find('Field').at(0).props().props.isSubmit).toEqual(false);

    expect(component.find('Field').at(1).props().name).toEqual(valuesNames.AUTHOR);
    expect(component.find('Field').at(1).props().id).toEqual(valuesNames.AUTHOR);
    expect(component.find('Field').at(1).props().label).toEqual(valuesLabels.AUTHOR);
    expect(component.find('Field').at(1).props().props.disabled).toEqual(true);

    expect(component.find('Field').at(2).props().name).toEqual(valuesNames.DATE);
    expect(component.find('Field').at(2).props().label).toEqual(valuesLabels.DATE);
    expect(component.find('Field').at(2).props().props.disabled).toEqual(true);
    expect(component.find('Field').at(2).props().props.value).toEqual(DATE_TO_USE_TIME);
    expect(component.find('Field').at(2).props().props.format).toEqual(DATE_FORMAT);

    expect(component).toMatchSnapshot();
  });

  it('should renders correctly when form is submitted', () => {
    const component = shallow(
      <DiaryEntryCreateForm
        store={store}
        isSubmit
      />).dive().dive().dive().dive();
    expect(component.find('Field')).toHaveLength(3);
    expect(component.find('form')).toHaveLength(1);
    expect(component.find('form').prop('name')).toEqual(FORM_NAME);

    expect(component.find('Field').at(0).props().props.isSubmit).toEqual(true);
    expect(component.find('TextareaWithButton').at(0).props().fieldProps.props.isSubmit).toEqual(true);

    expect(component).toMatchSnapshot();
  });

  it('should not work when no speech recognition in browser', () => {
    window.SpeechRecognition = null;
    const component = shallow(
      <DiaryEntryCreateForm
        store={store}
        isSubmit
      />).dive().dive().dive().dive();
    const speechInput = component.find('TextareaWithButton');
    const speechButton = speechInput.dive('button');

    expect(speechInput).toHaveLength(1);
    expect(speechButton).toHaveLength(1);

    // will allways be false because no speech recognition in browser during tests
    speechButton.first().simulate('click', {
      preventDefault() {
      }
    });
    expect(component.state().recognitionStarted).toEqual(false);

    component.instance().stopSpeach({
      preventDefault() {
      }
    });
    expect(component.state().recognitionStarted).toEqual(false);

    expect(component).toMatchSnapshot();
  });
  it('should work when speech recognition in browser is active', () => {
    const speechRecognitionEventMock = {
      resultIndex: 0,
      results: [
        [
          {
            transcript: 'test',
          },
        ],
      ],
    };
    window.SpeechRecognition = SpeechRecognitionMock;
    const component = shallow(
      <DiaryEntryCreateForm
        store={store}
        isSubmit
      />).dive().dive().dive().dive();
    const speechInput = component.find('TextareaWithButton');
    const speechButton = speechInput.dive('button');
    const spy = spyOn(store, 'dispatch');

    expect(speechInput).toHaveLength(1);
    expect(speechButton).toHaveLength(1);

    component.instance().startSpeach({
      preventDefault() {
      }
    });
    expect(component.state().recognitionStarted).toEqual(true);

    component.instance().stopSpeach({
      preventDefault() {
      }
    });
    expect(component.state().recognitionStarted).toEqual(false);
    new Promise(()=>{
      component.instance().recognition.onresult(speechRecognitionEventMock)
    }).then(()=>{
      expect(spy).toHaveBeenCalled();
    });
    expect(component).toMatchSnapshot();
  });
});
