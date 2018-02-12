import React, { PureComponent } from 'react';
import { Field, reduxForm } from 'redux-form';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { lifecycle, compose } from 'recompose';
import _ from 'lodash/fp';
import classNames from 'classnames';

import { fetchPatientClinicalStatementsTagsRequest } from '../ducks/fetch-patient-clinical-statements-tags.duck';
import { fetchPatientClinicalStatementsQueryRequest } from '../ducks/fetch-patient-clinical-statements-query.duck';
import { fetchPatientClinicalStatementsTagsOnMount } from '../../../../utils/HOCs/fetch-patients.utils';
import { patientClinicalStatementsTagsSelector, patientClinicalStatementsQuerySelector } from '../selectors';

import PaginationBlock from '../../../presentational/PaginationBlock/PaginationBlock';
import ValidatedInput from '../../../form-fields/ValidatedInputFormGroup';
// import ValidatedTextareaFormGroup from '../../../form-fields/ValidatedTextareaFormGroup';
// import SelectFormGroup from '../../../form-fields/SelectFormGroup';
import DateInput from '../../../form-fields/DateInput';
import { validateForm } from '../forms.validation';
import { valuesNames, valuesLabels } from '../forms.config';
import { defaultFormValues } from './default-values.config';
import { getDDMMMYYYY } from '../../../../utils/time-helpers.utils';

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
	  statementsText: [],
	  clinicalStatementCreate: {
      contentStore: {
				name: "ts",
				phrases: [],
      },
    },
	  openSearch: false,
	};

  componentDidMount() {
    this.props.initialize(defaultFormValues);
  }

	componentWillReceiveProps(nextProps) {
		const { clinicalStatementsQuery } = nextProps;
		const { clinicalTag } = this.state;
		if (clinicalStatementsQuery[clinicalTag]) {
			this.setState({statements: clinicalStatementsQuery[clinicalTag]});
    } else {
			this.setState({statements: []});
		}
	}

  requestStatements = tag => {
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

	filterList = (tags) => tags.filter(item => {
		const { queryFilter } = this.state;
		const str = item ? `${item.toString().toLowerCase()} ` : '';

		return str.indexOf(queryFilter.toLowerCase() || '') !== -1
	});

	getQueryFilter = event => { this.setState({ queryFilter: event.target.value }) };

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
      statementsText: [],
	  })
	};

	setStatement = statement => () => {
	  console.log('statement', statement);
		// this.setState({ offset: 0, statement, queryFilter: '' });
	};

  render() {
		const { clinicalStatementsTags, isSubmit } = this.props;
		const { queryFilter, clinicalTag, statements, offset, listPerPageAmount } = this.state;

		const filteredTags = this.filterList(clinicalStatementsTags || []);
		const listTagsOnPage = this.getListItemsOnPage(filteredTags);

		const filteredStatements = this.filterList(statements || []);
		const listStatementsOnPage = this.getListItemsOnPage(filteredStatements);

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

            <div className="row-expand">
              <div className="col-expand-left">
                <div className="form-group">
                  <label htmlFor="search" className="control-label">Search</label>
                  <div className="input-holder">
                    <div className={classNames('dropdown', { 'open': !!queryFilter })}>
                      <div className="form-control input-sm input-container" id="clinicalTags" name="clinicalTags">
                        {clinicalTag ?
                          <span className="input-tag">
                            <span>{clinicalTag}</span>
                            <i className="fa fa-times" onClick={this.removeTag} />
                          </span> : null
                        }

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
                                  isShortView={true}
                                /> : null }
                            </div>
                            <div className="pagination-heading">Tags</div>
                          </div>
                          <div className="dropdown-menu-wrap-list">
                            <div className="dropdown-menu-list">
															{listTagsOnPage ?
																listTagsOnPage.map(tag => {
																	return <div className="dropdown-menu-item" key={`dropdown-item-${tag}`} onClick={this.setTag(tag)}>
                                    <span className="dropdown-menu-item-text">{tag}</span>
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
                              {/*<dir-pagination-controls className="pagination-short" max-size="5" on-page-change="pageChangeHandler(newPageNumber)" boundary-links="false" pagination-id="phrase"></dir-pagination-controls>*/}
                            </div>
                            <div className="pagination-heading">Statements</div>
                          </div>
                          <div className="dropdown-menu-wrap-list">
                            <div className="dropdown-menu-list">
															{listStatementsOnPage ?
																listStatementsOnPage.map(statement => {
																	return <div className="dropdown-menu-item" key={`dropdown-item-${statement}`} onClick={this.setStatement(statement)}>
                                    <span className="dropdown-menu-item-text">{statement}</span>
                                  </div>
																})
																: null
															}

                              {/*<select multiple="" className="form-control not-bordered textarea-big ng-valid ng-dirty" ng-model="selectedStatements" ng-change="changeSelect(selectedStatements)">*/}
                                {/*<option value="{{item.index}}" dir-paginate="item in statementsText | filter: queryFiltering | itemsPerPage: 5" pagination-id="phrase">{{item.phrase}}</option>*/}
                              {/*</select>*/}
                            </div>
                          </div>
                        </div>
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>


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
