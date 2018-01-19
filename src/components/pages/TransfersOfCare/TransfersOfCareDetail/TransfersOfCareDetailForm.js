import React, { PureComponent } from 'react';
import { Field, reduxForm } from 'redux-form'
import classNames from 'classnames';

import ValidatedTextareaFormGroup from '../../../form-fields/ValidatedTextareaFormGroup';
import SelectFormGroup from '../../../form-fields/SelectFormGroup';
import DateInput from '../../../form-fields/DateInput';
import { validateForm } from '../forms.validation';
import { valuesNames, valuesLabels, citiesOptions, typesOptions, relationshipTypeOptions } from '../forms.config';

@reduxForm({
  form: 'transfersOfCareDetailFormSelector',
  validate: validateForm,
})

export default class TransfersOfCareDetailForm extends PureComponent {
  componentDidMount() {
    const { detail, initialize } = this.props;
    initialize(this.defaultValuesForm(detail));
  }
  defaultValuesForm(value) {
    const defaultFormValues = {
      [valuesNames.FROM]: value[valuesNames.FROM],
      [valuesNames.TO]: value[valuesNames.TO],
      [valuesNames.REASON]: value[valuesNames.REASON],
      [valuesNames.CLINICAL]: value[valuesNames.CLINICAL],
      [valuesNames.DATE]: value[valuesNames.DATE],
    };

    return defaultFormValues;
  }

  generateCitiesOptions = (selected) => {
    return citiesOptions.slice().map(item => {
      if (item.value === selected) {
        item.disable = true;
      }
      return item;
    });
  };

  isShowTypeRecord = (type) => {
    return true;
  };

  render() {
    const { detail, isSubmit } = this.props;

    const citiesFromOptions = this.generateCitiesOptions();
    const citiesToOptions = this.generateCitiesOptions();

    return (
      <div className="panel-body-inner">
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
                {/*ng-options="city disable when city === transferOfCareEdit.to for city in cities"*/}
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
                {/*ng-options="city disable when city === transferOfCareEdit.from for city in cities"*/}
              </div>
            </div>

            <Field
              label={valuesLabels.TYPE}
              name={valuesNames.TYPE}
              id={valuesNames.TYPE}
              options={typesOptions}
              component={SelectFormGroup}
              placeholder="-- Select type --"
              props={{ isSubmit }}
            />
            {/*ng-change="selectTypeRecords(transferOfCareEdit.type)"*/}

            {/*{(this.isShowTypeRecord('diagnosis') ||*/}
              {/*this.isShowTypeRecord('medications') ||*/}
              {/*this.isShowTypeRecord('referrals') ||*/}
              {/*this.isShowTypeRecord('vitals') ?*/}
              {/*<div className="form-group">*/}
                {/*<label htmlFor="" className="control-label">{{ typeRecords[transferOfCareEdit.type].title }}</label>*/}
                {/*<div className="input-holder">*/}
                  {/*<select className="form-control input-sm" id="typeRecordId" name="typeRecordId" ng-model="selectedRecord" ng-options="item as item.selectName for item in typeRecords[transferOfCareEdit.type].records" ng-change="addToRecords(selectedRecord)">*/}
                    {/*<option value="">-- Select {{ typeRecords[transferOfCareEdit.type].title }} --</option>*/}
                  {/*</select>*/}
                {/*</div>*/}
              {/*</div>*/}
              {/*: null*/}
            {/*}*/}

            {this.isShowTypeRecord('events') ?
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
