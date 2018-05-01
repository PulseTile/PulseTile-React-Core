import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, change, formValueSelector } from 'redux-form'

import ValidatedInput from '../../../form-fields/ValidatedInputFormGroup';
import ValidatedTextareaFormGroup from '../../../form-fields/ValidatedTextareaFormGroup';
import SelectFormGroup from '../../../form-fields/SelectFormGroup';
import DateInput from '../../../form-fields/DateInput';
import { validateForm } from '../forms.validation';
import { valuesNames, valuesLabels, noteTypeOptions, formSelectorNames } from '../forms.config';
import { defaultFormValues } from './default-values.config';
import TextareaWithButton from '../../../form-fields/TextareaWithButton';

@reduxForm({
  form: formSelectorNames.DIARY_ENTRIES_CREATE,
  validate: validateForm,
})
class DiaryEntryCreateForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      recognitionStarted: false,
    }

    this.hasSpeechRecognition = false;
    this.recognition = null;
    try {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      this.recognition = new SpeechRecognition();
      this.recognition.lang = 'en-US';
      this.recognition.continuous = true;
      this.hasSpeechRecognition = true;
    } catch (error) {
      console.error(error);
    }

    if (this.hasSpeechRecognition) {
      this.recognition.onresult = (event) => {
        const current = event.resultIndex;
        const transcript = event.results[current][0].transcript;
        const currentValue = this.props.notes ? `${this.props.notes} ` : '';
        this.props.dispatch(change(formSelectorNames.DIARY_ENTRIES_CREATE, valuesNames.NOTE, currentValue + transcript));
      }
    }

    this.startSpeach = this.startSpeach.bind(this);
    this.stopSpeach = this.stopSpeach.bind(this);
  }

  componentDidMount() {
    this.props.initialize(defaultFormValues);
  }

  startSpeach(event) {
    event.preventDefault();
    if (this.hasSpeechRecognition && !this.state.recognitionStarted) {
      this.setState({ recognitionStarted: true }, () => this.recognition.start());
    }
  }

  stopSpeach(event) {
    event.preventDefault();
    if (this.hasSpeechRecognition && this.state.recognitionStarted) {
      this.setState({ recognitionStarted: false }, () => this.recognition.stop());
    }
  }

  render() {
    const { isSubmit } = this.props;
    const date = new Date();
    const dateCreated = date.getTime();

    return (
      <div className="panel-body-inner">
        <form name="diaryEntriesCreateForm" className="form">
          <div className="form-group-wrapper">
            <div className="row-expand">
              <div className="col-expand-left">
                <Field
                  label={valuesLabels.TYPE}
                  name={valuesNames.TYPE}
                  id={valuesNames.TYPE}
                  options={noteTypeOptions}
                  component={SelectFormGroup}
                  props={{ isSubmit }}
                />
              </div>
            </div>
            <div className="row-expand">
              <div className="col-expand-left">
                <TextareaWithButton
                  button={
                    !this.state.recognitionStarted ? (
                      <button className="btn btn-success btn-inverse btn-square" onClick={this.startSpeach}><i
                        className="fa fa-microphone"></i></button>
                    ) : (
                      <button className="btn btn-success btn-inverse btn-square active" onClick={this.stopSpeach}><i
                        className="fa fa-microphone"></i></button>
                    )
                  }
                  fieldProps={
                    {
                      label: valuesLabels.NOTE,
                      name: valuesNames.NOTE,
                      id: valuesNames.NOTE,
                      component: ValidatedTextareaFormGroup,
                      props: { isSubmit },
                    }
                  }
                />
              </div>
            </div>
            <div className="row-expand">
              <div className="col-expand-left">
                <Field
                  label={valuesLabels.AUTHOR}
                  name={valuesNames.AUTHOR}
                  id={valuesNames.AUTHOR}
                  component={ValidatedInput}
                  props={{ disabled: true }}
                />
              </div>
              <div className="col-expand-right">
                <Field
                  label={valuesLabels.DATE}
                  name={valuesNames.DATE}
                  id={valuesNames.DATE}
                  component={DateInput}
                  props={{ disabled: true, value: dateCreated, format: 'DD-MMM-YYYY' }}
                />
              </div>
            </div>
          </div>
        </form>
      </div>)
  }
}

export default connect((state) => {
  const selector = formValueSelector(formSelectorNames.DIARY_ENTRIES_CREATE);
  return {
    notes: selector(state, valuesNames.NOTE),
  };
})(DiaryEntryCreateForm)
