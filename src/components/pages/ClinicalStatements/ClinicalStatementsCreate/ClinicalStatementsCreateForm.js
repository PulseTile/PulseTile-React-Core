import React, { PureComponent } from 'react';
import { Field, reduxForm } from 'redux-form';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { lifecycle, compose } from 'recompose';
import 'bootstrap';
import 'x-editable/dist/bootstrap3-editable/js/bootstrap-editable';
import 'x-editable/dist/bootstrap3-editable/css/bootstrap-editable.css';
import classNames from 'classnames';

import * as helper from './clinical-statements-helper';

import { fetchPatientClinicalStatementsTagsRequest } from '../ducks/fetch-patient-clinical-statements-tags.duck';
import { fetchPatientClinicalStatementsQueryRequest } from '../ducks/fetch-patient-clinical-statements-query.duck';
import { fetchPatientClinicalStatementsTagsOnMount } from '../../../../utils/HOCs/fetch-patients.utils';
import { patientClinicalStatementsTagsSelector, patientClinicalStatementsQuerySelector } from '../selectors';

import PaginationBlock from '../../../presentational/PaginationBlock/PaginationBlock';
import ValidatedInput from '../../../form-fields/ValidatedInputFormGroup';
import DateInput from '../../../form-fields/DateInput';
import { validateForm } from '../forms.validation';
import { valuesNames, valuesLabels } from '../forms.config';
import { defaultFormValues } from './default-values.config';
import { getDDMMMYYYY } from '../../../../utils/time-helpers.utils';
import { operationsOnCollection } from '../../../../utils/plugin-helpers.utils';

const mapDispatchToProps = dispatch => ({ actions: bindActionCreators({ fetchPatientClinicalStatementsTagsRequest, fetchPatientClinicalStatementsQueryRequest }, dispatch) });


@reduxForm({
  form: 'clinicalStatementsCreateFormSelector',
  validate: validateForm,
})
@connect(patientClinicalStatementsTagsSelector, mapDispatchToProps)
@connect(patientClinicalStatementsQuerySelector)
@compose(lifecycle(fetchPatientClinicalStatementsTagsOnMount))
export default class ClinicalStatementsCreateForm extends PureComponent {
 state = {
   offset: 0,
   listPerPageAmount: 5,

   queryFilter: '',
   clinicalTag: '',

   statements: [],
   clinicalStatementCreate: {
     contentStore: {
       name: 'ts',
       phrases: [],
     },
   },
   html: '',
   // openSearch: false,
 };

 componentDidMount() {
   this.props.initialize(defaultFormValues);
 }

 componentWillReceiveProps(nextProps) {
   const { clinicalStatementsQuery } = nextProps;
   const { clinicalTag } = this.state;
   if (clinicalStatementsQuery[clinicalTag]) {
     this.setState({ statements: clinicalStatementsQuery[clinicalTag] });
   } else {
     this.setState({ statementsIDS: {}, statements: [] });
   }
 }

  requestStatements = (tag) => {
    const { actions, match } = this.props;
    const userId = _.get('params.userId', match);
    if (userId) actions.fetchPatientClinicalStatementsQueryRequest({ userId, tag });
  };

 handleSetOffset = offset => this.setState({ offset });

 getListItemsOnPage = (list) => {
   const { listPerPageAmount, offset } = this.state;

   return (_.size(list) > listPerPageAmount
     ? _.slice(offset, offset + listPerPageAmount)(list)
     : list)
 };

 filterTags = tags => tags.filter((item) => {
   const { queryFilter } = this.state;
   const str = item ? `${item.toString().toLowerCase()} ` : '';

   return str.indexOf(queryFilter.toLowerCase() || '') !== -1
 });

 getQueryFilter = (event) => { this.setState({ queryFilter: event.target.value }) };

 setTag = clinicalTag => () => {
   this.setState({ offset: 0, clinicalTag, queryFilter: '' });
   this.requestStatements(clinicalTag);
 };

 removeTag = () => {
	  this.setState({
     offset: 0,
     clinicalTag: '',
     queryFilter: '',
     statements: [],
	  })
 };

  filterStatements = (statements) => {
    const { queryFilter } = this.state;
    return operationsOnCollection.filter(statements, queryFilter, ['phrase'],);
  };

 setStatement = statement => () => {
	  console.log('statement', statement);
   const { clinicalTag, clinicalStatementCreate } = this.state;

   const phraseItem = {
     id: statement.id,
     tag: clinicalTag,
   };

   clinicalStatementCreate.contentStore.phrases.push(phraseItem);
   // Parse inputs
   const inner = statement.phrase.replace(
     /(.*)(\{|\|)([^~|])(\}|\|)(.*)/,
     '$1<span class="editable" contenteditable="false" data-arr-subject="$1" editable-text data-arr-unit="$3" data-arr-value="$5">$3</span>$5'
   );
   const html = `<span class="tag" data-id="${statement.id}" data-phrase="${statement.phrase}" contenteditable="false">${inner}. <a class="remove" contenteditable="false"><i class="fa fa-close" contenteditable="false"></i></a></span>`;

   helper.pasteHtmlAtCaret(html, 'clinicalNote');

   // Apply Editable
   $('span.tag .editable').editable({
     type: 'text',
     title: 'Edit Text',
     success: (response, newValue) => {
       phraseItem.value = newValue;
     },
   });

   // Bind Remove to tag
   helper.removeTags('clinicalNote');
 };

  handleChangeContentEditable = (event) => {
    console.log(event.target.innerText);
    // this.setState({html: event.target.value});
  };

  render() {
    const { clinicalStatementsTags, isSubmit } = this.props;
    const { queryFilter, clinicalTag, statements, offset, listPerPageAmount } = this.state;

    const filteredTags = this.filterTags(clinicalStatementsTags || []);
    const listTagsOnPage = this.getListItemsOnPage(filteredTags);

    const filteredStatements = this.filterStatements(statements || []);
    const listStatementsOnPage = this.getListItemsOnPage(filteredStatements);

    const date = new Date();
    const dateCreated = getDDMMMYYYY(date.getTime());

    console.log('render');
    return (
      <div className="panel-body-inner">
        <form name="clinicalStatementsCreateForm" className="form">
          <div className="form-group-wrapper">
            <Field
              label={valuesLabels.TYPE}
              name={valuesNames.TYPE}
              id={valuesNames.TYPE}
              type="text"
              component={ValidatedInput}
              props={{ isSubmit }}
            />

            <div className="row-expand">
              <div className="col-expand-left">
                <div className="form-group">
                  <label htmlFor="search" className="control-label">Search</label>
                  <div className="input-holder">
                    <div className={classNames('dropdown', { 'open': !!queryFilter })}>
                      <div className="form-control input-sm input-container" id="clinicalTags">
                        {clinicalTag ?
                          <span className="input-tag">
                            <span>{ clinicalTag }</span>
                            <i className="fa fa-times" onClick={this.removeTag} />
                          </span> : null }
                        <div className="wrap-overflow">
                          <input
                            className="input-contenteditable"
                            id="queryFilter"
                            type="text"
                            autoComplete={'off'}
                            value={queryFilter}
                            onChange={this.getQueryFilter}
                          />
                        </div>
                      </div>
                      {!statements.length
                        ? <div className="dropdown-menu dropdown-menu-panel dropdown-menu-statements dropdown-menu-small dropdown-menu-top-left">
                          <div className="heading wrap-overflow">
                            <div className="control-group right">
                              { listTagsOnPage.length ? <PaginationBlock
                                entriesPerPage={listPerPageAmount}
                                totalEntriesAmount={filteredTags.length}
                                offset={offset}
                                setOffset={this.handleSetOffset}
                                isShortView
                              /> : null }
                            </div>
                            <div className="pagination-heading">Tags</div>
                          </div>
                          <div className="dropdown-menu-wrap-list">
                            <div className="dropdown-menu-list">
                              {listTagsOnPage ?
                                listTagsOnPage.map((tag) => {
                                  return <div className="dropdown-menu-item" key={`dropdown-item-${tag}`} onClick={this.setTag(tag)}>
                                    <span className="dropdown-menu-item-text">{ tag }</span>
                                  </div>
                                })
                                : null
                              }
                            </div>
                          </div>
                        </div>
                        : <div className="dropdown-menu dropdown-menu-panel dropdown-menu-statements dropdown-menu-small dropdown-menu-top-left hidden-expand">
                          <div className="heading wrap-overflow">
                            <div className="control-group right">
                              { listStatementsOnPage.length ? <PaginationBlock
                                entriesPerPage={listPerPageAmount}
                                totalEntriesAmount={filteredStatements.length}
                                offset={offset}
                                setOffset={this.handleSetOffset}
                                isShortView
                              /> : null }
                            </div>
                            <div className="pagination-heading">Statements</div>
                          </div>
                          <div className="dropdown-menu-wrap-list">
                            <div className="dropdown-menu-list">
                              {listStatementsOnPage ?
                                listStatementsOnPage.map((statement) => {
                                  return <div className="dropdown-menu-item" key={`dropdown-item-${statement.id}`} onClick={this.setStatement(statement)}>
                                    <span className="dropdown-menu-item-text">{ statement.phrase }</span>
                                  </div>
                                })
                                : null}
                            </div>
                          </div>
                        </div>
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row-expand">
              <div className="col-expand-left">
                <div className="form-group hidden-not-expand visible-expand">
                  <label htmlFor="" className="control-label">Statements</label>
                  <div className="input-holder">
                    <div className="form-control form-contenteditable textarea-big">
                      {filteredStatements ?
                        filteredStatements.map((statement) => {
                          return <div className="select-option" key={`select-option-${statement.id}`} onClick={this.setStatement(statement)}>
                            <span className="select-option-text">{ statement.phrase }</span>
                          </div>
                        })
                        : null }
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-expand-right">
                <div className="form-group">
                  <label htmlFor="clinicalNote" className="control-label">Clinical Note</label>
                  <div className="input-holder">
                    <div
                      className="form-control textarea-big input-sm contenteditable-resize"
                      tabIndex="0"
                      id={'clinicalNote'}
                      contentEditable
                      onInput={this.handleChangeContentEditable}
                    >
                      <span id="temp" contentEditable={false} />
                    </div>
                  </div>
                  {/*<span className="help-block animate-fade">You must enter a value.</span>*/}
                </div>
              </div>
            </div>


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
