import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash/fp';
import classNames from 'classnames';
import qs from 'qs';
import { connect } from 'react-redux'

import ClinicalQuerySearchForm from './ClinicalQuerySearchForm/ClinicalQuerySearchForm';
import formStateSelector from './selectors';
import { getDDMMMYYYY } from '../../../utils/time-helpers.utils';
import { clientUrls } from '../../../config/client-urls.constants';
import { valuesNames, valuesLabels } from './forms.config';

@connect(formStateSelector)
export default class ClinicalQuerySearch extends PureComponent {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
    formValues: PropTypes.object,
    formIsValid: PropTypes.bool,
  };

  static contextTypes = {
    router: PropTypes.shape({
      history: PropTypes.object,
    }),
  };

  state = {
    isOpen: true,
  };

  hideForm = () => this.setState({ isOpen: false });

  toggleFormVisibility = () => this.setState(prevState => ({ isOpen: !prevState.isOpen }));

  formValuesToSearchString = (formValues) => {
    const isDateOfBirthValid = !_.isEmpty(formValues[valuesNames.DATE_OF_BIRTH]);
    const sendData = {};

    sendData[valuesNames.MIN_VALUE] = formValues[valuesNames.AGE_RANGE][0];
    sendData[valuesNames.MAX_VALUE] = formValues[valuesNames.AGE_RANGE][1];
    sendData[valuesNames.QUERY_CONTAINS] = formValues[valuesNames.QUERY_CONTAINS];
    sendData[valuesNames.QUERY_TEXT] = formValues[valuesNames.QUERY_TEXT];
    sendData[valuesNames.MALE] = formValues[valuesNames.MALE];
    sendData[valuesNames.FEMALE] = formValues[valuesNames.FEMALE];
    sendData[valuesNames.SEARCH_TYPE] = formValues[valuesNames.SEARCH_TYPE];

    if (isDateOfBirthValid) {
      sendData[valuesNames.DATE_OF_BIRTH] = formValues[valuesNames.DATE_OF_BIRTH];
    }

    return sendData;
  };

  formValuesToTitle = (formValues) => {
    const isAgeRangeSelected = _.flow(_.get(valuesNames.SELECT_AGE), _.eq('range'))(formValues);

    const ageRangeTitle = _.flow(_.getOr('', valuesNames.AGE_RANGE), _.cond([
      [_.isEmpty, _.constant('')],
      [_.T, (ageRange => `${valuesLabels.AGE_RANGE}: ${ageRange[0]}-${ageRange[1]}`)],
    ]))(formValues);

    const dateOfBirth = _.flow(_.getOr('', valuesNames.DATE_OF_BIRTH), _.cond([
      [_.isEmpty, _.constant('')],
      [_.T, (date => `${valuesLabels.DATE_OF_BIRTH}: ${getDDMMMYYYY(date)}`)],
    ]))(formValues);

    const genderTitle = _.flow(values => ({
      isMale: _.getOr('', valuesNames.MALE, values),
      isFemale: _.getOr('', valuesNames.FEMALE, values),
    }), _.cond([
      [({ isMale, isFemale }) => isMale && isFemale, _.constant(`${valuesLabels.GENDER}: All`)],
      [({ isMale }) => isMale, _.constant(`${valuesLabels.GENDER}: Male`)],
      [({ isFemale }) => isFemale, _.constant(`${valuesLabels.GENDER}: Female`)],
      [_.T, _.constant('')],
    ]))(formValues);

    const typeTitle = _.flow(_.getOr('', valuesNames.SEARCH_TYPE), _.cond([
      [_.isEmpty, _.constant('')],
      [_.T, (type => `${valuesLabels.SEARCH_TYPE}: ${type}`)],
    ]))(formValues);

    const title = [typeTitle, isAgeRangeSelected ? ageRangeTitle : dateOfBirth, genderTitle].filter(_.negate(_.isEmpty)).join(', ');

    return title
      ? `: ${title}`
      : '';
  };

  handleSearch = (e) => {
    e.preventDefault();
    const { formValues, formIsValid } = this.props;

    if (formIsValid) {
      if (formValues.selectAgeField === 'range') {
        formValues.dateOfBirth = 0;
      }
      const queryParams = {
        searchString: JSON.stringify(this.formValuesToSearchString(formValues)),
        queryType: 'clinicalQuery',
      };

      const searchReportUrl = `${clientUrls.SEARCH_REPORT}?${qs.stringify(queryParams)}`;
      this.hideForm();
      this.context.router.history.push(searchReportUrl);
    }
  };

  render() {
    const { isOpen } = this.state;
    const { onClose, formValues, formIsValid } = this.props;

    return (
      <div className={classNames('dropdown-menu dropdown-menu-search dropdown-menu-right', { 'without-shadow': isOpen })}>
        <div className="panel-group accordion">
          <div className={classNames('panel panel-secondary without-margin', { open: isOpen })}>
            <div className="panel-heading">
              <div className="control-group right">
                <button className="btn btn-success btn-inverse btn-square btn-toggle-rotate" onClick={this.toggleFormVisibility}>
                  <i className="btn-icon fa fa-chevron-up" />
                </button>
              </div>
              <h3 className="panel-title">
                <span className="ng-binding">Clinical Query</span>
                <span className="hidden-xs hidden-sm ng-binding">{this.formValuesToTitle(formValues)}</span>
              </h3>
            </div>
            <div className="panel-body" style={{ display: isOpen ? 'block' : 'none' }}>
              <div className="panel-body-inner">
                <ClinicalQuerySearchForm formValues={formValues} handleSearch={this.handleSearch} />
              </div>
              <div className="panel-control">
                <div className="wrap-control-group hide-indent-bottom">
                  <div className="control-group with-indent right">
                    <button className="btn btn-danger btn-icon-normal" onClick={onClose}><i className="btn-icon fa fa-times" /> <span className="btn-text">Close</span></button>
                    <button className="btn btn-success btn-icon-normal" disabled={!formIsValid} onClick={this.handleSearch}>
                      <i className="btn-icon fa fa-search" />
                      <span className="btn-text">Search</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
