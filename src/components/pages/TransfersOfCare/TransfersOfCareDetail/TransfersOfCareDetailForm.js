import React, { PureComponent } from 'react';
import { Field, reduxForm } from 'redux-form'
import classNames from 'classnames';

import ValidatedTextareaFormGroup from '../../../form-fields/ValidatedTextareaFormGroup';
import SelectFormGroup from '../../../form-fields/SelectFormGroup';
import DateInput from '../../../form-fields/DateInput';
import { validateForm } from '../forms.validation';
import { valuesNames, valuesLabels, citiesOptions, typesOptions } from '../forms.config';
import { transfersOfCareDetailFormStateSelector} from "../selectors";
import { connect } from "react-redux";
import { serviceTransferOfCare } from '../transfer-of-care-helpers.utills';
import Spinner from '../../../ui-elements/Spinner/Spinner';

@reduxForm({
  form: 'transfersOfCareDetailFormSelector',
  validate: validateForm,
})
@connect(transfersOfCareDetailFormStateSelector)
export default class TransfersOfCareDetailForm extends PureComponent {
  state = {
    typeRecords: '',
  };

  componentDidMount() {
    const { detail, initialize } = this.props;
    initialize(this.defaultValuesForm(detail));
  }

  // componentWillUpdate() {
  //   const { typeRecords } = this.state;
  //   const typesRecords = serviceTransferOfCare.getConfig();
  //   if (typesRecords[typeRecords] && typesRecords[typeRecords].records) {
  //     console.log('false componentWillUpdate');
  //     this.setState({ isRecordsLoading: false });
  //   }
  // }

  defaultValuesForm = (value) => {
    const defaultFormValues = {
      [valuesNames.FROM]: value[valuesNames.FROM],
      [valuesNames.TO]: value[valuesNames.TO],
      [valuesNames.REASON]: value[valuesNames.REASON],
      [valuesNames.CLINICAL]: value[valuesNames.CLINICAL],
      [valuesNames.DATE]: value[valuesNames.DATE],
    };

    return defaultFormValues;
  };

  generateCitiesOptions = (selected) => {
    return citiesOptions.slice().map(item => ({
      ...item,
      disabled: (item.value === selected)
    }));
  };

  getHeadingsLists = (ev) => {
    const { handleGetHeadingsLists } = this.props;
    const typeRecords = ev.target.value;
    this.setState({ typeRecords });
    handleGetHeadingsLists(typeRecords);
  };

  getHeadingsItem = (ev) => {
    debugger
  };

  render() {
    const { detail, isSubmit, transfersOfCareDetailFormState, isRecordsLoading } = this.props;
    const { typeRecords } = this.state;

    const typesRecords = serviceTransferOfCare.getConfig();
    // console.log('typesRecords', typesRecords);

    const formState = transfersOfCareDetailFormState.values || {};
    const citiesFromOptions = this.generateCitiesOptions(formState[valuesNames.TO]);
    const citiesToOptions = this.generateCitiesOptions(formState[valuesNames.FROM]);

    return (
      <div className="panel-body-inner">
        {isRecordsLoading ? <Spinner /> : null }
        <form name="transfersOfCareDetailForm" className="form">
          <div className="form-group-wrapper">

            <div className="row-expand">
              <div className="col-expand-left">
                <Field
                  label={valuesLabels.FROM}
                  name={valuesNames.FROM}
                  id={valuesNames.FROM}
                  options={citiesFromOptions}
                  component={SelectFormGroup}
                  placeholder="-- Select from --"
                  props={{ isSubmit }}
                />
              </div>
              <div className="col-expand-right">
                <Field
                  label={valuesLabels.TO}
                  name={valuesNames.TO}
                  id={valuesNames.TO}
                  options={citiesToOptions}
                  component={SelectFormGroup}
                  placeholder="-- Select to --"
                  props={{ isSubmit }}
                />
              </div>
            </div>

            <SelectFormGroup
              label={valuesLabels.TYPE}
              name={valuesNames.TYPE}
              id={valuesNames.TYPE}
              options={typesOptions}
              component={SelectFormGroup}
              placeholder="-- Select type --"
              props={{ isSubmit }}
              meta={{error: false, touched: false}}
              input={{value: typeRecords}}
              onChange={this.getHeadingsLists}
            />

            {(typeRecords === 'diagnosis' ||
              typeRecords === 'medications' ||
              typeRecords === 'referrals' ||
              typeRecords === 'vitals') ?
              <SelectFormGroup
                label={valuesLabels.RECORDS}
                name={valuesNames.RECORDS}
                id={valuesNames.RECORDS}
                options={typesRecords[typeRecords].records || []}
                component={SelectFormGroup}
                placeholder={`-- Select ${typesRecords[typeRecords].title} --`}
                props={{ isSubmit }}
                meta={{error: false, touched: false}}
                input={{value: typeRecords}}
                onChange={this.getHeadingsItem}
              />

              : null
            }
            {/*<Field*/}
              {/*label={valuesLabels.RECORDS}*/}
              {/*name={valuesNames.RECORDS}*/}
              {/*id={valuesNames.RECORDS}*/}
              {/*options={typesRecords[typeRecords].records || []}*/}
              {/*component={SelectFormGroup}*/}
              {/*placeholder={`-- Select ${typesRecords[typeRecords].title} --`}*/}
              {/*props={{ isSubmit }}*/}
            {/*/>*/}

            {typeRecords === 'events' ?
              <div>
                <div  className="form-group">
                  <label htmlFor="typeevents" className="control-label">Events Type</label>
                  <div className="input-holder">
                    <select className="form-control input-sm" id="typeevents" name="typeevents" ng-model="selectedTypeEvents" ng-options=" key as key for (key, item) in typeRecords.events.records">
                      <option value="">-- Select Events Type --</option>
                    </select>
                  </div>
                </div>

                <div  className="form-group">
                  <label htmlFor="typeRecordId" className="control-label">Events</label>
                  <div className="input-holder">
                    <select className="form-control input-sm" id="typeRecordId" name="typeRecordId" ng-model="selectedRecord" ng-options="item as item.selectName for item in typeRecords.events.records[selectedTypeEvents]" ng-change="addToRecords(selectedRecord)">
                      <option value="">-- Select Events --</option>
                    </select>
                  </div>
                </div>
              </div>
              : null
            }

            {/*{!transferOfCareEdit.records.length ?*/}
              {/*<div className={classNames('form-group', { 'has-error': (formSubmitted || transferOfCareEdit.records.length)})}>*/}
                {/*<div className="form-control-static">No records added</div>*/}
                {/*{(formSubmitted || transferOfCareEdit.records.length) ?*/}
                  {/*<span className="help-block animate-fade">You must select at least one record.</span>*/}
                  {/*: null*/}
                {/*}*/}
              {/*</div>*/}
              {/*: null*/}
            {/*}*/}

            {/*<div ng-if="transferOfCareEdit.records.length" class="panel-body-inner-table">*/}
              {/*<div class="form-group">*/}
                {/*<div class="record-popover-wrapper">*/}
                  {/*<table class="table table-striped table-hover table-bordered rwd-table table-fixedcol table-transferOfCare">*/}
                    {/*<colgroup>*/}
                      {/*<col>*/}
                        {/*<col style="width: 22%;">*/}
                          {/*<col style="width: 22%;">*/}
                            {/*<col style="width: 19%;">*/}
                              {/*<col style="width: 54px;">*/}
                    {/*</colgroup>*/}
                    {/*<thead>*/}
                    {/*<tr>*/}
                      {/*<th>Name</th>*/}
                      {/*<th>Type</th>*/}
                      {/*<th>Date</th>*/}
                      {/*<th>Source</th>*/}
                      {/*<th></th>*/}
                    {/*</tr>*/}
                    {/*</thead>*/}
                    {/*<tbody dnd-list="transferOfCareEdit.records">*/}
                    {/*<tr ng-repeat="(index, record) in transferOfCareEdit.records"*/}
                        {/*dnd-draggable="record"*/}
                        {/*dnd-moved="transferOfCareEdit.records.splice($index, 1); closePopovers();"*/}
                        {/*dnd-effect-allowed="move"*/}
                        {/*dnd-nodrag*/}
                        {/*ng-click="togglePopover($event, record);">*/}

                      {/*<td data-th="Name" class="dnd-handle-wrapper">*/}
                        {/*<div dnd-handle class="dnd-handle"><i class="fa fa-bars"></i></div>*/}
                        {/*<span>{{ record.name }}</span>*/}
                      {/*</td>*/}
                      {/*<td data-th="Type"><span>{{ record.typeTitle }}</span></td>*/}
                      {/*<td data-th="Date"><span>{{ record.date }}</span></td>*/}
                      {/*<td data-th="Source"><span>{{ record.source }}</span></td>*/}
                      {/*<td data-th="" class="table-transferOfCare__control"><div ng-click="removeRecord(index); closePopovers();" class="btn btn-smaller btn-danger btn-icon-normal"><i class="btn-icon fa fa-times"></i></div></td>*/}
                    {/*</tr>*/}
                    {/*<tr class="dndPlaceholder">*/}
                      {/*<td><span></span></td>*/}
                      {/*<td><span></span></td>*/}
                      {/*<td><span></span></td>*/}
                      {/*<td><span></span></td>*/}
                      {/*<td><span></span></td>*/}
                    {/*</tr>*/}
                    {/*</tbody>*/}
                  {/*</table>*/}
                  {/*<transfer-of-care-popover-component></transfer-of-care-popover-component>*/}
                {/*</div>*/}
              {/*</div>*/}
            {/*</div>*/}

            <div className="row-expand">
              <div className="col-expand-left">
                <Field
                  label={valuesLabels.REASON}
                  name={valuesNames.REASON}
                  id={valuesNames.REASON}
                  component={ValidatedTextareaFormGroup}
                  props={{ isSubmit }}
                />
              </div>
              <div className="col-expand-right">
                <Field
                  label={valuesLabels.CLINICAL}
                  name={valuesNames.CLINICAL}
                  id={valuesNames.CLINICAL}
                  component={ValidatedTextareaFormGroup}
                  props={{ isSubmit }}
                />
              </div>
            </div>

            <Field
              label={valuesLabels.DATE}
              name={valuesNames.DATE}
              id={valuesNames.DATE}
              component={DateInput}
              props={{ disabled: true, value: detail[valuesNames.DATE], format: 'DD-MMM-YYYY', isSubmit }}
            />
          </div>
        </form>
      </div>)
  }
}
