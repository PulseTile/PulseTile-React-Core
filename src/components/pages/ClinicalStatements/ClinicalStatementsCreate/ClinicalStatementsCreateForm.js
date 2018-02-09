import React, { PureComponent } from 'react';
import { Field, reduxForm } from 'redux-form';
import classNames from 'classnames';

import ValidatedInput from '../../../form-fields/ValidatedInputFormGroup';
import ValidatedTextareaFormGroup from '../../../form-fields/ValidatedTextareaFormGroup';
import SelectFormGroup from '../../../form-fields/SelectFormGroup';
import DateInput from '../../../form-fields/DateInput';
import { validateForm } from '../forms.validation';
import { valuesNames, valuesLabels, relationshipOptions, relationshipTypeOptions } from '../forms.config';
import { defaultFormValues } from './default-values.config';
import { getDDMMMYYYY } from '../../../../utils/time-helpers.utils';

@reduxForm({
  form: 'clinicalStatementsCreateFormSelector',
  validate: validateForm,
})
export default class ClinicalStatementsCreateForm extends PureComponent {
  componentDidMount() {
    this.props.initialize(defaultFormValues);
  }
  render() {
    const { isSubmit } = this.props;
    const date = new Date();
    const dateCreated = getDDMMMYYYY(date.getTime());

    return (
      <div className="panel-body-inner">
        <form name="clinicalStatementsCreateForm" className="form">
          <div className="form-group-wrapper">
            <div className="row-expand">
              <div className="col-expand-left">
                <Field
                  label={valuesLabels.TYPE}
                  name={valuesNames.TYPE}
                  id={valuesNames.TYPE}
                  type="text"
                  component={ValidatedInput}
                  props={{ isSubmit }}
                />
              </div>
            </div>


            {/*<div className="row-expand">*/}
              {/*<div className="col-expand-left">*/}
                {/*<div className="form-group">*/}
                  {/*<label htmlFor="search" className="control-label">Search</label>*/}
                  {/*<div className="input-holder">*/}
                    {/*<div className={classNames('dropdown', { 'open': !!queryFilter })}>*/}
                      {/*<div mc-dropdown className="form-control input-sm input-container" id="clinicalTags" name="clinicalTags">*/}
                        {/*{clinicalTag ?*/}
                          {/*<span className="input-tag">*/}
                            {/*<span>{clinicalTag}</span>*/}
                            {/*<i className="fa fa-times" onClick="$ctrl.removeTag()" />*/}
                          {/*</span> : null*/}
                        {/*}*/}

                        {/*<div className="wrap-overflow">*/}
                          {/*<span className="input-contenteditable" tabindex="0" contenteditable="true" contenteditabled ng-model="queryFilter" />*/}
                        {/*</div>*/}
                      {/*</div>*/}
                      {/*<div className="dropdown-menu dropdown-menu-panel dropdown-menu-statements dropdown-menu-small dropdown-menu-top-left" ng-if="!statements.length">*/}
                        {/*<div className="heading wrap-overflow">*/}
                          {/*<div className="control-group right">*/}
                            {/*<dir-pagination-controls className="pagination-short" max-size="5" on-page-change="pageChangeHandler(newPageNumber)" boundary-links="false" pagination-id="tags"></dir-pagination-controls>*/}
                          {/*</div>*/}
                          {/*<div className="pagination-heading">Tags</div>*/}
                        {/*</div>*/}
                        {/*<div className="dropdown-menu-wrap-list">*/}
                          {/*<div className="dropdown-menu-list">*/}
                            {/*<div className="dropdown-menu-item" ng-click="$ctrl.getTag(tag)" dir-paginate="tag in tags | filter: queryFilter | itemsPerPage: 5" pagination-id="tags"><span className="dropdown-menu-item-text">{{tag}}</span></div>*/}
                          {/*</div>*/}
                        {/*</div>*/}
                      {/*</div>*/}
                      {/*<div className="dropdown-menu dropdown-menu-panel dropdown-menu-statements dropdown-menu-small dropdown-menu-top-left hidden-expand" ng-if="statements.length">*/}
                        {/*<div className="heading wrap-overflow">*/}
                          {/*<div className="control-group right">*/}
                            {/*<dir-pagination-controls className="pagination-short" max-size="5" on-page-change="pageChangeHandler(newPageNumber)" boundary-links="false" pagination-id="phrase"></dir-pagination-controls>*/}
                          {/*</div>*/}
                          {/*<div className="pagination-heading">Statements</div>*/}
                        {/*</div>*/}
                        {/*<div className="dropdown-menu-wrap-list">*/}
                          {/*<div className="dropdown-menu-list">*/}
                            {/*<select multiple="" className="form-control not-bordered textarea-big ng-valid ng-dirty" ng-model="selectedStatements" ng-change="changeSelect(selectedStatements)">*/}
                              {/*<option value="{{item.index}}" dir-paginate="item in statementsText | filter: queryFiltering | itemsPerPage: 5" pagination-id="phrase">{{item.phrase}}</option>*/}
                            {/*</select>*/}
                          {/*</div>*/}
                        {/*</div>*/}
                      {/*</div>*/}
                    {/*</div>*/}
                  {/*</div>*/}
                {/*</div>*/}
              {/*</div>*/}
            {/*</div>*/}

            {/*<div className="row-expand">*/}
              {/*<div className="col-expand-left">*/}
                {/*<div className="form-group hidden-not-expand visible-expand">*/}
                  {/*<label htmlFor="" className="control-label">Statements</label>*/}
                  {/*<div className="input-holder">*/}
                    {/*<select multiple="" className="form-control form-contenteditable textarea-big ng-valid" ng-model="selectedStatements" ng-change="changeSelect(selectedStatements)">*/}
                      {/*<option value="{{item.index}}" ng-repeat="item in statementsText | filter: queryFiltering">{{item.phrase}}</option>*/}
                    {/*</select>*/}
                  {/*</div>*/}
                {/*</div>*/}
              {/*</div>*/}
              {/*<div className="col-expand-right">*/}
                {/*<div className="form-group" ng-className="{'has-error': (formSubmitted || clinicalStatementForm.clinicalNote.$dirty) && clinicalStatementForm.clinicalNote.$invalid, 'has-success': clinicalStatementForm.clinicalNote.$valid && clinicalStatementForm.clinicalNote.$dirty}">*/}
                  {/*<label htmlFor="clinicalNote" className="control-label">Clinical Note</label>*/}
                  {/*<div className="input-holder">*/}
                    {/*<div className="form-control textarea-big input-sm contenteditable-resize" tabindex="0" contenteditable="true" id="clinicalNote" name="clinicalNote" ng-html="clinicalStatementCreate.clinicalNote" required><span id="temp"></span></div>*/}
                  {/*</div>*/}
                  {/*<span className="help-block animate-fade" ng-show="formSubmitted && clinicalStatementForm.clinicalNote.$error.required">You must enter a value.</span>*/}
                {/*</div>*/}
              {/*</div>*/}
            {/*</div>*/}


            <div className="row-expand">
              <div className="col-expand-left">
                <Field
                  label={valuesLabels.AUTHOR}
                  name={valuesNames.AUTHOR}
                  id={valuesNames.AUTHOR}
                  component={ValidatedInput}
                  props={{ disabled: true, isSubmit }}
                />
              </div>
            </div>

            <div className="row-expand">
              <div className="col-expand-right">
                <Field
                  label={valuesLabels.DATE}
                  name={valuesNames.DATE_CREATED}
                  id={valuesNames.DATE_CREATED}
                  component={DateInput}
                  props={{ disabled: true, value: dateCreated, format: 'DD-MMM-YYYY', isSubmit }}
                />
              </div>
            </div>
          </div>
        </form>
      </div>)
  }
}
