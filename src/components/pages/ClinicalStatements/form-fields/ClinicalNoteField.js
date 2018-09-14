import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { lifecycle, compose } from 'recompose';
import _ from 'lodash/fp';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import 'bootstrap';
import 'x-editable/dist/bootstrap3-editable/js/bootstrap-editable';
import 'x-editable/dist/bootstrap3-editable/css/bootstrap-editable.css';

import PaginationBlock from '../../../presentational/PaginationBlock/PaginationBlock';
import { valuesLabels, valuesNames } from '../forms.config';
import { operationsOnCollection } from '../../../../utils/plugin-helpers.utils';
import * as helper from './clinical-statements-helper';

import { fetchPatientClinicalStatementsTagsRequest } from '../ducks/fetch-patient-clinical-statements-tags.duck';
import { fetchPatientClinicalStatementsQueryRequest } from '../ducks/fetch-patient-clinical-statements-query.duck';
import { fetchPatientClinicalStatementsTagsOnMount } from '../../../../utils/HOCs/fetch-patients.utils';
import { patientClinicalStatementsTagsSelector, patientClinicalStatementsQuerySelector } from '../selectors';

const mapDispatchToProps = dispatch => ({ actions: bindActionCreators({ fetchPatientClinicalStatementsTagsRequest, fetchPatientClinicalStatementsQueryRequest }, dispatch) });

const ID_FIELD = valuesNames.NOTE;

@connect(patientClinicalStatementsTagsSelector, mapDispatchToProps)
@connect(patientClinicalStatementsQuerySelector)
@compose(lifecycle(fetchPatientClinicalStatementsTagsOnMount))
export default class ClinicalNoteField extends PureComponent {
  static propTypes = {
    meta: PropTypes.shape({
      active: PropTypes.bool,
      error: PropTypes.any,
    }).isRequired,
    id: PropTypes.string.isRequired,
    clickOnCreate: PropTypes.bool.isRequired,
  };

  state = {
    offset: 0,
    listPerPageAmount: 5,

    isChanged: false,

    queryFilter: '',
    clinicalTag: '',

    contentEditableFocus: { offset: 0, node: null },
    statements: [],
    tempPhrases: {},
  };

  componentWillReceiveProps(nextProps) {
    const { clinicalStatementsQuery, clickOnCreate } = nextProps;
    const { clinicalTag } = this.state;
    if (clinicalStatementsQuery[clinicalTag]) {
      this.setState({ statements: clinicalStatementsQuery[clinicalTag] });
    } else {
      this.setState({ statementsIDS: {}, statements: [] });
    }

    if (clickOnCreate !== this.props.clickOnCreate) {
      this.removeTag();
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

  filterTags = tags => tags.filter((item) => {
    const { queryFilter } = this.state;
    const str = item ? `${item.toString().toLowerCase()} ` : '';

    return str.indexOf(queryFilter.trim().toLowerCase() || '') !== -1
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
    return operationsOnCollection.filter(statements, queryFilter.trim(), ['phrase']);
  };


  setStatement = statement => /* istanbul ignore next */ () => {
    const { clinicalTag, contentEditableFocus, tempPhrases } = this.state;

    const tagId = new Date().getTime();
    const phraseItem = {
      id: statement.id,
      tag: clinicalTag,
    };

    tempPhrases[tagId] = phraseItem;
    // Parse inputs
    const inner = statement.phrase.replace(
      /(.*)(\{|\|)([^~|])(\}|\|)(.*)/,
      '$1<span class="editable" contenteditable="false" data-arr-subject="$1" editable-text data-arr-unit="$3" data-arr-value="$5">$3</span> $5'
    );
    const html = `<span class="tag" data-tag-id="${tagId}" data-id="${statement.id}" data-phrase="${statement.phrase}" contenteditable="false">${inner}. <a class="remove" contenteditable="false"><i class="fa fa-close" contenteditable="false"></i></a></span>`;

    helper.pasteHtmlAtCaret(html, ID_FIELD, contentEditableFocus);
    this.handleChangeContentEditable();

    // Apply Editable
    $('span.tag .editable').editable({
      type: 'text',
      title: 'Edit Text',
      success: (response, newValue) => {
        phraseItem.value = newValue;
        setTimeout(() => {
          this.handleChangeContentEditable();
        }, 100);
      },
    });

    // Bind Remove to tag
    helper.removeTags(ID_FIELD, (tagId) => {
      tempPhrases[+tagId] = null;
      this.handleChangeContentEditable();
    });
  };

  createMarkup = (text, queryFilter) => {
    const regular = new RegExp(`(${queryFilter.trim()})`, 'gi');
    return { __html: text.replace(regular, '<b class="text-mark">$1</b>') }
  };

  handleBlurContentEditable = () => {
    /* istanbul ignore next */
    if (window.getSelection) {
      const sel = window.getSelection();
      this.setState({ contentEditableFocus: { offset: sel.focusOffset, node: sel.focusNode } });
    }
  };

  getEmptyFieldsAmount = (field) => {
    let emptyFieldsLength = field.find(valuesNames.EDITABLE_EMPTY_CLASS).length;
    const editableFilds = field.find(valuesNames.EDITABLE_CLASS);

    /* istanbul ignore next */
    editableFilds.each((i, el) => {
      const contentText = $(el).text();
      if (contentText.indexOf('?') !== -1) {
        emptyFieldsLength++;
      }
    });

    return emptyFieldsLength;
  };

  handleChangeContentEditable = () => {
    const { input: { onChange } } = this.props;
    const { tempPhrases } = this.state;
    const contentEditableEl = $(`#${ID_FIELD}`);
    const phrases = [];

    for (const key in tempPhrases) {
      // it condition need that don't take null to phrases
      if (tempPhrases[key]) {
        phrases.push(tempPhrases[key])
      }
    }

    const tempEl = $('<div>');
    tempEl.html(contentEditableEl.html());
    tempEl.find('.popover').remove();

    const contentStore = {
      [valuesNames.NOTE_TEXT]: tempEl.text(),
      [valuesNames.EDITABLE_EMPTY_FIELDS]: this.getEmptyFieldsAmount(tempEl),
      [valuesNames.NOTE_CONTENT]: {
        name: 'ts',
        phrases,
      },
    };

    this.setState({ isChanged: true });

    onChange(contentStore);
  };

  render() {
    const { clinicalStatementsTags, label, meta: { active, error }, isSubmit } = this.props;
    const { queryFilter, clinicalTag, statements, offset, listPerPageAmount, isChanged } = this.state;

    const hasError = !_.isEmpty(error);
    const showError = ((isChanged || isSubmit) && error);

    const filteredTags = this.filterTags(clinicalStatementsTags || []);
    const listTagsOnPage = this.getListItemsOnPage(filteredTags);

    const filteredStatements = this.filterStatements(statements);
    const listStatementsOnPage = this.getListItemsOnPage(filteredStatements);

    return (
      <div>
        <div className="row-expand">
          <div className="col-expand-left">
            <div className="form-group">
              <label htmlFor="search" className="control-label">{valuesLabels.SEARCH}</label>
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
                        <div className="pagination-heading">{valuesLabels.TAGS}</div>
                      </div>
                      <div className="dropdown-menu-wrap-list">
                        <div className="dropdown-menu-list">
                          {listTagsOnPage.length ?
                            listTagsOnPage.map((tag) => {
                              return <div className="dropdown-menu-item" key={`dropdown-item-${tag}`} onClick={this.setTag(tag)}>
                                <span className="dropdown-menu-item-text" dangerouslySetInnerHTML={this.createMarkup(tag, queryFilter)} />
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
                        <div className="pagination-heading">{valuesLabels.STATEMENTS}</div>
                      </div>
                      <div className="dropdown-menu-wrap-list">
                        <div className="dropdown-menu-list">
                          {listStatementsOnPage.length ?
                            listStatementsOnPage.map((statement) => {
                              return <div className="dropdown-menu-item" key={`dropdown-item-${statement.id}`} onClick={this.setStatement(statement)}>
                                <span className="dropdown-menu-item-text" dangerouslySetInnerHTML={this.createMarkup(statement.phrase, queryFilter)} />
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
              <label htmlFor="" className="control-label">{valuesLabels.STATEMENTS}</label>
              <div className="input-holder">
                <div className="form-control form-contenteditable textarea-big">
                  {filteredStatements.length ?
                    filteredStatements.map((statement) => {
                      return <div className="select-option" key={`select-option-${statement.id}`} onClick={this.setStatement(statement)}>
                        <span className="select-option-text" dangerouslySetInnerHTML={this.createMarkup(statement.phrase, queryFilter)} />
                      </div>
                    })
                    : null }
                </div>
              </div>
            </div>
          </div>
          <div className="col-expand-right">
            <div className={classNames('form-group', { 'has-error': showError }, { 'has-success': !showError && active })}>
              <label htmlFor={ID_FIELD} className="control-label">{valuesLabels.NOTE}</label>
              <div className="input-holder">
                <div
                  className="form-control textarea-big input-sm contenteditable-resize"
                  tabIndex="0"
                  id={ID_FIELD}
                  contentEditable
                  onInput={this.handleChangeContentEditable}
                  onBlur={this.handleBlurContentEditable}
                ><span id="temp" contentEditable={false} /></div>
              </div>
              {showError && <span className="required-label">{error}</span>}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

